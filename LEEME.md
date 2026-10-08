# ADAPTAKIT Punto Rojo — guía para subirlo a Netlify

## Qué contiene
- `public/index.html` → página de **operarios** (no pide cuenta ni código).
- `public/panel.html` → página de **supervisores y RR. HH.** (pide código).
- `netlify/functions/` → 4 funciones (el "servidor"): guardar-avance, leer-feedback, panel, enviar-feedback.
- `netlify.toml` y `package.json` → configuración. No hay que tocarlos.

## Pasos
1. **Sube la carpeta a GitHub.** Crea un repositorio nuevo en github.com, usa "uploading an existing file" y arrastra TODO el contenido de esta carpeta (que se vean las carpetas `public` y `netlify`).
2. **Conéctalo a Netlify.** Add new project → Import an existing project → GitHub → elige el repositorio. Netlify lee `netlify.toml` y no necesitas cambiar nada. Pulsa Deploy.
   (Si prefieres usar el proyecto que ya creaste, enlázalo al repositorio desde su configuración de despliegue; si no encuentras la opción, crea uno nuevo.)
3. **Crea los códigos.** En el proyecto: Project configuration → Variables ambientales (Environment variables) → agrega:
   - `SUP_CODE` = el código para supervisores
   - `RRHH_CODE` = el código para ustedes (RR. HH.)
4. **Vuelve a desplegar** para que las funciones lean los códigos: Deploys → Trigger deploy → Deploy project.
5. **Comparte los enlaces:**
   - Operarios: `https://TU-SITIO.netlify.app/`
   - Panel: `https://TU-SITIO.netlify.app/panel.html`

## Cómo se ve cada rol
- Código de supervisor → ve **Mi cuadrilla**.
- Código de RR. HH. → ve **Mi cuadrilla** y **¿Está funcionando ADAPTAKIT?**.

## Prueba rápida
1. Abre `/` en el celular, escribe un nombre y completa un capítulo.
2. Abre `/panel.html`, ingresa un código y verifica que aparezca ese nombre (se actualiza cada 20 s).
3. Desde el panel, deja feedback a ese operario; en su celular aparece en su ruta (se revisa cada 30 s).

## Seguridad (límites)
- Los códigos viven solo en Netlify y las funciones los validan; no están en el HTML.
- Son códigos compartidos, no cuentas individuales. Cámbialos en Netlify si se filtran.
- Cada celular se identifica con un id anónimo guardado en el navegador. Si el operario borra los datos del navegador, aparecerá como un operario nuevo.
- No hay límite de intentos de código más allá de una pequeña pausa en cada error.
