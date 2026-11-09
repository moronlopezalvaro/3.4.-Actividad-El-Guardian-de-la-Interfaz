# 3.4. Actividad: El Guardián de la Interfaz

Práctica centrada en la gestión de persistencia en el navegador mediante **cookies en JavaScript**, manipulación dinámica del **DOM** y control de eventos en tiempo real.

---

## 📋 Descripción del Proyecto

La aplicación permite al usuario personalizar el aspecto visual de la interfaz según sus preferencias (nombre de usuario, color de fondo y tema claro u oscuro). Dichas preferencias se almacenan en cookies del navegador con distintas políticas de persistencia (persistentes y de sesión) para que, al recargar la página o volver a visitarla, el estado de la interfaz se restaure automáticamente. Además, ofrece la opción de restablecer por completo la interfaz y eliminar las cookies almacenadas.

---

## 🚀 Funcionalidades

- **Personalización en tiempo real:**
  - Selección interactiva del color de fondo (`<input type="color">`) que actualiza el estilo del `body` al instante mediante el evento `input`.
  - Conmutador de tema visual (`<select>`) para alternar dinámicamente entre modo claro y modo oscuro (`.tema-claro` y `.tema-oscuro`) mediante el evento `change`.
- **Persistencia mediante Cookies:**
  - **Nombre de usuario:** cookie persistente con caducidad fijada a 7 días.
  - **Color de fondo:** cookie persistente con caducidad fijada a 7 días.
  - **Tema visual:** cookie de sesión (sin parámetro `expires`), válida durante la sesión actual del navegador.
- **Mensaje de bienvenida dinámico:**
  - Al guardar las preferencias o al recargar la página existiendo una cookie de nombre previa, se genera e inserta dinámicamente en el DOM un bloque de saludo (`<h2>` y `<p>`) dando la bienvenida al usuario.
- **Restablecimiento de la interfaz:**
  - Botón que elimina todas las cookies fijando su caducidad en el pasado, retira las clases de tema y estilos directos del `body`, elimina del DOM el bloque de bienvenida y resetea los campos del formulario a sus valores iniciales.

---

## 📁 Estructura del Proyecto

```text
3.4.-Actividad-El-Guardian-de-la-Interfaz/
├── css/
│   └── style.css            # Estilos del formulario y temas claro/oscuro
├── documentacion/           # Documentación HTML generada con JSDoc
├── .gitignore
├── _config.yml              # Configuración de Jekyll para excluir la documentación en GitHub Pages
├── index.html               # Estructura del formulario y contenedor de bienvenida
├── README.md                # Memoria y descripción de la actividad
└── script.js                # Lógica de cookies, manipulación del DOM y eventos
```

---

## 🛠️ Funciones Implementadas (`script.js`)

| Función | Descripción |
| :--- | :--- |
| `setCookie(nombre, valor, dias)` | Crea o actualiza una cookie codificando su valor (`encodeURIComponent`). Si se pasan días, calcula la fecha UTC de expiración; si no, actúa como cookie de sesión. |
| `getCookie(nombre)` | Parsea `document.cookie` para recuperar y decodificar (`decodeURIComponent`) el valor de una cookie dada su clave. |
| `borrarCookie(nombre)` | Borra una cookie estableciendo su fecha de expiración en una fecha pasada (`expires=Mon, 22 Oct 2007 00:00:00 UTC`). |
| `mostrarBienvenida(nombre)` | Crea e inyecta dinámicamente en `#contenedor-bienvenida` el bloque de bienvenida (`#bloque-bienvenida`) evitando duplicados. |
| `aplicarTema(tema)` | Modifica las clases del `body` para aplicar el tema visual seleccionado (`tema-claro` o `tema-oscuro`). |
| `guardarPreferencias()` | Lee los campos del formulario, crea las tres cookies correspondientes y muestra la bienvenida. |
| `cargarPreferencias()` | Lee las cookies al iniciar y restaura el formulario, estilos de fondo, tema y mensaje de bienvenida. |
| `restablecerInterfaz()` | Elimina las tres cookies, resetea estilos y campos del formulario, y remueve el bloque de bienvenida del DOM. |

---

## 📖 Documentación JSDoc

El código JavaScript está completamente documentado siguiendo el estándar **JSDoc** con etiquetas `@file`, `@param`, `@returns`, etc.
