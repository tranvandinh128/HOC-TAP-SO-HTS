
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { D1BindingError } from "@/lib/db";
import { D1RepositoryError } from "@/lib/d1/repository";

export const dynamic = "force-dynamic";

const responseHeaders = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    const db = await getDB();
    const result = await db.first<{ ok: number }>("SELECT 1 AS ok");

    if (result?.ok !== 1) {
      console.error("[api/health/db] D1 returned an unexpected health result.");
      return NextResponse.json(
        {
          success: false,
          message: "Cloudflare D1 health check returned an unexpected result.",
        },
        { status: 503, headers: responseHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "D1 binding responded to a read-only query in this runtime.",
      },
      { headers: responseHeaders }
    );
  } catch (error) {
    const failureType =
      error instanceof D1BindingError
        ? error.reason
        : error instanceof D1RepositoryError
          ? error.operation
          : "unexpected";

    console.error("[api/health/db] D1 health check failed.", { failureType });
    return NextResponse.json(
      {
        success: false,
        message: "Cloudflare D1 is unavailable in this runtime.",
      },
      { status: 503, headers: responseHeaders }
    );
  }
}
