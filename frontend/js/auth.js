// Chave para armazenar o token no localStorage
const TOKEN_KEY = 'auth_token';

/**
 * Salva o token no localStorage
 */
function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Obtém o token do localStorage
 */
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove o token do localStorage
 */
function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * Verifica se o usuário está autenticado
 */
function isAuthenticated() {
    return !!getToken();
}

/**
 * Redireciona para a página de login se não estiver autenticado
 */
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * Realiza logout e redireciona para a página de login
 */
function logout() {
    removeToken();
    window.location.href = 'login.html';
}

/**
 * Mostra mensagem de erro
 */
function showError(message, error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.innerHTML = `<strong>Erro:</strong> ${message}<br><small>${error}</small>`;
    
    const container = document.querySelector('.container');
    container.insertBefore(errorDiv, container.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/**
 * Mostra mensagem de sucesso
 */
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.innerHTML = `<strong>Sucesso:</strong> ${message}`;
    
    const container = document.querySelector('.container');
    container.insertBefore(successDiv, container.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

/**
 * Formata data ISO para formato legível
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Converte data local para ISO UTC
 */
function toISOString(dateString) {
    const date = new Date(dateString);
    return date.toISOString();
}
