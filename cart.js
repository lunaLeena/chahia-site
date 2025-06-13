// Cart functionality
let cart = []; // Array to hold cart items

// Function to add an item to the cart
function addToCart(e) {
   
    const id = parseInt(e.currentTarget.dataset.id);
    const item = findMenuItem(id);

    if (item) {
        // Check if the item is already in the cart
        const existingItem = cart.find(cartItem => cartItem.id === id);

        if (existingItem) {
            // Increase quantity if already in cart
            existingItem.quantity += 1;
        } else {
            // Add new item to cart
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            });
        }

        // Update the cart UI
        updateCartCount();
        saveCartState();

        // Show a notification (assuming showNotification is defined)
        showNotification(`${item.name} added to your order!`);
    }
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to display cart items in the modal
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotal) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <a href="#menu" class="btn" id="browse-menu">Browse Menu</a>
            </div>
        `;
        cartTotal.textContent = '0.00 DA'; // Display 0.00 DA when empty
        return;
    }

    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price.toFixed(2)} DA</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <span class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = `${total.toFixed(2)} DA`; // Display total

    // Add event listeners to the quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });
}

// Function to increase item quantity
function increaseQuantity(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
        updateCartCount();
        displayCartItems(); // Re-render cart to show updated quantity and total
        saveCartState();
    }
}

// Function to decrease item quantity
function decreaseQuantity(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity -= 1;

        if (cartItem.quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart = cart.filter(item => item.id !== id);
        }

        updateCartCount();
        displayCartItems(); // Re-render cart to show updated quantity and total
        saveCartState();
    }
}

// Function to remove an item from the cart
function removeFromCart(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    cart = cart.filter(item => item.id !== id); // Remove item from cart array

    updateCartCount();
    displayCartItems(); // Re-render cart after removal
    saveCartState();
}

// Function to save cart state to local storage
function saveCartState() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart state from local storage
function loadCartState() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Show the notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}


// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCartState(); // Load cart state from local storage on page load
    updateCartCount(); // Update cart count in header

    // Cart modal functionality (only opening/closing the cart modal itself)
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');

    if (cartIcon && cartModal && closeModal) {
        cartIcon.addEventListener('click', () => {
            displayCartItems(); // Display items when cart modal is opened
            cartModal.style.display = 'block'; // Show cart modal
        });

        closeModal.addEventListener('click', () => {
            cartModal.style.display = 'none'; // Hide cart modal
        });
    }

    // Close cart modal when clicking outside
    window.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cart-modal');
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Browse menu button in empty cart 
    document.addEventListener('click', (e) => {
        if (e.target.id === 'browse-menu') {
            document.getElementById('cart-modal').style.display = 'none';
        }
    });
});

// Add notification styles to the document
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--algerian-green);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});