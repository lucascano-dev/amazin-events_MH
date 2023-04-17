// URL de la API
const myApiURL = "https://mindhub-xj03.onrender.com/api/amazing";

// manejo del DOM
let myCards = document.querySelector("#cards");

fetch(myApiURL)
.then((response) => response.json())
.then((data) => {

  generarCards(data)


})


function generarCards(array) {
  console.log(array);

  for (let i = 0; i < array; i++) {
    let div = document.createElement("div");
    div.innerHTML=`
    <div class="card col-xs-6 col-md-4 col-lg-3" style="width: 18rem;">
        <div class="card-header">
            <a href="./detail.html">
                <img src="IMAGEN" 
                     class="card-img-top"   
                     alt="TEXTO ALTERNATNIVO">
            </a>
        </div>
        <div class="card-body">
            <p class="badge bg-success w-50 ">caterogira</p>
            <p class="card-body h3">nombre evento</p>
            <p class="fst-italic ">descripcion</p>
        </div>
        <div id="comprar" class="card-footer">
            <p class="card-text">$precio</p>
            <a href="./detail.html">Comprar</a>
        </div>
    </div>
    `
    myCards.appendChild(div);
    
  }


}



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
