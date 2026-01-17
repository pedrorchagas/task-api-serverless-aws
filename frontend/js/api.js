// Caminho base da API
const API_BASE_URL = 'https://sua-api.com'; // Altere para o caminho da sua API

/**
 * Função auxiliar para fazer requisições HTTP
 */
async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = false) {
    const headers = {
        'Content-Type': 'application/json'
    };

    // Adiciona o token de autenticação se necessário
    if (requiresAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const config = {
        method,
        headers
    };

    if (body && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw {
                message: data.message || 'Erro na requisição',
                error: data.error || 'Erro desconhecido',
                status: response.status
            };
        }

        return data;
    } catch (error) {
        if (error.message && error.error) {
            throw error;
        }
        throw {
            message: 'Erro de conexão',
            error: error.message || 'Não foi possível conectar ao servidor'
        };
    }
}

// ============ AUTH API ============

async function login(user, password) {
    return apiRequest('/login', 'POST', { user, password });
}

async function signup(user, password) {
    return apiRequest('/signup', 'POST', { user, password });
}

// ============ SUBSCRIBE API ============

async function getSubscribes() {
    return apiRequest('/subscribe', 'GET', null, true);
}

async function getSubscribeById(subscribeId) {
    return apiRequest(`/subscribe/${subscribeId}`, 'GET', null, true);
}

async function createSubscribe(endpoint, protocol) {
    return apiRequest('/subscribe', 'POST', { endpoint, protocol }, true);
}

async function updateSubscribe(subscribeId, endpoint, protocol) {
    return apiRequest(`/subscribe/${subscribeId}`, 'PUT', { endpoint, protocol }, true);
}

async function deleteSubscribe(subscribeId) {
    return apiRequest(`/subscribe/${subscribeId}`, 'DELETE', null, true);
}

async function getProtocolOptions() {
    return apiRequest('/protocols', 'GET', null, true);
}

// ============ TASK API ============

async function getTasks() {
    return apiRequest('/task', 'GET', null, true);
}

async function getTaskById(taskId) {
    return apiRequest(`/task/${taskId}`, 'GET', null, true);
}

async function createTask(subject, body, send_in) {
    return apiRequest('/task', 'POST', { subject, body, send_in }, true);
}

async function updateTask(taskId, subject, body, send_in) {
    return apiRequest(`/task/${taskId}`, 'PUT', { subject, body, send_in }, true);
}

async function deleteTask(taskId) {
    return apiRequest(`/task/${taskId}`, 'DELETE', null, true);
}
