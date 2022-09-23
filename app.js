let gondolas = [
    {id : 1, nombre : "Parrilla de 90 cm", precio : 1000, marca : "parrillas zona sur", imagen : "./imagenes/parrilla-completa.jpg",},
    {id : 2, nombre : "Brasero De Mesa Enlozado", precio : 1200, marca : "parrillas zona sur", imagen : "./imagenes/Brasero-De-Mesa-Enlozado-Clasico.jpg",},
    {id : 3, nombre : "Tabla AL Recta (50X30)", precio : 800, marca : "parrillas zona sur", imagen : "./imagenes/Tabla-Recta.jpg",},
    {id : 4, nombre : "Juego Parrillero Forjado", precio : 4500, marca : "parrillas zona sur", imagen : "./imagenes/Juego-Parrillero-Forjado-Triple-Gris-con-Soporte.jpg",},
    {id : 5, nombre : "fogon tamaño medio", precio : 2350, marca : "parrillas zona sur", imagen : "./imagenes/fogon tamaño medio.jpg",},
    {id : 6, nombre : "Disco c/patas Desmontables", precio : 1890, marca : "parrillas zona sur", imagen : "./imagenes/Disco c patas desmontable.jpg",},
    {id : 7, nombre : "Asador Redondo 120 cm", precio : 3700, marca : "parrillas zona sur", imagen : "./imagenes/Asador Redondo 120 cm.jpg",},
];

let boton = document.getElementById("tienda");
boton.addEventListener("click", respuesta);


function respuesta() {
    let cambio = document.getElementById("cartelIngreso");
    cambio.innerHTML = "";

    insertarCards();
    recuperacion();
}




const insertarCards = () => {

    let contenedor = document.getElementById("container");
    gondolas.forEach((gondola,indice)=>{
        let card=document.createElement("div")
        card.classList.add("card", "col-sm-12","col-lg-3", "m-3")
        card.innerHTML = `<img src="${gondola.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${gondola.nombre}</h5>
          <h6 class="card-title">marca: ${gondola.marca}</h6>
          <p class="card-text">$${gondola.precio}</p>
          <a id="botonAccion" class="btn btn-info" onClick="agregado(${indice})">Comprar</a>
        </div>`

        contenedor.appendChild(card);
    })
}

const agregado = (indice) => {
    let indexArticulos = carroVacio.findIndex((elemento)=>{
        return elemento.id === gondolas[indice].id
    });
    if (indexArticulos === -1) {
        let meterDentro = gondolas[indice]
        meterDentro.cantidad = 1;
        carroVacio.push(meterDentro);
        vistaCarrito();
    } else {
        carroVacio[indexArticulos].cantidad += 1;
        vistaCarrito();
    }

}

let total = 0;
let carroVacio = [];

let contenedor2 = document.getElementById("carrito");

const vistaCarrito = () => {
    contenedor2.className = "carritoEstilo";
    contenedor2.innerHTML = "";
    if (carroVacio.length > 0) {
        carroVacio.forEach((producto, indice) => {
            total = total + producto.precio * producto.cantidad;
            let carritoNuevo = document.createElement("div");
            carritoNuevo.classList.add("p-3", "d-flex", "justify-content-between");
            carritoNuevo.innerHTML=
            `
            <img class="imgs-carrito" src="${producto.imagen}"/>
            <div class="productos-caracteristicas"> ${producto.nombre} </div>
            <div class="productos-caracteristicas"> cantidad : ${producto.cantidad} </div>
            <div class="productos-caracteristicas">precio : $${producto.precio} </div>
            <div class="productos-caracteristicas">subtotal : $ ${producto.precio * producto.cantidad} </div>
            `;
            contenedor2.appendChild(carritoNuevo);


            subidaJson();
        });
    }
}

const subidaJson = () => {
    let carritoStr = JSON.stringify(carroVacio);

    let copiaSeguridad = localStorage.setItem ("carritoGuardado", carritoStr)
}








