"use strict"

let URLnasa = "https://images-api.nasa.gov/search?q=jupiter";

const INPUT = document.getElementById ("inputBuscar");

const BOTON = document.getElementById ("btnBuscar");

const CONTENEDOR = document.getElementById ("contenedor");

let getJSONData = function (url) {
    let res = {};
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (response) {
        res.status = "ok";
        res.data = response;
  
        return res;
      })
      .catch(function (error) {
        res.status = "error";
        res.data = error;
  
        return res;
      });
  };

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(traerUrl()).then(function (resultObj) {
    if (resultObj.status === "ok") {
      const data = resultObj.data.collection.items;


      mostrarCartas (data);
    }
  });
});

const mostrarCartas = (array) => {
    array.forEach((element) => {
      const img = element.links[0].href;
      const titulo = element.data[0].title;
      const descripcion = element.data[0].description;
      const fecha = element.data[0].date_created;
  
      CONTENEDOR.innerHTML +=` 
      <div class="col-md-4 p-2">
        <div class="card shadow-sm">
          <img src="${img}" alt="" class="card-img-top imagen-carta" >
            <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text barra">${descripcion}</p>
            <p class="card-text"><small class="text-muted"> ${fecha} </small></p>
          </div>
        </div>
      </div>
      `;
    });
  };

  BOTON.onclick = () => {
    const VALOR = INPUT.value.toLowerCase();
    console.log(VALOR);

 URLnasa = "https://images-api.nasa.gov/search?q=" + VALOR;
 console.log (URLnasa);

 localStorage.setItem("url",URLnasa);
 location.reload();
  };

  const traerUrl = () => {
    return localStorage.getItem ("url");
  };


