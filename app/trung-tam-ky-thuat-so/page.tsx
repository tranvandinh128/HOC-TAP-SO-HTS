import type { Metadata } from "next";
import DtcDashboard from "@/components/dtc/DtcDashboard";
import "./dtc.css";

export const metadata: Metadata = {
  title: "Trung tâm Kỹ thuật số | HỌC TẬP SỐ",
  description:
    "Không gian định hướng cho giao dịch, ký số và trao đổi tài liệu được bảo mật trong hệ sinh thái HỌC TẬP SỐ.",
};

/**
 * DTC Phase 0/1 UI foundation.
 * This page intentionally exposes no document, key, or cryptographic operation.
 * Server-side identity and entitlement integration must be completed before
 * enabling protected workflows.
 */
export default function DigitalTechnologyCenterPage() {
  return <DtcDashboard />;
}
