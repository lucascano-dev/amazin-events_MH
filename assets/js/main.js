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

  });



//Evento de escucha para input

let buscador = document.getElementById("inputSearch"); //captura id=inputSarch

buscador.addEventListener('keyup', () => { //keydown para filtrar cuando presione una tecla
  //Si filtro tiene valor desde input, entonces vuelve a crear el html
  let eventosFiltrados = myEvents.filter((miEvento) => {

    return miEvento.name.toLowerCase().includes(buscador.value.toLowerCase()); //si le pongo llaves entonces debo usar return, caso contrario lo puedo hacer una sola linea al lado de la funcion flecha
  });

  console.log(eventosFiltrados);
  paintCards(eventosFiltrados);


})

