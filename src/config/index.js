// Configurações da aplicação
const config = {
  // URL da API do backend
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  
  // Configurações de timeout
  API_TIMEOUT: 10000, // 10 segundos
  
  // Usuário padrão (pode ser alterado futuramente)
  DEFAULT_USER: 'usuario_default',
  
  // Configurações de notificação
  NOTIFICATION_TIMEOUT: 3000, // 3 segundos
  ERROR_NOTIFICATION_TIMEOUT: 5000, // 5 segundos
  
  // Configurações de retry
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
};

export default config;