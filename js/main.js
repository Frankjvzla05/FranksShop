let cantidadProductosEnCarrito = 0;
let montoTotal = 0;
let descuento = 0;
const productosEnCarrito = [];
window.sessionStorage.setItem('productQuantity', cantidadProductosEnCarrito);
window.sessionStorage.setItem('productsInCart', productosEnCarrito);
const promoDescuento = 5;
const porcentajeDescuento = 10;

function agregarAlCarrito(nombre, precio) {
    cantidadProductosEnCarrito += 1;
    montoTotal += precio;
    productosEnCarrito.push({ nombre: nombre, precio: precio });
    actualizarCarrito(montoTotal);
    actualizarCantidadProductosEnCarrito(cantidadProductosEnCarrito);
}
function actualizarCantidadProductosEnCarrito(cantidad) {
    document.getElementById("cantidadProductosEnCarrito").textContent = cantidad;
    window.sessionStorage.setItem('productQuantity', cantidad);
}

function eliminarDelCarrito(index) {
    montoTotal -= productosEnCarrito[index].precio;
    productosEnCarrito.splice(index, 1);
    cantidadProductosEnCarrito -= 1;
    actualizarCarrito(montoTotal);
    actualizarCantidadProductosEnCarrito(cantidadProductosEnCarrito);
}

function actualizarCarrito(montoTotal) {
    console.log("Cantidad de productos:", cantidadProductosEnCarrito);
    console.log("Monto total: $", montoTotal.toFixed(2));
    console.log("-------------------------------------------")

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
        descuento = (montoTotal * porcentajeDescuento) / 100;
        montoTotal -= descuento;
        console.log(`¡Felicidades! Se aplicó un ${porcentajeDescuento}% de descuento. Descuento aplicado: $${descuento.toFixed(2)}. Nuevo monto total: $${montoTotal.toFixed(2)}`);
        console.log("Monto con descuento: $", montoTotal.toFixed(2));
        console.log("-------------------------------------------")
        document.getElementById("descuentoMensaje").textContent = `¡Felicidades! Se aplicó un ${porcentajeDescuento}% de descuento. Descuento aplicado: $${descuento.toFixed(2)}. Nuevo monto total: $${montoTotal.toFixed(2)}`;
    } else {
        document.getElementById("descuentoMensaje").textContent = "No se aplicó ningún descuento.";
    }

    document.getElementById("montoTotal").textContent = montoTotal.toFixed(2);
}

const createProduct = (product) => {
    const producto = document.createElement("div");
    producto.setAttribute("class", "producto");
    const productImage = document.createElement("img");
    productImage.setAttribute('src', `${product.imagen}`);
    producto.appendChild(productImage);
    const productName = document.createElement("h3");
    const productNameText = document.createTextNode(`${product.nombre}`);
    productName.appendChild(productNameText);
    producto.appendChild(productName);

    const productPrice = document.createElement("p");
    const productPriceText = document.createTextNode(`$${product.precio}`);
    productPrice.appendChild(productPriceText);
    producto.appendChild(productPrice);

    const addToCartButton = document.createElement("button");
    const addToCartButtonText = document.createTextNode("Añadir al carro");
    addToCartButton.appendChild(addToCartButtonText);
    addToCartButton.setAttribute("onClick", `agregarAlCarrito('${product.nombre}' , ${product.precio})`)
    producto.appendChild(addToCartButton);

    const container = document.getElementById('productos');
    container.appendChild(producto);
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('/data/productos.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.map(product => {
                return (createProduct(product))
            });
        })

});

document.addEventListener('DOMContentLoaded', function () {
    const cantidadProductosEnCarrito = window.sessionStorage.getItem('productQuantity') || 0;

    const cantidadProductosP = document.querySelector('.cantidadProductosEnCarritoIcono');
    cantidadProductosP.textContent = cantidadProductosEnCarrito;
});