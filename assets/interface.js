/*global maquinaDeEstados*/
/*global Estado*/
/*global Transicao*/
/*global $*/

$("#botaoProsseguir").click(function(e) {
    //e.preventDefault();
    // maquinaDeEstados.limpa();
    //limpa as variaveis e zera a tabela
    maquinaDeEstados.qtdEstados = 0;
    maquinaDeEstados.estados = [];
    $("#tabelaEstados > tbody").html("");

    maquinaDeEstados.alfabetoInicial = $("#alfabetoInicial").tagsinput('items');
    maquinaDeEstados.alfabetoFinal = $("#alfabetoFinal").tagsinput('items');
    maquinaDeEstados.simboloVazio = $("#simboloVazio").val();
    maquinaDeEstados.qtdEstados = $("#qtdEstados").val();

    if (maquinaDeEstados.simboloVazio !== "" && maquinaDeEstados.alfabetoFinal.indexOf(maquinaDeEstados.simboloVazio) === -1) maquinaDeEstados.alfabetoFinal.push(maquinaDeEstados.simboloVazio);

    localStorage.setItem("maquinaDeEstados", JSON.stringify(maquinaDeEstados));

    for (var i = 0; i < maquinaDeEstados.qtdEstados; i++) {
        addEstado(i);
        var estado = new Estado(i);
        estado.id = i;
        maquinaDeEstados.estados.push(estado);
    }
});

$("#botaoCalcular").click(function(e) {
    console.log(maquinaDeEstados);
    //percorre a tabela de estados
    for (var i = 0; i < maquinaDeEstados.estados.length; i++) {
        if (maquinaDeEstados.estados[i].estadoFinal) continue;
        //percorre as transicoes dentro do estado
        for (var j = 0; j < maquinaDeEstados.estados[i].transicoes.length; j++) {
            console.log('-' + i + '-' + j);
            maquinaDeEstados.estados[i].transicoes[j].proximoEstado = $('#proximoEstado-' + i + '-' + j).val();
            maquinaDeEstados.estados[i].transicoes[j].lidoNaFita = $('#lidoNaFita-' + i + '-' + j).val();
            maquinaDeEstados.estados[i].transicoes[j].escritoNaFita = $('#escritoNaFita-' + i + '-' + j).val();
            maquinaDeEstados.estados[i].transicoes[j].movimento = $('input:radio[name=movimento-' + i + '-' + j+']:checked').val();
        }
        
        
    }
    console.log(maquinaDeEstados);
});

function removeTabelaTransicoes(estado) {
    maquinaDeEstados.estados[estado].estadoFinal = !maquinaDeEstados.estados[estado].estadoFinal;

    if (maquinaDeEstados.estados[estado].estadoFinal) {
        $('#' + 'tabelaTransicoes-' + estado).hide();
        maquinaDeEstados.estados[estado].transicoes = null;
         $('#tabelaTransicoes-' + estado+ ' > tbody').html("");
    }
    else {
        $('#' + 'tabelaTransicoes-' + estado).show();
        maquinaDeEstados.estados[estado].transicoes = [];
    }
}

var addEstado = function(i) {
    var newRow = $('<tr id=' + i + '>');
    var cols = "";
    cols += '<td>' + i + '</td>';
    cols += '<td>' +
        '<div class="table-responsive">' +
        '<table class="table table-hover" border="2" id="tabelaTransicoes-' + i + '">' +
        '<thead>' +
        '<tr>' +
        '<th>Nº</th>' +
        '<th>Próximo Estado</th>' +
        '<th>Lido na fita</th>' +
        '<th>Escreve na fita</th>' +
        '<th>Direção da fita</th>' +
        // '<th>Opções</th>' +
        '</tr>' +
        '</thead>' +
        '<tfoot>' +
        '<tr>' +
        '<td colspan="5" style="text-align: left;">' +
        '<button class="btn btn-success" onclick="addTransicao(' + i + ')" type="button">Adicionar Transicao</button>' +
        '</td>' +
        '</tr>' +
        '</tfoot>' +
        '</table>' +
        '</td>';
    cols += '<td><label class="radio-inline"><input type="radio" value="1" name="radioInicial">Inicial</label></td>';
    cols += '<td>' +
        '<div class="checkbox">' +
        '<label><input type="checkbox" value="" onchange="removeTabelaTransicoes(' + i + ')" name="estadoFinal-' + i + '" id="estadoFinal-' + i + '" >Final</label>' +
        '</div>' +
        '</td>';
    //cols += '<td class="actions">';
    //cols += '<button class="btn btn-danger" onclick="removeEstado(this)" type="button">X</button>';
    //cols += '</td>';
    newRow.append(cols);
    $("#tabelaEstados").append(newRow);
    return false;
};

