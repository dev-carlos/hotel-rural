// Cargamos la barra de menú que es comun a todas las páginas menos login.
async function cargaMenu (){
  
    await fetch("menu.html")
      .then((response) => response.text())
      .then((codigo) => {
        document.querySelector("#menu").innerHTML = codigo;
      });
  
      let li = document.createElement('li');
      let op = document.querySelector('#opcionesMenu');
      if(sessionStorage.nombre){    
        li.innerHTML = `<li id="logout-menu"><a href="#"><i class="material-icons">exit_to_app</i></a></li>`; 
      }
      else{
        li.innerHTML = `<li id="login-menu"><a href="/index.html"><i class="material-icons">perm_identity</i></a></li>`;
      }
      op.appendChild(li);
  };

  export {cargaMenu};