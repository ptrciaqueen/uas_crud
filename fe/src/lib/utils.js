import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAccessTokenInfo() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return;
  return accessToken;
}
