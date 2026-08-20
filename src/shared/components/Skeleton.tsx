/**
 * Placeholder de carga (skeleton) con pulso. Evita saltos de layout y da
 * feedback visual mientras un fetch está en curso.
 */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div aria-hidden="true" className={`animate-pulse rounded bg-white/10 ${className}`} />
  );
}
