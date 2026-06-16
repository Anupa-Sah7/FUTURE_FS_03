// ============================================
// BELLA'S CAFE - COMPLETE JAVASCRIPT
// Bougainvillea Theme | Aesthetic Cafe Website
// ============================================

// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌸 Bella's Cafe - Bougainvillea website loaded!");
    
    // Update copyright year
    updateCopyrightYear();
    
    // Setup reservation form
    setupReservationForm();
    
    // Setup newsletter subscription
    setupNewsletter();
    
    // Setup smooth scrolling for all anchor links
    setupSmoothScrolling();
    
    // Load cart from localStorage
    loadCart();
    
    // Update cart display
    updateCartDisplay();
});

// ============================================
// 1. COPYRIGHT YEAR AUTO-UPDATE
// ============================================
function updateCopyrightYear() {
    const footerParagraph = document.querySelector('.footer-bottom p');
    if (footerParagraph) {
        const year = new Date().getFullYear();
        footerParagraph.innerHTML = `&copy; ${year} Bella's Cafe | Blooming with love 💮`;
    }
}

// ============================================
// 2. RESERVATION FORM HANDLER
// ============================================
function setupReservationForm() {
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const date = document.getElementById('date')?.value || '';
            const guests = document.getElementById('guests')?.value || '2 Guests';
            
            if (name && email) {
                alert(`🌸 Thank you ${name}! Your table reservation for ${guests} on ${date || 'soon'} has been received. We'll send a confirmation to ${email}. Can't wait to serve you! ✨`);
                form.reset();
            } else {
                alert("🌸 Please fill in your name and email to complete the reservation.");
            }
        });
    }
}

// ============================================
// 3. NEWSLETTER SUBSCRIPTION
// ============================================
function setupNewsletter() {
    const newsletterInput = document.getElementById('newsletter-email');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
}

function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput?.value;
    
    if (email && email.includes('@')) {
        alert(`🌸 Thanks for subscribing! ${email} will receive our blooming updates and exclusive offers.`);
        emailInput.value = '';
    } else {
        alert("🌸 Please enter a valid email address to subscribe.");
    }
}

// ============================================
// 4. SMOOTH SCROLLING FOR NAVIGATION
// ============================================
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-section a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// 5. MOBILE HAMBURGER MENU
// ============================================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}

// ============================================
// 6. MENU FILTERING SYSTEM
// ============================================
function filterMenu(category) {
    // Update active button styling
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    // Filter menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (category === 'all') {
            item.style.display = 'flex';
        } else {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === category) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    console.log(`🌸 Filtering menu: ${category}`);
}

// ============================================
// 7. SHOW MENU (Scroll to menu section)
// ============================================
function showMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// 8. ORDER ONLINE FUNCTION
// ============================================
function orderOnline() {
    alert("🛵 Order online coming soon! 🌸 For now, call us at +1 (555) 789-0123 or visit our cafe to place your order. We'd love to serve you in person!");
}

// ============================================
// 9. BOOK TABLE (Reservation)
// ============================================
function bookTable() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Highlight the form
        const form = document.getElementById('reservation-form');
        if (form) {
            form.style.transition = 'all 0.3s';
            form.style.boxShadow = '0 0 0 3px var(--primary)';
            setTimeout(() => {
                form.style.boxShadow = '';
            }, 1500);
        }
    }
}

// ============================================
// 10. SHOPPING CART SYSTEM
// ============================================
let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('bellasCafeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('bellasCafeCart', JSON.stringify(cart));
    updateCartDisplay();
}

function addToCart(itemName, price) {
    // Check if item already in cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    
    // Show added animation
    showAddToCartAnimation(itemName);
}

function showAddToCartAnimation(itemName) {
    // Create floating animation
    const notification = document.createElement('div');
    notification.innerHTML = `🌸 Added: ${itemName}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 100px;
        background: var(--primary, #e84393);
        color: white;
        padding: 10px 20px;
        border-radius: 50px;
        font-weight: bold;
        z-index: 2000;
        animation: fadeInUp 0.5s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#cart-animation-style')) {
        const style = document.createElement('style');
        style.id = 'cart-animation-style';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 1500);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">🌸 Your cart is empty<br>Add some delicious items!</div>';
        if (cartTotalSpan) cartTotalSpan.textContent = '$0.00';
        if (cartCountSpan) cartCountSpan.textContent = '0';
        return;
    }
    
    // Build cart items HTML
    let total = 0;
    let itemCount = 0;
    
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
                </div>
                <div>
                    <span style="font-weight: bold; margin-right: 10px;">$${itemTotal.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 1.2rem;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    if (cartTotalSpan) cartTotalSpan.textContent = `$${total.toFixed(2)}`;
    if (cartCountSpan) cartCountSpan.textContent = itemCount;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("🌸 Your cart is empty! Add some delicious items first.");
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `🌸 Order Summary:\n\n${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: $${total.toFixed(2)}\n\nProceed to payment?`;
    
    if (confirm(message + "\n\nClick OK to place your order (demo mode)")) {
        alert(`🌸 Thank you for your order! Total: $${total.toFixed(2)}\n\nWe'll prepare your order right away. You'll receive a confirmation SMS shortly.\n\n🌸 Bella's Cafe 💮`);
        cart = [];
        saveCart();
        toggleCart();
        updateCartDisplay();
    }
}

// ============================================
// 11. CLOSE CART WHEN CLICKING OUTSIDE
// ============================================
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartFloat = document.querySelector('.cart-float');
    
    if (cartSidebar && cartSidebar.classList.contains('open')) {
        if (!cartSidebar.contains(event.target) && !cartFloat?.contains(event.target)) {
            cartSidebar.classList.remove('open');
        }
    }
});

// ============================================
// 12. SCROLL REVEAL ANIMATION
// ============================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.menu-item, .gallery-item, .about-text, .about-image');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial styles for animation
const style = document.createElement('style');
style.textContent = `
    .menu-item, .gallery-item, .about-text, .about-image {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// Run reveal on scroll
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ============================================
// 13. WELCOME CONSOLE MESSAGE
// ============================================
console.log("%c🌸 Welcome to Bella's Cafe! 🌸", "color: #e84393; font-size: 16px; font-weight: bold;");
console.log("%c✨ Try our menu filter, add items to cart, and make a reservation! ✨", "color: #2d6a4f; font-size: 12px;");

// ============================================
// END OF JAVASCRIPT
// ============================================