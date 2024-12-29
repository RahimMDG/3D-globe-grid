import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type error = {
  error: string;
};

export function isErrorResponse(response: unknown): response is error {
  return (
    typeof response === "object" &&
    response !== null &&
    "error" in response &&
    typeof response.error === "string"
  );
}