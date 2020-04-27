// Mapeamento DOM
let listaPrincipal         = document.querySelector('.lista-principal');
let botaoAdd               = document.querySelector('.botao-add');
let modalAbout             = document.querySelector('#dialogo-sobre');
let modalConfirmarExclusao = document.querySelector('#dialogo-confirmar-exclusao');

let modalAbout_Botaoclose                 = modalAbout.querySelector('.close');
let modalConfirmarExclusao_BotaoClose     = modalConfirmarExclusao.querySelector('.close');
let modalConfirmarExclusao_BotaoConfirmar = modalConfirmarExclusao.querySelector('.done');

botaoAdd.style.display = 'none';

let Conexoes = {"Dados" :[
    {'id': 1,
        'apelido': 'ERP 4g',
        'caminho': '192.168.254.212/3050:d:\\tek-system\\dados\\dadosmc_fb305.fdb'},
    {'id': 2,
        'apelido': 'Cliente 1097',
        'caminho': '192.168.254.176/3053:/home/denis/dadosmc-1097.fdb'},
    {'id': 3,
        'apelido': 'Cliente 1045',
        'caminho': '192.168.254.176/3053:/home/denis/dadosmc-1045.fdb'}
]};

let Pesquisas = {"Dados": [
    {'id': 1,
        'conexao': 1,
        'apelido': 'Listar Pessoas',
        'comando': 'select CODIGO_PESSOA, RAZAOSOCIAL_PESSOA from PESSOA'},
    {'id': 2,
        'conexao': 1,
        'apelido': 'Listar Status',
        'comando': 'select CODIGO_STATUS, DESCRICAO_STATUS from STATUS'},
    {'id': 3,
        'conexao': 2,
        'apelido': 'Listar Clientes',
        'comando': 'select CODIGO_PESSOA, RAZAOSOCIAL_PESSOA from PESSOA where CLIENTE_PESSOA = \'S\''},
    {'id': 4,
        'conexao': 2,
        'apelido': 'Listar Bancos',
        'comando': 'select CODIGO_BANCO, DESCRICAO_BANCO from BANCO'},
    {'id': 5,
        'conexao': 2,
        'apelido': 'Listar Qtde Duplicatas',
        'comando': 'select count(*) from DUPLICATA'},

]};

modalAbout_Botaoclose.addEventListener('click', (event) =>  {
    modalAbout.close();
    FecharMenu();
});

modalConfirmarExclusao_BotaoClose.addEventListener('click', (event) =>  {
    modalConfirmarExclusao.close();
});

modalConfirmarExclusao_BotaoConfirmar.addEventListener('click', (event) =>  {
    modalConfirmarExclusao.Lista.Dados = modalConfirmarExclusao.Lista.Dados.filter(Item => Item.id != modalConfirmarExclusao.IdExcluir);
    modalConfirmarExclusao.Funcao();
    modalConfirmarExclusao.close();
});


function FecharMenu() {
    document.querySelector('.mdl-layout__obfuscator').click();
}


document.addEventListener('click', (event) => {

    // Tratamento de clicks no menu principal
    if (event.target.classList.contains('mdl-navigation__link')) {

        var MenuItemClicado = event.target;

        switch (MenuItemClicado.dataset['action']) {
            case 'ListarConexoes':
                ListarConexoes();
                FecharMenu();
                break;
            case 'ListarPesquisas':
                ListarPesquisas();
                FecharMenu();
                break;
            case 'VerInformacoes':
                modalAbout.showModal();
                break;
        }
    }

    else if (event.target.classList.contains('material-icons')) {

        var button = event.target.parentElement;

        switch (button.dataset['action']) {
            case 'excluirConexao':
                modalConfirmarExclusao.Lista     = Conexoes;
                modalConfirmarExclusao.IdExcluir = button.dataset['item'];
                modalConfirmarExclusao.Funcao    = ListarConexoes;
                modalConfirmarExclusao.showModal();
                break;
            case 'excluirPesquisa':
                modalConfirmarExclusao.Lista     = Pesquisas;
                modalConfirmarExclusao.IdExcluir = button.dataset['item'];
                modalConfirmarExclusao.Funcao    = ListarPesquisas;
                modalConfirmarExclusao.showModal();
                break;
        }
    }

});


function ListarConexoes () {
    var htmlConexoes = '';
    Conexoes.Dados.forEach(Conexao => {
        htmlConexoes +=
            `<li class="lista-principal-conexao">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="card-content-container" >  
                      <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${Conexao.apelido}</h2>
                      </div>
                      <div class="mdl-card__supporting-text">
                        ${Conexao.caminho}
                      </div>
                      
                      <div class="mdl-card__menu">
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Conexao.id}" data-action="editarConexao">
                          <i class="material-icons">edit</i>
                        </button>
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Conexao.id}" data-action="excluirConexao">
                          <i class="material-icons">delete</i>
                        </button>
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Conexao.id}" data-action="abrirConexao">
                          <i class="material-icons">open_in_new</i>
                        </button>
                      </div>
                    </div>
                </div>
            </li>`;
    })

    listaPrincipal.innerHTML = htmlConexoes;
    botaoAdd.style.display = 'inherit';
};


function ListarPesquisas () {
    var htmlPesquisas = '';
    Pesquisas.Dados.forEach(Pesquisa => {
        htmlPesquisas +=
            `<li class="lista-principal-pesquisa">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="card-content-container" >  
                      <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${Pesquisa.apelido}</h2>
                      </div>
                      <div class="mdl-card__supporting-text">
                        ${Pesquisa.comando}
                      </div>
                                            
                      <div class="mdl-card__menu">
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Pesquisa.id}" data-action="editarPesquisa">
                          <i class="material-icons">edit</i>
                        </button>
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Pesquisa.id}" data-action="excluirPesquisa">
                          <i class="material-icons">delete</i>
                        </button>
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Pesquisa.id}" data-action="abrirPesquisa">
                          <i class="material-icons">open_in_new</i>
                        </button>
                      </div>
                    </div>
                </div>
            </li>`;
    })

    listaPrincipal.innerHTML = htmlPesquisas;
    botaoAdd.style.display = 'inherit';
}