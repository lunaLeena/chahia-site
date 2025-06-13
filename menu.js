// Menu Data - Contains information about the 6 Algerian dishes 
const menuItems = [
    {
        id: 1,
        name: "Couscous Royal",
        description: "Traditional Algerian couscous with lamb, chicken, merguez sausage, and a variety of vegetables in a flavorful broth.",
        price: 1200, 
        image: "./images/couscoucRoyal.jpg",
        category: "main", 
        isLiked: false
    },
    {
        id: 2,
        name: "Chakhchoukha",
        description: "Torn pieces of thin flatbread in a tomato and lamb sauce with chickpeas and aromatic spices.",
        price: 1000,
        image: "./images/chakhchoukha.jpg",
        category: "main",
        isLiked: false
    },
    {
        id: 3,
        name: "Dolma",
        description: "Stuffed grape leaves and vegetables with seasoned rice and minced meat, slowly cooked in olive oil.",
        price: 900,
        image: "./images/dolma.jpg",
        category: "appetizer",
        isLiked: false
    },
    {
        id: 4,
        name: "Tajine",
        description: "Slow-cooked meat stew with vegetables, dried fruits, and aromatic spices served with fresh bread.",
        price: 850,
        image: "./images/tajine.jpg",
        category: "main",
        isLiked: false
    },
    {
        id: 5,
        name: "Chorba-Frik",
        description: "Spiced tomato soup with lamb and herbs served alongside crispy meat-filled pastry rolls.",
        price: 600,
        image: "./images/chorba-Frik.jpg",
        category: "main", 
        isLiked: false
    },
    {
        id: 6,
        name: "Chtitha-Lhem",
        description: "Slow-cooked lamb in a rich red pepper and garlic sauce, served with traditional bread.",
        price: 1000,
        image: "./images/chtethaLhem.jpg",
        category: "main",
        isLiked: false
    }
];

// Function to display menu items on the page
function displayMenuItems() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    menuContainer.innerHTML = '';

    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.dataset.id = item.id;

        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-info">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">${item.price.toFixed(2)} DA</span>
                </div>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-actions">
                    <button class="like-btn ${item.isLiked ? 'active' : ''}" data-id="${item.id}">
                        <i class="${item.isLiked ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="order-btn" data-id="${item.id}">Add to Order</button>
                </div>
            </div>
        `;

        menuContainer.appendChild(menuItemElement);
    });

    // Add event listeners to the like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', toggleLike);
    });

    // Add event listeners to the order buttons 
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Function to toggle like status
function toggleLike(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const index = menuItems.findIndex(item => item.id === id);

    if (index !== -1) {
        menuItems[index].isLiked = !menuItems[index].isLiked;

        //  heart icon
        const likeBtn = e.currentTarget;
        const heartIcon = likeBtn.querySelector('i');

        likeBtn.classList.toggle('active'); 

        if (menuItems[index].isLiked) {
            heartIcon.classList.remove('far'); 
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas'); 
            heartIcon.classList.add('far');
        }

        // Save liked items to local storage
        saveMenuState();
    }
}

// Function to find a menu item by ID (used by cart.js)
function findMenuItem(id) {
    return menuItems.find(item => item.id === id);
}

// Function to save menu state (likes) to local storage
function saveMenuState() {
    // On ne sauvegarde que les IDs et leurs états 'isLiked' pour être plus léger
    const likedStates = menuItems.map(item => ({ id: item.id, isLiked: item.isLiked }));
    localStorage.setItem('menuItemsLikedState', JSON.stringify(likedStates));
}

// Function to load menu state (likes) from local storage
function loadMenuState() {
    const savedLikedState = localStorage.getItem('menuItemsLikedState');
    if (savedLikedState) {
        const parsedLikedState = JSON.parse(savedLikedState);

        parsedLikedState.forEach(savedItem => {
            const index = menuItems.findIndex(item => item.id === savedItem.id);
            if (index !== -1) {
                menuItems[index].isLiked = savedItem.isLiked;
            }
        });
    }
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadMenuState(); // Load liked states first
    displayMenuItems(); // Then display menu items with loaded states
});