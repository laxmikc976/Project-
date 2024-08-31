const products = [
    { id: 0, image: 'https://th.bing.com/th/id/OIP.1zjOQL3San_2EQnPAtWtvAHaFj?w=263&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7', title: 'marble', price: 120 },
    { id: 1, image: 'https://th.bing.com/th?q=Grey+Marble+Floor+Tiles&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247', title: 'grey marble', price: 60 },
    { id: 2, image: 'https://th.bing.com/th?q=Wooden+Floor+Tiles&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247', title: 'wooden', price: 90 },
    { id: 3, image: 'https://th.bing.com/th?q=Italian+Floor+Tiles&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247', title: 'italian', price: 60 },
    { id: 4, image: 'https://th.bing.com/th?q=European+Clay+Shingle+Roof+Tiles&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247', title: 'clay shingle roof', price: 60 },
    { id: 5, image: 'https://th.bing.com/th?q=European+Terrocotta+Tiles&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247', title: 'Terracotta', price: 60 },
    { id: 6, image: 'https://th.bing.com/th/id/OIP.kGLdB2CemeuyuNGWHb3OUgHaE6?w=232&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', title: 'Tiny home interior that big thing come in small packages', price: 60 },
    { id: 7, image: 'https://th.bing.com/th/id/OIP.o1FfiGadJ-ACmBGhJWEmegHaGm?w=207&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7', title: 'Modern home exteriors design ideas', price: 60 }
];

let cart = [];
let orders = [];
let trackingInfo = [];

// Render product list
document.getElementById('root').innerHTML = products.map((item, index) => {
    const { image, title, price } = item;
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='image' src=${image} alt=${title}>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$${price}.00</h2>
                <button onclick='addToCart(${index})'>Add to cart</button>
            </div>
        </div>
    `;
}).join('');

// Function to add items to cart
function addToCart(index) {
    cart.push({ ...products[index] });
    updateCart();
}

// Function to remove item from cart
function delElement(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to update cart
function updateCart() {
    let total = 0;
    document.getElementById('cart-item').innerHTML = cart.length === 0 ? 'Your cart is empty' : cart.map((item, index) => {
        total += item.price;
        return `
            <div class='cart-item'>
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <p>${item.title}</p>
                    <p>$${item.price}.00</p>
                    <button onclick="delElement(${index})">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('total').innerText = `$${total}.00`;
    document.getElementById('cart-count').innerText = cart.length;
}

// Toggle cart dropdown visibility
function toggleCart() {
    const dropdown = document.getElementById('cart-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Function to open the payment modal
function openPaymentModal() {
    document.getElementById('payment-modal').style.display = 'block';
}

// Function to close the payment modal
function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Function to confirm the payment
function confirmPayment() {
    const orderId = orders.length + 1;
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 7); // Delivery in 7 days
    const trackingNumber = `TRACK${Math.floor(Math.random() * 100000)}`; // Random tracking number

    orders.push({
        id: orderId,
        date: orderDate.toLocaleDateString(),
        deliveryDate: deliveryDate.toLocaleDateString(),
        trackingNumber
    });

    trackingInfo.push({
        id: trackingNumber,
        status: 'Shipped',
        shippingDate: orderDate.toLocaleDateString(),
        deliveryDate: deliveryDate.toLocaleDateString()
    });

    updateOrderHistory();
    updateTrackingHistory();

    cart = []; // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    // Show success message
    document.getElementById('payment-success-modal').style.display = 'block';
    closePaymentModal();
}

// Function to close the payment success modal
function closePaymentSuccessModal() {
    document.getElementById('payment-success-modal').style.display = 'none';
}

// Update order history
function updateOrderHistory() {
    const orderHistoryItems = document.getElementById('order-history-items');
    orderHistoryItems.innerHTML = orders.map(order => `
        <div class='order-history-item'>
            <strong>Order #${order.id}:</strong>
            <p>Date: ${order.date}</p>
            <p>Delivery Date: ${order.deliveryDate}</p>
            <p>Tracking Number: ${order.trackingNumber}</p>
        </div>
    `).join('');
}

// Update tracking history
function updateTrackingHistory() {
    const trackingHistoryItems = document.getElementById('tracking-history-items');
    trackingHistoryItems.innerHTML = trackingInfo.map(tracking => `
        <div class='tracking-history-item'>
            <strong>Tracking #${tracking.id}:</strong>
            <p>Status: ${tracking.status}</p>
            <p>Shipping Date: ${tracking.shippingDate}</p>
            <p>Delivery Date: ${tracking.deliveryDate}</p>
        </div>
    `).join('');
}

// Optionally, close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('payment-modal')) {
        closePaymentModal();
    }
}

// Optionally, close the success modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === document.getElementById('payment-success-modal')) {
        closePaymentSuccessModal();
    }
};
