import { clsx, type ClassValue } from 'clsx';

/** Merge class names with conditional logic. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
