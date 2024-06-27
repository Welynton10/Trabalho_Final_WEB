document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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

    function removeFromCartItem(productName) {
        const cartItemIndex = cart.findIndex(item => item.name === productName);
        if (cartItemIndex !== -1) {
            const cartItem = cart[cartItemIndex];
            totalAmount -= cartItem.price * cartItem.quantity;

            cart.splice(cartItemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('totalAmount', totalAmount.toFixed(2));
            updateCart();
        }
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-item')) {
            const productName = event.target.getAttribute('data-name');
            removeFromCartItem(productName);
        }
    });

    updateCart();
});
