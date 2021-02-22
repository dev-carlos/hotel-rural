import { muestraEstancias } from "./estancias.js";
import { muestraActividades } from "./actividades.js";


//pido los datos de la estancia con su id
const sacaEstancias = async (reserva) => {
  
  let respuesta = await fetch(`http://localhost:3000/estancias/${reserva.estanciaId}`);
  let estancia = await respuesta.json();

  muestraEstancias(estancia, reserva);
};
//pido los datos de la actividad con su id
const sacaActividades = async (reserva) => {
  
  let respuesta = await fetch(`http://localhost:3000/actividades/${reserva.actividadId}`);
  let actividad = await respuesta.json();

  muestraActividades(actividad, reserva);
};

//filtro por estancia o actividad recorriendo el resultado de la consulta
const muestraReservas = (reservas) => {

  //si tengo el nombre
  if (sessionStorage.nombre) {
    document.querySelector("#reserva-nombre").textContent = ' de ' + sessionStorage.getItem('nombre');
  }

  //recorro las reservas
  reservas.forEach((reserva) => {
    console.log(reserva);
    //si es una estancia
    if(reserva.hasOwnProperty('estanciaId')){
      sacaEstancias(reserva);
    }
    //si es una aactvidad
    if(reserva.hasOwnProperty('actividadId')){
      sacaActividades(reserva);
    }
    
  });
};

//pido las estancias reservadas por el usuario activo
export const misReservas = () => {
  let divEstancias = document.querySelector('#reservasEstancia');
  let divActividades = document.querySelector("#reservasActividades");
  //limpio antes de ensuciar
  divActividades.innerHTML = '';
  divEstancias.innerHTML = '';
  //si tengo su id
  let id = sessionStorage.getItem("idUsuario");
  if (id != null) {
    fetch(`http://localhost:3000/reservas/?usuarioId=${id}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => muestraReservas(datos))
      .catch((error) => {
        Materialize.toast('No hay reservas para este usuario!', 1000, 'red', console.log('No hay reservas para este usuario!'));
      });
  } else {
    Materialize.toast('No estas logueado!', 1000, 'red', console.log('No estás logueado!'));
  }
};
