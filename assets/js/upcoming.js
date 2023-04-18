const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    theCurrentDate = data.currentDate;
    // PASO 1: RECUPERO DE LOS EVENTOS
    //  undefinded -> Recupera todos
    //        true -> Recupera los Pasados
    //       false -> Recupera los Futuros        
    myEvents = retriveEvents([...data.events], false);

    // PASO 2: RECUPERO DE LAS CATEGORIAS
    const categorias = [...new Set(myEvents.map((evento) => evento.category))];

    // PASO 3: PINTAR LAS CATEGORIAS
    paintCategorys(categorias);
    // PASO 3: PINTAR LAS CARDS
    paintCards(myEvents);


    // PASO 4: FILTRAR POR CATEGORIA
    const allCategorys = document.querySelector('#check-search');

  
    allCategorys.addEventListener('change', ()=> {
      const myEventsFiltraCheck =  filtrarCategoria(myEvents)
      paintCards(myEventsFiltraCheck)
    });

    const filtrarCategoria = (myEvents) => {
      // recupera todos las los checkbox y 
      // los convierte en array.
      let arrayChecks = [...document.querySelectorAll("input[type='checkbox']")];

      // filtra el array completo por los chequedos
      let catergoryChecked = arrayChecks.filter(check => check.checked)
     
      // si no hay categorias chequeadas, 
      // devuelve todos los eventos (myEvents)
      if (catergoryChecked.length==0) return myEvents;

      // si hay al menos una, entonces
      // recupera un array de los values chequeados
      // para filtrar eventos.
      let valuesChecked = catergoryChecked.map( check => check.value)
 
      
      // filtra los eventos si el valuesChecked
      // se incluye a la categoria de cada evento
      return myEvents.filter(evento => 
        valuesChecked.includes(evento.category))

    }

    filtrarCategoria(myEvents)





  });
