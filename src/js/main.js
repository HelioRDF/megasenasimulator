let numeros = [];

$(() => {
   // preencherCartelaNumerica();
})


function preencherCartelaNumerica() {
    let cartelaJogo = $("#cartelaJogo li");
    for (let index = 1; index <= 60; index++) {
        if (index < 10) {
            id = "0" + index;
        } else {
            id = index;
        }
        let numerosCartela = $(".numerosCartela").clone();
        let meuLi = $("<li>");
        numerosCartela.removeClass("numerosCartela");
        numerosCartela.attr("id", id);
        numerosCartela.attr("onclick", "marcarNumero(this)");
        numerosCartela.text(`[${id}]`);
        meuLi.append(numerosCartela);
        cartelaJogo.append(meuLi);
    }
}


function marcarNumero(obj) {
    valor = obj.id.toString();
    if (numeros.includes(valor)) {
        numeros.splice(numeros.indexOf(valor), 1);
        removerChip(valor);
        $(`#${valor}`).toggleClass("selecionado");
    } else if (numeros.length == 15) {
        alert("Selecionar no max 15 números ... ");
    } else {
        numeros.push(valor);
        adicionaChip(valor);
        $(`#${valor}`).toggleClass("selecionado");
    }
    infosDoJogo();
}

function adicionaChip(valor) {
    let divChip = $("<div>").attr("id", `chip${valor}`).addClass("chip");
    let imgChip = $("<img>").attr("src", "src/imagem/megasena.png").attr("width", "20");
    let labelChip = $("<label>").text(valor);
    let divChips = $("#listaChips");
    divChip.append(imgChip);
    divChip.append(labelChip);
    divChips.append(divChip);
}

function removerChip(valor) {
    let chip = $(`#chip${valor}`);
    chip.remove();
};

function resultadoVisivel() {
    $(".campoProbabilidade").stop().slideUp(800);
    $(".mostrarResultados").stop().slideDown(800);
    $("#tabelaResultado tr").empty();
    let posicao = $(".mostrarResultados").offset().top;
    setTimeout(() => {
        $('html, body').animate({ scrollTop: posicao }, 2000);
    }, 1200);
}

function conferirDezenas() {
    let sorteios = retornaJsonCustomizado();
    ganhou = false;
    resultadoVisivel();
    let quadra = 0,
        quina = 0,
        sena = 0;
    for (let obj in sorteios) {
        acertos = 0;
        for (let num in numeros) {
            if (sorteios[obj].dezenas.includes(numeros[num])) {
                acertos++;
            };
        }
        if (acertos > 3) {
            mostrarResultadosGanhou(sorteios[obj], acertos);
            ganhou = true;
            switch (acertos) {
                case 4:
                    quadra++;
                    break;
                case 5:
                    quina++;
                    break;
                case 6:
                    sena++;
                    break;

                default:
                    break;
            }
        }
    }
    $("#resumoSorteio").text("Sena = " + sena + " | Quina = " + quina + " | Quadra = " + quadra)
    if (!ganhou) {
        mostrarResultadosNaoGanhou();
    }
}

function mostrarResultadosGanhou(obj, pontos) {
    let trTable = $("<tr>");
    let thTable = $("<th>").attr("scope", "row").text(obj.numero);
    let tdTablePontos = $("<td>").attr("scope", "row").text(pontos);
    let tdTableSena = $("<td>").attr("scope", "row").text("R$ " + obj.premiacao.sena.valorPago + "  (" + obj.premiacao.sena.ganhadores + ")");
    let tdTableQuina = $("<td>").attr("scope", "row").text("R$ " + obj.premiacao.quina.valorPago + "  (" + obj.premiacao.quina.ganhadores + ")");
    let tdTableQuadra = $("<td>").attr("scope", "row").text("R$ " + obj.premiacao.quadra.valorPago + "  (" + obj.premiacao.quadra.ganhadores + ")");
    let tdTableArrecadacao = $("<td>").attr("scope", "row").text(obj.arrecadacaoTotal);
    let tdTableData = $("<td>").attr("scope", "row").text(obj.data);
    trTable.append(thTable);
    trTable.append(tdTablePontos);
    trTable.append(tdTableSena);
    trTable.append(tdTableQuina);
    trTable.append(tdTableQuadra);
    trTable.append(tdTableArrecadacao);
    trTable.append(tdTableData);
    table = $("#tabelaResultado");
    table.append(trTable);
}

function mostrarResultadosNaoGanhou() {
    let trTable = $("<tr>");
    let tdTableMsg = $("<td>").text("Não Ganhou!");
    trTable.append(tdTableMsg);
    table = $("#tabelaResultado");
    table.append(trTable);
}

function infosDoJogo() {
    let num = numeros.length;
    $("#numerosSelecionados").text("Números: " + num);
    switch (num) {
        case 6:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 3,50");
            break;
        case 7:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 24,50");
            break;
        case 8:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 98,50");
            break;
        case 9:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 294,00");
            break;
        case 10:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 735,00");
            break;
        case 11:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 1,617,00");
            break;
        case 12:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 3.234,00");
            break;
        case 13:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 6.006,00");
            break;
        case 14:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 10.510,50");
            break;
        case 15:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 17.517,50");
            break;
        default:
            break;
    }
}