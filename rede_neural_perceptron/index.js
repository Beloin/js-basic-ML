let config = {};
let Weights = [];
let Inputs = [];
let Targets = [];
let Epochs = 1;
let Activation = 'sigmoid';
let hiddenLayers = 1;
let hiddenNodes = 2;
let bias = 1;
let add = [];

function funSum(arr = []) {
    return arr.reduce((a, b) => a + b);
}

function gradientDescent(n = 0) {
    return n * (1 - n);
}

function train(fit = []) {
    for (let i = 0; i < fit.length; i++) {
        if (fit[i].input) Inputs.push(fit[i].input);
        else Inputs.push([0]);
        if (fit[i].output) Targets.push(fit[i].output);
        else Targets.push([0]);
    }

    for (let i = 0; i < Inputs.length; i++) {
        for (let j = 0; j < Targets.length; j++) {
            if (Inputs[i][j] != undefined && Targets[i][j] != undefined) {
                feedFoward(
                    Inputs[i],
                    Targets[i][j],
                    Epochs,
                    Activation,
                    hiddenLayers,
                    hiddenNodes
                );
            }
        }
    }
}

function saveModel(path = './model.json') {
    const fs = require('fs');
    config.Weights = Weights;
    config.Activation = Activation;
    config.hiddenLayers = hiddenLayers;
    config.hiddenNodes = hiddenNodes;
    fs.writeFileSync(path, JSON.stringify(config));
}

function loadModel(path = './model.json') {
    const fs = require('fs');
    const data = fs.readFileSync(path, 'utf8');
    const json = JSON.parse(data);
    Weights = json.Weights;
    Activation = json.Activation;
    hiddenLayers = json.hiddenLayers;
    hiddenNodes = json.hiddenNodes;
}

function predict(inputs = []) {}

function feedFoward(
    inputs = [],
    target = 0,
    epochs = 1,
    activation = 'sigmoid',
    hidden = 1,
    hiddenNodes = 2
) {
    // Pesos das camadas ocultas
    let matrixHidden = [];
    for (let i = 0; i < hidden; i++) {
        let arrHidden = [];
        for (let j = 0; j < hiddenNodes; j++) {
            arrHidden.push(0);
        }
        matrixHidden.push(arrHidden);
    }

    let stop = false;
    let output = 0;

    if (target != 0) {
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
