import "server-only";

import { headers } from "next/headers";

import { readSessionCookie } from "@/lib/auth/security";
import { getDB } from "@/lib/db";
import { getMilitaryAccessContext } from "@/lib/military/access";

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

    const access = await getMilitaryAccessContext(await getDB(), request);
    if (!access) {
      return "sign-in-required";
    }

    return access.membershipApproved ? "granted" : "membership-unverified";
  } catch (error) {
    console.error("[field-access] Could not verify restricted-field access.", {
      errorName: error instanceof Error ? error.name : "unknown",
    });
    return "verification-unavailable";
  }
}
