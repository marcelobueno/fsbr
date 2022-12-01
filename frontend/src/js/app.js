var url = 'http://localhost:8000/api';
var token = null;
var user = 'teste@fsbr.com.br';
var pass = '123456';
var title = $('#page-title');
var content = $('#content');
var modal = $('#modal-alerts');
var modalBody = $('#modal-alerts .modal-body');
var icons = {
    success: `<i class="bi bi-check-circle-fill fs-1 text-success"></i>`,
    error: `<i class="bi bi-exclamation-octagon-fill fs-1 text-danger"></i>`,
    wait: `<div class="spinner-border" role="status"><span class="visually-hidden">Carregando...</span></div>`
};

function login() {

    let data = {
        email: user,
        password: pass
    }
    
    Requests.post('login', data, function(response) {

        if (response.status == 'success') {

            token = response.token;
        }
    });
}

/**
 * Ao carregar a página chama a tela principal da aplicação.
 */
$(document).ready(() => {

    if (token == null) {
        login();
    }
    mainScreen();
});

/**
 * Função responsável por exibir a tela principal com os menus.
 */
function mainScreen() {

    cleanSection();
    title.html('Cadastramento');

    let html = `
        <div id="dev-name">
            <h1><a href="https://github.com/marcelobueno" target="_blank">Marcelo Ferraz Bueno</a></h1>
        </div>
        <div id="buttons">
            <a onclick="screenCreate()" type="button" class="btn-fsbr">Incluir</a>
            <a onclick="screenUpdate()" type="button" class="btn-fsbr">Alterar</a>
            <a onclick="screenDestroy()" type="button" class="btn-fsbr">Excluir</a>
            <a onclick="screenRead()" type="button" class="btn-fsbr">Consultar</a>
            <a onclick="screenShow()" type="button" class="btn-fsbr">Listagem</a>
        </div>
        <div id="close-app-area">
            <button onclick="closeApp()" class="btn-close-app">Sair</button>
        </div>
    `;

    content.append(html);
}

/**
 * Função responsável por renderizar a tela de cadastro.
 */
function screenCreate() {

    cleanSection();
    title.html('Inclusão');

    let html = `
        <div id="include-area">
            <div class="input-line">
                <label>Estado</label>
                <select id="select-state" disabled>
                    <option id="sel-title" value="">Carregando..</option>
                </select>
            </div>
            <div class="input-line">
                <label>Nome</label>
                <input id="name" type="text" placeholder="Digite o nome" maxlength="100">
            </div>
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf" type="text" placeholder="EX: 123.456.789-10" maxlength="11">
            </div>
            <div class="input-line">
                <label>Cidade</label>
                <input id="city" type="text" placeholder="Digite a cidade" maxlength="50">
            </div>
            <div class="options-btn-area">
                <button onclick="mainScreen()" class="btn-close-app">Voltar</button>
                <button onclick="create()" class="btn-save">Salvar</button>
            </div>
        </div>
    `;

    content.append(html);

    let selEstado = $('#select-state');
    let selTitle = $('#sel-title');

    selTitle.html('Carregando..');

    Requests.get('estados', function(response) {

        if (response.status == 'success') {

            response.data.forEach(estado => {

                let opt = `<option value="${estado.id}">${estado.estado}</option>`

                selEstado.append(opt);
            });

            selEstado.removeAttr('disabled');
            selTitle.html('Escolha o estado');
        } else {

            console.log(response);
        }
    });

}

/**
 * Função responsável por renderizar a tela de consulta.
 */
function screenRead() {

    cleanSection();
    title.html('Consultar');

    let html = `
        <div id="include-area">
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf-search" type="text" placeholder="EX: 123.456.789-10">
                <button onclick="findByCpf()" class="btn-search ml-3">Buscar</button>
            </div>
            <hr>
            <div class="input-line">
                <label>Estado</label>
                <select id="select-state" disabled>
                    <option value="">Escolha o estado</option>
                </select>
            </div>
            <div class="input-line">
                <label>Nome</label>
                <input id="name" type="text" placeholder="Digite o nome" readonly>
            </div>
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf" type="text" placeholder="EX: 123.456.789-10" readonly>
            </div>
            <div class="input-line">
                <label>Cidade</label>
                <input id="city" type="text" placeholder="Digite a cidade" readonly>
            </div>
            <div class="options-btn-area">
                <button onclick="mainScreen()" class="btn-close-app">Voltar</button>
            </div>
        </div>
    `;

    content.append(html);
}

/**
 * Função responsável por renderizar a tela de alteração.
 */
