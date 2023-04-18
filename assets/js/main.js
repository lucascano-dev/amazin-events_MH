// URL de la API
const myApiURL = "https://mindhub-xj03.onrender.com/api/amazing";

// manejo del DOM
const myCards = document.querySelector("#cards");

// variable que necesito
let theCurrentDate = "";
let myEvents = [];

const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    theCurrentDate = data.currentDate;
    myEvents = retriveEvents([...data.events]);
    //recupero los eventos en myEvents
    // console.log(retriveEvents([...data.events]));        //TODOS
    // console.log(retriveEvents([...data.events],true));   //PASADOS
    // console.log(retriveEvents([...data.events],false));  //FUTUROS

    const paintCards = (myEvents) => {
      myCards.innerHTML = myEvents.reduce((html, cat) => {   
        return (
          html +
            `
            <div class="card col-xs-6 col-md-4 col-lg-3" style="width: 18rem;">
                <div class="card-header">
                    <a href="./detail.html">
                        <img src="${cat.image}" 
                             class="card-img-top"   
                             alt="${cat.description}">
                    </a>
                </div>
                <div class="card-body">
                    <p class="badge bg-success w-50 ">${cat.category}</p>
                    <p class="card-body h3">${cat.name}</p>
                    <p class="fst-italic ">${cat.description}</p>
                </div>
                <div id="comprar" class="card-footer">
                    <p class="card-text">$ ${cat.price}</p>
                    <a href="./detail.html">Comprar</a>
                </div>
            </div>
            `
        );
      }, "");
    };
    
    paintCards(myEvents)
  });
  
const retriveEvents = (arrayEvents, isPast) => {
  if (isPast === undefined) {
    return arrayEvents;
  } else if (isPast) {
    return arrayEvents.filter((event) => event.date <= theCurrentDate);
  } else {
    return arrayEvents.filter((event) => event.date > theCurrentDate);
  }
};


