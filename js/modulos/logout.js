
const logout = ()=>{
    if(sessionStorage.idUsuario){
        console.log('hola');
        sessionStorage.removeItem('idUsuario');
        sessionStorage.removeItem('nombre');
        window.location = 'index.html';
    }
}

export {logout};