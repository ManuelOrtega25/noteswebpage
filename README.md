# Notes · Web & Landing Page

Sitio web oficial y landing page para la aplicación nativa de Android **Notes**.

Diseñada bajo principios de diseño minimalista editorial (*warm monochrome*, tipografía *Newsreader* + *Plus Jakarta Sans*, sin sobreestimulación visual ni dependencias pesadas).

## 🚀 Despliegue en Vercel
Este repositorio está preparado para desplegarse automáticamente en Vercel como un sitio estático de rendimiento instantáneo (cero pasos de compilación requeridos).

### 📦 Estructura del proyecto:
- `index.html`: Estructura semántica de la landing page con mockup interactivo del dispositivo.
- `styles.css`: Sistema de diseño minimalista, paleta cálida, tarjetas bento y responsive design.
- `app.js`: Lógica de interactividad del mockup (filtrado por carpetas) y confirmación de descarga.
- `diagrama_room.png`: Captura de la arquitectura relacional de Room SQLite.
- `notes-app.apk`: Archivo binario ejecutable para Android (v1.0.0, 12.0 MB).
- `vercel.json`: Encabezados HTTP para servir el APK como archivo binario descargable directo.

## 🛠️ Desarrollo local
Para visualizar la página localmente, simplemente abre `index.html` en tu navegador o levanta un servidor estático:

```bash
# Con Python
python -m http.server 3000

# O con Node / npx
npx serve .
```
