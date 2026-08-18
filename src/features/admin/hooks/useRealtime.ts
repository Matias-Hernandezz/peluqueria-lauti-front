import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Conecta al canal WebSocket del backend y, ante cualquier evento de negocio,
 * invalida las queries del admin para que se refresquen solas.
 * Incluye reconexión automática con backoff simple.
 */
export function useRealtime(enabled: boolean) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    let ws: WebSocket | null = null;
    let retry: number | undefined;
    let closed = false;

    const connect = () => {
      if (closed) return;
      const proto = location.protocol === "https:" ? "wss" : "ws";
      ws = new WebSocket(`${proto}://${location.host}/api/v1/ws`);

      ws.onmessage = () => {
        // Evento de negocio (turno creado, etc.) → refrescar la data del panel.
        qc.invalidateQueries({ queryKey: ["admin"] });
      };
      ws.onerror = () => {
        ws?.close();
      };
      ws.onclose = () => {
        if (!closed) retry = window.setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      closed = true;
      window.clearTimeout(retry);
      ws?.close();
    };
  }, [enabled, qc]);
}