var addTransicao = function(id) {
    //console.log(id);

    var transicao = new Transicao();
    transicao.id = maquinaDeEstados.estados[id].transicoes.length;
    maquinaDeEstados.estados[id].transicoes.push(transicao);

    // console.log(maquinaDeEstados);
    // console.log(maquinaDeEstados.estados[id]);
    // console.log(maquinaDeEstados.estados[id].transicoes);
    // console.log(maquinaDeEstados.estados[id].transicoes.length);
    var newRow = $("<tr>");
    var cols = "";
    cols += '<td>' + transicao.id + '</td>';
    cols += '<td><select class="form-control" id="proximoEstado-' + id + '-' + transicao.id +
        '" id="proximoEstado-' + id + '-' + transicao.id +
        '"><option value=""></option>';
    for (var i = 0; i < maquinaDeEstados.estados.length; i++) {
        cols += '"><option value="' + maquinaDeEstados.estados[i].id + '">' + maquinaDeEstados.estados[i].id + '</option>';
    }
    cols += '<select></td>';

    cols += '<td><select class="form-control" id="lidoNaFita-' + id + '-' + transicao.id +
        '" id="lidoNaFita-' + id + '-' + transicao.id +
        '"><option value=""></option>';
    for (var i = 0; i < maquinaDeEstados.alfabetoInicial.length; i++) {
        cols += '"><option value="' + maquinaDeEstados.alfabetoInicial[i] + '">' + maquinaDeEstados.alfabetoInicial[i] + '</option>';
    }
    cols += '<select></td>';

    cols += '<td><select class="form-control" id="escritoNaFita-' + id + '-' + transicao.id +
        '" id="escritoNaFita-' + id + '-' + transicao.id +
        '"><option value=""></option>';
    for (var i = 0; i < maquinaDeEstados.alfabetoFinal.length; i++) {
        cols += '"><option value="' + maquinaDeEstados.alfabetoFinal[i] + '">' + maquinaDeEstados.alfabetoFinal[i] + '</option>';
    }
    cols += '<select></td>';

    cols += '<td>' +
        '<label class="radio-inline"><input type="radio" value="1" ' +
        ' name="movimento-' + id + '-' + transicao.id + '" checked="checked">R</label>' +
        '<label class="radio-inline"><input type="radio" value="-1" ' +
        ' name="movimento-' + id + '-' + transicao.id + '">L</label>' +
        '<label class="radio-inline"><input type="radio" value="0" ' +
        ' name="movimento-' + id + '-' + transicao.id + '">S</label>'; +
    '</td>'; //direção da fita
    // cols += '<td class="actions">';
    // cols += '<button class="btn btn-danger" onclick="removeTransicao(this)" type="button">X</button>';
    // cols += '</td>';
    newRow.append(cols);
    $('#tabelaTransicoes-' + id).append(newRow);

    $("select").select2();

    return false;
};



var removeTransicao = function(handler) {
    var tr = $(handler).closest('tr');
    tr.fadeOut(200, function() {
        tr.remove();
    });
    return false;
};

var removeEstado = function(handler) {
    var tr = $(handler).closest('tr');
    tr.fadeOut(200, function() {
        tr.remove();
    });
    return false;
};