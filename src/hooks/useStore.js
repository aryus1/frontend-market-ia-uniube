import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { inicializarProdutos, verificarAPI } from '../utils/initializeData';
import config from '../config';

const useStore = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [usuario, setUsuario] = useState(config.DEFAULT_USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);

  // Carregar produtos do backend
  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      const produtosBackend = await apiService.getProdutos();
      setProdutos(produtosBackend);
    } catch (err) {
      setError('Erro ao carregar produtos: ' + err.message);
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar carrinho do backend
  const carregarCarrinho = async () => {
    try {
      const response = await apiService.getCarrinho(usuario);
      setCarrinho(response.carrinho || []);
    } catch (err) {
      // Se não existe carrinho para o usuário, inicia vazio
      setCarrinho([]);
      console.log('Carrinho vazio ou usuário novo');
    }
  };

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = async (produtoNome, quantidade = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.adicionarAoCarrinho(usuario, {
        produto_nome: produtoNome,
        quantidade: quantidade
      });
      
      setCarrinho(response.carrinho);
      return { success: true, message: 'Produto adicionado ao carrinho!' };
    } catch (err) {
      const errorMsg = 'Erro ao adicionar produto: ' + err.message;
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Remover produto do carrinho
  const removerDoCarrinho = async (produtoNome, quantidade = null) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.removerDoCarrinho(usuario, {
        produto_nome: produtoNome,
        quantidade: quantidade
      });

      setCarrinho(response.carrinho);
      return { success: true, message: 'Produto removido do carrinho!' };
    } catch (err) {
      const errorMsg = 'Erro ao remover produto: ' + err.message;
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Limpar carrinho
  const limparCarrinho = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.limparCarrinho(usuario);
      setCarrinho([]);
      return { success: true, message: 'Carrinho limpo!' };
    } catch (err) {
      const errorMsg = 'Erro ao limpar carrinho: ' + err.message;
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Finalizar compra
  const finalizarCompra = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.finalizarCompra(usuario);
      setCarrinho([]);
      return { success: true, message: `Compra finalizada! Total: R$ ${response.total.toFixed(2)}` };
    } catch (err) {
      const errorMsg = 'Erro ao finalizar compra: ' + err.message;
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Criar produto (para admin)
  const criarProduto = async (produto) => {
    try {
      setLoading(true);
      setError(null);
      
      const novoProduto = await apiService.criarProduto(produto);
      setProdutos(prev => [...prev, novoProduto]);
      return { success: true, message: 'Produto criado com sucesso!' };
    } catch (err) {
      const errorMsg = 'Erro ao criar produto: ' + err.message;
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Calcular total do carrinho
  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  };

  // Obter quantidade total de itens no carrinho
  const getQuantidadeTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  };

  // Verificar se API está online
  const verificarConexaoAPI = async () => {
    const result = await verificarAPI();
    setApiOnline(result.success);
    return result.success;
  };

  // Inicialização: carregar dados quando componente montar
  useEffect(() => {
    const inicializar = async () => {
      const online = await verificarConexaoAPI();
      
      if (online) {
        // Se API está online, inicializar produtos e carregar dados
        await inicializarProdutos();
        await carregarProdutos();
        await carregarCarrinho();
      } else {
        // Fallback para dados mock se API estiver offline
        const produtosMock = [
          { nome: "Arroz", preco: 5.99, quantidade: 50 },
          { nome: "Feijão", preco: 4.5, quantidade: 30 },
          { nome: "Açúcar", preco: 3.75, quantidade: 40 },
          { nome: "Café", preco: 8.99, quantidade: 25 },
          { nome: "Óleo de Soja", preco: 6.49, quantidade: 35 },
          { nome: "Macarrão", preco: 2.99, quantidade: 60 }
        ];
        setProdutos(produtosMock);
        console.log('⚠️  Usando dados locais - API não disponível');
      }
    };

    inicializar();
  }, [usuario]);

  return {
    // Estados
    produtos,
    carrinho,
    usuario,
    loading,
    error,
    apiOnline,

    // Ações de produtos
    carregarProdutos,
    criarProduto,

    // Ações de carrinho
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    finalizarCompra,
    carregarCarrinho,

    // Utilidades
    calcularTotalCarrinho,
    getQuantidadeTotalCarrinho,
    verificarConexaoAPI,

    // Configurações
    setUsuario
  };
};

export default useStore;