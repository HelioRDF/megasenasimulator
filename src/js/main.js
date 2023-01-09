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
    } else if (numeros.length == 20) {
        alert("Selecionar no max 20 números ... ");
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
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 4,50");
            break;
        case 7:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 31,50");
            break;
        case 8:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 126");
            break;
        case 9:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 378,00");
            break;
        case 10:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 945,00");
            break;
        case 11:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 2,079,00");
            break;
        case 12:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 4.128");
            break;
        case 13:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 7.722");
            break;
        case 14:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 13.513,50");
            break;
        case 15:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 22.522,50");
            break;
        case 16:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 36.036,00");
            break;
        case 17:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 55.692,00");
            break;
        case 18:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 83.538");
            break;
        case 19:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 122.094");
            break;
        case 20:
            $("#valorDoJogo").text("Valor do Jogo: " + "R$ 174.420");
            break;
        default:
            break;
    }
}