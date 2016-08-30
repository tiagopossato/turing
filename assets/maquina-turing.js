/*global $*/

function MaquinaDeTuring() {
    var alfabetoInicial;
    var alfabetoFinal;
    var alfabetoNaFita;
    var simboloVazio;
    // var qtdEstados;
    var estados;
    var estadoInicial;

    // this.qtdEstados = 0;
    this.estados = [];
    this.alfabetoFinal = [];
    this.alfabetoInicial = [];
    this.alfabetoNaFita = "";
    this.estadoInicial = false;

};

function Estado(_q) {
    var q;
    var transicoes;
    var estadoFinal;
    var estadoInicial;

    this.q = _q;
    this.transicoes = [];
    this.estadoFinal = false;
    this.estadoInicial = false

};

function Transicao() {
    var proximoEstado;
    var lidoNaFita;
    var escritoNaFita;
    var movimento;
    
    this.proximoEstado = 0;
    this.lidoNaFita = null;
    this.escritoNaFita = null;
    this.movimento = 0;
};

var maquinaDeTuring;

var calculaMaquina = function(mq) {
    console.log(mq);
    var cabecote = 0;
    var estadoAtual = mq.estadoInicial;

    console.log("Movimentos = {");

    while (cabecote < mq.alfabetoNaFita.length) {
        var palavraValida = false;

        //console.log("Fita[" + cabecote + "] = " + mq.alfabetoNaFita[cabecote]);
        // console.log("estadoAtual:" + estadoAtual);
        var saida = "\t(Q[" + estadoAtual + "], Lido: " + mq.alfabetoNaFita[cabecote] + ") => (";
        for (var i = 0; i < mq.estados[estadoAtual].transicoes.length; i++) {
            if (mq.estados[estadoAtual].transicoes[i].lidoNaFita === mq.alfabetoNaFita[cabecote]) {

                saida += "(Q[" + mq.estados[estadoAtual].transicoes[i].proximoEstado + "], Escrito: " + mq.estados[estadoAtual].transicoes[i].escritoNaFita +
                    " , Mov: " + mq.estados[estadoAtual].transicoes[i].movimento + ")";

                mq.alfabetoNaFita = setCharAt(mq.alfabetoNaFita, cabecote, mq.estados[estadoAtual].transicoes[i].escritoNaFita);

                //mq.alfabetoFinal = mq.alfabetoFinal.replaceAt(cabecote, mq.estados[estadoAtual].transicoes[i].escritoNaFita);
                cabecote += parseInt(mq.estados[estadoAtual].transicoes[i].movimento); //movimenta o cabeçote de leitura
                estadoAtual = parseInt(mq.estados[estadoAtual].transicoes[i].proximoEstado);

                palavraValida = true;

                // console.log("Transicao encontrada no estado: ");
                // console.log(mq.estados[estadoAtual].transicoes[i]);

                break;
            }
        }
        // console.log("proximoEstado: " + estadoAtual);

        if (!palavraValida) {
            console.log("Nenhuma Transicao encontrada na posicao: " + cabecote + ", Caracter: " + mq.alfabetoNaFita[cabecote]);
            //console.log("A palavra não é válida!");
            break;
        }

        console.log(saida);

    }
    console.log("}");
    if (mq.estados[estadoAtual].estadoFinal) {
        alert("Palavra válida!");
    }
    else {
        alert("Palavra inválida!");
    }
    console.log("Execução encerrada!");
    console.log(mq);

}