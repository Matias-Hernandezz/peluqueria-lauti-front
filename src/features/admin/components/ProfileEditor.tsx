import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "../hooks/useProfile";
import { updateProfile } from "../api/profileApi";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../../../shared/components/Input";
import { Textarea } from "../../../shared/components/Textarea";
import type { BarberUpdate } from "../types";

interface FormState {
  name: string;
  bio: string;
  photo_url: string;
  location: string;
  social_instagram: string;
  social_facebook: string;
  social_tiktok: string;
}

const EMPTY: FormState = {
  name: "",
  bio: "",
  photo_url: "",
  location: "",
  social_instagram: "",
  social_facebook: "",
  social_tiktok: "",
};

export function ProfileEditor() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const { data: profile, isLoading } = useProfile();
  const [form, setForm] = useState<FormState>(EMPTY);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        bio: profile.bio ?? "",
        photo_url: profile.photo_url ?? "",
        location: profile.location ?? "",
        social_instagram: profile.social_instagram ?? "",
        social_facebook: profile.social_facebook ?? "",
        social_tiktok: profile.social_tiktok ?? "",
      });
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: () => {
      const payload: BarberUpdate = {
        name: form.name,
        bio: form.bio || null,
        photo_url: form.photo_url || null,
        location: form.location || null,
        social_instagram: form.social_instagram || null,
        social_facebook: form.social_facebook || null,
        social_tiktok: form.social_tiktok || null,
      };
      return updateProfile(token, payload);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "profile"] }),
  });

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  if (isLoading) {
    return <p className="text-sm text-white/50">Cargando…</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Perfil</h1>
        <button
          type="button"
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink disabled:opacity-50"
        >
          Guardar
        </button>
      </div>

      {save.isSuccess && (
        <p className="mt-2 text-sm text-green-400">Perfil guardado.</p>
      )}
      {save.isError && (
        <p className="mt-2 text-sm text-red-400">
          {save.error?.message ?? "No se pudo guardar"}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Nombre
          </label>
          <Input value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Bio
          </label>
          <Textarea rows={4} value={form.bio} onChange={set("bio")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Foto (URL)
          </label>
          <Input value={form.photo_url} onChange={set("photo_url")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Ubicación
          </label>
          <Input value={form.location} onChange={set("location")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Instagram
          </label>
          <Input value={form.social_instagram} onChange={set("social_instagram")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Facebook
          </label>
          <Input value={form.social_facebook} onChange={set("social_facebook")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            TikTok
          </label>
          <Input value={form.social_tiktok} onChange={set("social_tiktok")} />
        </div>
      </div>
    </div>
  );
}
