// Dados dos produtos
const products = [
    {
        id: 1,
        name: "100x SHINY POTION",
        emoji: "✨",
        price: 3.00,
        category: "anime_fighters",
        description: "Poção para aumentar suas chances de Shiny",
        stock: 50,
        badge: "POPULAR"
    },
    {
        id: 2,
        name: "10.000 DIAMANTES",
        emoji: "💎",
        price: 5.00,
        category: "free_fire",
        description: "Diamantes para Free Fire",
        stock: 100,
        badge: "PROMOÇÃO"
    },
    {
        id: 3,
        name: "50.000 DIAMANTES",
        emoji: "💎",
        price: 20.00,
        category: "free_fire",
        description: "Diamantes para Free Fire",
        stock: 30
    },
    {
        id: 4,
        name: "100.000 DIAMANTES",
        emoji: "💎",
        price: 35.00,
        category: "free_fire",
        description: "Diamantes para Free Fire",
        stock: 0,
        badge: "ESGOTADO"
    },
    {
        id: 5,
        name: "500x SHINY POTION",
        emoji: "✨",
        price: 12.00,
        category: "anime_fighters",
        description: "Poção para aumentar suas chances de Shiny",
        stock: 25,
        badge: "ÚLTIMO LOTE"
    }
];

// Estado do carrinho
let cart = [];
let currentCategory = 'todos';
let searchTerm = '';
let currentCoupon = null;
let currentPaymentMethod = 'pix';

// Cupons de desconto
const coupons = {
    'BEMVINDO': 10, // 10% de desconto
    'ANGELS': 15,   // 15% de desconto
    'VIP': 20      // 20% de desconto
};

// Elementos do DOM
const productsContainer = document.getElementById('products-container');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const checkoutBtn = document.getElementById('checkout-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const previewModal = document.getElementById('preview-modal');
const previewClose = document.getElementById('preview-close');
const previewDetails = document.getElementById('preview-details');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const notification = document.getElementById('notification');
const couponInput = document.getElementById('coupon-input');
const applyCouponBtn = document.getElementById('apply-coupon');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartDiscount = document.getElementById('cart-discount');
const supportBtn = document.getElementById('support-btn');
const supportModal = document.getElementById('support-modal');
const supportClose = document.getElementById('support-close');
const paymentOptions = document.querySelectorAll('input[name="payment"]');

// Funções
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function filterProducts() {
    let filtered = products;
    
    // Filtrar por categoria
    if (currentCategory !== 'todos') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    // Filtrar por busca
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }
    
    // Ordenar
    const sortValue = sortSelect.value;
    switch (sortValue) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return filtered;
}

function displayProducts() {
    productsContainer.innerHTML = '';
    const filteredProducts = filterProducts();

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-results">Nenhum produto encontrado</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const isOutOfStock = product.stock === 0;
        const card = document.createElement('div');
        card.className = `product-card slideUp ${isOutOfStock ? 'out-of-stock' : ''}`;
        
        let badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        let stockHtml = `<div class="product-stock">${isOutOfStock ? 'Fora de estoque' : `${product.stock} em estoque`}</div>`;
        
        card.innerHTML = `
            ${badgeHtml}
            <div class="product-emoji">${product.emoji}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            ${stockHtml}
            <button class="add-to-cart" onclick="addToCart(${product.id})" ${isOutOfStock ? 'disabled' : ''}>
                ${isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'}
            </button>
        `;
        
        card.onclick = (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                showPreview(product);
            }
        };
        
        productsContainer.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        showNotification('Produto fora de estoque', 'error');
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity >= product.stock) {
            showNotification('Quantidade máxima atingida', 'error');
            return;
        }
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    showNotification(`${product.name} adicionado ao carrinho!`);
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (cartItem) {
        const newQuantity = cartItem.quantity + change;
        if (newQuantity > 0 && newQuantity <= product.stock) {
            cartItem.quantity = newQuantity;
            updateCart();
        } else if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            showNotification('Quantidade máxima atingida', 'error');
        }
    }
}

function calculateCartTotal() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    // Desconto do cupom
    if (currentCoupon) {
        discount += subtotal * (coupons[currentCoupon] / 100);
    }

    // Desconto do PIX
    if (currentPaymentMethod === 'pix') {
        discount += subtotal * 0.05; // 5% de desconto no PIX
    }

    const total = subtotal - discount;

    return { subtotal, discount, total };
}

function updateCart() {
    cartItems.innerHTML = '';
    const { subtotal, discount, total } = calculateCartTotal();

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-emoji">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    cartDiscount.textContent = `- R$ ${discount.toFixed(2)}`;
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function showPreview(product) {
    previewDetails.innerHTML = `
        <div class="preview-emoji">${product.emoji}</div>
        <h2>${product.name}</h2>
        <p class="preview-description">${product.description}</p>
        <div class="preview-price">R$ ${product.price.toFixed(2)}</div>
        <div class="preview-stock">
            ${product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
        </button>
    `;
    previewModal.style.display = 'block';
}

function applyCoupon() {
    const code = couponInput.value.toUpperCase();
    if (coupons[code]) {
        currentCoupon = code;
        showNotification(`Cupom ${code} aplicado com sucesso! ${coupons[code]}% de desconto`);
        updateCart();
    } else {
        showNotification('Cupom inválido', 'error');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Seu carrinho está vazio', 'error');
        return;
    }

    const { subtotal, discount, total } = calculateCartTotal();
    let message = "🛒 *Novo Pedido - Angels Store*\n\n";
    
    // Produtos
    message += "*Produtos:*\n";
    cart.forEach(item => {
        message += `${item.emoji} *${item.name}*\n`;
        message += `Quantidade: ${item.quantity}\n`;
        message += `Preço: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    // Resumo financeiro
    message += "\n💰 *Resumo do Pedido*\n";
    message += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    if (discount > 0) {
        message += `Desconto: R$ ${discount.toFixed(2)}\n`;
    }
    message += `Total: R$ ${total.toFixed(2)}\n\n`;
    
    // Informações de pagamento
    message += `💳 *Forma de pagamento:* ${currentPaymentMethod === 'pix' ? 'PIX (5% OFF)' : 'Cartão'}\n`;
    if (currentCoupon) {
        message += `🎟️ *Cupom aplicado:* ${currentCoupon}\n`;
    }

    // Informações adicionais
    message += "\n📦 *Informações da Entrega*\n";
    message += "✅ Entrega instantânea após confirmação\n";
    message += "✅ Suporte 24h via WhatsApp\n";
    message += "✅ Garantia de satisfação\n\n";

    message += "*Angels Store - A melhor loja de itens para games!*";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`);
}

// Event Listeners
cartToggle.onclick = () => cartModal.style.display = 'block';
cartClose.onclick = () => cartModal.style.display = 'none';
previewClose.onclick = () => previewModal.style.display = 'none';
checkoutBtn.onclick = checkout;

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    displayProducts();
});

searchBtn.addEventListener('click', () => {
    displayProducts();
});

sortSelect.addEventListener('change', () => {
    displayProducts();
});

categoryBtns.forEach(btn => {
    btn.onclick = () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        displayProducts();
    };
});

applyCouponBtn.onclick = applyCoupon;

paymentOptions.forEach(option => {
    option.addEventListener('change', (e) => {
        currentPaymentMethod = e.target.value;
        updateCart();
    });
});

window.onclick = (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
    if (e.target === previewModal) previewModal.style.display = 'none';
    if (e.target === supportModal) supportModal.style.display = 'none';
};

// Inicialização
displayProducts();
