// CONFIGURAÇÃO - ALTERE AQUI PARA SUA API JAVA
const API_URL = 'http://localhost:8080/api';

// Verificar autenticação
const usuario = localStorage.getItem('usuario');
if (!usuario) {
    window.location.href = '../Login/login.html';
}
document.getElementById('userName').textContent = usuario;

// Navegação entre seções
function showSection(section) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar .nav-link').forEach(l => l.classList.remove('active'));

    document.getElementById(`${section}-section`).classList.add('active');
    event.target.closest('.nav-link').classList.add('active');

    const titles = {
        'dashboard': 'Dashboard',
        'produtos': 'Produtos',
        'clientes': 'Clientes',
        'usuarios': 'Usuários'
    };
    document.getElementById('pageTitle').textContent = titles[section];

    if (section === 'produtos') carregarProdutos();
    if (section === 'clientes') carregarClientes();
    if (section === 'usuarios') carregarUsuarios();
    if (section === 'dashboard') carregarStats();
}

// Toggle sidebar mobile
document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

// Logout
function logout() {
    localStorage.clear();
    window.location.href = 'login-complete.html';
}

// ===== DASHBOARD =====
function carregarStats() {
    // CONECTE COM SUA API
    // fetch(`${API_URL}/dashboard/stats`)
    //     .then(r => r.json())
    //     .then(data => {
    //         document.getElementById('totalUsuarios').textContent = data.usuarios;
    //         document.getElementById('totalProdutos').textContent = data.produtos;
    //         document.getElementById('totalClientes').textContent = data.clientes;
    //         document.getElementById('totalEstoqueBaixo').textContent = data.estoqueBaixo;
    //     });

    // EXEMPLO
    document.getElementById('totalUsuarios').textContent = '05';
    document.getElementById('totalProdutos').textContent = '12';
    document.getElementById('totalClientes').textContent = '28';
    document.getElementById('totalEstoqueBaixo').textContent = '03';
}

// ===== PRODUTOS =====
function carregarProdutos() {
    const tbody = document.getElementById('tabelaProdutos');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Carregando...</td></tr>';

    // CONECTE COM SUA API
    // fetch(`${API_URL}/produtos`)
    //     .then(r => r.json())
    //     .then(data => {
    //         tbody.innerHTML = data.map(p => `
    //             <tr>
    //                 <td>${p.id}</td>
    //                 <td>${p.nome}</td>
    //                 <td>R$ ${p.preco.toFixed(2)}</td>
    //                 <td>${p.categoria}</td>
    //                 <td>${p.estoque}</td>
    //                 <td>
    //                     <button class="btn btn-sm btn-warning" onclick='editarProduto(${JSON.stringify(p)})'>
    //                         <i class="bi bi-pencil"></i>
    //                     </button>
    //                     <button class="btn btn-sm btn-danger" onclick="deletarProduto(${p.id})">
    //                         <i class="bi bi-trash3"></i>
    //                     </button>
    //                 </td>
    //             </tr>
    //         `).join('');
    //     });

    // EXEMPLO
    tbody.innerHTML = `
                <tr>
                    <td>1</td>
                    <td>Notebook Dell</td>
                    <td>R$ 3.500,00</td>
                    <td>Eletrônicos</td>
                    <td>5</td>
                    <td>
                        <button class="btn btn-sm btn-warning"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            `;
}

function novoProduto() {
    document.getElementById('formProduto').reset();
    document.getElementById('produtoId').value = '';
}

function editarProduto(produto) {
    document.getElementById('produtoId').value = produto.id;
    document.getElementById('produtoNome').value = produto.nome;
    document.getElementById('produtoPreco').value = produto.preco;
    document.getElementById('produtoCategoria').value = produto.categoria;
    document.getElementById('produtoEstoque').value = produto.estoque;
    new bootstrap.Modal(document.getElementById('modalProduto')).show();
}

function salvarProduto() {
    const produto = {
        id: document.getElementById('produtoId').value,
        nome: document.getElementById('produtoNome').value,
        preco: document.getElementById('produtoPreco').value,
        categoria: document.getElementById('produtoCategoria').value,
        estoque: document.getElementById('produtoEstoque').value
    };

    // CONECTE COM SUA API
    // const method = produto.id ? 'PUT' : 'POST';
    // const url = produto.id ? `${API_URL}/produtos/${produto.id}` : `${API_URL}/produtos`;
    // fetch(url, {
    //     method: method,
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(produto)
    // }).then(() => {
    //     bootstrap.Modal.getInstance(document.getElementById('modalProduto')).hide();
    //     carregarProdutos();
    // });

    console.log('Salvando produto:', produto);
    bootstrap.Modal.getInstance(document.getElementById('modalProduto')).hide();
}

function deletarProduto(id) {
    if (!confirm('Deseja realmente excluir?')) return;

    // CONECTE COM SUA API
    // fetch(`${API_URL}/produtos/${id}`, { method: 'DELETE' })
    //     .then(() => carregarProdutos());

    console.log('Deletando produto:', id);
}

// ===== CLIENTES =====
function carregarClientes() {
    const tbody = document.getElementById('tabelaClientes');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Carregando...</td></tr>';

    // EXEMPLO
    tbody.innerHTML = `
                <tr>
                    <td>1</td>
                    <td>João Silva</td>
                    <td>joao@email.com</td>
                    <td>(85) 99999-9999</td>
                    <td>R$ 0,00</td>
                    <td>
                        <button class="btn btn-sm btn-warning"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            `;
}

function novoCliente() {
    document.getElementById('formCliente').reset();
    document.getElementById('clienteId').value = '';
}

function salvarCliente() {
    const cliente = {
        id: document.getElementById('clienteId').value,
        nome: document.getElementById('clienteNome').value,
        email: document.getElementById('clienteEmail').value,
        telefone: document.getElementById('clienteTelefone').value,
        endereco: document.getElementById('clienteEndereco').value,
        divida_pendente: document.getElementById('clienteDivida').value,
        ultima_atualizacao: document.getElementById('clienteUltimaAtualizacao').value
    };

    console.log('Salvando cliente:', cliente);
    bootstrap.Modal.getInstance(document.getElementById('modalCliente')).hide();
}

// ===== USUÁRIOS =====
function carregarUsuarios() {
    const tbody = document.getElementById('tabelaUsuarios');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Carregando...</td></tr>';

    // EXEMPLO
    tbody.innerHTML = `
                <tr>
                    <td>1</td>
                    <td>admin</td>
                    <td>admin@sistema.com</td>
                    <td>
                        <button class="btn btn-sm btn-warning"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            `;
}

function novoUsuario() {
    document.getElementById('formUsuario').reset();
    document.getElementById('usuarioId').value = '';
}

function salvarUsuario() {
    const usuario = {
        id: document.getElementById('usuarioId').value,
        usuario: document.getElementById('usuarioNome').value,
        email: document.getElementById('usuarioEmail').value,
        senha: document.getElementById('usuarioSenha').value
    };

    console.log('Salvando usuário:', usuario);
    bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
}

// Carregar stats inicial
carregarStats();