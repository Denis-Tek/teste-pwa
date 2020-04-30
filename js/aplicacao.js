// Mapeamento DOM
let botaoAdd               = document.querySelector('.botao-add');
botaoAdd.style.display = 'none';

let listaPrincipal         = document.querySelector('.lista-principal');
let FiltroPrincipal        = document.querySelector('#filtro');

let modalAbout             = document.querySelector('#dialogo-sobre');
let modalConfirmarExclusao = document.querySelector('#dialogo-confirmar-exclusao');
let modalEditarConexao     = document.querySelector('#dialogo-editar-conexao');
let modalEditarPesquisa    = document.querySelector('#dialogo-editar-pesquisa');

let editIdConexao          = modalEditarConexao.querySelector('#idConexao');
let editApelidoConexao     = modalEditarConexao.querySelector('#apelidoConexao');
let editCaminhoConexao     = modalEditarConexao.querySelector('#caminhoConexao');

let editIdPesquisa           = modalEditarPesquisa.querySelector('#idPesquisa');
let listaConexoesDisponiveis = modalEditarPesquisa.querySelector('#listaConexoesDisponiveis');
let editConexaoSelecionada   = document.getElementsByName('conexaoPesquisa')[0];
let editApelidoPesquisa      = modalEditarPesquisa.querySelector('#apelidoPesquisa');
let editComandoPesquisa      = modalEditarPesquisa.querySelector('#comandoPesquisa');

let modalEditarConexao_BotaoSalvar        = modalEditarConexao.querySelector('.done');
let modalEditarConexao_BotaoClose         = modalEditarConexao.querySelector('.close');

let modalEditarPesquisa_BotaoSalvar       = modalEditarPesquisa.querySelector('.done');
let modalEditarPesquisa_BotaoClose        = modalEditarPesquisa.querySelector('.close');

let modalConfirmarExclusao_BotaoConfirmar = modalConfirmarExclusao.querySelector('.done');
let modalConfirmarExclusao_BotaoClose     = modalConfirmarExclusao.querySelector('.close');

let modalAbout_Botaoclose                 = modalAbout.querySelector('.close');


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

modalEditarConexao_BotaoClose.addEventListener('click', (event) =>  {
    modalEditarConexao.close();
});

modalEditarPesquisa_BotaoClose.addEventListener('click', (event) =>  {
    modalEditarPesquisa.close();
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
                LimparFiltro();
                ListarConexoes();
                FecharMenu();
                break;
            case 'ListarPesquisas':
                LimparFiltro();
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
            case 'adicionar':
                if (listaPrincipal.dataset['info'] == 'CONEXOES') {
                    PreencherFormEdicaoConexao(-1);
                    modalEditarConexao.showModal();
                } else if (listaPrincipal.dataset['info'] == 'PESQUISAS') {
                    PreencherFormEdicaoPesquisa(-1);
                    modalEditarPesquisa.showModal();
                }
                break;
            case 'editarConexao':
                PreencherFormEdicaoConexao(button.dataset['item']);
                modalEditarConexao.showModal();
                break
            case 'editarPesquisa':
                PreencherFormEdicaoPesquisa(button.dataset['item']);
                modalEditarPesquisa.showModal();
                break
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
            case 'abrirConexao':
                Filtrar(button.dataset['item']);
                ListarPesquisas();
                break;

        }
    }

});

function LimparFiltro() {
    FiltroPrincipal.dataset['filtro'] = '';
    FiltroPrincipal.innerText = '';
}

function Filtrar(idConexao){
    FiltroPrincipal.dataset['filtro'] = idConexao;
    FiltroPrincipal.innerHTML = 'Exibindo apenas pesquisas da conexão: <strong>' + Conexoes.Dados.find((conexao) => conexao.id == idConexao).apelido + '</strong>';
}

function ListarConexoes () {
    var htmlConexoes = '';
    Conexoes.Dados.sort((a, b) => a.apelido.toUpperCase() > b.apelido.toUpperCase() ? 1 : -1);
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

    listaPrincipal.dataset['info'] = 'CONEXOES';
    listaPrincipal.innerHTML = htmlConexoes;
    botaoAdd.style.display = 'inherit';
};


