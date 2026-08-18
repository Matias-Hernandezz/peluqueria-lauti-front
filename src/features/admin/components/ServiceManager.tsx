import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminServices } from "../hooks/useAdminServices";
import { createService, updateService } from "../api/servicesApi";
import { useAuth } from "../hooks/useAuth";
import { Modal } from "../../../shared/components/Modal";
import { Input } from "../../../shared/components/Input";
import type { Service, ServiceCreate, ServiceUpdate } from "../types";

interface FormState {
  name: string;
  duration_minutes: string;
  price: string;
}

const EMPTY: FormState = { name: "", duration_minutes: "", price: "" };

export function ServiceManager() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const { data: services = [], isLoading } = useAdminServices();

  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin", "services"] });

  const openCreate = () => {
    setForm(EMPTY);
    setEditing(null);
    setCreating(true);
  };

  const openEdit = (s: Service) => {
    setForm({
      name: s.name,
      duration_minutes: String(s.duration_minutes),
      price: s.price,
    });
    setCreating(false);
    setEditing(s);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
  };

  const create = useMutation({
    mutationFn: (payload: ServiceCreate) => createService(token, payload),
    onSuccess: () => {
      close();
      invalidate();
    },
  });

  const update = useMutation({
    mutationFn: ({
      service,
      payload,
    }: {
      service: Service;
      payload: ServiceUpdate;
    }) => updateService(token, service.id, payload),
    onSuccess: () => {
      close();
      invalidate();
    },
  });

  const toggleActive = useMutation({
    mutationFn: (s: Service) => updateService(token, s.id, { active: !s.active }),
    onSuccess: invalidate,
  });

  const save = () => {
    const payload = {
      name: form.name,
      duration_minutes: Number(form.duration_minutes),
      price: form.price,
    };
    if (creating) {
      create.mutate(payload);
    } else if (editing) {
      update.mutate({ service: editing, payload });
    }
  };

  const formOpen = creating || Boolean(editing);
  const canSave = Boolean(form.name && form.duration_minutes && form.price);
  const busy = create.isPending || update.isPending;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Servicios</h1>
        <button
          type="button"
          onClick={openCreate}
          className="border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-gold/10"
        >
          Nuevo servicio
        </button>
      </div>

      {isLoading ? (
        <p className="mt-4 text-sm text-white/50">Cargando…</p>
      ) : services.length === 0 ? (
        <p className="mt-4 text-sm text-white/50">No hay servicios cargados.</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {services.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between border border-white/10 p-4"
            >
              <div>
                <span className="text-white">{s.name}</span>
                <span className="ml-3 text-sm text-white/50">
                  {s.duration_minutes} min · ${s.price}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs uppercase ${
                    s.active ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {s.active ? "Activo" : "Inactivo"}
                </span>
                <button
                  type="button"
                  onClick={() => openEdit(s)}
                  className="border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-gold/40"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => toggleActive.mutate(s)}
                  className="border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-gold/40"
                >
                  {s.active ? "Desactivar" : "Activar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={formOpen}
        onClose={close}
        title={creating ? "Nuevo servicio" : "Editar servicio"}
      >
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
              Nombre
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
              Duración (minutos)
            </label>
            <Input
              type="number"
              value={form.duration_minutes}
              onChange={(e) =>
                setForm({ ...form, duration_minutes: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
              Precio
            </label>
            <Input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          {(create.isError || update.isError) && (
            <p className="text-sm text-red-400">
              {create.error?.message ??
                update.error?.message ??
                "No se pudo guardar"}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!canSave || busy}
              className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink disabled:opacity-50"
            >
              {creating ? "Crear" : "Guardar"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
