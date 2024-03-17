let cantidadProductosEnCarrito = 0;
let montoTotal = 0;
const productosEnCarrito = [];

const promoDescuento = 5;
const porcentajeDescuento = 10;

function agregarAlCarrito(nombre, precio) {
    cantidadProductosEnCarrito +=1;
    montoTotal += precio;
    productosEnCarrito.push(nombre);
    actualizarCarrito();
}

function actualizarCarrito() {
    console.log("Cantidad de productos:", cantidadProductosEnCarrito);
    console.log("Monto total: $", montoTotal.toFixed(2));

    console.log("Detalle de productos en el carrito:");
    for (let i = 0; i < cantidadProductosEnCarrito; i+=1) {
        console.log(`Producto ${i + 1}: ${productosEnCarrito[i]}`);
    }

    if (cantidadProductosEnCarrito >= promoDescuento) {
        const descuento = (montoTotal * porcentajeDescuento) / 100;
        montoTotal -= descuento;
        console.log(`¡Felicidades! Se aplicó un ${porcentajeDescuento}% de descuento. Descuento aplicado: $${descuento.toFixed(2)}. Nuevo monto total: $${montoTotal.toFixed(2)}`);
    } else {
        console.log("No se aplicó ningún descuento.");
    }



    console.log("Monto total: $", montoTotal.toFixed(2));
    console.log("----------------------------------------------");

}
