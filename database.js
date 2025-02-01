// Banco de dados simulado para loja de itens digitais
const DB = {
    produtos: [
        // Free Fire
        {
            id: 1,
            nome: "💎 1060 Diamantes Free Fire",
            categoria: "free-fire",
            jogo: "Free Fire",
            preco: 49.90,
            precoAntigo: 59.90,
            descricao: "1060 Diamantes para Free Fire. Receba instantaneamente!",
            tipo: "moeda-virtual",
            entregaImediata: true,
            imagem: "/assets/ff-diamonds.jpg",
            destaque: true,
            vendidos: 15427,
            bonus: "Bônus de 10% no primeiro carregamento"
        },
        {
            id: 2,
            nome: "Passe de Elite Free Fire",
            categoria: "free-fire",
            jogo: "Free Fire",
            preco: 29.90,
            descricao: "Passe de Elite da temporada atual + 50 diamantes de bônus",
            tipo: "passe",
            entregaImediata: true,
            imagem: "/assets/ff-elite.jpg"
        },

        // Roblox
        {
            id: 3,
            nome: "🟣 12000 Robux",
            categoria: "roblox",
            jogo: "Roblox",
            preco: 199.90,
            precoAntigo: 249.90,
            descricao: "12000 Robux para usar em qualquer jogo Roblox",
            tipo: "moeda-virtual",
            entregaImediata: true,
            imagem: "/assets/robux.jpg",
            destaque: true
        },
        {
            id: 4,
            nome: "Premium Roblox - 1 Mês",
            categoria: "roblox",
            jogo: "Roblox",
            preco: 29.90,
            descricao: "Assinatura Premium Roblox por 1 mês + 450 Robux",
            tipo: "assinatura",
            imagem: "/assets/roblox-premium.jpg"
        },

        // Blox Fruits
        {
            id: 5,
            nome: "2x XP Boost Blox Fruits",
            categoria: "blox-fruits",
            jogo: "Blox Fruits",
            preco: 15.90,
            descricao: "Boost de XP duplo por 1 hora em Blox Fruits",
            tipo: "boost",
            entregaImediata: true,
            imagem: "/assets/blox-xp.jpg"
        },
        {
            id: 6,
            nome: "Pacote de Frutas Raras",
            categoria: "blox-fruits",
            jogo: "Blox Fruits",
            preco: 49.90,
            descricao: "Pacote com 3 frutas raras aleatórias",
            tipo: "item",
            imagem: "/assets/blox-fruits.jpg"
        },

        // Anime Fighters
        {
            id: 7,
            nome: "Pacote VIP Anime Fighters",
            categoria: "anime-fighters",
            jogo: "Anime Fighters",
            preco: 39.90,
            descricao: "VIP por 30 dias + 1000 gems + pet exclusivo",
            tipo: "vip",
            imagem: "/assets/anime-vip.jpg"
        },
        {
            id: 8,
            nome: "5000 Gems Anime Fighters",
            categoria: "anime-fighters",
            jogo: "Anime Fighters",
            preco: 25.90,
            descricao: "5000 Gems para Anime Fighters Simulator",
            tipo: "moeda-virtual",
            entregaImediata: true,
            imagem: "/assets/anime-gems.jpg"
        },

        // Campeonatos
        {
            id: 9,
            nome: "Inscrição Torneio Free Fire",
            categoria: "campeonatos",
            jogo: "Free Fire",
            preco: 50.00,
            descricao: "Inscrição para torneio com premiação de R$ 1000",
            tipo: "campeonato",
            dataEvento: "2024-04-15",
            premiacao: "R$ 1000",
            imagem: "/assets/tournament-ff.jpg"
        },
        {
            id: 10,
            nome: "Copa Roblox 2024",
            categoria: "campeonatos",
            jogo: "Roblox",
            preco: 30.00,
            descricao: "Participe da maior copa de Roblox do Brasil",
            tipo: "campeonato",
            dataEvento: "2024-04-20",
            premiacao: "50000 Robux",
            imagem: "/assets/tournament-roblox.jpg"
        },

        // Assinaturas
        {
            id: 11,
            nome: "Netflix Premium 12 Meses",
            categoria: "assinaturas",
            servico: "Netflix",
            preco: 479.90,
            precoAntigo: 599.90,
            descricao: "Assinatura Netflix Premium por 12 meses. 4 telas, Ultra HD",
            tipo: "assinatura",
            duracao: "12 meses",
            beneficios: [
                "4 telas simultâneas",
                "Qualidade Ultra HD",
                "Download em 4 dispositivos",
                "Sem anúncios"
            ],
            imagem: "/assets/netflix.jpg"
        },
        {
            id: 12,
            nome: "Disney+ Anual",
            categoria: "assinaturas",
            servico: "Disney+",
            preco: 279.90,
            descricao: "Acesso a todo catálogo Disney, Marvel, Star Wars e National Geographic",
            tipo: "assinatura",
            duracao: "12 meses",
            beneficios: [
                "4K Ultra HD",
                "Até 4 telas",
                "Downloads ilimitados",
                "Perfis infantis"
            ],
            imagem: "/assets/disney.jpg"
        }
    ],

    categorias: [
        {
            id: "free-fire",
            nome: "Free Fire",
            icon: "🔥",
            subcategorias: ["Diamantes", "Passes", "Itens", "Pacotes"]
        },
        {
            id: "roblox",
            nome: "Roblox",
            icon: "🟣",
            subcategorias: ["Robux", "Premium", "Gift Cards"]
        },
        {
            id: "blox-fruits",
            nome: "Blox Fruits",
            icon: "🍎",
            subcategorias: ["Frutas", "Boosts", "Gamepasses"]
        },
        {
            id: "anime-fighters",
            nome: "Anime Fighters",
            icon: "⚔️",
            subcategorias: ["Gems", "VIP", "Pets", "Boosts"]
        },
        {
            id: "campeonatos",
            nome: "Campeonatos",
            icon: "🏆",
            subcategorias: ["Free Fire", "Roblox", "Torneios Semanais"]
        },
        {
            id: "assinaturas",
            nome: "Assinaturas",
            icon: "📺",
            subcategorias: ["Netflix", "Disney+", "HBO Max", "Prime"]
        }
    ],

    usuarios: [
        {
            id: 1,
            nome: "Usuario",
            email: "usuario@email.com",
            senha: "hash_senha",
            pedidos: [],
            plataformas: {
                steam: "steamID123",
                epic: "epicID456",
                psn: "psnID789"
            }
        }
    ],

    cupons: [
        {
            codigo: "PRIMEIRACOMPRA",
            desconto: 10,
            tipo: "percentual",
            minimo: 50.00,
            usoMaximo: 1,
            validade: "2024-12-31"
        }
    ]
};

