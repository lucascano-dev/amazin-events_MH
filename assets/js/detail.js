// Funciones que muestra los detalles de detail.html
const idElegido = new URLSearchParams(window.location.search).get("id");

const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    // Recupera el evento indicado con 
    const elEvento = data.events.filter((eve) => eve["_id"] == idElegido);
    console.log(elEvento);

    const detalleEvento = document.querySelector("#detail-card");
    detalleEvento.innerHTML = `
    <img src="${elEvento[0].image}" 
    class="img-fluid col-6" alt="${elEvento[0].description}">
    <div class="card-body col-6">
        <h1>${elEvento[0].name}</h1>
        <li class="list-inline-item me-0">
        <h5>Lugar: ${elEvento[0].place}</h5>
        <h6>Calificación</h6>
      </li>
        <li class="list-inline-item me-0">
        <i class="fas fa-star text-warning fa-xs"></i>
      </li>
      <li class="list-inline-item me-0">
        <i class="fas fa-star text-warning fa-xs"></i>
      </li>
      <li class="list-inline-item">
        <i class="fas fa-star-half-alt text-warning fa-xs"></i>
      </li>
        <p class="card-description">${elEvento[0].description}</p>

        <div >
            <p class="card-price">Precio $ ${elEvento[0].price}</p>
            <a class="card-btn btn btn-danger" href="#" role="button">Comprar</a>
        </div>
    <div>
`;
});

  /**
   * Información que contiene el evento
   * ----------------------------------
   * capacity: 50000,
   * category: Food",
   * date: "2023-10-12",
   * description: "An invitation to enjoy Middle East's flavours.",
   * estimate: 50000,
   * image: https://i.postimg.cc/CxJQqX33/arabic.jpg",
   * name: "Arabic holidays",
   * place: "Multi Space",
   * price: 0
   * _id: 7
   *
   * */ 

/**
 * location 
 * 
 * ancestorOrigins: DOMStringList {length: 0}
 * assign: ƒ assign()
 * hash: ""
 * host: "127.0.0.1:5500"
 * hostname: "127.0.0.1"
 * href: "http://127.0.0.1:5500/src/detail.html?id=7"
 * origin: "http://127.0.0.1:5500"
 * pathname: "/src/detail.html"
 * port: "5500"
 * protocol: "http:"
 * reload: ƒ reload()
 * replace: ƒ replace()
 * search: "?id=7"
 *    */


