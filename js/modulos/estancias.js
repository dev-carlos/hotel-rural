

export const muestraEstancias = (estancia, reserva) => {
    let divEstancias = document.querySelector("#estancias");
    let tipo = estancia.tipo === 'h' ? 'Habitacion' : 'Cabaña';
    let salida = `
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">${estancia.nombre}</span>
                    <h5>Características:</h5>
                    <ul>
                        <li>Tipo estancia: ${tipo}</li>
                        <li>Aforo: ${estancia.aforo}</li>
                        <li>Descripcion: ${estancia.descripcion}</li>
                        <li>${estancia.precio}</li>
                    </ul>`;
    
            if (reserva) {
                salida += `<h4>Ha sido reservado del dia ${reserva.fechaInicio} al dia ${reserva.fechaFin}</h4>`;
            }
    salida +=  `</div>
            </div>`;


    let e = document.createElement("div");
    e.innerHTML = salida;

    divEstancias.appendChild(e);
}

const sacaEstancias = (estancias) => {
    estancias.forEach((estancia) => muestraEstancias(estancia));
}

export const dameEstancias = (tipo) => {
    
    fetch(`http://localhost:3000/estancias?tipo=${tipo}`)
    .then(respuesta => respuesta.json())
    .then(estancias => sacaEstancias(estancias))
    .catch( error => {
        M.toast({html: "No se puede obtener estancias.",classes:"red"});
    });
}