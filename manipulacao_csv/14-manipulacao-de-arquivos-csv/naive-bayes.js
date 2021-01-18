module.exports = class NaiveBayes {
	// elimina os elementos duplicados
	eliminaDuplicados(arr=[]) {
		arr = [...new Set(arr)];
		return arr;
	}

	// retorna as classes existentes
	retornaClasses() {
		let arr = this.classes;
		arr = this.eliminaDuplicados(arr);
		return arr;
	}

	// conta a quantidade de palavras repetidas em um texto
	contaTexto(texto='', procura='') {
		return texto.split(procura).length - 1;
	}

	/*
		cria um json com as classes como chave
		e as entradas de cada classe como valor
	*/
	organizar() {
		let params = {};

		for(let i=0; i<this.entradas.length; i++) {
			// separa as palavras com '-'
			let carac = '';
			if(i<(this.entradas.length-1)) carac = '-';

			/*
				concatena as entradas de cada classe
				no valor da classe correspondente

				a quantidade de palavras repetidas por classe
				corresponde ao número de classes para a respectiva palavra
			*/
			if(params[this.classes[i]]) {
				params[this.classes[i]] += this.entradas[i] + carac;
			}else {
				params[this.classes[i]] = this.entradas[i] + carac;
			}
		}

		// elimina o último hífen de cada valor
		let str = JSON.stringify(params);
		str = str.replace(/-"/g, '"');
		str = str.replace(/-/g, ',');
		params = JSON.parse(str);

		return params;
	}

	// tabela de frequência
	// monta um json com o número de classes para cada entrada
	frequencia() {
		let categorias = [];
		let params = {};
		const objeto = this.organizar();
		const labels = this.retornaClasses();

		for(let i=0; i<this.entradas.length; i++) {
			params['Entrada'] = this.entradas[i];

			for(let j=0; j<labels.length; j++) {
				// conta o número de entradas em cada classe
				params[labels[j]] = this.contaTexto(objeto[labels[j]], this.entradas[i]);
			}

			categorias[i] = JSON.stringify(params);
		}

		categorias = this.eliminaDuplicados(categorias);

		for(let i=0; i<categorias.length; i++) {
			categorias[i] = JSON.parse(categorias[i]);
		}

		return categorias;
	}

	// retorna a quantidade de classes
	quantidadeClasses() {
		const categorias = this.frequencia();
		return parseInt(Object.keys(categorias[0]).length-1);
	}

	// soma os valores das classes da entrada passada
	somaClasses(arr=[]) {
		let soma = 0;
		// inicia em 1 para desconsiderar o valor da Entrada
		for(let i=1; i<arr.length; i++) {
			soma += parseInt(arr[i]);
		}
		return soma;
	}

	// retorna a soma total de cada classe
	totalPorClasse() {
		let totalClasse = [];
		const nomeClasses = this.retornaClasses();
		const str_classes = JSON.stringify(this.classes);

		for(let i=0; i<nomeClasses.length; i++) {
			totalClasse[nomeClasses[i]] = this.contaTexto(str_classes, nomeClasses[i]);
		}
		return totalClasse;
	}

	// soma dos totais de todas as classes
	somaTotaisClasses() {
		// Object.values(totalPorClasse()): retorna um vetor com os valores de cada chave
		const vetTemp = Object.values(this.totalPorClasse());
		let soma = 0;
		for(let i=0; i<vetTemp.length; i++) {
			soma += parseFloat(vetTemp[i]);
		}
		return soma;
	}

	// retorna a ocorrência de uma 'Classe' para uma 'Entrada'
	ocorrenciaClasseParaEntrada(_entrada='', _classe='') {
		const categorias = this.frequencia();
		let retorno = 0;

		categorias.forEach((item) => {
			if(item['Entrada'] == _entrada) {
				retorno = parseFloat(item[_classe]);
			}
		});
		return retorno;
	}

	// calcula a probabilidade da entrada pertencer a uma determinada classe
	_NaiveBayes(_entrada='') {
		const nomeClasses = this.retornaClasses();
		const totalClasse = this.totalPorClasse();

		// soma os resultados de todas as classes da 'Entrada' passada
		const categorias = this.frequencia();
		let soma = 0;
		categorias.forEach((item) => {
			if(item['Entrada'] == _entrada) {
				for(let i=0; i<nomeClasses.length; i++) {
					soma += parseFloat(item[nomeClasses[i]]);
				}
			}
		});

		let probabilidade = [];
		/*
			(Quantidade de Classes na Entrada / Quantidade de Classes do Tipo Procurado)
			*
			(Quantidade de Classes do Tipo Procurado / Quantidade Total de Classes)
			/
			(Soma de Todas as Classes da Entrada / Quantidade Total de Classes)
		*/
		for(let i=0; i<nomeClasses.length; i++) {
			probabilidade[nomeClasses[i]] = 

			(this.ocorrenciaClasseParaEntrada(_entrada, nomeClasses[i]) / totalClasse[nomeClasses[i]])
			*
			(totalClasse[nomeClasses[i]] / this.somaTotaisClasses())
			/
			(soma / this.somaTotaisClasses());
		}

		return probabilidade;
	}

	train(config={}) {
		this._config = {};
		if(config.input) this.entradas = config.input; else this.entradas = [''];
		if(config.output) this.classes = config.output; else this.classes = [''];
		this._config.input = this.entradas;
		this._config.output = this.classes;
	}

	saveModel(path='./model.json') {
		const fs = require('fs');
		fs.writeFileSync(path, JSON.stringify(this._config));
	}

	loadModel(path='./model.json') {
		const fs = require('fs');
		const data = fs.readFileSync(path, 'utf8');
		const json = JSON.parse(data);
		this.entradas = json.input;
		this.classes = json.output;
	}

	predict(selEntrada='') {
		const nomeClasses = this.retornaClasses();
		let probabilidades = [];
		if(selEntrada.toString().trim().length > 0) {
			const Naive = this._NaiveBayes(selEntrada);

			for(let i=0; i<nomeClasses.length; i++) {
				const percentual = Number(parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2));
				probabilidades.push({class: nomeClasses[i], probability: percentual});
			}

		}else {
			probabilidades.push({class: '', probability: 0});
		}

		return probabilidades;
	}
}
