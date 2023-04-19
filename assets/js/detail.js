const queID = document.location.search;
const idElegido = new URLSearchParams(queID).get("id");

const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    theCurrentDate = data.currentDate;

    const elEvento = data.events.filter((eve) => eve["_id"] == idElegido);
    console.log(queID);
    console.log(idElegido);
    console.log(elEvento);

    const detalleEvento = document.querySelector("#detail-card");

    detalleEvento.innerHTML = `
    <img src="${elEvento[0].image}" 
    class="img-fluid col-6" alt="${elEvento[0].description}">
    <div class="card-body col-6">
        <h1>${elEvento[0].name}</h1>

        <p>${elEvento[0].description}</p>

        <div >
            <p class="card-text">Precio $ ${elEvento[0].price}</p>
            <a href="#">Comprar</a>
        </div>
    <div>
`;

    /*
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
   */
  });
