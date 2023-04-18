const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    theCurrentDate = data.currentDate;
    myEvents = retriveEvents([...data.events]);

    //recupero los eventos en myEvents
    // console.log(retriveEvents([...data.events]));        //TODOS
    // console.log(retriveEvents([...data.events],true));   //PASADOS
    // console.log(retriveEvents([...data.events],false));  //FUTUROS


    // PASO 2: RECUPERO DE LAS CATEGORIAS
    const categorias = [...new Set(myEvents.map((evento) => evento.category))];

    // PASO 3: PINTAR LAS CATEGORIAS 
    paintCategorys(categorias);
    // PASO 3: PINTAR LAS CARDS 
    paintCards(myEvents)

    // PASO 4: FILTRAR POR CATEGORIA

    //eventos de los chebox e imput
    allCategorys.addEventListener("change", todosLosFiltros);
    buscador.addEventListener("keyup", todosLosFiltros);

    // Funcion general 
    filtrarCategoria(myEvents);

  });


