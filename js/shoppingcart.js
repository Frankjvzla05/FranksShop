const productsInCart = JSON.parse(localStorage.getItem("products-in-cart"));

const containerEmptyCart = document.querySelector("#empty-cart");
const containerCartProducts = document.querySelector("#products-cart");
const containerHandleCart = document.querySelector("#handle-cart");
const containerPurchasedCart = document.querySelector("#purchased-cart");

if (productsInCart) {
    containerEmptyCart.classList.add("disabled");
    containerCartProducts.classList.remove("disabled");
    containerHandleCart.classList.remove("disabled");
    containerPurchasedCart.classList.add("disabled");

    containerCartProducts.innerHTML = "";
    productsInCart.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product-cart");
        div.innerHTML = `
            <img class="product-cart-imagen" src="${product.image}" alt="${product.title}">
            <div class="product-cart-titulo">
                <small>Título</small>
                <h3>${product.title}</h3>
            </div>
            <div class="product-cart-cantidad">
                <small>Cantidad</small>
                <p>${product.quantity}</p>
            </div>
            <div class="product-cart-precio">
                <small>Precio</small>
                <p>$${product.price}</p>
            </div>
            <div class="product-cart-subtotal">
                <small>Subtotal</small>
                <p>$${product.price * product.quantity}</p>
            </div>
            <button class="product-cart-eliminar" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
        `;

        containerCartProducts.append(div);
    })
} else {
    containerEmptyCart.classList.remove("disabled");
    containerCartProducts.classList.add("disabled");
    containerHandleCart.classList.add("disabled");
    containerPurchasedCart.classList.add("disabled");
}