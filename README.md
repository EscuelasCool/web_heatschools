# EscuelasCool — sitio web (trilingüe ES / EN / PT)

Sitio web del proyecto **EscuelasCool** — *Making a Silent Killer Visible* (Wellcome Climate Impacts Award, 331072/Z/25/Z), publicado en **https://escuelascool.org**.

Está hecho con **Jekyll** (GitHub lo compila solo, sin instalar nada) y un **editor visual** (Sveltia CMS) en `/admin/` para que cualquier miembro del equipo actualice contenidos desde el navegador. El sitio abre en **español** (`/`), con **inglés** en `/en/` y **portugués** en `/pt/`, y un selector ES · EN · PT en la barra superior.

---

## Qué contiene esta carpeta

| Elemento | Para qué sirve |
|---|---|
| `index.md`, `en/index.md`, `pt/index.md` | Portada de cada idioma. Todo el texto (título, "por qué importa", cifras, líneas de investigación, contacto) está en la cabecera del archivo y se edita desde el CMS → **Portada**. |
| `_data/project.yml` | Datos comunes a los tres idiomas: investigadora principal, correo, código Wellcome e **instituciones socias**. CMS → **Datos del proyecto**. |
| `_data/i18n.yml` | Textos fijos de la interfaz (menú, botones, pie de página) en los tres idiomas. |
| `_team/` | Fichas del equipo (campo `lang`: es/en/pt). CMS → **Equipo**. La página muestra "Página en construcción" hasta que en CMS → **Datos del proyecto** se active **Mostrar página de Equipo** (`show_team: true` en `_data/project.yml`). |
| `_news_es/`, `_news_en/`, `_news_pt/` | Noticias por idioma. CMS → **Noticias**. |
| `_publications/` | Publicaciones (lista común a los tres idiomas). CMS → **Publicaciones**. Mientras esté vacía se muestra "Página en construcción". |
| `equipo.html`, `publicaciones.html`, `noticias.html` y sus equivalentes en `en/` y `pt/` | Páginas internas. Solo contienen el título y la frase de introducción. |
| `_layouts/`, `_includes/`, `assets/css/`, `assets/js/` | Plantillas, estilos y el menú móvil. **No hace falta tocarlos.** |
| `assets/img/` | Logo EscuelasCool, lápices de la barra superior, logo de Wellcome y favicon. |
| `assets/uploads/` | Fotos e imágenes subidas desde el CMS. |
| `admin/` | El editor visual (Sveltia CMS). |
| `_config.yml`, `CNAME` | Configuración general y dominio. |

> Ya **no** existe un `index.html` suelto en la raíz: la portada se genera desde `index.md` con el mismo diseño y colores de marca. Si alguien vuelve a subir un `index.html` a la raíz, reemplazará la portada trilingüe.

### Identidad visual

- Colores: azul marino `#023155`, azul `#0653A5`, cian `#05B5DC`, naranja `#F86601`, rojo `#B40B0E`, crema `#FAF7F2`, gris `#5B6770`.
- Tipografías: **Nunito** (títulos) y **Source Sans 3** (texto).
- La franja superior reproduce los 14 lápices del logo, del frío al calor.

---

## Estado de la puesta en marcha

| Paso | Estado |
|---|---|
| 1. Repositorio `yasna-palmeiro/heatschools` en GitHub | ✅ |
| 2. GitHub Pages activado (rama `main`, carpeta raíz) | ✅ |
| 3–5. Dominio `escuelascool.org` conectado (`CNAME`, `url` en `_config.yml`) | ✅ |
| 6. "Portero" de autenticación del CMS (Cloudflare Worker) | Pendiente |
| 7. Poner la URL del Worker en `admin/config.yml` → `base_url` | Pendiente |

### Paso 6 — Crear el "portero" de autenticación del editor (una sola vez)

**6a. OAuth App en GitHub:** <https://github.com/settings/developers> → **OAuth Apps → New OAuth App**.

- **Application name:** `EscuelasCool CMS`
- **Homepage URL:** `https://escuelascool.org`
- **Authorization callback URL:** `https://TU-WORKER.workers.dev/callback` (provisional; se corrige en 6b).

Pulsa **Register application**, anota el **Client ID** y genera un **Client secret** (guárdalo: no se vuelve a mostrar).

