function produto(x = [], y = []) {
    const temp = [];
    for (let i = 0; i < x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(y[i]));
    return temp;
}

function quadrados(x = []) {
    const temp = [];
    for (let i = 0; i < x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(x[i]));
    return temp;
}

function somatorio(x = []) {
    let temp = 0;
    for (let i = 0; i < x.length; i++) temp += parseFloat(x[i]);
    return temp;
}

function media(x = []) {
    return somatorio(x) / x.length;
}

function resultados(x = [], y = [], p = 0) {
    /* Não sei o porquê de utilizar esses valores */
    const resu1 = (somatorio(x) * somatorio(y)) / x.length;
    const resu2 = (somatorio(x) * somatorio(x)) / x.length;
    const resu3 = somatorio(produto(x, y)) - resu1;
    const resu4 = resu3 / (somatorio(quadrados(x)) - resu2);
    const resu5 = media(y) - resu4 * media(x);

    return (resu4 * p + resu5).toFixed(0);
}

function linearRegression(eixoX = [], eixoY = []) {
    const tamX = eixoX.length;
    const tamY = eixoY.length;

    const tempX = eixoX.slice(0, tamY);
    const tempY = eixoY;

    const diff = tamX - tamY;

    if (diff > 0) {
        const regressoes = [];
        for (let i = 0; i < diff; i++) {
            const temp = Number(resultados(tempX, tempY, eixoX[tamY + i]));
            regressoes.push(temp);
        }

        const novoY = tempY.concat(regressoes);

        console.log(`Eixo X: ${eixoX}\nEixo Y: ${novoY}`);
    }
}

linearRegression([1, 2, 3, 4, 5, 6, 7, 8], [9, 18, 27]);
