let eixoX = [];
let eixoY = [];
let classe = [];

// elimina os elementos duplicados
function eliminaDuplicados(arr=[]) {
	arr = [...new Set(arr)];
	return arr;
}

// retorna as classes existentes sem valores duplicados
function retornaClasses() {
	let arr = classe;
	arr = eliminaDuplicados(arr);
	return arr;
}

// proporção das classes para um determinado valor de eixo
function proporcoes(_eixo='', _valor='', _classe='') {
	_eixo = _eixo.toString().toLowerCase().trim();
	_valor = _valor.toString().trim();
	_classe = _classe.toString().trim();
	let soma = 0;

	if(_eixo == 'x') {
		for(let i=0; i<eixoX.length; i++) {
			if(_classe.length > 0) {
				if((eixoX[i] == _valor)&&(classe[i] == _classe)) soma++;
			}else {
				if(eixoX[i] == _valor) soma++;
			}
		}
	}else if(_eixo == 'y') {
		for(let i=0; i<eixoY.length; i++) {
			if(_classe.length > 0) {
				if((eixoY[i] == _valor)&&(classe[i] == _classe)) soma++;
			}else {
				if(eixoY[i] == _valor) soma++;
			}
		}
	}else {
		if(_classe.length > 0) {
			for(let i=0; i<classe.length; i++) {
				if(classe[i] == _classe) soma++;
			}
		}else {
			soma = classe.length;
		}
	}
	return soma;
}

// proporção dividida pelo total
function divisoes(_eixo='', _valor='', _classe='') {
	_eixo = _eixo.toString().toLowerCase().trim();
	_valor = _valor.toString().trim();
	_classe = _classe.toString().trim();

	const somaClasse = proporcoes(_eixo, _valor, _classe);
	const somaTotal = proporcoes(_eixo, _valor, '');
	const divisao = somaClasse / somaTotal;
	if(isNaN(divisao)) divisao = 0;
	return divisao.toFixed(2);	
}

// logaritmo na base 2 de uma divisão
function logaritmos(_eixo='', _valor='', _classe='') {
	_eixo = _eixo.toString().toLowerCase().trim();
	_valor = _valor.toString().trim();
	_classe = _classe.toString().trim();

	const divisaoClasse = divisoes(_eixo, _valor, _classe);
	const log2 = Math.log2(divisaoClasse);
	if(isNaN(log2)) log2 = 0;
	return log2.toFixed(2);	
}

// divisões vezes os logaritmos
function multiplicacoes(_eixo='', _valor='', _classe='') {
	_eixo = _eixo.toString().toLowerCase().trim();
	_valor = _valor.toString().trim();
	_classe = _classe.toString().trim();

	const divisaoClasse = divisoes(_eixo, _valor, _classe);
	const logaritmoClasse = logaritmos(_eixo, _valor, _classe);

	let indiceClasse = 0;
	const classesUnicas = retornaClasses();
	for(let i=0; i<classesUnicas.length; i++) {
		if(classe[i] == _classe) {
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
function entropia(_eixo='', _valor='') {
	_eixo = _eixo.toString().toLowerCase().trim();
	_valor = _valor.toString().trim();

	let classesUnicas = retornaClasses();
	classesUnicas.reverse();
	let multiplicacao = [];
	for(let i=0; i<classesUnicas.length; i++) {
		multiplicacao.push(multiplicacoes(_eixo, _valor, classesUnicas[i]));
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
function ganhos(_eixo='') {
	let ganho = [];
	_eixo = _eixo.toString().toLowerCase().trim();
	const entropiaGeral = entropia();

	if(_eixo == 'x') {
		let X = eliminaDuplicados(eixoX);
		/*
			a quantidade de classes para o valor do eixo x
			dividida pela quantidade total de classes
		*/
		let divisoesX = [];
		const totalGeral = proporcoes();
		let entropias = [];
		for(let i=0; i<X.length; i++) {
			let totalLocal = proporcoes('x', X[i], '');
			divisoesX.push(totalLocal / totalGeral);
			entropias.push(entropia('x', X[i]));
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
		const Y = eliminaDuplicados(eixoY);
		/*
			a quantidade de classes para o valor do eixo y
			dividida pela quantidade total de classes
		*/
		let divisoesY = [];
		const totalGeral = proporcoes();
		let entropias = [];
		for(let i=0; i<Y.length; i++) {
			let totalLocal = proporcoes('y', Y[i], '');
			divisoesY.push(totalLocal / totalGeral);
			entropias.push(entropia('y', Y[i]));
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
		const ganhoX = ganhos('x');
		const ganhoY = ganhos('y');

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
function train(config={}) {
	if(config.x) eixoX = config.x; else eixoX = [0];
	if(config.y) eixoY = config.y; else eixoY = [0];
	if(config.class) classe = config.class; else classe = [''];
}

// classifica o par de entradas
function predict(entradaX=0, entradaY=0) {
	let folha = '';
	const ganhoInformacao = ganhos();
	let raizArvore = ganhoInformacao[0];
	raizArvore = raizArvore.toString().toLowerCase().trim();

	let arrayRaiz = [];
	if(raizArvore == 'x') {
		arrayRaiz = eixoX;
	}else {
		arrayRaiz = eixoY;
	}
	const Ramos = eliminaDuplicados(arrayRaiz);
	let ramoSemNo = [];
	for(let i=0; i<Ramos.length; i++) {
		let classesRaiz = '';
		let classesDiferentes = 0;
		for(let j=0; j<arrayRaiz.length; j++) {
			if(Ramos[i] == arrayRaiz[j]) {
				if(classesRaiz != classe[j]) {
					classesRaiz = classe[j];
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
		classeSemNo.push(classe[indiceSemNo]);
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
		for(let i=0; i<eixoX.length; i++) {
			if(eixoX[i] == entradaX) {
				indicesX.push(i);
			}
		}

		for(let i=0; i<indicesX.length; i++) {
			if(eixoY[indicesX[i]] == entradaY) {
				folha = classe[indicesX[i]];
			}
		}

		// retorna a classe que mais se repete
		let classeRepetida = [];
		if(folha.toString().trim().length <= 0) {
			let classeTemp = retornaClasses();
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

train({
	x: ['sol', 'nublado', 'chuva', 'chuva', 'sol', 'nublado'],
	y: ['anormal', 'normal', 'anormal', 'normal', 'normal', 'anormal'],
	class: ['não', 'sim', 'não', 'não', 'sim', 'sim']
});

console.log(predict('nublado', 'anormal'));
