import type { TextareaHTMLAttributes } from "react";

const base =
  "w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={className ? `${base} ${className}` : base} />
  );
}
