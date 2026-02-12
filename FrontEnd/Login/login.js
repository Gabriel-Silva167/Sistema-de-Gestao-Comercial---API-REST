// Configuração da API - ALTERE AQUI PARA SUA API JAVA
const API_URL = 'http://localhost:8080/api';

// Alternar entre Login e Cadastro
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const title = document.getElementById('formTitle');
    const subtitle = document.getElementById('formSubtitle');

    loginForm.classList.toggle('d-none');
    cadastroForm.classList.toggle('d-none');

    if (loginForm.classList.contains('d-none')) {
        title.textContent = 'Criar Conta';
        subtitle.textContent = 'Preencha seus dados';
    } else {
        title.textContent = 'Sistema de Gestão';
        subtitle.textContent = 'Acesse sua conta';
    }

    hideAlerts();
}

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

    const usuario = document.getElementById('loginUsuario').value;
    const senha = document.getElementById('loginSenha').value;

    try {
        // VERSÃO TESTE - Remova quando conectar à API
        if (usuario === 'admin' && senha === 'admin') {
            localStorage.setItem('usuario', usuario);
            window.location.href = 'dashboard.html';
            return;
        }

        // DESCOMENTE QUANDO TIVER A API JAVA
        /*
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', data.usuario);
            window.location.href = 'dashboard.html';
        } else {
            showError('Usuário ou senha incorretos!');
        }
        */

        showError('Usuário ou senha incorretos! (Teste: admin/admin)');
    } catch (error) {
        showError('Erro ao conectar com o servidor!');
    }
});

// Cadastro
document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlerts();

    const usuario = document.getElementById('cadastroUsuario').value;
    const email = document.getElementById('cadastroEmail').value;
    const senha = document.getElementById('cadastroSenha').value;
    const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;

    if (senha !== confirmarSenha) {
        showError('As senhas não coincidem!');
        return;
    }

    if (senha.length < 6) {
        showError('A senha deve ter no mínimo 6 caracteres!');
        return;
    }

    try {
        // VERSÃO TESTE
        showSuccess('Cadastro realizado! Redirecionando...');
        setTimeout(() => toggleForms(), 1500);

        // DESCOMENTE QUANDO TIVER A API JAVA
        /*
        const response = await fetch(`${API_URL}/auth/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, email, senha })
        });

        if (response.ok) {
            showSuccess('Cadastro realizado com sucesso!');
            document.getElementById('cadastroForm').reset();
            setTimeout(() => toggleForms(), 2000);
        } else {
            const error = await response.json();
            showError(error.message || 'Erro ao cadastrar!');
        }
        */
    } catch (error) {
        showError('Erro ao conectar com o servidor!');
    }
});