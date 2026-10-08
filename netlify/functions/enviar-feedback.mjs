// Protegido por código: el supervisor (o RR. HH.) deja feedback a un operario.
import { feedback, json, rolDe, idValido, txt, esperar, leerJson } from "../lib/util.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  const b = await leerJson(req);
  if (!rolDe(b && b.code)) { await esperar(700); return json({ error: "Código incorrecto" }, 401); }
  if (!idValido(b.id) || !b.fb) return json({ error: "Datos inválidos" }, 400);
  await feedback().setJSON(b.id, {
    bien: txt(b.fb.bien, 500), reforzar: txt(b.fb.reforzar, 500),
    objetivo: txt(b.fb.objetivo, 500), ts: Date.now(),
  });
  return json({ ok: true });
};
