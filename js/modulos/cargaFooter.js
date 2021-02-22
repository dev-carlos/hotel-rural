// Cargamos la barra de menú que es comun a todas las páginas menos login.
async function cargaFooter (){
  
    await fetch("footer.html")
      .then((response) => response.text())
      .then((codigo) => {
        let foo = document.querySelector("#footer");
        if(foo){
          foo.innerHTML = codigo;
        }
      });
  };

  export {cargaFooter};