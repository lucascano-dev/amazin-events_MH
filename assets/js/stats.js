// Funciones que muestra la estadistica
const myApiURL = "https://mindhub-xj03.onrender.com/api/amazing";
let currentDate = "";

// const esPasado = (eve) => eve.date <= currentDate;

const accessData = fetch(myApiURL)
  .then((response) => response.json())
  .then((data) => {
    //Obtener los eventos Futuros y Pasados
    const eventosPasados = data.events.filter(
      (eve) => eve.date <= data.currentDate
    );
    const eventosFuturos = data.events.filter(
      (eve) => eve.date > data.currentDate
    );

    const asistencia = eventosPasados.map(
      (eve) => (100 * eve.assistance) / eve.capacity
    );

    const mayorAsistencia = Math.max(...asistencia);
    const menorAsistencia = Math.min(...asistencia);
    const indiceMayor = asistencia.findIndex((e) => e == mayorAsistencia);
    const indiceMenor = asistencia.findIndex((e) => e == menorAsistencia);
    const mayorCapacidad = Math.max(
      ...eventosPasados.map((eve) => eve.capacity)
    );
    const indiceCapacidad = eventosPasados
      .map((eve) => eve.capacity)
      .findIndex((e) => e == mayorCapacidad);

    const tabla1 = document.querySelector("#tabla1");
    tabla1.innerHTML = `
      <td>${mayorAsistencia}% (${eventosPasados[indiceMayor].name})</td>
      <td>${menorAsistencia}% (${eventosPasados[indiceMenor].name})</td>
      <td>${mayorCapacidad} (${eventosPasados[indiceCapacidad].name})</td>
      `;

    //  RECUPERO DE LAS CATEGORIAS
    const categoriasFuturas = [
      ...new Set(eventosFuturos.map((evento) => evento.category)),
    ];
    const categoriasPasadas = [
      ...new Set(eventosPasados.map((evento) => evento.category)),
    ];

    // ganancias
    const gananciaFutura = (eventosFuturos) => {
      return eventosFuturos.reduce(
        (ganancia, evento) =>
          ganancia + parseFloat(evento.price) * parseFloat(evento.estimate),
        0.0
      );
    };

    const gananciaPasada = (eventosPasados) => {
      return eventosPasados.reduce(
        (ganancia, evento) =>
          ganancia + parseFloat(evento.price) * parseFloat(evento.assistance),
        0.0
      );
    };


    // ganancia por categoria
    const gananciaFuturaPorCategoria = categoriasFuturas.map((categoria) => {
      const eventosDeUnaCategoria = eventosFuturos.filter((evento) =>
        categoria.includes(evento.category)
      );
      return gananciaFutura(eventosDeUnaCategoria);
    });
    const gananciaPasadaPorCategoria = categoriasPasadas.map((categoria) => {
      const eventosDeUnaCategoria = eventosPasados.filter((evento) =>
        categoria.includes(evento.category)
      );
      return gananciaPasada(eventosDeUnaCategoria);
    });


    // Porcentajes
    const porcentajeFuturo = (eventosFuturos) => {
      return eventosFuturos.reduce(
        (porcentaje, evento) =>
          porcentaje +
          parseFloat(evento.estimate) / parseFloat(evento.capacity),
        0.0
      );
    };
    const porcentajePasados = (eventosPasados) => {
      return eventosPasados.reduce(
        (porcentaje, evento) =>
          porcentaje +
          parseFloat(evento.assistance) / parseFloat(evento.capacity),
        0.0
      );
    };

    const porcentajeFuturoPorCategoria = categoriasFuturas.map((categoria) => {
      const eventosDeUnaCategoria = eventosFuturos.filter((evento) =>
        categoria.includes(evento.category)
      );
      return (
        (
          (100 * porcentajeFuturo(eventosDeUnaCategoria)) /
          eventosDeUnaCategoria.length
        ).toFixed(2) + "%"
      );
    });
    const porcentajePasadoPorCategoria = categoriasPasadas.map((categoria) => {
      const eventosDeUnaCategoria = eventosPasados.filter((evento) =>
        categoria.includes(evento.category)
      );
      return (
        (
          (100 * porcentajePasados(eventosDeUnaCategoria)) /
          eventosDeUnaCategoria.length
        ).toFixed(2) + "%"
      );
    });

    const columnasJuntasFuturas = [
      categoriasFuturas,
      gananciaFuturaPorCategoria,
      porcentajeFuturoPorCategoria,
    ];
    const columnasJuntasPasadas = [
      categoriasPasadas,
      gananciaPasadaPorCategoria,
      porcentajePasadoPorCategoria,
    ];


    // captar el selector
    const tabla2 = document.querySelector("#tabla2");
    const tabla3 = document.querySelector("#tabla3");

    let html = "";
    categoriasFuturas.forEach((categoria,i)=> {
      html += `<tr> <td>${columnasJuntasFuturas[0][i]}</td>
       <td>${columnasJuntasFuturas[1][i]} </td>
       <td>${columnasJuntasFuturas[2][i]} </td> 
       </tr>`;
    })

    // for (let i = 0; i < categoriasFuturas.length; i++) {
    //   html += `<tr> <td>${columnasJuntasFuturas[0][i]}</td>
    //    <td>${columnasJuntasFuturas[1][i]} </td>
    //    <td>${columnasJuntasFuturas[2][i]} </td> 
    //    </tr>`;
    // }
    tabla2.innerHTML = html;
    
    html = "";
    for (let i = 0; i < categoriasPasadas.length; i++) {
      html += `<tr> <td>${columnasJuntasPasadas[0][i]}</td>
       <td>${columnasJuntasPasadas[1][i]} </td>
       <td>${columnasJuntasPasadas[2][i]} </td> 
       </tr>`;
    }
    tabla3.innerHTML = html;
    
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
 * Categorías: calcular matriz de categoriasFuturas
 * Ganancias de todos los eventos de CADA CATEGIRÍA:
 *  --> ganancia = suma(.price * .estimate)  ...solo eventos futuros
 * Porcentaje de asistencia PARA CADA CATEGORIA.
 *  -->  100 * .estimate   / .capacity  --->FUTUROS
 *
 ***** 3ER TABLA EVENTOS PASADOS:
 * Categorías: calcular matriz de categoriasFuturas
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


 