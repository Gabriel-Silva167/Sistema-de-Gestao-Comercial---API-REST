// Configuração da API - ALTERE AQUI PARA SUA API JAVA
const API_URL = 'http://localhost:8080';

function hideAlerts() {
    document.getElementById('errorAlert').classList.add('d-none');
    document.getElementById('successAlert').classList.add('d-none');
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorAlert').classList.remove('d-none');
    document.getElementById('successAlert').classList.add('d-none');
}

function showSuccess(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successAlert').classList.remove('d-none');
    document.getElementById('errorAlert').classList.add('d-none');
}

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlerts();

    const email = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;

    try {
 
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: email,
                senha: senha })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', data.usuario);
            window.location.href = '../Dashboard/dashboard.html';
        } else {
            showError('Usuário ou senha incorretos!');
        }
        
        showError('Usuário ou senha incorretos! (Teste: admin/admin)');
    } catch (error) {
        showError('Erro ao conectar com o servidor!');
    }
});