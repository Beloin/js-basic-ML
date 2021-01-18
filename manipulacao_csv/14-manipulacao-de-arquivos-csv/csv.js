module.exports = class CSV {
	constructor(config={}) {
		this.input = ['input'];
		this.output = ['output'];
		this.separator = ',';
		this.title = true;

		if(config.input) this.input = config.input;
		if(config.output) this.output = config.output;
		if(config.separator) this.separator = config.separator;
		if(config.title) this.title = config.title;

		this.fs = require('fs');
	}

	csvToJSONInputOutput(path='./data.csv') {
		let params = {};
		path = path.toString().trim();
		let data = this.fs.readFileSync(path, 'utf8');
		data = data.toString().trim();
		const lines = data.split('\r\n');

		if(this.title) {
			let qtdInputs = 1;
			let qtdOutputs = 1;

			if(this.input.length>1) {
				qtdInputs = 0;
				for(let i=0; i<this.input.length; i++) {
					qtdInputs += lines[0].split(this.input[i]).length-1;
				}
			}else {
				qtdInputs = lines[0].split(this.input[0]).length-1;
			}

			if(this.output.length>1) {
				qtdOutputs = 0;
				for(let o=0; i<this.output.length; o++) {
					qtdOutputs += lines[0].split(this.output[o]).length-1;
				}
			}else {
				qtdOutputs = lines[0].split(this.output[0]).length-1;
			}

			let input = [];
			let output = [];
			for(let line=1; line<lines.length; line++) {
				const cells = lines[line].split(this.separator);

				if(qtdInputs>1) {
					let arrInput = [];
					for(let i=0; i<qtdInputs; i++) {
						let value = Number(cells[i]);
						if(isNaN(value)) value = cells[i]+''.trim();
						if(value!='undefined') arrInput.push(value);
					}
					input.push(arrInput);
				}else {
					let value = 0;
					if(cells[0]) value = Number(cells[0]);
					if(isNaN(value)) value = cells[0]+''.trim();
					if(value!='undefined') input.push(value);
				}

				if(qtdOutputs>1) {
					let arrOutput = [];
					for(let o=qtdInputs; o<qtdInputs+qtdOutputs; o++) {
						let value = Number(cells[o]);
						if(isNaN(value)) value = cells[o]+''.trim();
						if(value!='undefined') arrOutput.push(value);
					}
					output.push(arrOutput);
				}else {
					let value = 0;
					if(cells[qtdInputs]) value = Number(cells[qtdInputs]);
					if(isNaN(value)) value = cells[qtdInputs]+''.trim();
					if(value!='undefined') output.push(value);
				}				
			}

			params.input = input;
			params.output = output;			
		}else {
			let input = [];
			let output = [];
			for(let line=0; line<lines.length; line++) {
				const cells = lines[line].split(this.separator);

				let value = 0;
				if(cells[0]) value = Number(cells[0]);
				if(isNaN(value)) value = cells[0]+''.trim();
				if(value!='undefined') input.push(value);

				value = 0;
				if(cells[1]) value = Number(cells[1]);
				if(isNaN(value)) value = cells[1]+''.trim();
				if(value!='undefined') output.push(value);
			}

			params.input = input;
			params.output = output;
		}
		return params;
	}

	csvToJSONXY(path='./data.csv') {
		let params = {};
		path = path.toString().trim();
		let data = this.fs.readFileSync(path, 'utf8');
		data = data.toString().trim();
		const lines = data.split('\r\n');

		let start = 0;
		if(this.title) start = 1;

		let x = [];
		let y = [];
		let c = [];
		for(let line=start; line<lines.length; line++) {
			const cells = lines[line].split(this.separator);

			let value = 0;
			if(cells[0]) value = Number(cells[0]);
			if(isNaN(value)) value = cells[0]+''.trim();
			if(value!='undefined') x.push(value);

			value = 0;
			if(cells[1]) value = Number(cells[1]);
			if(isNaN(value)) value = cells[1]+''.trim();
			if(value!='undefined') y.push(value);

			value = Number(cells[2]);
			if(isNaN(value)) value = cells[2]+''.trim();
			if(value!='undefined') c.push(value);			
		}

		params.x = x;
		params.y = y;
		if(c.length>0) params.class = c;

		return params;	
	}

	csvToArray(path='./data.csv') {
		path = path.toString().trim();
		let data = this.fs.readFileSync(path, 'utf8');
		data = data.toString().trim();
		const lines = data.split('\r\n');

		let start = 0;
		if(this.title) start = 1;

		let qtdInputs = 1;
		let qtdOutputs = 1;

		if(this.input.length>1) {
			qtdInputs = 0;
			for(let i=0; i<this.input.length; i++) {
				qtdInputs += lines[0].split(this.input[i]).length-1;
			}
		}else {
			qtdInputs = lines[0].split(this.input[0]).length-1;
		}

		if(this.output.length>1) {
			qtdOutputs = 0;
			for(let o=0; i<this.output.length; o++) {
				qtdOutputs += lines[0].split(this.output[o]).length-1;
			}
		}else {
			qtdOutputs = lines[0].split(this.output[0]).length-1;
		}

		let arrResult = [];
		for(let line=start; line<lines.length; line++) {
			let input = [];
			let output = [];

			const cells = lines[line].split(this.separator);

			for(let i=0; i<qtdInputs; i++) {
				let value = Number(cells[i]);
				if(isNaN(value)) value = cells[i]+''.trim();
				if(value!='undefined') input.push(value);
			}

			for(let o=qtdInputs; o<qtdInputs+qtdOutputs; o++) {
				let value = Number(cells[o]);
				if(isNaN(value)) value = cells[o]+''.trim();
				if(value!='undefined') output.push(value);
			}

			let params = {};
			params.input = input;
			params.output = output;
			arrResult.push(params);				
		}

		return arrResult;
	}
}
