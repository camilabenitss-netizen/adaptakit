// Público: el operario envía su avance. Se guarda bajo su id anónimo.
import { avance, json, idValido, txt, leerJson, limpiarIntentos } from "../lib/util.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  const b = await leerJson(req);
  if (!b || !idValido(b.id)) return json({ error: "Datos inválidos" }, 400);
  const nombre = txt(b.nombre, 30).trim();
  if (!nombre) return json({ error: "Falta el nombre" }, 400);
  await avance().setJSON(b.id, { nombre, attempts: limpiarIntentos(b.attempts), ts: Date.now() });
  return json({ ok: true });
};
