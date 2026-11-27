import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { D1Repository } from "@/lib/d1/repository";

export class D1BindingError extends Error {
  constructor(
    readonly reason: "runtime-context" | "missing-binding",
    readonly causeValue?: unknown
  ) {
    super(
      reason === "missing-binding"
        ? "Cloudflare D1 binding DB is not configured."
        : "Cloudflare Worker runtime context is unavailable."
    );
    this.name = "D1BindingError";
  }
}

export async function getDB(): Promise<D1Repository> {
  const env = await getCloudflareEnv();
  return new D1Repository(env.DB);
}

export async function getCloudflareEnv(): Promise<CloudflareEnv> {
  let binding: D1Database | undefined;
  let env: CloudflareEnv;

  try {
    env = (await getCloudflareContext({ async: true })).env;
    binding = env.DB;
  } catch (cause) {
    throw new D1BindingError("runtime-context", cause);
  }

  if (!binding) {
    throw new D1BindingError("missing-binding");
  }

  return env;
}