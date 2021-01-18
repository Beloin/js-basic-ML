module.exports = class KNearestNeigbors {
    constructor() {
        this.eixoX = [];
        this.eixoY = [];
        this.classe = [];
        this.entradaX = 0;
        this.entradaY = 0;
    }

    subtracoesX() {
        let sub = [];
        for (let i = 0; i < this.eixoX.length; i++) {
            sub[i] = this.eixoX[i] - this.entradaX;
        }
        return sub;
    }

    subtracoesY() {
        let sub = [];
        for (let i = 0; i < this.eixoY.length; i++) {
            sub[i] = this.eixoY[i] - this.entradaY;
        }
        return sub;
    }

    quadradosX() {
        const sub = this.subtracoesX();
        let quad = [];
        for (let i = 0; i < sub.length; i++) {
            quad[i] = sub[i] * sub[i];
        }
        return quad;
    }

    quadradosY() {
        const sub = this.subtracoesY();
        let quad = [];
        for (let i = 0; i < sub.length; i++) {
            quad[i] = sub[i] * sub[i];
        }
        return quad;
    }

    somaQuadrados() {
        const quadX = this.quadradosX();
        const quadY = this.quadradosY();
        let soma = [];
        for (let i = 0; i < quadX.length; i++) {
            soma[i] = quadX[i] + quadY[i];
        }
        return soma;
    }

    raizes() {
        const soma = this.somaQuadrados();
        let raizes = [];
        for (let i = 0; i < soma.length; i++) {
            raizes[i] = Math.sqrt(soma[i]);
        }
        return raizes;
    }

    train(config = {}) {
        this._config = {};
        if (config.x) this.eixoX = config.x;
        else this.eixoX = [0];
        if (config.y) this.eixoY = config.y;
        else this.eixoY = [0];
        if (config.class) this.classe = config.class;
        else this.classe = [''];

        this._config.x = this.eixoX;
        this._config.y = this.eixoY;
        this._config.class = this.classe;
    }

    saveModel(path = './model.json') {
        const fs = require('fs');
        fs.writeFileSync(path, JSON.stringify(this._config));
    }

    loadModel(path = './model.json') {
        const fs = require('fs');
        const data = fs.readFileSync(path, 'utf-8');
        const json = JSON.parse(data);
        this.entradas = json.input;
        this.classes = json.output;
    }

    predict(_entradaX = 0, _entradaY = 0) {
        this.entradaX = _entradaX;
        this.entradaY = _entradaY;

        let entradaClasse;
        const raiz = this.raizes();

        let indiceMenor = -1;
        let menor = Infinity;

        for (let i = 0; i < raiz.length; i++) {
            if (raiz[i] <= menor) {
                menor = raiz[i];
                indiceMenor = i;
            }
        }

        entradaClasse = this.classe[indiceMenor];
        return entradaClasse;
    }
};
