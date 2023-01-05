iniciar();

var numInicial = 2545;
var numFinal = 2551;
function iniciar() {
    setTimeout(() => {
        numInicial++;
        if (numInicial <= numFinal) {
            buscarResultado(numInicial);
            iniciar();
        }
    },
        3000);
}

function ajustarData(data) {
    const newData = new Date(data);
    const resultado = newData.getDay() + "/" + newData.getMonth() + "/" + newData.getFullYear();
    return resultado;
}

function ajustarValor(valor) {
    const formatado = valor.toLocaleString('pt-BR',
        {
            style: 'currency', currency: 'BRL'
        });
    return formatado;
}

function buscarResultado(concurso) {
    var url = `https://apiloterias.com.br/app/resultado?loteria=megasena&token=tfgSQN3nqLVe6XY&concurso=${concurso}`;
    var newObj;

    fetch(url).then((resp) => resp.json()).then((json) => newObj = {
        "numero": JSON.stringify(json.numero_concurso),
        "data": ajustarData(json.data_concurso),
        "cidade": json.local_realizacao,
        "local": json.local_realizacao,
        "valorAcumulado": ajustarValor(json.valor_acumulado),
        "dezenas": json.dezenas,
        "premiacao": {
            "sena": {
                "ganhadores": JSON.stringify(json.premiacao[
                    0
                ].quantidade_ganhadores),
                "valorPago": ajustarValor(json.premiacao[0].valor_total),
            },
            "quina": {
                "ganhadores": JSON.stringify(json.premiacao[
                    1
                ].quantidade_ganhadores),
                "valorPago": ajustarValor(json.premiacao[
                    1
                ].valor_total),
            },
            "quadra": {
                "ganhadores": JSON.stringify(json.premiacao[
                    2
                ].quantidade_ganhadores),
                "valorPago": ajustarValor(json.premiacao[
                    2
                ].valor_total),
            }
        },
        "arrecadacaoTotal": ajustarValor(json.arrecadacao_total),
        "proximoConcurso": {
            "data": "01/01/2999",
            "valorEstimado": "99.999.999,00"
        },
        "valorAcumuladoFinalCinco": "2.030.190,42",
        "valorAcumuladoMegaVirada": "2.208.593,74"
    }).then((obj) => console.log("\n",JSON.stringify(obj),","))
}



