// Público: el operario lee SOLO el feedback de su propio id.
import { feedback, json, idValido } from "../lib/util.mjs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id");
  if (!idValido(id)) return json({ error: "Datos inválidos" }, 400);
  const fb = await feedback().get(id, { type: "json" });
  return json({ fb: fb || null });
};
