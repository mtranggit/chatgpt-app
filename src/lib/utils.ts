import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMyDefaultEmail(userName: string | null) {
	// ensure it's me only 🥳
	return userName === "Michael Trang" ? "michael.trang@hotmail.com" : "";
}