function ListarPesquisas () {
    var htmlPesquisas = '';
    let conexaoFiltrada = FiltroPrincipal.dataset['filtro'];
    Pesquisas.Dados.sort((a, b) => a.apelido.toUpperCase() > b.apelido.toUpperCase() ? 1 : -1);
    Pesquisas.Dados.filter((elemento) => elemento.conexao == conexaoFiltrada || ! conexaoFiltrada).forEach(Pesquisa => {
        htmlPesquisas +=
            `<li class="lista-principal-pesquisa">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div class="card-content-container" >  
                      <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${Pesquisa.apelido}</h2>
                      </div>
                      
                      <div class="mdl-card__supporting-text"><strong>Conexão: ${Conexoes.Dados.find((conexao) => conexao.id == Pesquisa.conexao).apelido}</strong></div>
                      
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

    listaPrincipal.dataset['info'] = 'PESQUISAS';
    listaPrincipal.innerHTML = htmlPesquisas;
    botaoAdd.style.display = 'inherit';
}


function PreencherFormEdicaoConexao(id) {
    editIdConexao.value = id;
    if (id < 0) {
        editApelidoConexao.value = '';
        editCaminhoConexao.value = '';
    } else {
        let index = Conexoes.Dados.findIndex(conexao => conexao.id == id);
        editApelidoConexao.value = Conexoes.Dados[index].apelido;
        editCaminhoConexao.value = Conexoes.Dados[index].caminho;
    }
}

function PreencherFormEdicaoPesquisa(id) {
    editIdPesquisa.value = id;

    if (id < 0) {
        CarregarListaConexoes(FiltroPrincipal.dataset['filtro']);
        editApelidoPesquisa.value    = '';
        editComandoPesquisa.value    = '';
    } else {
        let index = Pesquisas.Dados.findIndex(pesquisa => pesquisa.id == id);

        CarregarListaConexoes(Pesquisas.Dados[index].conexao);

        editApelidoPesquisa.value = Pesquisas.Dados[index].apelido;
        editComandoPesquisa.value = Pesquisas.Dados[index].comando;
    }
}

function CarregarListaConexoes(idConexaoAtual) {
    let lista = '';
    Conexoes.Dados.forEach((conexao) => {
        lista += `<li class="mdl-menu__item" data-val=${conexao.id} ${conexao.id == idConexaoAtual ? 'data-selected="true"' : ''}> ${conexao.apelido} </li>`
    });
    listaConexoesDisponiveis.innerHTML = lista;
    if (idConexaoAtual == '') {
        modalEditarPesquisa.querySelector('#conexaoPesquisa').value = '';
    }
    getmdlSelect.init('#selectConexaoPesquisa');
}

modalEditarConexao_BotaoSalvar.addEventListener('click', (event) =>  {
    if (editApelidoConexao.value.trim() == '' || editCaminhoConexao.value.trim() == '') return;

    id = editIdConexao.value;

    let index;

    if (id < 0) {
        let max = MaxArray(Conexoes.Dados, "id") || 0;
        Conexoes.Dados.push({"id": max + 1});
        index = Conexoes.Dados.length - 1;
    } else {
        index = Conexoes.Dados.findIndex(conexao => conexao.id == id);
    }

    Conexoes.Dados[index].apelido = editApelidoConexao.value.trim();
    Conexoes.Dados[index].caminho = editCaminhoConexao.value.trim();

    ListarConexoes();
    modalEditarConexao.close();
});


modalEditarPesquisa_BotaoSalvar.addEventListener('click', (event) =>  {
    if (editConexaoSelecionada.value.trim() == '' ||
        editApelidoPesquisa.value.trim() == '' ||
        editComandoPesquisa.value.trim() == '') return;

    id = editIdPesquisa.value;

    let index;

    if (id < 0) {
        let max = MaxArray(Pesquisas.Dados, "id") || 0;
        Pesquisas.Dados.push({"id": max + 1});
        index = Pesquisas.Dados.length - 1;
    } else {
        index = Pesquisas.Dados.findIndex(pesquisa => pesquisa.id == id);
    }
    Pesquisas.Dados[index].conexao = editConexaoSelecionada.value.trim();
    Pesquisas.Dados[index].apelido = editApelidoPesquisa.value.trim();
    Pesquisas.Dados[index].comando = editComandoPesquisa.value.trim();

    ListarPesquisas();
    modalEditarPesquisa.close();
});



/**
 * @return {number}
 */
function MaxArray(Array, atributo) {
  let max = null;
  Array.forEach(elemento => {
      if (elemento[atributo] > max) {
          max = elemento[atributo]
      }
  });
  return max;
}