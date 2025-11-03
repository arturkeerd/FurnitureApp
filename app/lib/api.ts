const API = process.env.EXPO_PUBLIC_API_URL!;
export const json = (path: string, init?: RequestInit) =>
  fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers||{}) },
    ...init,
  }).then(async r => (r.ok ? r.json() : Promise.reject(await r.json())));