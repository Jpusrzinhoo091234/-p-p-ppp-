class DigitalProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        const produto = JSON.parse(this.getAttribute('produto'));
        
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background: white;
                    border-radius: 12px;
                    padding: 1rem;
                    transition: transform 0.3s, box-shadow 0.3s;
                    position: relative;
                    overflow: hidden;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                }

                .tipo-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: var(--accent-color);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                }

                .produto-imagem {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                .produto-info {
                    padding: 1rem 0;
                }

                .produto-titulo {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .produto-plataformas {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .plataforma-tag {
                    background: var(--light-gray);
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                }

                .produto-preco {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary-color);
                    margin: 1rem 0;
                }

                .entrega-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #4CAF50;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }

                .comprar-btn {
                    width: 100%;
                    padding: 1rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background 0.3s;
                }

                .comprar-btn:hover {
                    background: var(--secondary-color);
                }

                .beneficios {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                }

                .beneficio-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
            </style>

            <div class="card">
                <span class="tipo-badge">${produto.tipo}</span>
                <img class="produto-imagem" src="${produto.imagem}" alt="${produto.nome}">
                
                <div class="produto-info">
                    <h3 class="produto-titulo">${produto.nome}</h3>
                    
                    ${this.renderPlataformas(produto)}
                    
                    <div class="produto-preco">
                        R$ ${produto.preco.toFixed(2)}
                    </div>

                    ${produto.entregaImediata ? `
                        <div class="entrega-info">
                            <i class="fas fa-bolt"></i>
                            Entrega Imediata
                        </div>
                    ` : ''}

                    ${this.renderBeneficios(produto)}

                    <button class="comprar-btn" data-produto-id="${produto.id}">
                        Comprar Agora
                    </button>
                </div>
            </div>
        `;
    }

    renderPlataformas(produto) {
        if (!produto.plataformas) return '';
        
        return `
            <div class="produto-plataformas">
                ${produto.plataformas.map(plat => `
                    <span class="plataforma-tag">${plat}</span>
                `).join('')}
            </div>
        `;
    }

    renderBeneficios(produto) {
        if (!produto.beneficios) return '';

        return `
            <div class="beneficios">
                ${produto.beneficios.map(ben => `
                    <div class="beneficio-item">
                        <i class="fas fa-check"></i>
                        ${ben}
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupListeners() {
        this.shadowRoot.querySelector('.comprar-btn').addEventListener('click', () => {
            const produto = JSON.parse(this.getAttribute('produto'));
            this.dispatchEvent(new CustomEvent('comprar', {
                detail: { produto },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('digital-product-card', DigitalProductCard); 