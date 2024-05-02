let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);
const containerEmptyCart = document.querySelector("#empty-cart");
const containerCartProducts = document.querySelector("#products-cart");
const containerHandleCart = document.querySelector("#handle-cart");
const containerPurchasedCart = document.querySelector("#purchased-cart");
let deleteButtons = document.querySelectorAll(".product-cart-delete");
const clearButton = document.querySelector("#handle-cart-delete");
const containerTotal = document.querySelector("#total");
const buyButton = document.querySelector("#handle-cart-buy");

function loadProductsCart() {
    if (productsInCart && productsInCart.length > 0) {
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
                <button class="product-cart-delete" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            containerCartProducts.append(div);
        })
    } else {
        containerEmptyCart.classList.remove("disabled");
        containerCartProducts.classList.add("disabled");
        containerHandleCart.classList.add("disabled");
        containerPurchasedCart.classList.add("disabled");
    }
    updateDeleteButtons();
    updateTotal();
}

const updateDeleteButtons = () => {
    deleteButtons = document.querySelectorAll(".product-cart-delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

function removeFromCart(e) {
    const buttonId = e.currentTarget.id;
    const index = (productsInCart.findIndex(product => product.id.toString() === buttonId));
    console.log('pc', productsInCart);

    productsInCart.splice(index, 1);

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    loadProductsCart();
}
loadProductsCart();

clearButton.addEventListener("click", emptyCart);
function emptyCart() {
    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    loadProductsCart();

}

function updateTotal() {
    const totalCalculate = productsInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    total.innerText = `$${totalCalculate}`;
}

buyButton.addEventListener("click", buyCart);
function buyCart() {
    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    containerEmptyCart.classList.add("disabled");
    containerCartProducts.classList.add("disabled");
    containerHandleCart.classList.add("disabled");
    clearButton.classList.add("disabled");
    buyButton.classList.add("disabled");
    containerPurchasedCart.classList.remove("disabled");
}