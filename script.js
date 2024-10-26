

var articulosCompra = 0;
var login = false;


function saludo(){
    alert("Hola pepe");
}


function agregarAlCarrito(){
    if(login){
        articulosCompra += 1
    document.getElementById("carrito-contador").innerHTML = articulosCompra;
    }else{
        alert("Para agregar al carrito debes iniciar secion");
    }
}