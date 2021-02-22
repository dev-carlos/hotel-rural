//modificado
const login_f = (dato) => {
    console.log(JSON.stringify(dato));
    // Comprobar datos ....
    if (dato[0].email == document.querySelector("#email-login").value && dato[0].password == window.btoa(document.querySelector("#password-login").value)) { 
        sessionStorage.setItem('idUsuario', dato[0].id);
        sessionStorage.setItem('nombre', dato[0].nombre);
        Materialize.toast('login ok!', 1000, 'green', console.log('login ok!'));
        window.location='home.html';
        
    }
    else {
        Materialize.toast('error de email o password!', 1000, 'red', console.log('error de email o password!'));
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
        Materialize.toast('error de login!', 1000, 'red', console.log('error de login!'));

    })
};
