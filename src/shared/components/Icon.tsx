/**
 * Íconos SVG minimalistas (stroke = currentColor, heredan el color).
 */

import type { ReactNode } from "react";

type IconName =
  | "arrow"
  | "phone"
  | "mapPin"
  | "clock"
  | "star"
  | "check"
  | "scissors"
  | "walkin"
  | "location"
  | "team";

interface IconProps {
  name: IconName;
  className?: string;
}

const paths: Record<IconName, ReactNode> = {
  arrow: (
    <path
      d="M3.125 8.5H11.875M7.5 4.125L11.875 8.5L7.5 12.875"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  phone: (
    <path
      d="M11.53 13.81a1.5 1.5 0 0 0 1.51-.45l.3-.38c.31-.42.8-.67 1.33-.67h2.5c.92 0 1.66.75 1.66 1.67v2.5c0 .92-.74 1.66-1.66 1.66C8.38 18.33 1.67 11.62 1.67 3.33c0-.92.74-1.66 1.66-1.66h2.5c.92 0 1.67.74 1.67 1.66v2.5c0 .53-.25 1.02-.67 1.34l-.39.29c-.31.24-.41.67-.24 1.03 1.14 2.31 3.01 4.18 5.33 5.32Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  mapPin: (
    <>
      <path
        d="M16.67 8.33c0 4.16-4.62 8.5-6.17 9.83a1.08 1.08 0 0 1-1 0C7.95 16.83 3.33 12.5 3.33 8.33a6.67 6.67 0 1 1 13.34 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.83a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  clock: (
    <>
      <path d="M10 5v5l3.33 1.67" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M1.67 10a8.33 8.33 0 1 0 16.66 0 8.33 8.33 0 0 0-16.66 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  star: (
    <path
      d="M10 1.5l2.47 5 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5Z"
      strokeLinejoin="round"
    />
  ),
  check: (
    <>
      <circle cx="10" cy="10" r="8.5" />
      <path d="M6.5 10l2.33 2.33L13.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="14" r="2.5" />
      <path d="M8 7.5l10 8M8 12.5l10-8" strokeLinecap="round" />
    </>
  ),
  walkin: (
    <>
      <circle cx="10" cy="4" r="2" />
      <path
        d="M4 19l3.5-6.5 2 2L10 19M8.5 11.5L6 9l4.5-2 3.5 3 2 1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  location: (
    <path
      d="M16.67 8.33c0 4.16-4.62 8.5-6.17 9.83a1.08 1.08 0 0 1-1 0C7.95 16.83 3.33 12.5 3.33 8.33a6.67 6.67 0 1 1 13.34 0Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  team: (
    <>
      <circle cx="9" cy="7.5" r="3" />
      <path
        d="M3 18c0-3 2.7-5 6-5s6 2 6 5M15.5 7.5a2.5 2.5 0 1 0 0-5M17 18c0-1.6-.8-3-2-3.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
