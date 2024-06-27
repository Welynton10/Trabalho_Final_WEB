const menuButton = document.querySelector(".menu-button");
const navbar = document.querySelector(".navbar");
const cartIcon = document.querySelector(".nav-icon-container img:first-child");
const cart = [];
let totalAmount = 0;

menuButton.addEventListener('click', () => {
    navbar.classList.toggle("show-menu");
});

// Save cart to localStorage before redirecting
cartIcon.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    window.location.href = 'carrinho.html';
});

// Function to add product to cart
function addToCart(product) {
    const productName = product.querySelector('.product-name').innerText;
    const productPrice = parseFloat(product.querySelector('.product-price span').innerText.replace('.', '').replace(',', '.'));
    const productStockElement = product.querySelector('.product-stock span');
    let productStock = parseInt(productStockElement.innerText);

    if (productStock <= 0) {
        alert('Produto fora de estoque!');
        return;
    }

    const cartItem = cart.find(item => item.name === productName);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    totalAmount += productPrice;
    productStock--;
    productStockElement.innerText = productStock;
    updateCart();
}

// Function to remove product from cart
function removeFromCart(product) {
    const productName = product.querySelector('.product-name').innerText;
    const cartItemIndex = cart.findIndex(item => item.name === productName);
    
    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        const productStockElement = product.querySelector('.product-stock span');
        let productStock = parseInt(productStockElement.innerText);

        totalAmount -= cartItem.price * cartItem.quantity;
        productStock += cartItem.quantity;
        productStockElement.innerText = productStock;

        cart.splice(cartItemIndex, 1);
        updateCart();
    }
}

// Function to update cart
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} - R$${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}
            <button class="remove-from-cart-item" data-name="${item.name}">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const cartTotal = document.querySelector('.cart-total span');
    cartTotal.innerText = totalAmount.toFixed(2).replace('.', ',');
}

// Function to remove item from cart directly from the cart container
function removeFromCartItem(productName) {
    const cartItemIndex = cart.findIndex(item => item.name === productName);
    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        const product = document.querySelector(`.product-name:contains('${productName}')`).closest('.product');
        const productStockElement = product.querySelector('.product-stock span');
        let productStock = parseInt(productStockElement.innerText);

        totalAmount -= cartItem.price * cartItem.quantity;
        productStock += cartItem.quantity;
        productStockElement.innerText = productStock;

        cart.splice(cartItemIndex, 1);
        updateCart();
    }
}

// Event listeners for adding products to cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        addToCart(product);
    });
});

// Event listeners for removing products from cart
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart-item')) {
        const productName = event.target.getAttribute('data-name');
        removeFromCartItem(productName);
    } else if (event.target.classList.contains('remove-from-cart')) {
        const product = event.target.closest('.product');
        removeFromCart(product);
    }
});
