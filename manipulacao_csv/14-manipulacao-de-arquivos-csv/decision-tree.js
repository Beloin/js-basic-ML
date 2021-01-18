module.exports = class decisionTree {
	constructor() {
		this.eixoX = [];
		this.eixoY = [];
		this.classe = [];
	}

	// elimina os elementos duplicados
	eliminaDuplicados(arr=[]) {
		arr = [...new Set(arr)];
		return arr;
	}

	// retorna as classes existentes sem valores duplicados
	retornaClasses() {
		let arr = this.classe;
		arr = this.eliminaDuplicados(arr);
		return arr;
	}

	// proporção das classes para um determinado valor de eixo
	proporcoes(_eixo='', _valor='', _classe='') {
		_eixo = _eixo.toString().toLowerCase().trim();
		_valor = _valor.toString().trim();
		_classe = _classe.toString().trim();
		let soma = 0;

		if(_eixo == 'x') {
			for(let i=0; i<this.eixoX.length; i++) {
				if(_classe.length > 0) {
					if((this.eixoX[i] == _valor)&&(this.classe[i] == _classe)) soma++;
				}else {
					if(this.eixoX[i] == _valor) soma++;
				}
			}
		}else if(_eixo == 'y') {
			for(let i=0; i<this.eixoY.length; i++) {
				if(_classe.length > 0) {
					if((this.eixoY[i] == _valor)&&(this.classe[i] == _classe)) soma++;
				}else {
					if(this.eixoY[i] == _valor) soma++;
				}
			}
		}else {
			if(_classe.length > 0) {
				for(let i=0; i<this.classe.length; i++) {
					if(this.classe[i] == _classe) soma++;
				}
			}else {
				soma = this.classe.length;
			}
		}
		return soma;
	}

	// proporção dividida pelo total
	divisoes(_eixo='', _valor='', _classe='') {
		_eixo = _eixo.toString().toLowerCase().trim();
		_valor = _valor.toString().trim();
		_classe = _classe.toString().trim();

		const somaClasse = this.proporcoes(_eixo, _valor, _classe);
		const somaTotal = this.proporcoes(_eixo, _valor, '');
		const divisao = somaClasse / somaTotal;
		if(isNaN(divisao)) divisao = 0;
		return divisao.toFixed(2);	
	}

	// logaritmo na base 2 de uma divisão
	logaritmos(_eixo='', _valor='', _classe='') {
		_eixo = _eixo.toString().toLowerCase().trim();
		_valor = _valor.toString().trim();
		_classe = _classe.toString().trim();

		const divisaoClasse = this.divisoes(_eixo, _valor, _classe);
		const log2 = Math.log2(divisaoClasse);
		if(isNaN(log2)) log2 = 0;
		return log2.toFixed(2);	
	}

	// divisões vezes os logaritmos
	multiplicacoes(_eixo='', _valor='', _classe='') {
		_eixo = _eixo.toString().toLowerCase().trim();
		_valor = _valor.toString().trim();
		_classe = _classe.toString().trim();

		const divisaoClasse = this.divisoes(_eixo, _valor, _classe);
		const logaritmoClasse = this.logaritmos(_eixo, _valor, _classe);

		let indiceClasse = 0;
		const classesUnicas = this.retornaClasses();
		for(let i=0; i<classesUnicas.length; i++) {
			if(this.classe[i] == _classe) {
				indiceClasse = i;
			}
		}	

		let multiplicacao = 0;
		if(indiceClasse % 2 != 0) {
			multiplicacao = (divisaoClasse * -1) * logaritmoClasse;
		}else {
			multiplicacao = divisaoClasse * logaritmoClasse;
		}

		if(isNaN(multiplicacao)) multiplicacao = 0;
		return multiplicacao.toFixed(2);	
	}

	// a multiplicação atual menos a posterior
	entropia(_eixo='', _valor='') {
		_eixo = _eixo.toString().toLowerCase().trim();
		_valor = _valor.toString().trim();

		let classesUnicas = this.retornaClasses();
		classesUnicas.reverse();
		let multiplicacao = [];
		for(let i=0; i<classesUnicas.length; i++) {
			multiplicacao.push(this.multiplicacoes(_eixo, _valor, classesUnicas[i]));
		}

		let str = '';
		for(let i=0; i<multiplicacao.length; i++) {
			str += multiplicacao[i] + ' - ';
		}
		str = str + '0';

		let subtracoes = eval(str);

		if(isNaN(subtracoes)) subtracoes = 0;
		return subtracoes.toFixed(2);	
	}

	// ganho de informação
	ganhos(_eixo='') {
		let ganho = [];
		_eixo = _eixo.toString().toLowerCase().trim();
		const entropiaGeral = this.entropia();

		if(_eixo == 'x') {
			let X = this.eliminaDuplicados(this.eixoX);
			/*
				a quantidade de classes para o valor do eixo x
				dividida pela quantidade total de classes
			*/
			let divisoesX = [];
			const totalGeral = this.proporcoes();
			let entropias = [];
			for(let i=0; i<X.length; i++) {
				let totalLocal = this.proporcoes('x', X[i], '');
				divisoesX.push(totalLocal / totalGeral);
				entropias.push(this.entropia('x', X[i]));
			}
			// divisão vezes a entropia do valor do eixo x
			let multiplicacoesX = [];
			for(let i=0; i<divisoesX.length; i++) {
				multiplicacoesX.push(entropias[i] * divisoesX[i]);
			}
			// soma das multiplicações
			let somas = 0;
			for(let i=0; i<multiplicacoesX.length; i++) {
				somas += multiplicacoesX[i];
			}
			ganho.push('x');
			ganho.push((entropiaGeral - somas).toFixed(2));
		}else if(_eixo == 'y') {
			const Y = this.eliminaDuplicados(this.eixoY);
			/*
				a quantidade de classes para o valor do eixo y
				dividida pela quantidade total de classes
			*/
			let divisoesY = [];
			const totalGeral = this.proporcoes();
			let entropias = [];
			for(let i=0; i<Y.length; i++) {
				let totalLocal = this.proporcoes('y', Y[i], '');
				divisoesY.push(totalLocal / totalGeral);
				entropias.push(this.entropia('y', Y[i]));
			}
			// divisão vezes a entropia do valor do eixo y
			const multiplicacoesY = [];
			for(let i=0; i<divisoesY.length; i++) {
				multiplicacoesY.push(entropias[i] * divisoesY[i]);
			}
			// soma das multiplicações
			let somas = 0;
			for(let i=0; i<multiplicacoesY.length; i++) {
				somas += multiplicacoesY[i];
			}
			ganho.push('y');
			ganho.push((entropiaGeral - somas).toFixed(2));
		}else {
			// ganho geral
			const ganhoX = this.ganhos('x');
			const ganhoY = this.ganhos('y');

			const razaoX = ganhoX[1] / entropiaGeral;
			const razaoY = ganhoY[1] / entropiaGeral;

			let maiorRazao = Math.max(razaoX, razaoY);

			if(maiorRazao == razaoX) {
				ganho.push('x');
			}else {
				ganho.push('y');
			}
			ganho.push(maiorRazao.toFixed(2));
		}
		return ganho;
	}

	// treina o algoritmo
	train(config={}) {
		this._config = {};
		if(config.x) this.eixoX = config.x; else this.eixoX = [0];
		if(config.y) this.eixoY = config.y; else this.eixoY = [0];
		if(config.class) this.classe = config.class; else this.classe = [''];
		this._config.x = this.eixoX;
		this._config.y = this.eixoY;
		this._config.class = this.classe;
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

	// classifica o par de entradas
	predict(entradaX=0, entradaY=0) {
		let folha = '';
		const ganhoInformacao = this.ganhos();
		let raizArvore = ganhoInformacao[0];
		raizArvore = raizArvore.toString().toLowerCase().trim();

		let arrayRaiz = [];
		if(raizArvore == 'x') {
			arrayRaiz = this.eixoX;
		}else {
			arrayRaiz = this.eixoY;
		}
		const Ramos = this.eliminaDuplicados(arrayRaiz);
		let ramoSemNo = [];
		for(let i=0; i<Ramos.length; i++) {
			let classesRaiz = '';
			let classesDiferentes = 0;
			for(let j=0; j<arrayRaiz.length; j++) {
				if(Ramos[i] == arrayRaiz[j]) {
					if(classesRaiz != this.classe[j]) {
						classesRaiz = this.classe[j];
						classesDiferentes++;
					}
				}
			}
			if(classesDiferentes < 2) {
				ramoSemNo.push(Ramos[i]);
			}
		}

		let classeSemNo = [];
		for(let i=0; i<ramoSemNo.length; i++) {
			const indiceSemNo = arrayRaiz.indexOf(ramoSemNo[i]);
			classeSemNo.push(this.classe[indiceSemNo]);
		}

		for(let i=0; i<ramoSemNo.length; i++) {
			if((entradaX == ramoSemNo[i])||(entradaY == ramoSemNo[i])) {
				folha = classeSemNo[i];
			}
		}

		let indiceClassificado = ramoSemNo.indexOf(entradaX);
		if(indiceClassificado < 0) {
			indiceClassificado = ramoSemNo.indexOf(entradaY);
		}

		if(indiceClassificado < 0) {
			let indicesX = [];
			for(let i=0; i<this.eixoX.length; i++) {
				if(this.eixoX[i] == entradaX) {
					indicesX.push(i);
				}
			}

			for(let i=0; i<indicesX.length; i++) {
				if(this.eixoY[indicesX[i]] == entradaY) {
					folha = this.classe[indicesX[i]];
				}
			}

			// retorna a classe que mais se repete
			let classeRepetida = [];
			if(folha.toString().trim().length <= 0) {
				let classeTemp = this.retornaClasses();
				for(let i=0; i<classeTemp.length; i++) {
					for(let j=0; j<classe.length; j++) {
						if(classeTemp[i] == classe[j]) {
							if(classeRepetida[i] != undefined) {
								classeRepetida[i] += 1;
							}else {
								classeRepetida[i] = 1;
							}
						}
					}
				}

				let maiorNumero = 0;
				let indiceMaiorRepeticao = 0;
				for(let i=0; i<classeRepetida.length; i++) {
					if(classeRepetida[i] > maiorNumero) {
						maiorNumero = classeRepetida[i];
						indiceMaiorRepeticao = i;
					}
				}
				folha = classeTemp[indiceMaiorRepeticao];
			}
		}else {
			folha = classeSemNo[indiceClassificado];
		}
		return folha;
	}
}
