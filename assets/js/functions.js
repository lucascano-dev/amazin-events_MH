
/**
 * Varibles Globales 
 * 
 */
// URL de la API
const myApiURL = "https://mindhub-xj03.onrender.com/api/amazing";

// manejo del DOM
const myCards = document.querySelector("#cards");
const myCategorys = document.querySelector("#check-search");

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
 * Esta funcion es para bla
 * @param {*} pepe tipo string bla del pa
 * @param {*} pipo 
 */
function aaaa(pepe, pipo){

}

