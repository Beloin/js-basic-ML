let eixoX = [];
let eixoY = [];
let classe = [];

let entradaX = 0;
let entradaY = 0;

function subtracoesX() {
	let subtracoes = [];
	for(let i=0; i<eixoX.length; i++) {
		subtracoes[i] = eixoX[i] - entradaX;
	}
	return subtracoes;
}

function subtracoesY() {
	let subtracoes = [];
	for(let i=0; i<eixoY.length; i++) {
		subtracoes[i] = eixoY[i] - entradaY;
	}
	return subtracoes;	
}

function quadradosX() {
	const subtracoes = subtracoesX();
	let quadrados = [];
	for(let i=0; i<subtracoes.length; i++) {
		quadrados[i] = subtracoes[i] * subtracoes[i];
	}
	return quadrados;
}

function quadradosY() {
	const subtracoes = subtracoesY();
	let quadrados = [];
	for(let i=0; i<subtracoes.length; i++) {
		quadrados[i] = subtracoes[i] * subtracoes[i];
	}
	return quadrados;
}

function somaQuadrados() {
	const quadradoX = quadradosX();
	const quadradoY = quadradosY();
	let soma = [];
	for(let i=0; i<quadradoX.length; i++) {
		soma[i] = quadradoX[i] + quadradoY[i];
	}
	return soma;
}

function raizes() {
	const soma = somaQuadrados();
	let raizes = [];
	for(let i=0; i<soma.length; i++) {
		raizes[i] = Math.sqrt(soma[i]);
	}
	return raizes;
}

function train(config={}) {
	if(config.x) eixoX = config.x; else eixoX = [0];
	if(config.y) eixoY = config.y; else eixoY = [0];
	if(config.class) classe = config.class; else classe = [''];
}

function predict(_entradaX=0, _entradaY=0) {
	entradaX = _entradaX;
	entradaY = _entradaY;

	let entradaClasse = 0;
	const raiz = raizes();

	let indiceMenor = -1;
	let menor = Infinity;
	for(let i=0; i<raiz.length; i++) {
		if(raiz[i] <= menor) {
			menor = raiz[i];
			indiceMenor = i;
		}
	}

	entradaClasse = classe[indiceMenor];
	return entradaClasse;
}

train({
	x: [1, 2, 30, 40],
	y: [3, 4, 50, 60],
	class: [1, 1, 2, 2]
});

console.log(predict(157, 48));
