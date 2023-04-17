/**
 * 
 */
const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    theCurrentDate = data.currentDate;

    // PASO 1: RECUPERO DE LOS EVENTOS
    myEvents = retriveEvents([...data.events], false);
    //recupero los eventos en myEvents

    // PASO 2: RECUPERO DE LAS CATEGORIAS
    const categorias = [...new Set(myEvents.map((evento) => evento.category))];

    // PASO 3: PINTAR LAS CATEGORIAS 
    paintCategorys(categorias);
      // PASO 3: PINTAR LAS CARDS 
    paintCards(myEvents)
  });


