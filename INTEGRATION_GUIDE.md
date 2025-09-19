# Guia de Integração Frontend-Backend

Este documento explica como conectar o frontend React com o backend Python FastAPI.

## Estrutura dos Projetos

```
PROJETOS FACULDADE/
├── front-ia/           # Frontend React
└── projeto-IA/         # Backend Python FastAPI
```

## 📋 Pré-requisitos

### Backend (Python)
- Python 3.8+
- FastAPI
- Uvicorn

### Frontend (React)
- Node.js 14+
- React 19.1.1
- Tailwind CSS

## 🚀 Como Executar

### 1. Executar o Backend

```bash
# Navegar para o diretório do backend
cd "C:\Users\Marcelo\Desktop\PROJETOS FACULDADE\projeto-IA"

# Instalar dependências (se necessário)
pip install -r requirements.txt

# Executar o servidor FastAPI
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

O backend estará disponível em: `http://localhost:8000`

### 2. Executar o Frontend

```bash
# Navegar para o diretório do frontend
cd "C:\Users\Marcelo\Desktop\PROJETOS FACULDADE\front-ia"

# Instalar dependências (se necessário)
npm install

# Executar o servidor de desenvolvimento
npm start
```

O frontend estará disponível em: `http://localhost:3000`

## 🔌 Endpoints da API

### Produtos
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/{nome}` - Buscar produto específico
- `POST /produtos` - Criar novo produto
- `PUT /produtos/{nome}` - Atualizar produto
- `DELETE /produtos/{nome}` - Remover produto

### Carrinho
- `POST /carrinho/{username}/adicionar` - Adicionar item ao carrinho
- `POST /carrinho/{username}/remover` - Remover item do carrinho
- `GET /carrinho/{username}` - Ver carrinho do usuário
- `POST /carrinho/{username}/limpar` - Limpar carrinho
- `POST /carrinho/{username}/finalizar` - Finalizar compra

### Usuários e Vendas
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `GET /vendas` - Listar vendas

## ⚙️ Configuração

### Alterar URL da API

Para alterar a URL do backend, edite o arquivo:
```javascript
// src/config/index.js
const config = {
  API_BASE_URL: 'http://localhost:8000', // Altere aqui
};
```

Ou defina uma variável de ambiente:
```bash
REACT_APP_API_URL=http://localhost:8000
```

### Usuário Padrão

O sistema usa um usuário padrão (`usuario_default`). Para alterar:
```javascript
// src/config/index.js
const config = {
  DEFAULT_USER: 'seu_usuario_aqui',
};
```

## 🎯 Funcionalidades Implementadas

### ✅ Frontend
- Listagem de produtos com dados da API
- Adicionar produtos ao carrinho
- Visualizar carrinho com itens da API
- Remover itens do carrinho (individual ou todos)
- Finalizar compra
- Notificações de sucesso/erro
- Fallback para dados locais se API estiver offline
- Interface responsiva com Tailwind CSS

### ✅ Backend
- API REST completa com FastAPI
- CORS configurado para frontend
- Gerenciamento de produtos em memória
- Sistema de carrinho por usuário
- Controle de estoque
- Histórico de vendas

## 🔧 Arquivos Principais

### Frontend
- `src/services/api.js` - Cliente HTTP para comunicação com API
- `src/hooks/useStore.js` - Hook personalizado para gerenciar estado
- `src/views/Home.js` - Página principal com produtos
- `src/components/ProductCard.js` - Componente de produto
- `src/components/ModalCart.js` - Modal do carrinho
- `src/config/index.js` - Configurações da aplicação

### Backend
- `api.py` - API principal com todos os endpoints
- `modules/` - Módulos auxiliares (se aplicável)

## 🐛 Solução de Problemas

### CORS Error
Se houver erros de CORS, verifique se o backend está configurado corretamente:
```python
# api.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique o domínio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API Offline
O frontend tem fallback automático para dados mock se a API não estiver disponível.

### Porta em Uso
Se a porta 8000 estiver em uso, altere no comando do backend:
```bash
uvicorn api:app --reload --port 8001
```

E atualize a configuração do frontend correspondentemente.

## 📱 Como Testar

1. **Iniciar o backend** (porta 8000)
2. **Iniciar o frontend** (porta 3000)
3. **Acessar** `http://localhost:3000`
4. **Testar funcionalidades:**
   - Ver produtos listados da API
   - Adicionar produtos ao carrinho
   - Ver carrinho atualizado em tempo real
   - Remover itens do carrinho
   - Finalizar compra

## 🎉 Status da Integração

✅ **Concluído**: Frontend e backend estão totalmente integrados e funcionais!

A conexão está estabelecida e todas as operações CRUD do carrinho e produtos funcionam através da API Python.