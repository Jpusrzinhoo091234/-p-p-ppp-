class Store {
    constructor() {
        this.state = {
            usuario: null,
            carrinho: [],
            favoritos: [],
            filtros: {
                categoria: null,
                precoMin: null,
                precoMax: null,
                ordenacao: 'relevancia'
            },
            ultimasBuscas: [],
            produtosVistos: []
        };
        
        this.observers = [];
    }
    
    subscribe(callback) {
        this.observers.push(callback);
        return () => {
            this.observers = this.observers.filter(obs => obs !== callback);
        };
    }
    
    notify() {
        this.observers.forEach(callback => callback(this.state));
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
        this.persistState();
    }
    
    persistState() {
        localStorage.setItem('techstore_state', JSON.stringify({
            carrinho: this.state.carrinho,
            favoritos: this.state.favoritos,
            ultimasBuscas: this.state.ultimasBuscas,
            produtosVistos: this.state.produtosVistos
        }));
    }
    
    loadPersistedState() {
        const persisted = localStorage.getItem('techstore_state');
        if (persisted) {
            const parsed = JSON.parse(persisted);
            this.setState(parsed);
        }
    }
    
    // Ações do carrinho
    addToCart(produto, quantidade = 1) {
        const itemExistente = this.state.carrinho.find(item => item.id === produto.id);
        
        if (itemExistente) {
            this.setState({
                carrinho: this.state.carrinho.map(item =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                )
            });
        } else {
            this.setState({
                carrinho: [...this.state.carrinho, { ...produto, quantidade }]
            });
        }
    }
    
    removeFromCart(produtoId) {
        this.setState({
            carrinho: this.state.carrinho.filter(item => item.id !== produtoId)
        });
    }
    
    // Ações de favoritos
    toggleFavorito(produto) {
        const isFavorito = this.state.favoritos.some(p => p.id === produto.id);
        
        if (isFavorito) {
            this.setState({
                favoritos: this.state.favoritos.filter(p => p.id !== produto.id)
            });
        } else {
            this.setState({
                favoritos: [...this.state.favoritos, produto]
            });
        }
    }
    
    // Histórico de navegação
    addProdutoVisto(produto) {
        const produtosVistos = [
            produto,
            ...this.state.produtosVistos.filter(p => p.id !== produto.id)
        ].slice(0, 10);
        
        this.setState({ produtosVistos });
    }
    
    // Busca
    addBuscaRecente(termo) {
        const ultimasBuscas = [
            termo,
            ...this.state.ultimasBuscas.filter(t => t !== termo)
        ].slice(0, 5);
        
        this.setState({ ultimasBuscas });
    }
}

const store = new Store();
export default store; 