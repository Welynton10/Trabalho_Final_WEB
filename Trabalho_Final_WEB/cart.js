document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const checkoutButton = document.querySelector('.checkout-button');
    const clearCartButton = document.querySelector('.clear-cart-button');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - R$${item.price.toFixed(2).replace('.', ',')} x ${item.quantity}
                <button class="remove-from-cart-item" data-name="${item.name}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.innerText = totalAmount.toFixed(2).replace('.', ',');
    }

    function addToCart(product) {
        const foundItem = cart.find(item => item.name === product.name);
        if (foundItem) {
            foundItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        totalAmount += product.price;

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalAmount', totalAmount.toFixed(2));

        updateCart();

        // Exibe uma notificação
        alert(`${product.name} foi adicionado ao carrinho!`);
    }

    function removeFromCartItem(productName) {
        const cartItemIndex = cart.findIndex(item => item.name === productName);
        if (cartItemIndex !== -1) {
            const cartItem = cart[cartItemIndex];
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
                totalAmount -= cartItem.price;
            } else {
                cart.splice(cartItemIndex, 1);
                totalAmount -= cartItem.price * cartItem.quantity;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('totalAmount', totalAmount.toFixed(2));
            updateCart();
        }
    }

    function clearCart() {
        cart = [];
        totalAmount = 0;
        localStorage.removeItem('cart');
        localStorage.removeItem('totalAmount');
        updateCart();
    }

    function checkout() {
        // Implemente aqui a lógica para finalizar a compra, se necessário
        alert('Compra finalizada!'); // Exemplo simples de alerta, você pode redirecionar para outra página, etc.
        clearCart(); // Limpa o carrinho após finalizar a compra
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-item')) {
            const productName = event.target.getAttribute('data-name');
            removeFromCartItem(productName);
        } else if (event.target === clearCartButton) {
            clearCart();
        } else if (event.target === checkoutButton) {
            checkout();
        } else if (event.target.classList.contains('add-to-cart-button')) {
            const productName = event.target.getAttribute('data-name');
            const productPrice = parseFloat(event.target.getAttribute('data-price'));
            addToCart({ name: productName, price: productPrice });
        }
    });

    updateCart();
});
