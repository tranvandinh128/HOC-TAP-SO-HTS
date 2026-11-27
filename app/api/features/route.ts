
import { NextResponse } from "next/server";

import { featureDefinitions } from "@/lib/features";

export async function GET() {
  return NextResponse.json(
    {
      features: Object.values(featureDefinitions).map(
        ({ key, label, status }) => ({
          key,
          label,
          status,
        }),
      ),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
