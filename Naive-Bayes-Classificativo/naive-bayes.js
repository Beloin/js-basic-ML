module.exports = class NaiveBayes {
    eliminaDuplicados(arr = []) {
        arr = [...new Set(arr)];
        return arr;
    }

    retornaClasses() {
        let arr = this.classes;
        arr = this.eliminaDuplicados(arr);
        return arr;
    }

    contaTexto(texto = '', procura = '') {
        return texto.split(procura).length - 1;
    }

    organizar() {
        let params = {};

        for (let i = 0; i < this.entradas.length; i++) {
            let carac = '';

            if (i < this.entradas.length - 1) carac = '-';

            if (params[this.classes[i]]) {
                params[this.classes[i]] += this.entradas[i] + carac;
            } else {
                params[this.classes[i]] = this.entradas[i] + carac;
            }
        }
        console.log(params);

        let str = JSON.stringify(params);
        str = str.replace(/-"/g, '"');
        str = str.replace(/-/g, ',');

        params = JSON.parse(str);

        return params;
    }

    frequencia() {
        let categorias = [];
        let params = {};
        const objeto = this.organizar();
        const labels = this.retornaClasses();

        for (let i = 0; i < this.entradas.length; i++) {
            params['Entrada'] = this.entradas[i];

            for (let j = 0; j < labels.length; j++) {
                params[labels[j]] = this.contaTexto(
                    objeto[labels[j]],
                    this.entradas[i]
                );
            }

            categorias[i] = JSON.stringify(params);
        }

        categorias = this.eliminaDuplicados(categorias);

        for (let i = 0; i < categorias.length; i++) {
            categorias[i] = JSON.parse(categorias[i]);
        }

        // categorias.map(val => JSON.parse(val));

        return categorias;
    }

    quantidadeClasses() {
        const categorias = this.frequencia();
        return parseInt(Object.keys(categorias[0]).length - 1);
    }

    somaClasses(arr = []) {
        let soma = 0;
        for (let i = 1; i < arr.length; i++) {
            soma += parseInt(arr[i]);
        }

        return soma;
    }

    totalPorClasse() {
        let totalClasse = [];
        const nomeClasses = this.retornaClasses();
        const strClasses = JSON.stringify(this.classes);

        for (let i = 0; i < nomeClasses.length; i++) {
            totalClasse[nomeClasses[i]] = this.contaTexto(
                strClasses,
                nomeClasses[i]
            );
        }

        return totalClasse;
    }

    somaTotaisClasses() {
        const vetTemp = Object.values(this.totalPorClasse());
        let soma = 0;
        for (let i = 0; i < vetTemp.length; i++) {
            soma += parseFloat(vetTemp[i]);
        }
        return soma;
    }

    ocorrenciaClasseParaEntrada(_entrada = '', _classe = '') {
        const categorias = this.frequencia();
        let retorno = 0;
        categorias.forEach(item => {
            if (item['Entrada'] == _entrada) {
                retorno = parseFloat(item[_classe]);
            }
        });
        return retorno;
    }

    _NaiveBayes(_entrada = '') {
        const nomeClasses = this.retornaClasses();
        const totalClasse = this.totalPorClasse();

        const categorias = this.frequencia();
        let soma = 0;
        categorias.forEach(item => {
            if (item['Entrada'] == _entrada)
                for (let i = 0; i < nomeClasses.length; i++)
                    soma += parseFloat(item[nomeClasses[i]]);
        });

        let probabilidade = [];
        for (let i = 0; i < nomeClasses.length; i++) {
            /** Naive Bayes */
            probabilidade[nomeClasses[i]] =
                ((this.ocorrenciaClasseParaEntrada(_entrada, nomeClasses[i]) /
                    totalClasse[nomeClasses[i]]) *
                    (totalClasse[nomeClasses[i]] / this.somaTotaisClasses())) /
                (soma / this.somaTotaisClasses());
        }

        return probabilidade;
    }

    train(config = {}) {
        this._config = {};
        if (config.input) this.entradas = config.input;
        else this.entradas = [''];
        if (config.output) this.classes = config.output;
        else this.classes = [''];
        this._config.input = this.entradas;
        this._config.output = this.classes;
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

    predict(selEntrada = '') {
        const nomeClasses = this.retornaClasses();
        let nome = '';
        if (selEntrada.toString().trim().length > 0) {
            const Naive = this._NaiveBayes(selEntrada);

            let prob = 0;
            for (let i = 0; i < nomeClasses.length; i++) {
                const percentual = Number(
                    parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2)
                );
                
                if (percentual >= prob) {
                    prob = percentual;
                    nome = nomeClasses[i];
                }
            }
        } else {
            nome = '';
        }

        return nome;
    }
};
