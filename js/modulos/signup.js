
const procesarAlta = (usuario) => {
    Materialize.toast('Usuario dado de alta correctamente!', 2000, 'green', console.log('Usuario dado de alta correctamente!'));

    sessionStorage.setItem('idUsuario', usuario.id);
    sessionStorage.setItem('nombre', usuario.nombre);
    window.location.assign('home.html');
}

export const generaAlta = (usuario) => {

    let existe = comprobarUsuario(usuario);
   
        
}

async function gruardarUsuario(usuario){
   
        await fetch("http://localhost:3000/usuarios",{
            method:"POST",
            body: JSON.stringify(usuario),
            headers:{
                "Content-type": "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(usuario => procesarAlta(usuario))
        
    
    
}

  async function comprobarUsuario(usuario){

    await fetch(`http://localhost:3000/usuarios/?email=${usuario.email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(respuesta =>  respuesta.json())
    .then(datos => { 
        if(datos.length == 0) {gruardarUsuario(usuario);}
        else{Materialize.toast('Usuario ya registrado!', 1000, 'red', console.log('Usuario ya registrado!'));}
    })
    .catch(error => {
        Materialize.toast('Problemas comprobando usuario!', 1000, 'red', console.log('Problemas comprobando usuario!'));
    })

  
}