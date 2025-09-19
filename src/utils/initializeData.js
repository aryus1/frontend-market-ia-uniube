import apiService from '../services/api';

// Dados de produtos de exemplo
const produtosExemplo = [
  {
    nome: "Arroz",
    preco: 5.99,
    quantidade: 50
  },
  {
    nome: "Feijão", 
    preco: 4.50,
    quantidade: 30
  },
  {
    nome: "Açúcar",
    preco: 3.75,
    quantidade: 40
  },
  {
    nome: "Café",
    preco: 8.99,
    quantidade: 25
  },
  {
    nome: "Óleo de Soja",
    preco: 6.49,
    quantidade: 35
  },
  {
    nome: "Macarrão",
    preco: 2.99,
    quantidade: 60
  }
];

// Função para inicializar produtos na API
export const inicializarProdutos = async () => {
  try {
    console.log('🔄 Verificando produtos existentes...');
    
    // Verificar se já existem produtos
    const produtosExistentes = await apiService.getProdutos();
    
    if (produtosExistentes.length > 0) {
      console.log('✅ Produtos já existem na API:', produtosExistentes.length);
      return { success: true, message: 'Produtos já existem', produtos: produtosExistentes };
    }
    
    console.log('🔄 Adicionando produtos de exemplo...');
    
    // Adicionar produtos de exemplo
    const produtosAdicionados = [];
    
    for (const produto of produtosExemplo) {
      try {
        const produtoAdicionado = await apiService.criarProduto(produto);
        produtosAdicionados.push(produtoAdicionado);
        console.log(`✅ Produto adicionado: ${produto.nome}`);
      } catch (error) {
        // Se o produto já existe, tenta buscar
        if (error.message.includes('já existe')) {
          try {
            const produtoExistente = await apiService.getProduto(produto.nome);
            produtosAdicionados.push(produtoExistente);
            console.log(`ℹ️  Produto já existe: ${produto.nome}`);
          } catch (fetchError) {
            console.warn(`⚠️  Erro ao buscar produto ${produto.nome}:`, fetchError.message);
          }
        } else {
          console.error(`❌ Erro ao criar produto ${produto.nome}:`, error.message);
        }
      }
    }
    
    console.log(`🎉 Inicialização concluída! ${produtosAdicionados.length} produtos disponíveis.`);
    
    return { 
      success: true, 
      message: `${produtosAdicionados.length} produtos inicializados`, 
      produtos: produtosAdicionados 
    };
    
  } catch (error) {
    console.error('❌ Erro ao inicializar produtos:', error.message);
    return { success: false, message: error.message };
  }
};

// Função para verificar conexão com API
export const verificarAPI = async () => {
  try {
    const health = await apiService.checkHealth();
    console.log('✅ API conectada:', health);
    return { success: true, data: health };
  } catch (error) {
    console.warn('⚠️  API não disponível:', error.message);
    return { success: false, error: error.message };
  }
};

// Função utilitária para debug
export const debugAPI = async () => {
  console.log('🔍 Debug da API...');
  
  // Verificar conexão
  const apiCheck = await verificarAPI();
  if (!apiCheck.success) {
    console.log('❌ API offline - usando dados locais');
    return;
  }
  
  // Listar produtos
  try {
    const produtos = await apiService.getProdutos();
    console.log('📦 Produtos na API:', produtos);
  } catch (error) {
    console.error('❌ Erro ao listar produtos:', error.message);
  }
  
  // Listar usuários
  try {
    const usuarios = await apiService.getUsuarios();
    console.log('👥 Usuários na API:', usuarios);
  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error.message);
  }
  
  // Listar vendas
  try {
    const vendas = await apiService.getVendas();
    console.log('🛒 Vendas na API:', vendas);
  } catch (error) {
    console.error('❌ Erro ao listar vendas:', error.message);
  }
};