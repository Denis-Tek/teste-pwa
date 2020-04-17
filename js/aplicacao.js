// Mapeamento DOM
let listaPrincipal        = document.querySelector('.lista-principal');
let modalAbout            = document.querySelector('#about-dialog');
let modalAbout_Botaoclose = modalAbout.querySelector('.close');

let Conexoes = [
    {'id': 1,
        'apelido': 'ERP 4g',
        'caminho': '192.168.254.212/3050:d:\\tek-system\\dados\\dadosmc_fb305.fdb'},
    {'id': 2,
        'apelido': 'Cliente 1097',
        'caminho': '192.168.254.176/3053:/home/denis/dadosmc-1097.fdb'}
];

let Pesquisas = [];

modalAbout_Botaoclose.addEventListener('click', (event) =>  {
    modalAbout.close();
});

// Tratamento de clicks no menu principal
document.addEventListener('click', (event) => {

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
            case 'VerInformacoes': modalAbout.showModal(); break;
        }
    }
});


function FecharMenu() {
    document.querySelector('.mdl-layout__obfuscator').click();
}


function ListarConexoes () {
    var htmlConexoes = '';
    Conexoes.forEach(Conexao => {
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
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-item="${Conexao.id}" data-action="AbrirConexao">
                          <i class="material-icons">open</i>
                        </button>
                      </div>
                    </div>
                </div>
            </li>`;
    })

    listaPrincipal.innerHTML = htmlConexoes;
};
