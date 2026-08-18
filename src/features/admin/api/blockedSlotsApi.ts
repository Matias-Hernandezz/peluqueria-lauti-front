import { api, authHeaders } from "../../../shared/lib/apiClient";
import type { BlockedSlot, BlockedSlotCreate } from "../types";

export async function fetchBlockedSlots(
  token: string | null,
  start_at: string,
  end_at: string,
): Promise<BlockedSlot[]> {
  return api<BlockedSlot[]>(
    `/admin/blocked-slots?start_at=${encodeURIComponent(start_at)}&end_at=${encodeURIComponent(end_at)}`,
    { headers: authHeaders(token) },
  );
}

export async function createBlockedSlot(
  token: string | null,
  payload: BlockedSlotCreate,
): Promise<BlockedSlot> {
  return api<BlockedSlot>("/admin/blocked-slots", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function deleteBlockedSlot(
  token: string | null,
  id: number,
): Promise<void> {
  return api<void>(`/admin/blocked-slots/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}
