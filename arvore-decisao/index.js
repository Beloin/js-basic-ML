let eixoX = [];
let eixoY = [];

let classe = [];

function eliminaDuplicados(arr = []) {
    arr = [...new Set(arr)];
    return arr;
}

function retornaClasses() {
    let arr = classe;
    arr = eliminaDuplicados(arr);
    return arr;
}

function proporcoes(_eixo = '', _valor = '', _classe = '') {
    _eixo = _eixo.toString().toLowerCase().trim();
    _valor = _valor.toString().trim();
    _classe = _classe.toString().trim();

    let soma = 0;

    if ((_eixo = 'x')) {
        for (let i = 0; i < eixoX.length; i++) {
            if (_classe.length > 0) {
                if (eixoX[i] == _valor && classe[i] == _classe) soma++;
            } else {
                if (eixox == _valor) soma++;
            }
        }
    } else if (_eixo == 'y') {
        for (let i = 0; i < eixoY.length; i++) {
            if (_classe.length > 0) {
                if (eixoY[i] == _valor && classe[i] == _classe) soma++;
            } else if (eixoY[i] == _valor) soma++;
        }
    } else {
        if (_classe.length > 0) {
            for (let i = 0; i < classe.length; i++) {
                if (classe[i] == _classe) soma++;
            }
        } else soma = classe.length;
    }

    return soma;
}

function divisoes(_eixo = '', _valor = '', _classe = '') {
    _eixo = _eixo.toString().toLowerCase().trim();
    _valor = _valor.toString().trim();
    _classe = _classe.toString().trim();

    const somaClasse = proporcoes(_eixo, _valor, _classe);
    const somaTotal = proporcoes(_eixo, _valor, '');
    const divisao = somaClasse / somaTotal;
    if (isNan(divisao)) divisao = 0;
    return divisao.toFixed(2);
}

function logatirimos(_eixo = '', _valor = '', _classe = '') {
    _eixo = _eixo.toString().toLowerCase().trim();
    _valor = _valor.toString().trim();
    _classe = _classe.toString().trim();

    const divisaoClasse = divisoes(_eixo, _valor, _classe);
    const log2 = Math.log2(divisaoClasse);
    if (isNaN(log2)) log2 = 0;
    return log2.toFixed(2);
}

function multiplicacoes(_eixo = '', _valor = '', _classe = '') {
    _eixo = _eixo.toString().toLowerCase().trim();
    _valor = _valor.toString().trim();
    _classe = _classe.toString().trim();

    const divisaoClasse = divisoes(_eixo, _valor, _classe);
    const logClasse = logatirimos(_eixo, _valor, _classe);

    let indiceClasse = 0;

    const classesUnicas = retornaClasses();
    for (let i = 0; i < classesUnicas.length; i++) {
        if (classe[i] == _classe) {
            indiceClasse = i;
        }
    }

    let mult = 0;
    if (indiceClasse % 2 != 0) {
        mult = divisaoClasse * -1 * logClasse;
    } else mult = divisaoClasse * logClasse;

    if (isNaN(mult)) mult = 0;
    return mult.toFixed(2);
}
