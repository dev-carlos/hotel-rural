import { muestraEstancias } from "./estancias.js";

const sacaEstancia = async (reserva) => {
  
  let respuesta = await fetch(`http://localhost:3000/estancias/${reserva.estanciaId}`);
  let estancia = await respuesta.json();

  muestraEstancias(estancia, reserva);
};

const muestraReservas = (reservas) => {

  if (localStorage.nombre) {
    document.querySelector("#reserva-nombre").textContent = ' de ' + localStorage.getItem('nombre');
  }
  reservas.forEach((reserva) => {
    sacaEstancias(reserva);
  });
};

export const misReservas = () => {
  let id = sessionStorage.getItem("idUsuario");
  if (id != null) {
    fetch(`http://localhost:3000/reservas/?usuarioId=${id}`)
      .then((respuesta) => respuesta.json())
      .then((datos) => muestraReservas(datos))
      .catch((error) => {
        M.toast({ html: "No hay reservas.", classes: "red" });
      });
  } else {
    M.toast({ html: "No hay usuario registrado.", classes: "red" });
  }
};
