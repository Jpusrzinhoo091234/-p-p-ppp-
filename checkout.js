// Validação de CEP
document.querySelector('.buscar-cep').addEventListener('click', async () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
        mostrarNotificacao('CEP inválido', 'error');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            mostrarNotificacao('CEP não encontrado', 'error');
            return;
        }

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;
        
        mostrarNotificacao('Endereço preenchido com sucesso!', 'success');
    } catch (error) {
        mostrarNotificacao('Erro ao buscar CEP', 'error');
    }
});

// Máscara para cartão de crédito
document.querySelector('.card-number').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
});

// Validação do formulário
document.querySelector('.finalizar-compra').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            field.classList.add('invalid');
            isValid = false;
        } else {
            field.classList.remove('invalid');
        }
    });
    
    if (!isValid) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Simulação de processamento de pagamento
    const loadingButton = e.target;
    loadingButton.disabled = true;
    loadingButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    
    setTimeout(() => {
        // Simula sucesso no pagamento
        mostrarNotificacao('Pagamento processado com sucesso!', 'success');
        window.location.href = '/confirmacao.html';
    }, 2000);
});

// Sistema de cupons de desconto
const cupons = {
    'TECH10': 10,
    'TECH20': 20,
    'PRIMEIRA COMPRA': 15
};

document.querySelector('.cupom-desconto button').addEventListener('click', () => {
    const cupomInput = document.querySelector('.cupom-desconto input');
    const cupom = cupomInput.value.toUpperCase();
    
    if (cupons[cupom]) {
        aplicarDesconto(cupons[cupom]);
        mostrarNotificacao(`Cupom aplicado! ${cupons[cupom]}% de desconto`, 'success');
    } else {
        mostrarNotificacao('Cupom inválido', 'error');
    }
});

function aplicarDesconto(percentual) {
    const subtotal = 3999.90;
    const desconto = subtotal * (percentual / 100);
    const total = subtotal - desconto;
    
    document.querySelector('.summary-item.total span:last-child').textContent = 
        `R$ ${total.toFixed(2)}`;
}

// Notificações estilizadas
function mostrarNotificacao(mensagem, tipo) {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.innerHTML = `
        <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${mensagem}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
} 