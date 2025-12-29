import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function checkQuantityStatus(quantity) {
  if (quantity <= 0) return "Out of Stock";
  else if (quantity <= 10) return "Low Stock";
  else if (quantity > 10) return "In Stock";
  else return "Unrecognized";
}

export const formatRelativeTime = (dateString) => {
  if (!dateString) return "Never";

  const date = new Date(dateString);
  const now = new Date();
  const diffDates = now - date;
  const diffSec = Math.floor(diffDates / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
};
