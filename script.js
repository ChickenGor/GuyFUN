// script.js
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.querySelector('.cart-button'); // Updated selector
    let cartCount = 0;

    // Initialize cart count if needed (e.g., from local storage in a real app)
    cartButton.textContent = `Cart (${cartCount})`;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price).toFixed(2);
            cartCount++;
            cartButton.textContent = `Cart (${cartCount})`; // Update button text
            alert(`${productName} ($${productPrice}) added to cart!`);
            // In a real application, you would update a more persistent cart data structure here.
        });
    });

    // You might want to add an event listener to the cart button itself
    cartButton.addEventListener('click', function() {
        alert('Opening the cart...'); // Placeholder for cart functionality
        // In a real application, you would navigate to the cart page or show a cart modal.
    });
});