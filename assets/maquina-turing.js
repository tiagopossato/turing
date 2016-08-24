function MaquinaDeEstados() {
    var alfabetoInicial;
    var alfabetoFinal;
    var simboloVazio;
    var qtdEstados;
    var estados;
    var estadoInicial;

    this.qtdEstados = 0;
    this.estados = [];
    this.alfabetoFinal = [];
    this.alfabetoInicial = [];
    this.estadoInicial = false;

};

function Estado(_id) {
    var id;
    var transicoes;
    var estadoFinal;

    this.id = _id;
    this.transicoes = [];
    this.estadoFinal = false;

};

function Transicao(_id) {
    var id;
    var proximoEstado;
    var lidoNaFita;
    var escritoNaFita;
    var movimento;

    this.id = _id;
    this.proximoEstado = 0;
    this.lidoNaFita = null;
    this.escritoNaFita = null;
    this.movimento = 0;
};

var maquinaDeEstados;

$(window).load(function() {
    maquinaDeEstados = new MaquinaDeEstados();

    var dados = localStorage.getItem("maquinaDeEstados"); // Recupera os dados armazenados
    if (dados === null) return;

    maquinaDeEstados = JSON.parse(dados);
    maquinaDeEstados.estados = [];

    for (var i = 0; i < maquinaDeEstados.alfabetoInicial.length; i++) {
        $('#alfabetoInicial').tagsinput('add', maquinaDeEstados.alfabetoInicial[i]);
    }

    for (var i = 0; i < maquinaDeEstados.alfabetoFinal.length; i++) {
        if (maquinaDeEstados.alfabetoFinal[i] === maquinaDeEstados.simboloVazio) continue;
        $('#alfabetoFinal').tagsinput('add', maquinaDeEstados.alfabetoFinal[i]);
    }

    $("#simboloVazio").val(maquinaDeEstados.simboloVazio);

    $("#qtdEstados").val(parseInt(maquinaDeEstados.qtdEstados));

});