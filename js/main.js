let products = [];
let categories = [];
const container = document.getElementById('products');
const categoryButtons = document.querySelectorAll(".category-button");
const mainTitle = document.querySelector("#main-title");
let buttonsAdd = document.querySelectorAll(".products-add");
const cartNumber = document.querySelector("#cartNumber");

const createProduct = (productData) => {
    const product = document.createElement("div");
    product.setAttribute("class", "product");
    const productImage = document.createElement("img");
    productImage.setAttribute('src', `${productData.image}`);
    product.appendChild(productImage);
    const productName = document.createElement("h3");
    const productNameText = document.createTextNode(`${productData.title}`);
    productName.appendChild(productNameText);
    product.appendChild(productName);

    const productPrice = document.createElement("p");
    const productPriceText = document.createTextNode(`$${productData.price}`);
    productPrice.appendChild(productPriceText);
    product.appendChild(productPrice);

    const addToCartButton = document.createElement("button");
    const addToCartButtonText = document.createTextNode("Añadir al carro");
    addToCartButton.appendChild(addToCartButtonText);
    addToCartButton.setAttribute('data-product-id', productData.id);
    addToCartButton.classList.add("products-add");
    product.appendChild(addToCartButton);

    container.appendChild(product);
    updateButtons();
}

const renderProducts = (productsData) => {
    container.innerHTML = "";
    productsData.forEach(product => {
        createProduct(product);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
            products = data;
        })
});



categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        categoryButtons.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all") {
            const productsByCategory = products.filter(product => product.category === e.currentTarget.id);
            mainTitle.innerText = e.currentTarget.id;
            renderProducts(productsByCategory);
        } else {
            mainTitle.innerText = "All Products";
            renderProducts(products);
        }
    });
});

const updateButtons = () => {
    buttonsAdd = document.querySelectorAll(".products-add");

    buttonsAdd.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}
let productsInCart;
let productsInCartLs = localStorage.getItem("products-in-cart");

if (productsInCartLs) {
    productsInCart = JSON.parse(productsInCartLs);
    updateCartNumber();
} else {
    productsInCart = [];
}


const addToCart = (e) => {
    const idButton = Number(e.target.getAttribute('data-product-id'));
    const addedProduct = products.find(product => product.id === idButton);

    if (productsInCart.some(product => product.id === idButton)) {
        const index = productsInCart.findIndex(product => product.id === idButton);
        productsInCart[index].quantity++;
    } else {
        addedProduct.quantity = 1;
        productsInCart.push(addedProduct)
    }

    updateCartNumber();
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

function updateCartNumber() {
    let newCartNumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    cartNumber.innerHTML = newCartNumber;

}



