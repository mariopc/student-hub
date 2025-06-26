import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateInSpanish(dateString: string, monthOption?: "numeric" | "2-digit" | "long" | "short" | "narrow") {
  const [year, month, day] = dateString.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: monthOption ?? 'long',
    year: 'numeric'
  }).format(localDate);
}

export function monthInSpanish(dateString: string) {
  const [year, month] = dateString.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(1));
  return new Intl.DateTimeFormat('es-ES', {    
    month: 'short',
    year: 'numeric'
  }).format(localDate);
}

export function onlyMonthInSpanish(dateString: string) {
  const [year, month] = dateString.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(1));
  return new Intl.DateTimeFormat('es-ES', {    
    month: 'short',
  }).format(localDate);
}