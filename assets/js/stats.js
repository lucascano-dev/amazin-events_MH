// Funciones que muestra la estadistica
const myApiURL = "https://mindhub-xj03.onrender.com/api/amazing";
let currentDate = '';

const esPasado = (eve) => eve.date <= currentDate;


const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    // recorrer cada evento de data.events
    // obtener información de 
    currentDate = data.currentDate;
    const pasados = data.events.filter((eve)=>eve.date <= currentDate );

    const asistencia =  pasados.map(eve => 100 * eve.assistance / eve.capacity );

    const mayorAsistencia = Math.max(...asistencia)  
    const menorAsistencia = Math.min(...asistencia)  
    const indiceMayor = asistencia.findIndex(e => e==mayorAsistencia)
    const indiceMenor = asistencia.findIndex(e => e==menorAsistencia)

    const mayorCapacidad = Math.max(...pasados.map(eve => eve.capacity ));
    const indiceCapacidad = (pasados.map(eve => eve.capacity )).findIndex(e => e==mayorCapacidad)

    console.log(window);
    console.log( `Mayor: ${mayorAsistencia}% (${pasados[indiceMayor].name}) \nMenor: ${menorAsistencia}% (${pasados[indiceMenor].name})` );
    console.log(`Evento con mayor capacidad: ${mayorCapacidad} (${pasados[indiceCapacidad].name})`);

    const tabla1 = document.querySelector('#tabla1');
    tabla1.innerHTML = `
<td>${mayorAsistencia}% (${pasados[indiceMayor].name})</td>
<td>${menorAsistencia}% (${pasados[indiceMenor].name})</td>
<td>${mayorCapacidad} (${pasados[indiceCapacidad].name})</td>
`


  });

   /**
   * Información que contiene el evento
   * ----------------------------------
   * --> Eventos Fututos
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
   * - - - - - - - - - - - - - - - - - - - - 
   * -->  Eventos Pasados
   * assistance:6589
   * capacity: 10000
   * category: "Museum"
   * date: "2022-07-05"
   * description: "Let's go meet the biggest dinosaurs in the paleontology museum."
   * image: "https://i.postimg.cc/nrQkSwwh/jurassic-park.jpg"
   * name: "Jurassic Park"
   * place: "Field"
   * price: 3
   * _id: 2
   */




  /**
   * Aca tienen la idea de como tienen que estar las tablas de estadisticas:
   * 
   ***** 1ER TABLA EVENTOS PASADOS: 
   * Evento con el mayor porcentaje de asistencia: (CALCULAR EL MAYOR)
   *  -->  100 * .assistance / .capacity  --->PASADOS 
   *  -->  100 * .estimate   / .capacity  --->FUTUROS 
   *  Nombre del evento: -->  .name 
   * 
   * Evento con el menor porcentaje de asistencia: (CALCULAR EL MENOR)
   *  -->  100 * .assistance / .capacity  --->PASADOS 
   *  -->  100 * .estimate   / .capacity  --->FUTUROS 
   *  Nombre del evento: -->  .name 
   * 
   * Evento con mayor capacidad: (CALCULAR EL MAYOR)
   *         capacidad : -->  .capacity
   *  Nombre del evento: -->  .name 
   * 
   ***** 2DA TABLA EVENTOS FUTUROS: 
   * Categorías: calcular matriz de categorias
   * Ganancias de todos los eventos de CADA CATEGIRÍA: 
   *  --> ganancia = suma(.price * .estimate)  ...solo eventos futuros
   * Porcentaje de asistencia PARA CADA CATEGORIA. 
   *  -->  100 * .estimate   / .capacity  --->FUTUROS 
   * 
   ***** 3ER TABLA EVENTOS PASADOS: 
   * Categorías: calcular matriz de categorias
   * Ganancias de todos los eventos de CADA CATEGIRÍA: 
   *  --> ganancia = suma(.price * .assistance)  ...solo eventos pasados
   * Porcentaje de asistencia PARA CADA CATEGORIA.
   *  -->  100 * suma(.assistance) / suma(.capacity)  --->PASADOS 
   * 
   *     ev1:   asistencia   100        capacidad: 100       100/100     = 1
   *     ev2:                100                  3000       100/3000    = 0.033
   *     ev3:                500                 50000       500/50000   = 0.010
   *    -----------------------------------------------------------------
   *                                                                2.2 / 3 =  0.3476 ->34.76
   *                         700                 53100    700/53100        =  0.01318 -> 1,3
   * 
   * 
   * 
   ***** DETALLES 
   * Porcentaje de asistencia: (asistencia / capacidad) x 100. 
   * (asistencia = assistance o estimate).
   * 
   * Porcentaje de asistencia de la segunda y tercer tabla: 
   * los resultados de la tabla resuelta que pasé son promedios, 
   * no porcentajes, ustedes lo pueden hacer de las dos formas:
   * 
   * porcentaje: suman toda la asistencia de los eventos de esa categoría, 
   * después suman toda la capacidad de los eventos de esa categoría y 
   * ahí hacen el porcentaje total.
   * 
   * promedio: de cada porcentaje de asistencia lo dividen por la cantidad de eventos, es decir, si tengo 4 eventos voy a tener 4 porcentajes y eso lo divido por 4
   * 
   * ej museum: los porcentajes de los cuatro eventos a esa categoría 
   * son 100%, 100%, 84,375%, 81,666% / 4 = 91,50%  (resultado de la tabla).
   * 
   * Conclusión: si eligen sacar el porcentaje, va a haber una pequeña diferencia con los resultados de la tabla (es mínima, está bien de igual forma, haganló como se les haga más fácil y cómodo). 
   * 
   *  Ganancias: sumar todos los precios de los eventos (precio del evento multiplicado por asistencia) de una categoría. 
   * 
   *  Evento con mayor porcentaje de asistencia: Sacan el porcentaje de todos los eventos pasados, ordenenlos de mayor a menor, impriman el primero.
   * 
   *  Evento con menor porcentaje de asistencia: Sacan el porcentaje de todos los eventos pasados, ordenenlos de menor a mayor, impriman el primero. 
   */