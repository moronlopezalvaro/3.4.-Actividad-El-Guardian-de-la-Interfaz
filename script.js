/**
 * @file El Guardián de la Interfaz.
 * Personaliza el aspecto de la página y lo recuerda con cookies.
 */
const contenedor = document.getElementById("contenedor-bienvenida");
const inputNombre = document.getElementById("nombre");
const inputColor = document.getElementById("color");
const selectTema = document.getElementById("tema");
const btnGuardar = document.getElementById("btnGuardar");
const btnRestablecer = document.getElementById("btnRestablecer");

/**
 * Crea o actualiza una cookie.
 * Si se indican días, caduca en esa fecha (calculada con Date).
 * Si no, es una cookie de sesión (sin expires).
 * @param {string} nombre - Nombre de la cookie.
 * @param {string} valor - Valor que se guarda.
 * @param {number} [dias] - Días hasta que caduque.
 */
function setCookie(nombre, valor, dias) {
    let cookie = nombre + "=" + encodeURIComponent(valor) + "; path=/";

    if (dias) {
        const fecha = new Date();
        fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
        cookie += "; expires=" + fecha.toUTCString();
    }

    document.cookie = cookie;
}

/**
 * Lee el valor de una cookie por su nombre.
 * @param {string} nombre - Nombre de la cookie.
 * @returns {string|null} El valor, o null si no existe.
 */
function getCookie(nombre) {
    const pares = document.cookie.split("; ");
    for (let par of pares) {
        const [clave, valor] = par.split("=");
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

/**
 * Borra una cookie poniendo su fecha de caducidad en el pasado.
 * @param {string} nombre - Nombre de la cookie.
 */
function borrarCookie(nombre) {
    document.cookie = nombre + "=; expires=Mon, 22 Oct 2007 00:00:00 UTC; path=/";
}

/**
 * Crea el bloque de bienvenida (H2 + párrafo) y lo mete en el contenedor.
 * Si ya existe, no lo vuelve a crear.
 * @param {string} nombre - Nombre del usuario.
 */
function mostrarBienvenida(nombre) {
    if (document.getElementById("bloque-bienvenida")) {
        return;
    }

    const bloque = document.createElement("div");
    bloque.id = "bloque-bienvenida";

    const titulo = document.createElement("h2");
    titulo.textContent = "¡Hola de nuevo, " + nombre + "!";

    const parrafo = document.createElement("p");
    parrafo.textContent = "Hemos recuperado tus preferencias guardadas.";

    bloque.appendChild(titulo);
    bloque.appendChild(parrafo);
    contenedor.appendChild(bloque);
}

/**
 * Aplica el tema poniendo o quitando clases del body.
 * @param {string} tema - "claro" u "oscuro".
 */
function aplicarTema(tema) {
    document.body.classList.remove("tema-claro", "tema-oscuro");
    document.body.classList.add("tema-" + tema);
}

inputColor.addEventListener("input", () => {
    document.body.style.backgroundColor = inputColor.value;
});

selectTema.addEventListener("change", () => {
    aplicarTema(selectTema.value);
});

/**
 * Guarda nombre y color (7 días) y tema (sesión) en tres cookies.
 */
function guardarPreferencias() {
    setCookie("nombre", inputNombre.value, 7);
    setCookie("color", inputColor.value, 7);
    setCookie("tema", selectTema.value);

    if (inputNombre.value !== "") {
        mostrarBienvenida(inputNombre.value);
    }
}

/**
 * Lee las cookies al cargar y restaura el aspecto y el formulario.
 */
function cargarPreferencias() {
    const nombre = getCookie("nombre");
    const color = getCookie("color");
    const tema = getCookie("tema");

    if (color) {
        document.body.style.backgroundColor = color;
        inputColor.value = color;
    }

    if (tema) {
        aplicarTema(tema);
        selectTema.value = tema;
    }

    if (nombre) {
        inputNombre.value = nombre;
        mostrarBienvenida(nombre);
    }
}

btnGuardar.addEventListener("click", guardarPreferencias);

/**
 * Borra las cookies, quita los estilos y elimina el bloque de bienvenida.
 */
function restablecerInterfaz() {
    borrarCookie("nombre");
    borrarCookie("color");
    borrarCookie("tema");

    document.body.style.backgroundColor = "";
    document.body.classList.remove("tema-claro", "tema-oscuro");

    const bloque = document.getElementById("bloque-bienvenida");
    if (bloque) {
        bloque.remove();
    }

    inputNombre.value = "";
    inputColor.value = "#ffffff";
    selectTema.value = "claro";
}

btnRestablecer.addEventListener("click", restablecerInterfaz);

cargarPreferencias();