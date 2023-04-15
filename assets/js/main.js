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
                             alt="${cat.name}">
                    </a>
                </div>
                <div class="card-body">
                    <h2 class="card-body">Gran Maratón</h2>
                    <p class="h5">42K Buenos Aires</p>
                </div>
                <div id="comprar" class="card-footer">
                    <p class="card-text">Precio $2000.</p>
                    <a href="./detail.html">Comprar</a>
                </div>
            </div>
            `
        );
      });
    };

    // for (let i=0; i<myEvents.length; i++){
    //     console.log(myEvents[i].name)
    // }
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

/*
let dd = data.currentDate;
let eventos = data.events;

console.log(`Fecha Actual --> ${dd}`);
console.log("Los eventos: Pasados ");
for (let i=0; i<eventos.length;i++){
    if (eventos[i].date<=dd){
        console.log( `Nº ${i+1}  ${eventos[i].name}
         fecha ${eventos[i].date} `);
    }
}

let lucas = "223"
let leo = "111"

if (lucas > leo){
    console.log(`${lucas} es mayor que ${leo}`);
}else {
    console.log(`${lucas} NO es mayor que ${leo}`);
}*/
