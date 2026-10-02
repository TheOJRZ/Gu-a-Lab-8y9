const API_URL = "http://localhost:3000/api";

// Elementos del DOM
const seccionLogin = document.getElementById("seccion-login");
const seccionDashboard = document.getElementById("seccion-dashboard");
const formLogin = document.getElementById("formLogin");
const formCrearLinea = document.getElementById("formCrearLinea");
const listaLineas = document.getElementById("lista-lineas");
const spinner = document.getElementById("spinner");
const btnLogout = document.getElementById("btnLogout");

// Tarea 2: Funciones auxiliares para mostrar/ocultar el Spinner
function mostrarCargando() {
  spinner.classList.remove("hidden");
}

function ocultarCargando() {
  spinner.classList.add("hidden");
}

// Control de vistas según la existencia del JWT
function verificarSesion() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    seccionLogin.classList.add("hidden");
    seccionDashboard.classList.remove("hidden");
    cargarLineasInvestigacion();
  } else {
    seccionLogin.classList.remove("hidden");
    seccionDashboard.classList.add("hidden");
  }
}

// -------------------------------------------------------------
// Paso 2: Login y almacenamiento de sesión (JWT)
// -------------------------------------------------------------
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Credenciales incorrectas");
    }

    // Guardar token en localStorage
    localStorage.setItem("jwt_token", data.token);
    formLogin.reset();
    verificarSesion();
  } catch (error) {
    alert(error.message);
  }
});

// -------------------------------------------------------------
// Tarea 4: Cierre de Sesión (Logout)
// -------------------------------------------------------------
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("jwt_token");
  listaLineas.innerHTML = "";
  verificarSesion();
});

// -------------------------------------------------------------
// Tarea 1 y 2: Consumo GET con Spinner y renderizado en DOM
// -------------------------------------------------------------
async function cargarLineasInvestigacion() {
  const token = localStorage.getItem("jwt_token");
  mostrarCargando();
  listaLineas.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/lineas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      alert("Sesión expirada o token inválido");
      localStorage.removeItem("jwt_token");
      verificarSesion();
      return;
    }

    const lineas = await res.json();

    if (lineas.length === 0) {
      listaLineas.innerHTML =
        "<p>No hay líneas de investigación registradas.</p>";
      return;
    }

    lineas.forEach((linea) => agregarLineaAlDOM(linea));
  } catch (error) {
    console.error("Error al cargar líneas:", error);
    listaLineas.innerHTML = "<p>Ocurrió un error al obtener los datos.</p>";
  } finally {
    ocultarCargando(); // El spinner se oculta siempre al finalizar
  }
}

// -------------------------------------------------------------
// Tarea 3: Formulario Asíncrono (Crear Línea mediante POST)
// -------------------------------------------------------------
formCrearLinea.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("jwt_token");
  const nombre = document.getElementById("nuevoNombre").value.trim();
  const codigo = document.getElementById("nuevoCodigo").value.trim();

  try {
    const res = await fetch(`${API_URL}/lineas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, codigo }),
    });

    const data = await res.json();

    if (res.status === 201) {
      // Inserción dinámica directa en el DOM sin recargar la página completa
      agregarLineaAlDOM(data);
      formCrearLinea.reset();
    } else {
      alert(data.error || "No se pudo crear la línea");
    }
  } catch (error) {
    alert("Error al enviar la solicitud al servidor");
  }
});

// -------------------------------------------------------------
// Paso 4: Eliminar Línea mediante DELETE
// -------------------------------------------------------------
async function eliminarLinea(id) {
  const token = localStorage.getItem("jwt_token");
  if (!confirm("¿Desea eliminar esta línea de investigación?")) return;

  try {
    const res = await fetch(`${API_URL}/lineas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      // Remover el nodo HTML directamente del DOM
      const tarjeta = document.getElementById(`linea-${id}`);
      if (tarjeta) tarjeta.remove();
    } else {
      alert("Error al intentar eliminar");
    }
  } catch (error) {
    alert("Error de conexión al eliminar");
  }
}

// Inyectar tarjeta individual en el DOM
function agregarLineaAlDOM(linea) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "item-linea";
  tarjeta.id = `linea-${linea._id}`;

  tarjeta.innerHTML = `
    <div>
      <strong>${linea.nombre}</strong>
      <p style="color: #666; font-size: 0.9em;">Código: ${linea.codigo}</p>
    </div>
    <button class="btn btn-danger" onclick="eliminarLinea('${linea._id}')">Eliminar</button>
  `;

  listaLineas.prepend(tarjeta);
}

// Inicializar la vista al abrir la página
verificarSesion();
