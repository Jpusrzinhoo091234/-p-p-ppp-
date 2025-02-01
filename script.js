// Gerenciamento do Carrinho
let carrinhoItems = [];
let carrinhoQuantidade = 0;
let carrinhoTotal = 0;

function adicionarAoCarrinho(id, nome, preco, imagem) {
    // Adiciona o item ao carrinho
    carrinhoItems.push({
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem,
        quantidade: 1
    });
    
    carrinhoQuantidade++;
    carrinhoTotal += preco;
    
    atualizarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
    
    // Animação do botão
    const botao = event.target;
    botao.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
    botao.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        botao.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
        botao.style.backgroundColor = '';
    }, 2000);
}

function atualizarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho-quantidade');
    const carrinhoItemsElement = document.getElementById('carrinho-items');
    const carrinhoTotalElement = document.getElementById('carrinho-total');
    
    carrinhoElement.textContent = carrinhoQuantidade;
    carrinhoTotalElement.textContent = carrinhoTotal.toFixed(2);
    
    // Atualiza a lista de items no dropdown
    carrinhoItemsElement.innerHTML = '';
    carrinhoItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" width="50">
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)}</p>
            </div>
            <button onclick="removerDoCarrinho(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        carrinhoItemsElement.appendChild(itemElement);
    });
}

function removerDoCarrinho(id) {
    const index = carrinhoItems.findIndex(item => item.id === id);
    if (index > -1) {
        const item = carrinhoItems[index];
        carrinhoTotal -= item.preco * item.quantidade;
        carrinhoQuantidade -= item.quantidade;
        carrinhoItems.splice(index, 1);
        atualizarCarrinho();
        mostrarNotificacao('Produto removido do carrinho!');
    }
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Slider do Banner
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Autoplay do slider
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Sistema de Favoritos
function toggleFavorito(element) {
    element.classList.toggle('favorito');
    if (element.classList.contains('favorito')) {
        element.innerHTML = '<i class="fas fa-heart"></i>';
        mostrarNotificacao('Produto adicionado aos favoritos!');
    } else {
        element.innerHTML = '<i class="far fa-heart"></i>';
        mostrarNotificacao('Produto removido dos favoritos!');
    }
}

// Sistema de Autenticação
const AUTH_KEY = 'angels_store_auth';
const USERS_KEY = 'angels_store_users';
const ORDERS_KEY = 'angels_store_orders';

// Inicialização
let currentUser = null;
let users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
let userOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '{}');

// Verificar se usuário está logado
function checkAuth() {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth) {
        currentUser = JSON.parse(auth);
        updateUIForLoggedUser();
    }
}