// API simulada com funcionalidades específicas para produtos digitais
const API = {
    async getProdutos(filtros = {}) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let produtos = [...DB.produtos];
        
        if (filtros.categoria) {
            produtos = produtos.filter(p => p.categoria === filtros.categoria);
        }
        
        if (filtros.jogo) {
            produtos = produtos.filter(p => p.jogo === filtros.jogo);
        }
        
        if (filtros.servico) {
            produtos = produtos.filter(p => p.servico === filtros.servico);
        }
        
        if (filtros.plataforma) {
            produtos = produtos.filter(p => 
                p.plataformas && p.plataformas.includes(filtros.plataforma)
            );
        }
        
        if (filtros.precoMin) {
            produtos = produtos.filter(p => p.preco >= filtros.precoMin);
        }
        
        if (filtros.precoMax) {
            produtos = produtos.filter(p => p.preco <= filtros.precoMax);
        }
        
        return produtos;
    },

    async processarPedido(pedido) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simula processamento do pedido
        const codigosGerados = pedido.items.map(item => ({
            produtoId: item.id,
            codigo: `${item.tipo.toUpperCase()}-${Math.random().toString(36).substr(2, 9)}`,
            instrucoes: item.instrucoes
        }));

        return {
            status: "sucesso",
            pedidoId: `PED-${Date.now()}`,
            codigos: codigosGerados,
            emailEnviado: true
        };
    },

    async verificarDisponibilidade(produtoId) {
        await new Promise(resolve => setTimeout(resolve, 200));
        const produto = DB.produtos.find(p => p.id === produtoId);
        return {
            disponivel: true,
            entregaImediata: produto.entregaImediata,
            tempoEstimado: "5 minutos"
        };
    },

    async validarConta(plataforma, usuario) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            valido: true,
            plataforma,
            usuario
        };
    }
};

export { DB, API }; 