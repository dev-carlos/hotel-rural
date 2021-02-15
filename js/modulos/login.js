//modificado
const login_f = (dato) => {
    console.log(JSON.stringify(dato));
    // Comprobar datos ....
    if (dato[0].email == document.querySelector("#email-login").value && dato[0].password == window.btoa(document.querySelector("#password-login").value)) { 
        sessionStorage.setItem('idUsuario', dato[0].id);
        sessionStorage.setItem('nombre', dato[0].nombre);
        window.location='home.html';
    }
    else {
        M.toast({html: "Usuario o contraseña erroneo",classes:"red"},3000);
    }
}

export const enviaLogin = (usuario)=>{
          
    fetch(`http://localhost:3000/usuarios/?email=${usuario.email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(respuesta =>  respuesta.json())
    .then(datos => login_f(datos))
    .catch(error => {
        M.toast({html: "Usuario o contraseña erroneo",classes:"red"});
    })
};
