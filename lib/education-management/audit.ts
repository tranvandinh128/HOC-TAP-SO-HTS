import type { AuditEvent } from "./types";

export function createAuditEvent(input: Omit<AuditEvent, "id"> & { id?: string }): AuditEvent {
  if (!input.actorUserId || !input.action || !input.entityType || !input.entityId) {
    throw new Error("Audit event thiếu thông tin người thực hiện hoặc đối tượng.");
  }
  return {
    ...input,
    id: input.id ?? `audit-${Date.parse(input.occurredAt)}-${input.actorUserId}`,
    metadata: { ...input.metadata },
  };
}