// Atualizar UI para usuário logado
function updateUIForLoggedUser() {
    const navbar = document.querySelector('.nav-items');
    const accountBtn = document.querySelector('.conta-btn');
    
    if (currentUser) {
        navbar.classList.add('logged-in');
        accountBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.username}`;
        accountBtn.style.display = 'flex';
    } else {
        navbar.classList.remove('logged-in');
        accountBtn.style.display = 'none';
    }
}

// Mostrar Modal
function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'block';
}

// Fechar Modal
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'none';
}

// Alternar entre Login e Cadastro
function toggleAuthForm(form) {
    document.getElementById('login-form').style.display = form === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = form === 'register' ? 'block' : 'none';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username].password === password) {
        currentUser = { username };
        localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
        updateUIForLoggedUser();
        closeAuthModal();
        showNotification('Login realizado com sucesso!');
    } else {
        showNotification('Usuário ou senha incorretos!', 'error');
    }
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (users[username]) {
        showNotification('Este nome de usuário já existe!', 'error');
        return false;
    }

    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem!', 'error');
        return false;
    }

    users[username] = { password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    showNotification('Cadastro realizado com sucesso!');
    toggleAuthForm('login');
    return false;
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    currentUser = null;
    updateUIForLoggedUser();
    showNotification('Logout realizado com sucesso!');
}

// Mostrar Notificação
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Função para mostrar o modal de perfil
function showProfileModal() {
    const modal = document.getElementById('profile-modal');
    updateProfileInfo();
    modal.style.display = 'block';
}

// Função para fechar o modal de perfil
function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    modal.style.display = 'none';
}

// Atualizar informações do perfil
function updateProfileInfo() {
    if (!currentUser) return;

    const username = currentUser.username;
    const userOrdersList = userOrders[username] || [];
    
    // Atualizar informações básicas
    document.getElementById('profile-username').textContent = username;
    document.getElementById('profile-member-since').textContent = 
        new Date(currentUser.joinDate || Date.now()).toLocaleDateString();

    // Calcular estatísticas
    const totalSpent = userOrdersList.reduce((total, order) => total + order.total, 0);
    const totalOrders = userOrdersList.length;
    
    // Atualizar estatísticas
    document.getElementById('profile-total-spent').textContent = totalSpent.toFixed(2);
    document.getElementById('profile-total-orders').textContent = totalOrders;
    
    // Definir status baseado no total gasto
    const status = getStatusLevel(totalSpent);
    document.getElementById('profile-status').textContent = status;

    // Atualizar lista de pedidos
    updateOrdersList(userOrdersList);
}

// Função para determinar o nível do usuário
function getStatusLevel(totalSpent) {
    if (totalSpent >= 1000) return '💎 VIP Diamante';
    if (totalSpent >= 500) return '👑 VIP Ouro';
    if (totalSpent >= 200) return '⭐ VIP Prata';
    return '🌟 Iniciante';
}

// Atualizar lista de pedidos
function updateOrdersList(orders) {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    const filter = document.getElementById('order-filter').value;
    const filteredOrders = filterOrders(orders, filter);

    filteredOrders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        orderElement.innerHTML = `
            <div class="order-info">
                <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                <div class="order-products">${order.items.map(item => item.nome).join(', ')}</div>
            </div>
            <div class="order-total">R$ ${order.total.toFixed(2)}</div>
            <span class="order-status status-completed">Concluído</span>
        `;
        ordersList.appendChild(orderElement);
    });
}

// Filtrar pedidos
function filterOrders(orders, filter) {
    const now = new Date();
    switch(filter) {
        case 'recent':
            const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
            return orders.filter(order => new Date(order.date) > thirtyDaysAgo);
        case 'month':
            return orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate.getMonth() === now.getMonth() &&
                       orderDate.getFullYear() === now.getFullYear();
            });
        default:
            return orders;
    }
}

// Adicionar pedido ao histórico
function addOrderToHistory(order) {
    if (!currentUser) return;
    
    const username = currentUser.username;
    if (!userOrders[username]) {
        userOrders[username] = [];
    }
    
    userOrders[username].push({
        ...order,
        date: Date.now(),
        status: 'completed'
    });
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify(userOrders));
    updateProfileInfo();
}

// Atualizar o event listener do botão de conta
document.querySelector('.conta-btn').onclick = showProfileModal;

// Adicionar listener para o filtro de pedidos
document.getElementById('order-filter')?.addEventListener('change', () => {
    if (currentUser) {
        updateOrdersList(userOrders[currentUser.username] || []);
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Fechar modal quando clicar fora
    window.onclick = function(event) {
        const modal = document.getElementById('auth-modal');
        if (event.target === modal) {
            closeAuthModal();
        }
    }

    // Fechar modal com X
    document.querySelector('.close-modal').onclick = closeAuthModal;

    // Adiciona listeners para os favoritos
    document.querySelectorAll('.produto-favorito').forEach(btn => {
        btn.addEventListener('click', () => toggleFavorito(btn));
    });

    // Melhorias para Mobile
    const categorias = document.querySelectorAll('.categoria-item');
    categorias.forEach(categoria => {
        categoria.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // Remove active de todas as outras categorias
                categorias.forEach(cat => {
                    if (cat !== categoria) cat.classList.remove('active');
                });
                categoria.classList.toggle('active');
            }
        });
    });

    // Fechar subcategorias ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.categoria-item')) {
            categorias.forEach(categoria => {
                categoria.classList.remove('active');
            });
        }
    });

    // Gerenciar carrinho em mobile
    const carrinhoBtn = document.querySelector('.carrinho-btn');
    carrinhoBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const container = e.target.closest('.carrinho-container');
            container.classList.toggle('active');
        }
    });

    // Fechar carrinho ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.carrinho-container')) {
            const container = document.querySelector('.carrinho-container');
            container.classList.remove('active');
        }
    });

    // Ajustar altura do modal de perfil em mobile
    function adjustProfileModal() {
        if (window.innerWidth <= 768) {
            const modal = document.querySelector('.profile-content');
            if (modal) {
                modal.style.height = `${window.innerHeight}px`;
            }
        }
    }

    window.addEventListener('resize', adjustProfileModal);
    adjustProfileModal();
}); 