module.exports = class KMeans {
	constructor() {
		this.eixoX = [];
		this.eixoY = [];
		this.grupos = 2;
		this.centroidesX = [];
		this.centroidesY = [];
		this.grupoID_Anterior = [];

		this.indice1 = Math.floor(Math.random() * this.eixoX.length);
		this.indice2 = Math.floor(Math.random() * this.eixoY.length);
		this.chamadas = 0;
	}

	indiceCentroide() {
		const fs = require('fs');

		let positivo = fs.readFileSync('positivo.txt', 'utf8');
		positivo = positivo.toString().trim();

		if(positivo.length > 0) {
			const linhas = positivo.split('\n');
			for(let i=0; i<linhas.length; i++) {
				const indices = linhas[i].split(',');
				const index1 = indices[0];
				const index2 = indices[1];

				this.indice1 = index1;
				this.indice2 = index2;
			}
		}else {
			let negativo = fs.readFileSync('negativo.txt', 'utf8');
			negativo = negativo.toString().trim();

			if(negativo.length > 0) {
				const linhas = negativo.split('\n');

				let duplasIndices = [];
				for(let i=0; i<linhas.length; i++) {
					const indices = linhas[i].split(',');
					const index1 = indices[0];
					const index2 = indices[1];

					duplasIndices.push([index1, index2]);
				}

				this.inicializaIndices(duplasIndices);				
			}else {
				this.indice1 = Math.floor(Math.random() * this.eixoX.length);
				this.indice2 = Math.floor(Math.random() * this.eixoY.length);
			}
		}
	}

	inicializaIndices(matriz=[]) {
		const i1 = Math.floor(Math.random() * this.eixoX.length);
		const i2 = Math.floor(Math.random() * this.eixoY.length);
		const sorteio = [i1, i2];
		let igual = 0;
		for(let i=0; i<matriz.length; i++) {
			const temp = matriz[i];
			if((temp[0] == sorteio[0])&&(temp[1] == sorteio[1])) igual++;
		}
		if(igual > 0) {
			if(this.chamadas < 10) {
				this.inicializaIndices(matriz);
				this.chamadas++;
			}else {
				this.chamadas = 0;
			}
		}else {
			this.indice1 = i1;
			this.indice2 = i2;
		}
	}

	feedback() {
		const fs = require('fs');
		
		let positivo = fs.readFileSync('positivo.txt', 'utf8');
		positivo = positivo.toString().trim();

		if(positivo.length <= 0) {
			const readline = require('readline').createInterface({
				input: process.stdin,
				output: process.stdout
			});

			readline.question('Feedback positivo ou negativo? ', (feed) => {
				let nome_arquivo = 'negativo.txt';
				if(feed.toString().toLowerCase().trim() == 'positivo')
					nome_arquivo = 'positivo.txt';

				let antigo = fs.readFileSync(nome_arquivo, 'utf8');
				if(antigo == undefined)
					antigo = '';
				const novo = antigo + '\n' + this.indice1 + ',' + this.indice2;
				fs.writeFileSync(nome_arquivo, novo.toString().trim());

				if(feed.toString().trim().length <= 0) feed = 'negativo';

				console.log(`Seu feedback foi ${feed}.`);
				readline.close();
			});
		}	
	}

	// retorna a média dos eixos x de um determinado grupo
	mediaGrupoX(IDs=[], grupoIDs=0) {
		// IDs: array onde o índice corresponde ao ID e o valor do índice corresponde ao grupo
		// grupoIDs: número correspondente ao grupo que terá a média calculada
		let soma = 0;
		let qtdGrupo = 0;
		for(let i=0; i<IDs.length; i++) {
			if(IDs[i] == grupoIDs) {
				soma += this.eixoX[i];
				qtdGrupo++;		
			}
		}
		return soma / qtdGrupo;
	}

	// retorna a média dos eixos y de um determinado grupo
	mediaGrupoY(IDs=[], grupoIDs=0) {
		// IDs: array onde o índice corresponde ao ID e o valor do índice corresponde ao grupo
		// grupoIDs: número correspondente ao grupo que terá a média calculada
		let soma = 0;
		let qtdGrupo = 0;
		for(let i=0; i<IDs.length; i++) {
			if(IDs[i] == grupoIDs) {
				soma += this.eixoY[i];
				qtdGrupo++;		
			}
		}
		return soma / qtdGrupo;
	}

	// atualiza os centroides dos eixos x
	atualizaCentroideX() {
		if(this.centroidesX.length <= 0) {
			this.centroidesX[0] = this.eixoX[this.indice1];
			for(let i=1; i<this.grupos; i++) {
				this.centroidesX[i] = this.eixoX[this.indice2];
			}
		}else {
			for(let i=0; i<this.grupos; i++) {
				this.centroidesX[i] = this.mediaGrupoX(this.grupoID_Anterior, i);
			}
		}
	}

	// atualiza os centroides dos eixos y
	atualizaCentroideY() {
		if(this.centroidesY.length <= 0) {
			this.centroidesY[0] = this.eixoY[this.indice1];
			for(let i=1; i<this.grupos; i++) {
				this.centroidesY[i] = this.eixoY[this.indice2];
			}
		}else {
			for(let i=0; i<this.grupos; i++) {
				this.centroidesY[i] = this.mediaGrupoY(this.grupoID_Anterior, i);
			}
		}
	}

	// retorna o menor valor de um array
	minimo(arr=[]) {
		Array.prototype.min = function() {
			return Math.min.apply(null, this);
		}
		return arr.min();
	}

	// retorna o índice de um valor em um array
	// o índice retornado corresponde ao grupo que determinada linha pertence
	grupo(distancias=[], menorDistancia=0) {
		return distancias.indexOf(menorDistancia);
	}

	// verifica se dois arrays possuem todos os valores iguais
	comparaGrupos(arr1=[], arr2=[]) {
		let retorno = true;
		for(let i=0; i<arr1.length; i++) {
			if(arr1[i] != arr2[i]) {
				retorno = false;
			}
		}
		return retorno;
	}

	// atualiza os centroides e os grupos das linhas
	atualizaGrupo() {
		this.atualizaCentroideX();
		this.atualizaCentroideY();

		let retorno = true;
		let grupoID = [];
		let distancias = [];
		let distanciasMenores = [];

		for(let i=0; i<this.eixoX.length; i++) {

			for(let j=0; j<this.grupos; j++) {
				distancias[j] = 
				Math.sqrt(Math.pow(this.eixoX[i] - this.centroidesX[j], 2) + 
					      Math.pow(this.eixoY[i] - this.centroidesY[j], 2));
			}

			distanciasMenores[i] = this.minimo(distancias);
			// o ID é o índice e o valor é o grupo
			grupoID[i] = this.grupo(distancias, distanciasMenores[i]);
		}

		if(this.grupoID_Anterior.length <= 0) {
			this.grupoID_Anterior = grupoID;
		}else {
			if(this.comparaGrupos(this.grupoID_Anterior, grupoID)) {
				retorno = false;
			}else {
				this.grupoID_Anterior = grupoID;
				retorno = true;
			}
		}
		return retorno;
	}

	// retorna os grupos formatados como arrays de uma matriz
	retornaElementosGrupo(arrGrupos=[]) {
		let matrizGrupos = [];
		for(let i=0; i<this.grupos; i++) {
			let divisaoGrupos = [];
			for(let j=0; j<arrGrupos.length; j++) {
				if(arrGrupos[j] == i) {
					divisaoGrupos.push([this.eixoX[j], this.eixoY[j]]);
				}
			}

			matrizGrupos.push(divisaoGrupos);
		}
		return matrizGrupos;
	}

	// inicia treinamento
	train(config={}) {
		this._config = {};
		if(config.x) this.eixoX = config.x; else this.eixoX = [];
		if(config.y) this.eixoY = config.y; else this.eixoY = [];
		this._config.x = this.eixoX;
		this._config.y = this.eixoY;
		this.indiceCentroide();
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

	// inicia a clusterização
	predict() {
		this.centroidesX = [];
		this.centroidesY = [];
		this.grupoID_Anterior = [];

		if((this.grupos > 1)&&(this.grupos < this.eixoX.length)) {
			if(this.eixoX.length > 2) {
				while(this.atualizaGrupo()) {}
				const matriz = this.retornaElementosGrupo(this.grupoID_Anterior);
				console.log(matriz);
				this.feedback();
			}else {
				console.log([]);
			}
		}else {
			console.log([]);
		}
	}
}
