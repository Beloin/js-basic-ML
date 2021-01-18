let eixoX = [];
let eixoY = [];

let grupos = 2;

let centroidesX = [];
let centroidesY = [];

let grupoID_Anterior = [];

// retorna a média dos eixos x de um determinado grupo
function mediaGrupoX(IDs = [], grupoIDs = 0) {
    // IDs: array onde o índice corresponde ao ID e o valor do índice corresponde ao grupo
    // grupoIDs: número correspondente ao grupo que terá a média calculada
    let soma = 0;
    let qtdGrupo = 0;
    for (let i = 0; i < IDs.length; i++) {
        if (IDs[i] == grupoIDs) {
            soma += eixoX[i];
            qtdGrupo++;
        }
    }
    return soma / qtdGrupo;
}

// retorna a média dos eixos y de um determinado grupo
function mediaGrupoY(IDs = [], grupoIDs = 0) {
    // IDs: array onde o índice corresponde ao ID e o valor do índice corresponde ao grupo
    // grupoIDs: número correspondente ao grupo que terá a média calculada
    let soma = 0;
    let qtdGrupo = 0;
    for (let i = 0; i < IDs.length; i++) {
        if (IDs[i] == grupoIDs) {
            soma += eixoY[i];
            qtdGrupo++;
        }
    }
    return soma / qtdGrupo;
}

// atualiza os centroides dos eixos x
function atualizaCentroideX() {
    if (centroidesX.length <= 0) {
        centroidesX[0] = eixoX[0];
        for (let i = 1; i < grupos; i++) {
            centroidesX[i] = eixoX[eixoX.length - 1 - i];
        }
    } else {
        for (let i = 0; i < grupos; i++) {
            centroidesX[i] = mediaGrupoX(grupoID_Anterior, i);
        }
    }
}

// atualiza os centroides dos eixos y
function atualizaCentroideY() {
    if (centroidesY.length <= 0) {
        centroidesY[0] = eixoY[0];
        for (let i = 1; i < grupos; i++) {
            centroidesY[i] = eixoY[eixoY.length - 1 - i];
        }
    } else {
        for (let i = 0; i < grupos; i++) {
            centroidesY[i] = mediaGrupoY(grupoID_Anterior, i);
        }
    }
}

// retorna o menor valor de um array
function minimo(arr = []) {
    Array.prototype.min = function () {
        return Math.min.apply(null, this);
    };
    return arr.min();
}

// retorna o índice de um valor em um array
// o índice retornado corresponde ao grupo que determinada linha pertence
function grupo(distancias = [], menorDistancia = 0) {
    return distancias.indexOf(menorDistancia);
}

// verifica se dois arrays possuem todos os valores iguais
function comparaGrupos(arr1 = [], arr2 = []) {
    let retorno = true;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            retorno = false;
        }
    }
    return retorno;
}

// atualiza os centroides e os grupos das linhas
function atualizaGrupo() {
    atualizaCentroideX();
    atualizaCentroideY();

    let retorno = true;
    let grupoID = [];
    let distancias = [];
    let distanciasMenores = [];

    for (let i = 0; i < eixoX.length; i++) {
        for (let j = 0; j < grupos; j++) {
            distancias[j] = Math.sqrt(
                Math.pow(eixoX[i] - centroidesX[j], 2) +
                    Math.pow(eixoY[i] - centroidesY[j], 2)
            );
        }

        distanciasMenores[i] = minimo(distancias);
        // o ID é o índice e o valor é o grupo
        grupoID[i] = grupo(distancias, distanciasMenores[i]);
    }

    if (grupoID_Anterior.length <= 0) {
        grupoID_Anterior = grupoID;
    } else {
        if (comparaGrupos(grupoID_Anterior, grupoID)) {
            retorno = false;
        } else {
            grupoID_Anterior = grupoID;
            retorno = true;
        }
    }
    return retorno;
}

// retorna os grupos formatados como arrays de uma matriz
function retornaElementosGrupo(arrGrupos = []) {
    let matrizGrupos = [];
    for (let i = 0; i < grupos; i++) {
        let divisaoGrupos = [];
        for (let j = 0; j < arrGrupos.length; j++) {
            if (arrGrupos[j] == i) {
                divisaoGrupos.push([eixoX[j], eixoY[j]]);
            }
        }

        matrizGrupos.push(divisaoGrupos);
    }
    return matrizGrupos;
}

// inicia treinamento
function train(config = {}) {
    if (config.x) eixoX = config.x;
    else eixoX = [];
    if (config.y) eixoY = config.y;
    else eixoY = [];
    if (config.groups) grupos = config.groups;
    else grupos = 2;
}

// inicia a clusterização
function predict() {
    centroidesX = [];
    centroidesY = [];
    grupoID_Anterior = [];

    if (grupos > 1 && grupos < eixoX.length) {
        if (eixoX.length > 2) {
            while (atualizaGrupo()) {}
            const matriz = retornaElementosGrupo(grupoID_Anterior);
            return matriz;
        } else {
            return [];
        }
    } else {
        return [];
    }
}

train({
    x: [1, 3, 5, 25, 45, 65],
    y: [2, 4, 6, 35, 55, 75],
    groups: 2,
});

console.log(predict());
