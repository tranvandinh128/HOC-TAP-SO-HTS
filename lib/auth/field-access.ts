import "server-only";

import { headers } from "next/headers";

import { getAuthenticatedUser } from "@/lib/auth/service";
import { readSessionCookie } from "@/lib/auth/security";
import { getDB } from "@/lib/db";

export type MilitaryFieldAccessStatus =
  | "granted"
  | "sign-in-required"
  | "membership-unverified"
  | "verification-unavailable";

export async function getMilitaryFieldAccessStatus(): Promise<MilitaryFieldAccessStatus> {
  try {
    const requestHeaders = await headers();
    const cookieHeader = requestHeaders.get("cookie");
    const request = new Request("https://hts.invalid/", {
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    if (!readSessionCookie(request)) {
      return "sign-in-required";
    }

    const user = await getAuthenticatedUser(await getDB(), request);
    if (!user) {
      return "sign-in-required";
    }

    // Generic learning-field membership is not proof of approved military membership.
    return "membership-unverified";
  } catch (error) {
    console.error("[field-access] Could not verify restricted-field access.", {
      errorName: error instanceof Error ? error.name : "unknown",
    });
    return "verification-unavailable";
  }
}
