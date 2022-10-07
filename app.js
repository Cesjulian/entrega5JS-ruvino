/*let gondolas = [
    {id : 1, nombre : "Parrilla de 90 cm", precio : 1000, marca : "parrillas zona sur", imagen : "./imagenes/parrilla-completa.jpg",},
    {id : 2, nombre : "Brasero De Mesa Enlozado", precio : 1200, marca : "parrillas zona sur", imagen : "./imagenes/Brasero-De-Mesa-Enlozado-Clasico.jpg",},
    {id : 3, nombre : "Tabla AL Recta (50X30)", precio : 800, marca : "parrillas zona sur", imagen : "./imagenes/Tabla-Recta.jpg",},
    {id : 4, nombre : "Juego Parrillero Forjado", precio : 4500, marca : "parrillas zona sur", imagen : "./imagenes/Juego-Parrillero-Forjado-Triple-Gris-con-Soporte.jpg",},
    {id : 5, nombre : "fogon tamaño medio", precio : 2350, marca : "parrillas zona sur", imagen : "./imagenes/fogon tamaño medio.jpg",},
    {id : 6, nombre : "Disco c/patas Desmontables", precio : 1890, marca : "parrillas zona sur", imagen : "./imagenes/Disco c patas desmontable.jpg",},
    {id : 7, nombre : "Asador Redondo 120 cm", precio : 3700, marca : "parrillas zona sur", imagen : "./imagenes/Asador Redondo 120 cm.jpg",},
];*/

// BOTONES DE INGRESOS SECCIONES PAGINAS
let boton = document.getElementById("tienda");
boton.addEventListener("click", respuesta);

let botones2 = document.getElementById("boton2")
botones2.addEventListener("click", respuesta2)

let botones3 = document.getElementById("boton3")
botones3.addEventListener("click", respuesta2)

// SWEET ALERT
function respuesta2 () {
    Swal.fire({
        title: 'En construcción',
        text: 'probá ingresando a la tienda =)',
        imageUrl: './imagenes/mono.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
      })
}
 
// RECUPERAR STORAGE Y PASO A LA TIENDA
function respuesta() {

    if (localStorage.getItem("carritoGuardado")) {

        carroVacio = JSON.parse(localStorage.getItem("carritoGuardado"));

        vistaCarrito();
        
    }
    
    let cambio = document.getElementById("cartelIngreso");
    cambio.innerHTML = "";

    insertarCards();
}

// GENERAR CARDS
const insertarCards = () => {

    let contenedor = document.getElementById("container");

    fetch(`/data.json`)
    .then((Resp)=> Resp.json())
    .then((gondolas)=>{

        gondolas.forEach((gondola,indice)=>{

        let card=document.createElement("div")
        card.classList.add("card", "col-sm-12","col-lg-3", "m-3")
        card.innerHTML = `<img src="${gondola.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${gondola.nombre}</h5>
          <h6 class="card-title">marca: ${gondola.marca}</h6>
          <p class="card-text">$${gondola.precio}</p>
          <a id="botonAccion" class="btn btnColor" onClick="agregado(${indice})">Comprar</a>
        </div>`

        contenedor.appendChild(card);
        })
    })
}


// AGREGAR ARTICULOS AL CARRITO
const agregado = (indice) => {

    Toastify({
        text: `agregaste este articulo al carrito!`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        className: "cartelToasty",
    }).showToast();
    

    fetch(`/data.json`)
    .then((Resp)=> Resp.json())
    .then((gondolas)=>{

        let indexArticulos = carroVacio.findIndex((elemento)=>{
            
            return elemento.id === gondolas[indice]

        })

    })
    
    if ( indexArticulos === -1) {
        
        let meterDentro = gondolas[indice].id
        meterDentro.cantidad = 1;
        carroVacio.push(meterDentro);
        vistaCarrito();
        
    } else {

        carroVacio[indexArticulos].cantidad += 1;
        vistaCarrito();
        
    }
}

total = 0;
let carroVacio = [];
let contenedor2 = document.getElementById("carrito");

// GENERAR CARRITO
const vistaCarrito = () => {

    contenedor2.className = "carritoEstilo";
    contenedor2.innerHTML = "";

    if (carroVacio.length > 0) {

        carroVacio.forEach((producto, indice) => {

            let carritoNuevo = document.createElement("div");
            carritoNuevo.classList.add("p-3", "d-flex", "justify-content-between");
            carritoNuevo.innerHTML=
            `
            <img class="imgs-carrito" src="${producto.imagen}"/>
            <div class="productos-caracteristicas"> ${producto.nombre} </div>
            <div class="productos-caracteristicas"> cantidad : ${producto.cantidad} </div>
            <div class="productos-caracteristicas">precio : $${producto.precio} </div>
            <div class="productos-caracteristicas">subtotal : $ ${producto.precio * producto.cantidad} </div>
            <div class="productos-caracteristicas">
            <a  class="btn btnColor m-3" onClick="borrarArticulo(${indice})">eliminar articulo</a>
            
            `;

            contenedor2.appendChild(carritoNuevo);

            subidaJson();
        });
    }

    // ACTUALIZACION DEL TOTAL
    actualizarTotal();

    if (carroVacio.length > 0) {

        // MOSTRAR TOTAL
        let sumaFinal = document.createElement("div");
        sumaFinal.classList.add("p-3", "d-flex", "justify-content-center");
        sumaFinal.innerHTML=
        `<div class="productos-caracteristicas estiloTotal justify-content-center" > Suma total del productos: $${total} </div>`
        
        contenedor2.appendChild(sumaFinal);

        // BOTON VACIAR CARRITO
        let vaciar = document.createElement("div");
        vaciar.classList.add("p-3", "d-flex", "justify-content-center");
        vaciar.innerHTML=
        `<a  class="btn btn-info" onClick="vaciarCarrito()">vaciar carrito</a>`
    
        contenedor2.appendChild(vaciar);

        // BOTON FINALIZAR COMPRA
        let finalizarCompra = document.createElement("div");
        finalizarCompra.classList.add("p-3", "d-flex", "justify-content-center");
        finalizarCompra.innerHTML=
        `<a  class="btn btn-info" onClick="ejecutarCarrito()">finalizar compra!</a>`
    
        contenedor2.appendChild(finalizarCompra);
    }
}



const borrarArticulo = (indice) => {

    carroVacio.splice(indice,1);

    vistaCarrito();
}

function actualizarTotal() {

    let totalFinal = carroVacio.reduce((acc, cv) => {
        return acc + cv.precio * cv.cantidad;
    }, 0);

    total = totalFinal;
}

function vaciarCarrito () {

    carroVacio = [];
    localStorage.clear(); 

    contenedor2.className = "";
    contenedor2.innerHTML = "";

}

function ejecutarCarrito() {

    contenedor2.className="";
    contenedor2.classList.add("finalizacionEstilo", "d-flex","flex-column", "justify-content-between")
    contenedor2.innerHTML = 
    `
    <div class="d-flex justify-content-center">
        <h1 class="text-center">
            <br> felicitaciones usuario! completaste tu compra <br>
            <br> el total de tu compra es de $ ${total}.- <br>
        </h1>
    </div>
    <div class="d-flex justify-content-center">
        <p class = "text-center">(si volves a agregar alguna cantidad de algún articulo vas a poder volver a visualizar el carrito)</p>
    </div>
    `;

}

const subidaJson = () => {

    let carritoStr = JSON.stringify(carroVacio);

    let copiaSeguridad = localStorage.setItem ("carritoGuardado", carritoStr)
}
