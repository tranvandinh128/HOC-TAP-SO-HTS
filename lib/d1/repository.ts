
import "server-only";

export type D1BindValue =
  | string
  | number
  | ArrayBuffer
  | ArrayBufferView
  | null;

export type D1BindValues = readonly D1BindValue[];
export type D1Operation = "first" | "all" | "run" | "batch";

export interface D1BatchOperation {
  sql: string;
  values?: D1BindValues;
}

export class D1RepositoryError extends Error {
  constructor(
    readonly operation: D1Operation,
    readonly causeValue: unknown,
  ) {
    super(`D1 ${operation} query failed.`);
    this.name = "D1RepositoryError";
  }
}

export class D1Repository {
  constructor(private readonly binding: D1Database) {
    if (!binding || typeof binding.prepare !== "function") {
      throw new TypeError("A valid Cloudflare D1 binding is required.");
    }
  }

  async first<T>(
    sql: string,
    values: D1BindValues = [],
  ): Promise<T | null> {
    const statement = this.prepare(sql, values);

    try {
      return await statement.first<T>();
    } catch (cause) {
      throw new D1RepositoryError("first", cause);
    }
  }

  async all<T>(
    sql: string,
    values: D1BindValues = [],
  ): Promise<T[]> {
    const statement = this.prepare(sql, values);

    try {
      const result = await statement.all<T>();

      if (!result.success) {
        throw new Error("D1 returned an unsuccessful result.");
      }

      return result.results;
    } catch (cause) {
      throw new D1RepositoryError("all", cause);
    }
  }

  async run<T = Record<string, unknown>>(
    sql: string,
    values: D1BindValues = [],
  ): Promise<D1Result<T>> {
    const statement = this.prepare(sql, values);

    try {
      const result = await statement.run<T>();

      if (!result.success) {
        throw new Error("D1 returned an unsuccessful result.");
      }

      return result;
    } catch (cause) {
      throw new D1RepositoryError("run", cause);
    }
  }

  async batch(
    operations: readonly D1BatchOperation[],
  ): Promise<D1Result[]> {
    if (operations.length === 0) {
      throw new TypeError("At least one D1 batch operation is required.");
    }

    const statements = operations.map(({ sql, values = [] }) =>
      this.prepare(sql, values),
    );

    try {
      const results = await this.binding.batch(statements);

      if (results.some((result) => !result.success)) {
        throw new Error("D1 returned an unsuccessful batch result.");
      }

      return results;
    } catch (cause) {
      throw new D1RepositoryError("batch", cause);
    }
  }

  private prepare(
    sql: string,
    values: D1BindValues,
  ): D1PreparedStatement {
    if (typeof sql !== "string" || sql.trim().length === 0) {
      throw new TypeError("A non-empty SQL statement is required.");
    }

    if (!Array.isArray(values)) {
      throw new TypeError(
        "D1 query parameters must be supported bind values.",
      );
    }

    for (const value of values) {
      if (!isD1BindValue(value)) {
        throw new TypeError(
          "D1 query parameters must be supported bind values.",
        );
      }
    }

    // Keep SQL static; pass untrusted values only through bind parameters.
    const statement = this.binding.prepare(sql);

    return values.length === 0
      ? statement
      : statement.bind(...values);
  }
}

function isD1BindValue(value: unknown): value is D1BindValue {
  return (
    value === null ||
    typeof value === "string" ||
    (typeof value === "number" && Number.isFinite(value)) ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  );
}