// Protegido por código: devuelve el avance de todos los operarios.
import { avance, feedback, json, rolDe, esperar, leerJson } from "../lib/util.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  if (!process.env.SUP_CODE && !process.env.RRHH_CODE)
    return json({ error: "Faltan las variables SUP_CODE y RRHH_CODE en Netlify" }, 500);
  const b = await leerJson(req);
  const rol = rolDe(b && b.code);
  if (!rol) { await esperar(700); return json({ error: "Código incorrecto" }, 401); }

  const a = avance(), f = feedback();
  const { blobs } = await a.list();
  const operarios = (await Promise.all(blobs.map(async ({ key }) => {
    const d = await a.get(key, { type: "json" });
    return d ? { id: key, nombre: d.nombre, attempts: d.attempts || [] } : null;
  }))).filter(Boolean);
  const { blobs: fbs } = await f.list();
  const fb = {};
  await Promise.all(fbs.map(async ({ key }) => { const d = await f.get(key, { type: "json" }); if (d) fb[key] = d; }));
  return json({ rol, operarios, feedback: fb });
};
