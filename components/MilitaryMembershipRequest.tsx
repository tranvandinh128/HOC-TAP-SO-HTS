"use client";

import { useState } from "react";

export default function MilitaryMembershipRequest() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitRequest() {
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/military/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const payload: unknown = await response.json();
      const responseMessage =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : null;

      if (!response.ok) {
        setMessage(
          responseMessage ??
            "Không gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ quản trị viên.",
        );
        return;
      }

      setMessage("Yêu cầu membership đã được gửi và đang chờ xét duyệt.");
    } catch {
      setMessage(
        "Không thể kết nối để gửi yêu cầu. Vui lòng thử lại sau.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={submitRequest}
        disabled={isSubmitting}
        className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu xác minh membership"}
      </button>
      {message ? (
        <p className="mt-3 text-sm" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </div>
  );
}