function screenUpdate() {

    cleanSection();
    title.html('Alteração');

    let html = `
        <div id="include-area">
            <input type="hidden" id="id" value=""/>
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf-search" type="text" maxlenght="11" placeholder="EX: 123.456.789-10">
                <button onclick="findByCpf(true)" class="btn-search ml-3">Buscar</button>
            </div>
            <hr>
            <div class="input-line">
                <label>Estado</label>
                <select id="select-state" disabled>
                    <option value="">Escolha o estado</option>
                </select>
            </div>
            <div class="input-line">
                <label>Nome</label>
                <input id="name" type="text" placeholder="Digite o nome">
            </div>
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf" type="text" placeholder="EX: 123.456.789-10">
            </div>
            <div class="input-line">
                <label>Cidade</label>
                <input id="city" type="text" placeholder="Digite a cidade">
            </div>
            <div class="options-btn-area">
                <button onclick="mainScreen()" class="btn-close-app">Voltar</button>
                <button onclick="update()" class="btn-save">Salvar</button>
            </div>
        </div>
    `;

    content.append(html);
}

/**
 * Função responsável por renderizar a tela de exclusão.
 */
function screenDestroy() {

    cleanSection();
    title.html('Exclusão');

    let html = `
        <div id="include-area">
            <input type="hidden" id="id" value=""/>
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf-search" type="text" placeholder="EX: 123.456.789-10">
                <button onclick="findByCpf()" class="btn-search ml-3">Buscar</button>
            </div>
            <hr>
            <div class="input-line">
                <label>Estado</label>
                <select id="select-state" disabled>
                    <option value="">Escolha o estado</option>
                </select>
            </div>
            <div class="input-line">
                <label>Nome</label>
                <input id="name" type="text" placeholder="Digite o nome" disabled>
            </div>
            <div class="input-line">
                <label>CPF</label>
                <input id="cpf" type="text" placeholder="EX: 123.456.789-10" disabled>
            </div>
            <div class="input-line">
                <label>Cidade</label>
                <input id="city" type="text" placeholder="Digite a cidade" disabled>
            </div>
            <div class="options-btn-area">
                <button id="btn-destroy" class="btn-close-app d-none" data-bs-toggle="modal" data-bs-target="#destroyReg">Excluir</button>
                <button onclick="mainScreen()" class="btn-yellow">Voltar</button>
            </div>
        </div>
        <div class="modal fade" id="destroyReg" tabindex="-1" aria-labelledby="destroyRegLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="destroyRegLabel">Exclusão de cadastro</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Deseja realmente excluir este cadastro?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button onclick="destroy()" type="button" data-bs-dismiss="modal" class="btn btn-danger">Confirmar</button>
                </div>
                </div>
            </div>
        </div>
    `;

    content.append(html);
}

/**
 * Função responsável por renderizar a tela de listagem.
 */
function screenShow() {

    cleanSection();
    title.html('Listagem');

    let html = `
        <div id="list-regs-filter">
            <div class="input-line">
                <label>Nome</label>
                <input id="name-search" type="text" placeholder="Digite o nome">
                <label class="ml-3">CPF</label>
                <input id="cpf-search" type="text" placeholder="EX: 123.456.789-10">
                <button onclick="findRegisters()" class="btn-search ml-3">Buscar</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th class="text-center" width="100px">ID</th>
                        <th class="text-center">Nome</th>
                        <th class="text-center">CPF</th>
                        <th class="text-center">Cidade</th>
                    </tr>
                </thead>
                <tbody id="registers">
                    
                </tbody>
            </table>
            <span id="qtd">Qtd: <span id="qtd-regs">0</span></span>
            <div class="options-btn-area w-1024">
                <button onclick="cleanTable()" class="btn-search">Limpar</button>
                <button onclick="mainScreen()" class="btn-yellow">Voltar</button>
            </div>
        </div>
    `;

    content.append(html);

}

/**
 * Função responsável por limpar a tela antes de carregar um novo conteúdo.
 */
function cleanSection() {
    content.html('');
}

/**
 * Função responsável por fechar a aplicação.
 */
 function closeApp() {

    window.close();
}

function showModal(type, message) {

    let icon;

    if (type == 'success') {

        icon = icons.success;

        modalBody.append(icon);
    } else if (type == 'error') {

        icon = icons.error;

        modalBody.append(icon);
    } else {

        icon = icons.wait;

        modalBody.append(icon);

        message = 'Por favor, aguarde.';
    }

    modalBody.append(`<span>${message}</span>`);

    modal.modal('show');

    setTimeout(() => {
        modal.modal('hide');
        modalBody.html('');
    }, 5000);
}