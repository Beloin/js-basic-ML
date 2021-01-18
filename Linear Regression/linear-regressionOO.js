module.exports = class LinearRegression {
    train(config = {}) {
        this._config = {};

        if (config.input) this.X = config.input;
        else this.X = [0];
        if (config.output) this.Y = config.output;
        else this.Y = [0];

        this._config.input = this.X;
        this._config.output = this.Y;
    }

    saveModel(path = './model.json') {
        const fs = require('fs');
        fs.writeFileSync(path, JSON.stringify(this._config));
    }

    loadModel(path = './model.json') {
        const fs = require('fs');
        const data = fs.readFileSync(path, 'utf-8');
        const json = JSON.parse(data);
        this.X = json.input;
        this.Y = json.output;
    }

    produto(x = [], y = []) {
        const temp = [];
        for (let i = 0; i < x.length; i++)
            temp.push(parseFloat(x[i]) * parseFloat(y[i]));
        return temp;
    }

    quadrados(x = []) {
        const temp = [];
        for (let i = 0; i < x.length; i++)
            temp.push(parseFloat(x[i]) * parseFloat(x[i]));
        return temp;
    }

    somatorio(x = []) {
        let temp = 0;
        for (let i = 0; i < x.length; i++) temp += parseFloat(x[i]);
        return temp;
    }

    media(x = []) {
        return this.somatorio(x) / x.length;
    }

    resultados(x = [], y = [], p = 0) {
        /* Não sei o porquê de utilizar esses valores +- */
        const resu1 = (this.somatorio(x) * this.somatorio(y)) / x.length;
        const resu2 = (this.somatorio(x) * this.somatorio(x)) / x.length;
        const resu3 = this.somatorio(this.produto(x, y)) - resu1;
        const resu4 = resu3 / (this.somatorio(this.quadrados(x)) - resu2);
        const resu5 = this.media(y) - resu4 * this.media(x);

        return (resu4 * p + resu5).toFixed(0);
    }

    predict(p = []) {
        const regressoes = [];
        for (let i = 0; i < p.length; i++) {
            const temp = Number(this.resultados(this.X, this.Y, p[i]));
            regressoes.push(temp);
        }
        return regressoes;
    }
};
