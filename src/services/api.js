import config from '../config';

// Configuração base da API

// Classe para gerenciar todas as chamadas da API
class ApiService {
  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  // Método auxiliar para fazer requisições HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos para Produtos
  async getProdutos() {
    return this.request('/produtos');
  }

  async getProduto(nome) {
    return this.request(`/produtos/${encodeURIComponent(nome)}`);
  }

  async criarProduto(produto) {
    return this.request('/produtos', {
      method: 'POST',
      body: JSON.stringify(produto),
    });
  }

  async atualizarProduto(nome, updates) {
    return this.request(`/produtos/${encodeURIComponent(nome)}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletarProduto(nome) {
    return this.request(`/produtos/${encodeURIComponent(nome)}`, {
      method: 'DELETE',
    });
  }

  // Métodos para Carrinho
  async adicionarAoCarrinho(username, produto) {
    return this.request(`/carrinho/${encodeURIComponent(username)}/adicionar`, {
      method: 'POST',
      body: JSON.stringify(produto),
    });
  }

  async removerDoCarrinho(username, produto) {
    return this.request(`/carrinho/${encodeURIComponent(username)}/remover`, {
      method: 'POST',
      body: JSON.stringify(produto),
    });
  }

  async getCarrinho(username) {
    return this.request(`/carrinho/${encodeURIComponent(username)}`);
  }

  async limparCarrinho(username) {
    return this.request(`/carrinho/${encodeURIComponent(username)}/limpar`, {
      method: 'POST',
    });
  }

  async finalizarCompra(username) {
    return this.request(`/carrinho/${encodeURIComponent(username)}/finalizar`, {
      method: 'POST',
    });
  }

  // Métodos para Usuários
  async getUsuarios() {
    return this.request('/usuarios');
  }

  async criarUsuario(usuario) {
    return this.request('/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuario),
    });
  }

  // Métodos para Vendas
  async getVendas() {
    return this.request('/vendas');
  }

  // Método para verificar status da API
  async checkHealth() {
    return this.request('/');
  }

  // Métodos para Vozes
  async getVozes() {
    return this.request('/vozes');
  }

  async getVozUsuario(username) {
    return this.request(`/vozes/${encodeURIComponent(username)}`);
  }

  async salvarVoz(dadosVoz) {
    return this.request('/vozes', {
      method: 'POST',
      body: JSON.stringify(dadosVoz),
    });
  }

  async deletarVoz(username) {
    return this.request(`/vozes/${encodeURIComponent(username)}`, {
      method: 'DELETE',
    });
  }
}

// Exporta uma instância única do serviço
const apiService = new ApiService();
export default apiService;
