import { getStore } from "@netlify/blobs";

export const avance = () => getStore({ name: "avance", consistency: "strong" });
export const feedback = () => getStore({ name: "feedback", consistency: "strong" });

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

export const idValido = (id) => typeof id === "string" && /^[A-Za-z0-9-]{8,64}$/.test(id);
export const txt = (s, n) => String(s ?? "").slice(0, n);

function igual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

// Devuelve "rrhh", "supervisor" o null según el código recibido.
export function rolDe(code) {
  const sup = process.env.SUP_CODE, rrhh = process.env.RRHH_CODE;
  if (typeof code !== "string" || !code) return null;
  if (rrhh && igual(code, rrhh)) return "rrhh";
  if (sup && igual(code, sup)) return "supervisor";
  return null;
}

export const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export async function leerJson(req) {
  try { return await req.json(); } catch { return null; }
}

// Deja solo los campos que la app usa, con límites de tamaño.
export function limpiarIntentos(lista) {
  if (!Array.isArray(lista)) return [];
  return lista.slice(-200).map((a) => ({
    nombre: txt(a.nombre, 30),
    mod: txt(a.mod, 30),
    aciertos: Number(a.aciertos) || 0,
    total: Number(a.total) || 0,
    color: ["v", "a", "r"].includes(a.color) ? a.color : "r",
    falladas: Array.isArray(a.falladas) ? a.falladas.slice(0, 20).map((n) => Number(n) || 0) : [],
    practicaErrores: Number(a.practicaErrores) || 0,
    satisfaccion: a.satisfaccion == null ? null : Math.min(5, Math.max(1, Number(a.satisfaccion) || 1)),
    ts: Number(a.ts) || Date.now(),
  }));
}