**6b. Worker en Cloudflare (gratis):** crea una cuenta en <https://dash.cloudflare.com>, abre <https://github.com/sveltia/sveltia-cms-auth> y usa su botón **Deploy to Cloudflare Workers**. Cuando pida variables de entorno, pega el Client ID y el Client secret. Cloudflare te dará una URL tipo `https://sveltia-cms-auth.TU-SUBDOMINIO.workers.dev`. Vuelve a la OAuth App y corrige el callback a esa URL + `/callback`.

### Paso 7 — Conectar el editor

En `admin/config.yml` reemplaza solo la línea `base_url` por la URL de tu Worker (el `repo` ya está configurado). Guarda con **Commit changes** y entra en `https://escuelascool.org/admin/` → **Iniciar sesión con GitHub**.

---

## Uso diario — cómo edita el equipo

1. Entra en `https://escuelascool.org/admin/` e inicia sesión con GitHub.
2. Elige la sección: **Portada**, **Datos del proyecto**, **Equipo**, **Publicaciones** o **Noticias** (cada una separada por idioma cuando corresponde).
3. **New** para crear, rellena los campos y **Publish**. El sitio se actualiza solo en 1–2 minutos.
4. Para que algo aparezca en los tres idiomas, créalo en las tres listas (p. ej. *Noticias · Español*, *News · English*, *Notícias · Português*).

En el título principal de la portada, la parte entre asteriscos (`*amenaza silenciosa*`) aparece en naranja y cursiva.

### Dar acceso a colaboradores

Cada persona necesita una cuenta de GitHub. Repositorio → **Settings → Collaborators → Add people** → rol **Write**. Con eso podrá entrar a `/admin/`. Para revocar, quítala de esa lista.

---

## Repositorio privado

El **código** del repositorio puede ser privado, pero el **sitio publicado** en escuelascool.org seguirá siendo público (que es lo que se quiere). La limitación es de plan: con la cuenta gratuita de GitHub, GitHub Pages solo funciona en repositorios públicos; para publicar desde un repositorio privado hace falta GitHub Pro, Team o Enterprise.

> ⚠️ **No cambies el repositorio a privado con la cuenta gratuita**: el sitio dejaría de publicarse. Primero consigue el plan, después cambia la visibilidad.

Opciones:

1. **GitHub Education (gratis, recomendado si calificas):** el personal docente o investigador de una institución acreditada puede solicitar **GitHub Team gratuito** en <https://education.github.com>. GitHub Team funciona con una *organización*, así que: (a) crea una organización (p. ej. `escuelascool`), (b) transfiere el repositorio (**Settings → General → Transfer ownership**), (c) actualiza `repo:` en `admin/config.yml` a `escuelascool/heatschools`, y (d) revisa en **Settings → Pages** que el dominio siga configurado.
2. **GitHub Pro en tu cuenta personal (de pago):** <https://github.com/settings/billing>. No hay que mover nada.
3. **Cloudflare Pages (gratis):** conecta el repositorio privado a Cloudflare Pages y publica desde allí (comando de compilación `jekyll build`, carpeta `_site`). Requiere mover el dominio de GitHub Pages a Cloudflare, así que tiene más pasos.

Con cualquiera de las opciones, una vez activo el plan: **Settings → General → Danger Zone → Change repository visibility → Make private**. El CMS sigue funcionando con repositorios privados; los colaboradores deben estar invitados al repositorio.

---

## Próximo paso previsto: panel de políticas (WP1)

Se añadirá una página (p. ej. `/politicas/`) que lea la base de políticas exportada desde R (CSV) y muestre una tabla filtrable (país, tipo de política, sector, año) con gráficos o mapa. Se montará cuando la estructura de datos de WP1 esté definida.

---

## Solución de problemas

- **404 o el sitio no aparece:** revisa **Settings → Pages** (rama `main`, carpeta raíz). Espera 1–2 min tras cada cambio.
- **Se ve sin estilos:** revisa que `_config.yml` tenga `url: "https://escuelascool.org"` y `baseurl: ""`.
- **`/admin/` no deja iniciar sesión:** revisa los pasos 6–7 (Client ID/secret, callback con `/callback`, `base_url`).
- **Falta un contenido en un idioma:** créalo también en la lista de ese idioma.

## Coste anual estimado

| Concepto | Coste |
|---|---|
| Hosting (GitHub Pages, repositorio público) | Gratis |
| Editor visual + autenticación (Cloudflare Workers) | Gratis |
| Dominio `.org` | ~10–15 € / año |
| Repositorio privado | Gratis con GitHub Education; de pago con GitHub Pro |
