

// Cargamos la barra de menú que es comun a todas las páginas menos login.
async function cargaMenu (){
  
     fetch("menu.html")
      .then((response) => response.text())
      .then((codigo) => {
        let menu = document.querySelector("#menu");
        if(menu){
          menu.innerHTML = codigo;

          //añado icono de login/logout
          let li = document.createElement('li');
          let op = document.querySelector('#opcionesMenu');
          if(sessionStorage.nombre){    
            li.innerHTML = `<li id="logout-menu"><span><i class="material-icons">exit_to_app</i></span></li>`; 
          }
          else{
            li.innerHTML = `<li id="login-menu"><a href="/index.html"><i class="material-icons">perm_identity</i></a></li>`;
            
          }
          op.appendChild(li);
        }
        
      });
      
      
      
  };

  export {cargaMenu};