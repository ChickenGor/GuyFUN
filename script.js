document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cartCountSpan = document.querySelector('.cart-count');
    let cartItemsArray = [];
    const cartDropdown = document.createElement('div');
    cartDropdown.className = 'cart-dropdown';
    document.body.appendChild(cartDropdown);

    function updateCartCount() {
        let totalItems = 0;
        cartItemsArray.forEach(item => {
            totalItems += item.quantity;
        });
        cartCountSpan.textContent = totalItems;
    }

    function handleAddToCart(productName, productPrice, productImage) {
        let itemFound = false;
        cartItemsArray.forEach(item => {
            if (item.name === productName) {
                item.quantity++;
                itemFound = true;
            }
        });

        if (!itemFound) {
            cartItemsArray.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            });
        }
        updateCartCount();
        alert(`RM${productPrice} added to cart!`);
        renderCartDropdown();
    }



    function renderCartDropdown() {
        cartDropdown.innerHTML = '';
        if (cartItemsArray.length === 0) {
            cartDropdown.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        } else {
            const ul = document.createElement('ul');
            ul.className = 'cart-items';
            cartItemsArray.forEach(item => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                li.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">  
                        <div>
                            <p>${item.name} (${item.quantity} x RM${item.price.toFixed(2)})</p>
                        </div>
                         <button class="quantity-button minus-button" data-item-name="${item.name}">-</button>
                         <span style="margin: 0 8px;">${item.quantity}</span>
                         <button class="quantity-button plus-button" data-item-name="${item.name}">+</button>
                    </div>
                    <div>
                        RM${(item.price * item.quantity).toFixed(2)}
                    </div>
                `;
                ul.appendChild(li);
            });
            cartDropdown.appendChild(ul);

            const total = document.createElement('p');
            total.className = 'cart-total';
            total.textContent = `Total: RM${cartItemsArray.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`;
            cartDropdown.appendChild(total);

            const checkoutButton = document.createElement('button');
            checkoutButton.className = 'checkout-button';
            checkoutButton.textContent = 'Checkout';
            checkoutButton.onclick = () => {
                alert('Proceeding to checkout...');
                cartItemsArray.length = 0;
                updateCartCount();
                cartDropdown.style.display = 'none';
            };
            cartDropdown.appendChild(checkoutButton);

            const quantityButtons = cartDropdown.querySelectorAll('.quantity-button');
            quantityButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const itemName = this.dataset.itemName;
                    const itemToUpdateIndex = cartItemsArray.findIndex(item => item.name === itemName);

                    if (itemToUpdateIndex > -1) {
                        if (this.classList.contains('plus-button')) {
                            cartItemsArray[itemToUpdateIndex].quantity++;
                        } else if (this.classList.contains('minus-button')) {
                            cartItemsArray[itemToUpdateIndex].quantity--;
                            if (cartItemsArray[itemToUpdateIndex].quantity < 1) {
                                cartItemsArray.splice(itemToUpdateIndex, 1);
                            }
                        }
                        updateCartCount();
                        renderCartDropdown();
                        if (cartItemsArray.length === 0) {
                            cartDropdown.style.display = 'none';
                        }
                    }
                });
            });
        }
    }
    
    cartButton.addEventListener('click', () => {
        renderCartDropdown();
        cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const productImage = this.parentElement.querySelector('img').src;
            handleAddToCart(productName, productPrice, productImage);
        });
    });
    
});

