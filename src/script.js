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
				const dx = (component.position.x + component.size.x / 2) * this.ratio;
				const dy = (component.position.y + component.size.y / 2) * this.ratio;
				const sx = component.size.x * this.ratio;
				const sy = component.size.y * this.ratio;
				const data = [dx, dy, sx, sy];
				this.context.translate(dx, dy);
				this.context.rotate(component.angle);
				this.context.translate(-dx, -dy);
				if (component.source)
					this.context.drawImage(component.source, ...data);
				else {
					this.context.fillStyle = 'black';
					this.context.fillRect(...data);
				}
				this.context.rotate(-component.angle);
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
		this.angle = 0;
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

document.getElementById('start').onclick = event => {
	event.target.style.display = 'none';
	game.start();
	component.velocity.x = 10;
	component.angle = Math.radians(180);
	setTimeout(() => {
		component.stop();
	}, 2000);
};
