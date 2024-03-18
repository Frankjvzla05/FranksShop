let cantidadProductosEnCarrito = 0;
let montoTotal = 0;
const productosEnCarrito = [];

const promoDescuento = 5;
const porcentajeDescuento = 10;

function agregarAlCarrito(nombre, precio) {
    cantidadProductosEnCarrito += 1;
    montoTotal += precio;
    productosEnCarrito.push({ nombre: nombre, precio: precio });
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    montoTotal -= productosEnCarrito[index].precio;
    productosEnCarrito.splice(index, 1);
    cantidadProductosEnCarrito -= 1;
    actualizarCarrito();
}

function actualizarCarrito() {
    console.log("Cantidad de productos:", cantidadProductosEnCarrito);
    console.log("Monto total: $", montoTotal.toFixed(2));
   
    document.getElementById("cantidadProductosEnCarrito").textContent = cantidadProductosEnCarrito;
    document.getElementById("montoTotal").textContent = montoTotal.toFixed(2);
   
    const productosCarrito = document.getElementById("productosCarrito");
    productosCarrito.innerHTML = "";

    productosEnCarrito.forEach((producto, index) => {
        const productoHTML = `
            <div>
                <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
        `;
        productosCarrito.innerHTML += productoHTML;
    });

    if (cantidadProductosEnCarrito >= promoDescuento) {
        const descuento = (montoTotal * porcentajeDescuento) / 100;
        montoTotal -= descuento;
        document.getElementById("descuentoMensaje").textContent = `¡Felicidades! Se aplicó un ${porcentajeDescuento}% de descuento. Descuento aplicado: $${descuento.toFixed(2)}. Nuevo monto total: $${montoTotal.toFixed(2)}`;
    } else {
        document.getElementById("descuentoMensaje").textContent = "No se aplicó ningún descuento.";
    }

    document.getElementById("montoTotal").textContent = montoTotal.toFixed(2);
}