

var articulosCompra = 0;
var login = true;

var pressCarrito = false;


function saludo(){
    alert("Hola pepe");
}

function carrito(){
    if(pressCarrito){
        pressCarrito = false
        document.getElementById("barra-lateral").style.display = "none";
    }else{
        pressCarrito = true
        document.getElementById("barra-lateral").style.display = "inline";
    }
    
}


function agregarAlCarrito(nombre, precio, imagen){
    articulosCompra += 1
    document.getElementById("carrito-contador").innerHTML = articulosCompra;

    document.getElementById("contenido-carrito").innerHTML +=`
    <div>
        <img src="${imagen}" alt="Imagen">
        <div>
            <p> ${nombre} </p>
            <p> ${precio} </p>
        </div>
    </div>
    `;
}

function comprar(){
    if(login){
        articulosCompra = 0
        document.getElementById("carrito-contador").innerHTML = articulosCompra;
    }else{
        alert("Para comprar debes iniciar secion");
    }
}
