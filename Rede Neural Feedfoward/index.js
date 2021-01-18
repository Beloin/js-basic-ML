function funSum(arr = []) {
    return arr.reduce((a, b) => a + b);
}

function gradientDescent(n = 0) {
    return n * (1 - n);
}

function feedFoward(
    inputs = [],
    target = 0,
    epochs = 1,
    activation = 'sigmoid'
) {
    if (target <= 0) target = 0.1;
    else if (target > 1) target = 1;

    let weights = [];
    for (let i in inputs) {
        weights.push(Math.random());
    }

    for (let i = 1; i <= epochs; i++) {
        let multiply = [];
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j] <= 0) inputs[j] = 0.1;
            multiply.push(inputs[j] * weights[j]);
        }

        let sum = funSum(multiply);

        let output = 0;

        switch (activation) {
            case 'tanh':
                output = parseFloat(tanh(sum)).toFixed(4);
                break;
            case 'sigmoid':
                output = parseFloat(sigmoid(sum)).toFixed(4);
                break;
            case 'leakyRelu':
                output = parseFloat(leakyRelu(sum)).toFixed(4);
                break;
            case 'relu':
                output = parseFloat(relu(sum)).toFixed(4);
                break;
            case 'binaryStep':
                output = parseFloat(binaryStep(sum)).toFixed(4);
                break;
            default:
                output = parseFloat(sigmoid(sum)).toFixed(4);
                break;
        }

        /** Output gerado pela função de ativação */
        //let output = parseFloat(leakyRelu(sum)).toFixed(4);

        let error = parseFloat(Math.abs(target - output)).toFixed(4);

        for (let j = 0; j < inputs.length; j++) {
            weights[j] += inputs[j] * gradientDescent(error);
        }

        let epoch = i.toString().padStart(7, '0');
        console.log(
            `Época: ${epoch} - Taxa de erro: ${error} - Saída: ${output}`
        );
    }
}

/** função Tangente Hiperbólica */
function tanh(n = 0) {
    return Math.sinh(n) / Math.cosh(n);
}

/** Função Sigmóide
 * @returns valor entre 0 e 1
 */
function sigmoid(n = 0) {
    return 1 / (1 + Math.pow(Math.E, -n));
}

/** Função Relu
 * @returns valores nulos e positivos
 */
function relu(n = 0) {
    return Math.max(n, 0);
}

/** Função Leaky Relu
 * @returns Valor positivo
 */
function leakyRelu(n = 0) {
    return Math.abs(n, 0.1);
}

/** Função Binary Step
 * @returns 0 or 1
 */
function binaryStep(n = 0) {
    return n >= 0 ? 1 : 0; /// Impossível nesse caso, já que não teremos outros valores
}

feedFoward([0], 0.1, 700, 'leakyRelu');
// feedFoward([0, 0], 0.2, 1000);
