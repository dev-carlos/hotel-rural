export const muestraEstancias = (estancia, reserva) => {

    let divEstancias;
    if(reserva){
        divEstancias = document.querySelector('#reservasEstancia');
        
    }
    else{
        divEstancias = document.querySelector('#estancias');
    }
   
     
    let tipo = estancia.tipo === 'h' ? 'Habitacion' : 'Cabaña';
    let reservaTxt;
    if(reserva){
        reservaTxt = `<h4>Ha sido reservado del dia ${reserva.fechaInicio} al dia ${reserva.fechaFin}</h4>`;
    }
    else{
        reservaTxt = '';
    }
    let salida =`<div class="col s6">
                    <div class="card hover-reveal">
                        <div class="card-image">
                            <img class="activator responsive-img" src="${estancia.imgsrc}">
                        </div>
                        <div class="card-content">
                            <span class="nomb">${estancia.nombre}</span>
                            <span>${reservaTxt}</span>
                        </div>
                        <div class="card-action">
                            <a href="reservas.html" class="orange-text text-darken-4">Consultar disponibilidad de reserva</a>
                        </div>
                        <div class="card-reveal">
                            <span class=" nomb">${estancia.nombre}<i class="material-icons right card-title">close</i></span>
                            <p><i class="small material-icons">group</i><span class="afor"> &nbsp${estancia.aforo}</p>
                            <p><i class="small material-icons">hotel</i><span class="afor"> &nbsp${estancia.precio} €</p>
                            <p class="desc">${estancia.descripcion}</p>
                        </div>
                    </div>
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