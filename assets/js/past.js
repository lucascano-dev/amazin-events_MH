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
    allCategorys.addEventListener("change", todosLosFiltros);
    buscador.addEventListener("keyup", todosLosFiltros);

    // Funcion general
    filtrarCategoria();
  });
