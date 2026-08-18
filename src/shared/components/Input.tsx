import type { InputHTMLAttributes } from "react";

const base =
  "w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={className ? `${base} ${className}` : base} />;
}
