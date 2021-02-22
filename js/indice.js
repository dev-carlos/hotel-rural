import { enviaLogin } from "./modulos/login.js";
import { dameEstancias } from "./modulos/estancias.js";
import { dameActividades } from "./modulos/actividades.js";
import { generaAlta } from "./modulos/signup.js";
import { misReservas } from "./modulos/reservas.js";
import { cargaMenu } from "./modulos/cargaMenu.js";
import { cargaFooter } from "./modulos/cargaFooter.js";
import {listarDisponibles} from "./modulos/generarReserva.js";
import { logout } from "./modulos/logout.js";


// Para la página de inicio
let loginForm = document.querySelector("#login-form");
// Página signup. Alta de usuario
let altaUsuario = document.querySelector("#signup-form");

let buscarPorFecha = document.querySelector('#buscarForm');

// Para detectar que estamos en la página 
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



//cargamos el extra menu solo en home
const cargaExtraMenuHome = async () =>{

    await fetch("index_navbar.html")
    .then((response) =>  response.text())
    .then((codigo) => {
      let nav = document.querySelector("#index_navbar");
      if(nav){
        nav.innerHTML = codigo;
      }
    });
}
//FIJAROS EN VUESTRO PATH, MI CARPETA SE LLAMA hotel-rural ADAPTAR AL VUESTRO
if(pagina.pathname != "/"  && pagina.pathname != "/index.html")
  cargaMenu();



// Botón Login de página principal
if (loginForm !== null) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let dato = {};
    dato.email = document.querySelector("#email-login").value;
    dato.password = document.querySelector("#password-login").value;
    console.log(dato);
    enviaLogin(dato);
  });
}

// Página home, carga los datos de la .
if (pagina.pathname == "/home.html") {
  cargaExtraMenuHome();
}

// Página sobre nosotros, carga los datos de la .
if (pagina.pathname == "/nosotros.html") {
  
}

// Página contacto, carga los datos de la .
if (pagina.pathname == "/contacto.html") {
  
}

// Página habitaciones, carga los datos de la BD.
if (pagina.pathname == "/habitaciones.html") {
  dameEstancias('h');
}

// Página cabañas, carga los datos de la BD.
if (pagina.pathname == "/cabanyas.html") {
  dameEstancias('c');
}

// Página actividades, carga los datos de la BD.
if (pagina.pathname == "/actividades.html") {
  dameActividades();
}

// Página reservas, carga los datos de la BD.
if (pagina.pathname == "/reservas.html") {
  misReservas();
  //si recibo una busqueda
  if(buscarPorFecha){
    buscarPorFecha.addEventListener("submit", (e) => {
      e.preventDefault();
      let dato = {};
      dato.fechaInicio = document.querySelector("#fechaInicio").value;
      dato.fechaFin = document.querySelector("#fechaFin").value;
      dato.seleccion = document.querySelector("#seleccionReserva").value;
      if(dato.fechaInicio && dato.fechaFin && dato.seleccion){
        listarDisponibles(dato);
      }
      else{
        M.toast({html: "No has rellenado los campos",classes:"red"});
      }
      
    });
  }

  //datepicker

  var $input = $('.datepicker').datepicker({autoClose:true, format: 'yyyy-mm-dd'});
  $('select').formSelect();

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

cargaFooter();

window.onload = ()=>{
  //añado evento a logout menu
  let btnLogout = document.querySelector('#logout-menu');
  if(btnLogout){
    btnLogout.addEventListener('click', ()=>{
      console.log('logout');
      logout();
    })
    
  }
}

