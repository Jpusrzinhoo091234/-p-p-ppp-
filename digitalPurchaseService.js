class DigitalPurchaseService {
    constructor() {
        this.api = API;
    }

    async processarCompraDigital(produto, usuario) {
        // Verifica disponibilidade
        const disponibilidade = await this.api.verificarDisponibilidade(produto.id);
        if (!disponibilidade.disponivel) {
            throw new Error("Produto indisponível no momento");
        }

        // Valida conta do usuário se necessário
        if (produto.plataforma) {
            const contaUsuario = usuario.plataformas[produto.plataforma.toLowerCase()];
            if (!contaUsuario) {
                throw new Error(`Conta ${produto.plataforma} não vinculada`);
            }
            
            const validacao = await this.api.validarConta(
                produto.plataforma,
                contaUsuario
            );
            
            if (!validacao.valido) {
                throw new Error("Conta inválida");
            }
        }

        // Processa o pedido
        const pedido = {
            usuario: usuario.id,
            items: [produto],
            total: produto.preco,
            data: new Date(),
            plataforma: produto.plataforma,
            entregaEmail: usuario.email
        };

        const resultado = await this.api.processarPedido(pedido);

        // Envia instruções por email
        if (resultado.status === "sucesso") {
            await this.enviarInstrucoes(
                usuario.email,
                resultado.codigos,
                produto
            );
        }

        return resultado;
    }

    async enviarInstrucoes(email, codigos, produto) {
        // Simulação de envio de email
        console.log(`Email enviado para ${email} com os códigos:`, codigos);
    }

    gerarRecibo(pedido) {
        return {
            numero: pedido.pedidoId,
            data: new Date(),
            items: pedido.items,
            total: pedido.total,
            codigosEntregues: pedido.codigos.length
        };
    }
}

export const digitalPurchaseService = new DigitalPurchaseService(); 