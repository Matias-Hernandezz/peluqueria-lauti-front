import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  arrow?: boolean;
}

export function Button({
  children,
  href,
  to,
  variant = "solid",
  className = "",
  type,
  onClick,
  arrow = true,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200";
  const variants = {
    solid: "bg-gold text-ink hover:bg-gold/90",
    outline:
      "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="h-3.5 w-3.5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
