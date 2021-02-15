
const procesarAlta = (usuario) => {
        M.toast(
            {html: "<span>Usuario dado de alta correctamente.</span>",classes:"green"},2000);

            sessionStorage.setItem('idUsuario', usuario[0].id);
            sessionStorage.setItem('nombre', usuario[0].nombre);
            window.location='home.html';
}

export const generaAlta = (usuario) => {

    let existe = comprobarUsuario(usuario.email);
    console.log(existe);
    
    if(!existe){
        fetch("http://localhost:3000/usuarios",{
            method:"POST",
            body: JSON.stringify(usuario),
            headers:{
                "Content-type": "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(usuario => procesarAlta(usuario))
        .catch( error => {
            M.toast({html: "Problemas con el alta",classes:"red"});
        });
    }
    else{
        console.log("usuario ya registrado");
    }
    
    
}

  async function comprobarUsuario(usuarioEmail){

    let existe = false;

    await fetch(`http://localhost:3000/usuarios/?email=${usuarioEmail}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(respuesta =>  respuesta.json())
    .then(datos => { if(datos[0].id > 0) existe = true})
    .catch(error => {
        M.toast({html: "Usuario o contraseña erroneo",classes:"red"});
    })

    return existe;
}