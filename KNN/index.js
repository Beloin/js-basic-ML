let eixoX = [];
let eixoY = [];
let classe = [];

let entradaX = 0;
let entradaY = 0;

function subtracoesX() {
    let sub = [];
    for (let i = 0; i < eixoX.length; i++) {
        sub[i] = eixoX[i] - entradaX;
    }
    return sub;
}

function subtracoesY() {
    let sub = [];
    for (let i = 0; i < eixoY.length; i++) {
        sub[i] = eixoY[i] - entradaY;
    }
    return sub;
}

function quadradosX() {
    const sub = subtracoesX();
    let quad = [];
    for (let i = 0; i < sub.length; i++) {
        quad[i] = sub[i] * sub[i];
    }
    return quad;
}

function quadradosY() {
    const sub = subtracoesY();
    let quad = [];
    for (let i = 0; i < sub.length; i++) {
        quad[i] = sub[i] * sub[i];
    }
    return quad;
}

function somaQuadrados() {
    const quadX = quadradosX();
    const quadY = quadradosY();
    let soma = [];
    for (let i = 0; i < quadX.length; i++) {
        soma[i] = quadX[i] + quadY[i];
    }
    return soma;
}

function raizes() {
    const soma = somaQuadrados();
    let raizes = [];
    for (let i = 0; i < soma.length; i++) {
        raizes[i] = Math.sqrt(soma[i]);
    }
    return raizes;
}

function train(config = {}) {
    if (config.x) eixoX = config.x;
    else eixoX = [0];
    if (config.y) eixoY = config.y;
    else eixoY = [0];
    if (config.class) classe = config.class;
    else classe = [''];
}

function predict(_entradaX = 0, _entradaY = 0) {
    entradaX = _entradaX;
    entradaY = _entradaY;

    let entradaClasse = 0;
    const raiz = raizes();

    let indiceMenor = -1;
    let menor = Infinity;

    for (let i = 0; i < raiz.length; i++) {
        if (raiz[i] <= menor) {
            menor = raiz[i];
            indiceMenor = i;
        }
    }

    entradaClasse = classe[indiceMenor];
    return entradaClasse;
}

const config = {
    x: [1, 2, 30, 40],
    y: [3, 4, 50, 60],
    class: [1, 1, 2, 2],
};

train(config);

console.log(predict(40, 60));
