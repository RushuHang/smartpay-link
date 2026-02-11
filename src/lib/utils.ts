import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with support for conditional logic and Tailwind conflict resolution.
 * Example: cn("bg-red-500", true && "p-4", "p-2") -> "bg-red-500 p-4" (p-2 is removed correctly)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}