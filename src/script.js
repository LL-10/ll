/**
 * @file Set up client.
 */

/**
 * Send request to server.
 * @function request
 * @argument {string|ArrayBuffer|object} message
 * - The string or binary data to be sent to server.
 * @example request('Hello world');
 */
function request(message) {
	if (globalThis.WebSocket) {
		const connection = new globalThis.WebSocket('ws://0.tcp.eu.ngrok.io:10270');
		connection.onopen = function send(event) {
			if (event.isTrusted)
				connection.send(message);
		};
		connection.onmessage = function receive(event) {
			console.log(event.data);
			connection.close();
		};
	} else
		console.error('Your browser does not support WebSockets.');
}

class Game {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.components = [];
	}
	start(size = 1000, resolution = 500, frames = 50) {
		this.size = size;
		this.resolution = resolution;
		this.frames = frames;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.firstChild);
		setInterval(() => {
			this.canvas.width = resolution * window.innerWidth / 96;
			this.canvas.height = resolution * window.innerHeight / 96;
			this.ratio = Math.min(this.canvas.width, this.canvas.height) / size;
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.components.forEach(component => {
				const data = [component.position.x, component.position.y, component.size.x, component.size.y].map(o => o * this.ratio);
				if (component.source)
					this.context.drawImage(component.source, ...data);

				else {
					this.context.fillStyle = 'black';
					this.context.fillRect(...data);
				}
				component.position.x += component.velocity.x / this.frames;
				component.position.y += component.velocity.y / this.frames;
				component.velocity.x += component.acceleration.x / this.frames;
				component.velocity.y += component.acceleration.y / this.frames;
			});
		}, 1000 / this.frame);
	}
	add(component) {
		this.components.push(component);
		component.game = this;
	}
	remove(component) {
		this.components.splice(this.components.indexOf(component), 1);
		component.game = null;
	}
}

class Component {
	constructor(source = null) {
		if (source && typeof source === 'string') {
			this.source = new Image();
			this.source.src = source;
		} else
			this.source = source;

		this.game = null;
		this.size = {
			x: 0,
			y: 0,
		};
		this.position = {
			x: 0,
			y: 0,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.acceleration = {
			x: 0,
			y: 0,
		};
	}
	stop() {
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.acceleration = {
			x: 0,
			y: 0,
		};
	}
	move(x, y) {
		this.position = {
			x: x,
			y: y,
		};
	}
}

const game = new Game();
game.start();
const component = new Component('https://cache.modd.io/asset/spriteImage/1714657821294_pig.png');
component.position = {
	x: 100,
	y: 100,
};
component.size = {
	x: 100,
	y: 100,
};
game.add(component);
component.velocity.x = 10;
setTimeout(() => component.stop(), 2000);
console.log(game, component);

/*
 *class Graphic {
 *constructor(context = null, ...build) {
 *this.context = context;
 *this.build = build;
 *}
 *draw(context = this.context) {
 *let n = 0;
 *this.build.forEach(o => {
 *	n++;
 *	try {
 *		if (typeof o === 'string')
 *			this.context[o]();
 *		else if (Array.isArray(o))
 *			this.context[o[0]](...o[1]);
 *		else
 *			Object.keys(o).forEach(k => {
 *				this.context[k] = o[k];
 *			});
 *	} catch (e) {
 *		console.log('Error: invalid parameter ' + n);
 *	}
 *});
 *}
 *add(build, index) {}
 *clear() {
 *this.build = [];
 *if (this.context)
 *	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
 *}
 *}
 */

/*const canvas = document.getElementById('canvas');*/

/** WEBGL */
/*
 *const ctx = canvas.getContext('webgl');
 *if (ctx === null)
 *throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.');
 *ctx.clearColor(0.0, 0.0, 0.0, 1.0);
 *ctx.clear(ctx.COLOR_BUFFER_BIT);
 */

/** CANVAS */
/*
 *const ctx = canvas.getContext('2d');
 *ctx.moveTo(0, 100);
 *ctx.lineTo(100, 0);
 *ctx.stroke();
 *ctx.beginPath();
 *ctx.arc(50, 50, 50, 0, 2 * Math.PI);
 *ctx.stroke();
 *ctx.font = '10px Arial';
 *ctx.fillText('Hello World', 0, 50);
 *
 *const main = new Graphic(ctx, 'beginPath', ['moveTo', [0, 0]], ['lineTo', [100, 100]], {
 *strokeStyle: '#D00',
 *}, 'stroke');
 *main.draw();
 *main.add();
 *main.clear();
 *main.draw();
 */
