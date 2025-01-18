const products = [
    {
        id: 1,
        name: "Notebook - Spiral Bound",
        description: "200 pages, A4 size, durable cover",
        price: 120,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/fddc79ee-7b83-49b2-8699-75fa60c97bd0._CB316418626_.jpg",
        category: "notebooks"
    },
    {
        id: 2,
        name: "Ball Pen - Pack of 10",
        description: "Smooth writing, assorted colors",
        price: 90,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/bun047.jpg",
        category: "pens"
    },
    {
        id: 3,
        name: "Acrylic Paint Set",
        description: "12 vibrant colors, non-toxic",
        price: 350,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/4b3d34b5-cd4a-4d6e-b345-98f7f781540a.8075b9bcf3212df9df5b75f12ba3c28c.jpeg",
        category: "art"
    },
    {
        id: 4,
        name: "File Organizer",
        description: "Waterproof, holds up to 300 pages",
        price: 250,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/1272f30b-39e3-4232-9faf-79d5dd354254.a825c345c8d1f8433d09c472d3db6b89.jpeg",
        category: "office"
    },
    {
        id: 5,
        name: "Geometry Box",
        description: "Complete set with compass and protractor",
        price: 180,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/Classmate-1-1068x812.webp",
        category: "office"
    },
    {
        id: 6,
        name: "Sketch Pens - Set of 12",
        description: "Vibrant colors, fine tip",
        price: 120,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/th%20(1).jpeg",
        category: "art"
    },
    {
        id: 7,
        name: "Sticky Notes - Assorted",
        description: "Pack of 5, different sizes",
        price: 150,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/71ZR1BSOlTL._AC_SL1500_.jpg",
        category: "office"
    },
    {
        id: 8,
        name: "Whiteboard Markers",
        description: "Set of 4, quick-dry ink",
        price: 200,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/80678.jpg",
        category: "pens"
    },
    {
        id: 9,
        name: "Office Scissors",
        description: "Stainless steel, comfortable grip",
        price: 100,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/71M3gNZJCNL.jpg",
        category: "office"
    },
    {
        id: 10,
        name: "Highlighters - Pack of 5",
        description: "Fluorescent colors, chisel tip",
        price: 150,
        image: "https://raw.githubusercontent.com/Googlesdiscord/Database/refs/heads/main/21aaccd3-fb6a-4950-83db-53936b9fae07_1.e5a411ebf49cad87f98a8c3c550a35d1.jpeg",
        category: "pens"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts(category = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        }
    });

    attachAddToCartListeners();
}

function attachAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
            updateCartBadge();
            showNotification('Item added to cart!');
        });
    });
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = itemCount;
}

function showNotification(message) {
    alert(message); // For simplicity, using an alert. You can replace this with a custom notification.
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div>${item.name}</div>
                <div>₹${item.price}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartSummary();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartBadge();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxes = subtotal * 0.05;
    const total = subtotal + taxes;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('taxes').textContent = taxes.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

displayProducts();
updateCartBadge();

const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayProducts(button.dataset.category);
    });
});

const logo = document.getElementById('logo');
const slideMenu = document.getElementById('slideMenu');
const closeMenu = document.getElementById('closeMenu');

logo.addEventListener('click', () => {
    slideMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
    slideMenu.classList.remove('open');
});

const profilePhoto = document.getElementById('profilePhoto');
const photoUpload = document.getElementById('photoUpload');

profilePhoto.addEventListener('click', () => {
    photoUpload.click();
});

photoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

const supportBtn = document.getElementById('supportBtn');
const supportForm = document.getElementById('supportForm');
const sendSupportMsg = document.getElementById('sendSupportMsg');

supportBtn.addEventListener('click', () => {
    supportForm.style.display = supportForm.style.display === 'none' ? 'block' : 'none';
});

sendSupportMsg.addEventListener('click', () => {
    const name = document.getElementById('supportName').value;
    const email = document.getElementById('supportEmail').value;
    const message = document.getElementById('supportMessage').value;
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
    supportForm.style.display = 'none';
});

const charminarIcon = document.getElementById('charminarIcon');
charminarIcon.addEventListener('click', () => {
    alert('Dum hai toh order karo!');
});

const navIcons = document.querySelectorAll('.nav-icon');
navIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        const label = icon.getAttribute('alt');
        icon.setAttribute('title', label);
    });
});

const cartIcon = document.getElementById('cartIcon');
const cartPage = document.getElementById('cartPage');
const productGrid = document.getElementById('productGrid');

cartIcon.addEventListener('click', () => {
    if (cartPage.style.display === 'none') {
        cartPage.style.display = 'block';
        productGrid.style.display = 'none';
        displayCart();
    } else {
        cartPage.style.display = 'none';
        productGrid.style.display = 'grid';
    }
});

const homeIcon = document.getElementById('homeIcon');
homeIcon.addEventListener('click', () => {
    cartPage.style.display = 'none';
    productGrid.style.display = 'grid';
    displayProducts();
});

