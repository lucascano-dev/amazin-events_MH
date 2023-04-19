
/**
 * Varibles Globales 
 * 
 */
// URL de la API
const myApiURL = "https://mindhub-xj03.onrender.com/api/amazing";

// manejo del DOM
const myCards = document.querySelector("#cards");
const myCategorys = document.querySelector("#check-search");
const allCategorys = document.querySelector("#check-search");
const buscador = document.getElementById("inputSearch"); //captura id=inputSarch

let theCurrentDate = "";    // fecha actual
let myEvents = [];          // matriz de eventos


/**
 * Permite filtrar los eventos según 
 * @param {*} arrayEvents "Array de eventos"
 * @param {*} isPast [undefined | true | false] = "todos | pasados | futuros"
 * @returns 
    // console.log(retriveEvents([...data.events]));        //TODOS
    // console.log(retriveEvents([...data.events],true));   //PASADOS
    // console.log(retriveEvents([...data.events],false));  //FUTUROS
 */
const retriveEvents = (arrayEvents, isPast) => {
    if (isPast === undefined) {
      return arrayEvents;
    } else if (isPast) {
      return arrayEvents.filter((event) => event.date <= theCurrentDate);
    } else {
      return arrayEvents.filter((event) => event.date > theCurrentDate);
    }
  };

  

  /**
   * Pinta las categorias en los checkbox
   * @param {*} categoria --> array con las categorias
   */
  const paintCategorys = (categoria) => {
    myCategorys.innerHTML = categoria.reduce((html,item) =>{
      return (
        html + 
        `
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" 
                id="${item}" value="${item}">
          <label class="form-check-label" 
                for="${item}">${item}</label>
        </div>
        `
      );
    }, "");
  };


  /**
   * Pinta las card con los eventos ya filtrados
   * @param {*} myEvents Eventos filtrados
   */
  const paintCards = (myEvents) => {
    myCards.innerHTML = myEvents.reduce((html, evento) => {
      return (
        html +
          `
          <div class="card col-xs-6 col-md-4 col-lg-3" style="width: 18rem;">
              <div class="card-header">
                  <a href="./detail.html">
                      <img src="${evento.image}" 
                           class="card-img-top"   
                           alt="${evento.description}">
                  </a>
              </div>
              <div class="card-body">
                  <p class="badge bg-success w-50 ">${evento.category}</p>
                  <p class="card-body h3">${evento.name}</p>
                  <p class="fst-italic ">${evento.description}</p>
              </div>
              <div id="comprar" class="card-footer">
                  <p class="card-text">$ ${evento.price}</p>
                  <a href="./detail.html">Comprar</a>
              </div>
          </div>
          `
      );
    }, "");
  };


  /**
   * Filtra los eventos por categorias marcados por los checkbox
   * @param {*} arrayEvents   Lista de eventos que deben filtrarse
   * @returns                 Eventos filtrados segun los checkbox
   */
const filtrarCategoria = (arrayEvents) => {
  // recupera todos las los checkbox y 
  // los convierte en array.
  let arrayChecks = [...document.querySelectorAll("input[type='checkbox']")];

  // filtra el array completo por los chequedos
  let catergoryChecked = arrayChecks.filter(check => check.checked)
 
  // si no hay categorias chequeadas, 
  // devuelve todos los eventos (myEvents)
  if (catergoryChecked.length==0) return arrayEvents;

  // si hay al menos una, entonces
  // recupera un array de los values chequeados
  // para filtrar eventos.
  let valuesChecked = catergoryChecked.map( check => check.value)

  // filtra los eventos si el valuesChecked
  // se incluye a la categoria de cada evento
  return arrayEvents.filter(evento => 
    valuesChecked.includes(evento.category))
}


/**
 * Filtra eventos donde en la propiedad name 
 * contienepor un texto dado (textSearch).
 * @param {*} arrayEventos  Lista de eventos a filtrar
 * @param {*} textoABuscar     texto por el que se filtra en name
 * @returns                 array de eventos ya filtrado
 */
const filtrarPorInput = (arrayEventos, textoABuscar) => {
  return arrayEventos.filter( evento => 
    evento.name.toLowerCase().includes(textoABuscar.toLowerCase()));
}


/**
 * Filtro combinado
 * filtro1 = filtra por el texto y devuelve los eventos firltrados
 * filtro2 = filtra por los checkbox a partir del filtro 1
 * Pinta las card 
 * */
const todosLosFiltros = () => {
  let filtro1 = filtrarPorInput(myEvents, buscador.value);
  let filtro2 = filtrarCategoria(filtro1);
  paintCards(filtro2);
}

