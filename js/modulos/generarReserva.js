import { misReservas } from "./reservas.js";

const listaEstanciasDisponibles = (estancia) => {
    let divEstancias = document.querySelector('#listaDisponibles');
    let salida = `
    <div class="col s12 m4">
      <div class="card">
        <div class="card-image">
          <img src="${estancia.imgsrc}">
          <span class="card-title">${estancia.nombre}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>
        <div class="card-content">
         
          <p>${estancia.aforo}</p>
          <p id="estanciaPrecio">${estancia.precio} €</p>
        </div>
        </div>
        </div>
    `;
    let e = document.createElement("div");
    e.innerHTML = salida;
    //añado evento click a cada tarjeta de estancia
    e.addEventListener('click', ()=>{
        guardarReserva(estancia);
    });
    divEstancias.appendChild(e);
}

const listaActividadesDisponibles = (actividad) => {
    let divActividades = document.querySelector('#listaDisponibles');
    let salida = `
    <div class="col s12 m4">
      <div class="card">
        <div class="card-image">
          <img src="${actividad.imgsrc}">
          <span class="card-title">${actividad.nombre}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>
        <div class="card-content">
          <p id="actividadPrecio">${actividad.precio}€ </p>          
        </div>
        </div>
        </div>
    `;
    let e = document.createElement("div");
   
    e.innerHTML = salida;
    //añado evento click a cada tarjeta de actividad
    e.addEventListener('click', ()=>{
        guardarReserva(actividad);
    });
    divActividades.appendChild(e);
}

const guardarReserva = (dato)=>{
    if(dato){
        console.log(dato);
        let reserva = {};
        //datos de la reserva
        reserva.usuarioId = sessionStorage.getItem('idUsuario');
        reserva.fechaInicio = document.querySelector('#fechaInicio').value;
        reserva.fechaFin = document.querySelector('#fechaFin').value;
        //calculo el total
        let total = calcularTotal(dato.precio, reserva.fechaInicio, reserva.fechaFin);
        reserva.total = total;
        if(dato.hasOwnProperty('aforo')){
            reserva.estanciaId = dato.id;
        }
        else{
            reserva.actividadId = dato.id;
        }
        //console.log(reserva);
        fetch("http://localhost:3000/reservas",{
            method:"POST",
            body: JSON.stringify(reserva),
            headers:{
                "Content-type": "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(reserva => procesarReserva(reserva))
        .catch( error => {
            M.toast({html: "error en reservas",classes:"red"});
        });
    }
}

const procesarReserva = (reserva) => {
    if(reserva.id){
        M.toast({html: "Guardada reserva",classes:"green"});
        let cajaDisponibles = document.querySelector("#listaDisponibles");
        cajaDisponibles.innerHTML = '';
        let fechaInicio = document.querySelector('#fechaInicio');
        let fechaFin = document.querySelector('#fechaFin');
        fechaInicio.value = '';
        fechaFin.value = '';
        //llamo a listar mis actividades
        misReservas();
    }
}

//funcion que saca los dias entre las dos fechas y multiplica por el precio
const calcularTotal = (precio, txt_inicio, txt_fin) =>{

    let fechaInicio = new Date(txt_inicio).getTime();
    let fechaFin    = new Date(txt_fin).getTime();
    let diff = (fechaFin - fechaInicio)/(1000*60*60*24);

    return diff*precio;
}

const listaEstancias = () => {
    fetch(`http://localhost:3000/estancias`)
    .then(respuesta => respuesta.json())
    .then(estancias =>  estancias.forEach((estancia) => listaEstanciasDisponibles(estancia)))
    .catch( error => {
        M.toast({html: "error en estancias",classes:"red"});
    });  
}

const listaActividades = () => {
    fetch(`http://localhost:3000/actividades`)
    .then(respuesta => respuesta.json())
    .then(actividades =>  actividades.forEach((actividad) => listaActividadesDisponibles(actividad)))
    .catch( error => {
        M.toast({html: "error en actividades",classes:"red"});
    });  
}

export const listarDisponibles = (datos) => {
    if(datos.seleccion == 'estancias'){
        listaEstancias();
    }
    else{
        listaActividades();
    } 
}