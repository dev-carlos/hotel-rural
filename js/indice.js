import { enviaLogin } from "./modulos/login.js";
import { dameEstancias } from "./modulos/estancias.js";
import { generaAlta } from "./modulos/signup.js";
import { misReservas } from "./modulos/reservas.js";

// Para la página de inicio
let loginForm = document.querySelector("#login-form");
// Página signup. Alta de usuario
let altaUsuario = document.querySelector("#signup-form");

// Para detectar que estamos en la página de "pisos"
let pagina = window.location;

////////////////////////
// CABECERAS DE FETCH //
////////////////////////
//   method: "POST",
//   mode: "cors",
//   cache: "no-cache",
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   redirect: "follow",
//   referrer: "no-referrer",
//   //body: JSON.stringify(data),


//////////////////////
//      CODIGO      //
//////////////////////


// Cargamos la barra de menú que es comun a todas las páginas.
const cargaMenu = () => {
  
  fetch("menu.html")
    .then((response) => response.text())
    .then((codigo) => {
      document.querySelector("#menu").innerHTML = codigo;
    });
};
const cargaExtraMenuHome = () =>{

  fetch("index_navbar.html")
    .then((response) => response.text())
    .then((codigo) => {
      document.querySelector("#index_navbar").innerHTML = codigo;
    });
}
//FIJAROS EN VUESTRO PATH, MI CARPETA SE LLAMA hotel-rural ADAPTAR AL VUESTRO
if(pagina.pathname != "/hotel-rural" && pagina.pathname != "/hotel-rural/" && pagina.pathname != "/hotel-rural/index.html")
  cargaMenu();

// Botón Login de página principal
if (loginForm !== null) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("login");
    let dato = {};
    dato.email = document.querySelector("#email-login").value;
    dato.password = document.querySelector("#password-login").value;
    enviaLogin(dato);
  });
}

// Página home, carga los datos de la .
if (pagina.pathname == "/hotel-rural/home.html") {
  cargaExtraMenuHome();
}

// Página sobre nosotros, carga los datos de la .
if (pagina.pathname == "/nosotros.html") {
  
}

// Página contacto, carga los datos de la .
if (pagina.pathname == "/contacto.html") {
  
}

// Página estancias, carga los datos de la BD.
if (pagina.pathname == "/estancias.html") {
  dameEstancias();
}

// Página actividades, carga los datos de la BD.
if (pagina.pathname == "/actividades.html") {
  dameActividades();
}

// Página reservas, carga los datos de la BD.
if (pagina.pathname == "/reservas.html") {
  misReservas();
}

// Alta usuario página signup
if (altaUsuario !== null) {
  altaUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    let dato = {};
    dato.nombre = document.querySelector("#nombre").value;
    dato.password = window.btoa(document.querySelector("#password-signup").value);
    dato.email = document.querySelector("#email-signup").value;
    generaAlta(dato);
  });
}

if ($('#tabs_swipe').length) {
      $('#tabs_swipe').tabs({ 'swipeable': true });
}
