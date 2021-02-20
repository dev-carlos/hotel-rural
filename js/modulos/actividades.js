

export const muestraActividades = (actividad, reserva) => {
    let divActividades = document.querySelector("#actividades");
    
    let salida = `
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">${actividad.nombre}</span>
                    <h5>Características:</h5>
                    <ul>
                       
                        <li>Descripcion: ${actividad.descripcion}</li>
                        <li>${actividad.precio}</li>
                    </ul>`;
    
            if (reserva) {
                salida += `<h4>Ha sido reservado del dia ${reserva.fechaInicio} al dia ${reserva.fechaFin}</h4>`;
            }
    salida +=  `</div>
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