

export const muestraActividades = (actividad, reserva) => {
    let divActividades = document.querySelector("#actividades");
    let reservaTxt = '';
    if(reserva){
        divActividades = document.querySelector("#reservasActividades");
        reservaTxt = `<h4>Ha sido reservado del dia ${reserva.fechaInicio} al dia ${reserva.fechaFin}</h4>`;
    }

    
    let salida =`<div class="col s6">
                    <div class="card hover-reveal">
                        <div class="card-image">
                            <img class="activator responsive-img" src="${actividad.imgsrc}">
                        </div>
                        <div class="card-content">
                            <span class="nomb">${actividad.nombre}</span>
                            <span>${reservaTxt}</span>
                        </div>
                        <div class="card-action">
                            <a href="reservas.html" class="orange-text text-darken-4">Consultar disponibilidad de reserva</a>
                        </div>
                        <div class="card-reveal">
                            <span class=" nomb">${actividad.nombre}<i class="material-icons right card-title">close</i></span>
                            <p><i class="small material-icons">person</i><span class="afor"> &nbspPrecio por persona: ${actividad.precio} €</p>
                            <p class="desc">${actividad.descripcion}</p>
                        </div>
                    </div>
                </div>`;
    


    let e = document.createElement("div");
    e.innerHTML = salida;

    divActividades.appendChild(e);
}

const sacaActividades = (actividades) => {
    actividades.forEach((actividad) => muestraActividades(actividad));
}

export const dameActividades = () => {
    
    fetch("http://localhost:3000/actividades")
    .then(respuesta => respuesta.json())
    .then(actividades => sacaActividades(actividades))
    .catch( error => {
        M.toast({html: "No se puede obtener actividades.",classes:"red"});
    });
}