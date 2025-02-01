class AnimationManager {
    constructor() {
        this.observers = new Map();
    }
    
    observe(element, options = {}) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (options.once) {
                        observer.unobserve(entry.target);
                    }
                } else if (!options.once) {
                    entry.target.classList.remove('animate');
                }
            });
        }, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px'
        });
        
        observer.observe(element);
        this.observers.set(element, observer);
        
        return () => {
            observer.unobserve(element);
            this.observers.delete(element);
        };
    }
    
    animateCart(produto) {
        const produtoEl = document.querySelector(`[data-produto-id="${produto.id}"]`);
        const carrinhoEl = document.querySelector('.carrinho-btn');
        
        if (!produtoEl || !carrinhoEl) return;
        
        const clone = produtoEl.cloneNode(true);
        const rect = produtoEl.getBoundingClientRect();
        const carrinhoRect = carrinhoEl.getBoundingClientRect();
        
        clone.style.position = 'fixed';
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.transition = 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)';
        clone.style.zIndex = '9999';
        
        document.body.appendChild(clone);
        
        requestAnimationFrame(() => {
            clone.style.transform = `
                translate(
                    ${carrinhoRect.left - rect.left}px,
                    ${carrinhoRect.top - rect.top}px
                ) scale(0.2)
            `;
            clone.style.opacity = '0';
        });
        
        setTimeout(() => {
            document.body.removeChild(clone);
            carrinhoEl.classList.add('pulse');
            setTimeout(() => carrinhoEl.classList.remove('pulse'), 300);
        }, 800);
    }
}

export const animationManager = new AnimationManager(); 