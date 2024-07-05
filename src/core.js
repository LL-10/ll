/**
 * @file Game engine core file.
 */

// eslint-disable-next-line no-unused-vars
class Game {
	constructor() {
		const worker = new Worker('worker.js');
		this.worker = worker;
		const Interface = class Interface {
			constructor(...nodes) {
				this.nodes = nodes;
			}
			load() {}
		};
		const Map = class Map {
			constructor() {
				this.canvas = new OffscreenCanvas(0, 0);
			}
			init() {
				worker.postMessage({
					action: 'init',
					origin: this.constructor.name.toLowerCase(),
					canvas: this.canvas,
				}, [this.canvas]);
			}
			config({
				width = 1000,
				height = 1000,
			} = {}) {
				worker.postMessage({
					action: 'config',
					origin: this.constructor.name.toLowerCase(),
					opts: {
						width,
						height,
					},
				});
			}
		};
		const View = class View {
			constructor() {
				this.container = document.createElement('canvas');
				this.container.addEventListener('contextmenu', event => {
					event.preventDefault();
				});
				this.canvas = this.container.transferControlToOffscreen();
			}
			init() {
				worker.postMessage({
					action: 'init',
					origin: this.constructor.name.toLowerCase(),
					canvas: this.canvas,
				}, [this.canvas]);
			}
			config({
				resolution = 500,
			} = {}) {
				worker.postMessage({
					action: 'config',
					origin: this.constructor.name.toLowerCase(),
					opts: {
						resolution,
						width: window.innerWidth,
						height: window.innerHeight,
					},
				});
			}
			start() {
				worker.postMessage({
					action: 'start',
					origin: this.constructor.name.toLowerCase(),
				});
			}
		};
		const Camera = class Camera {
			constructor({
				wide = false,
			} = {}) {}
		};
		this.map = new Map();
		this.view = new View();
		this.view.init();
		this.camera = new Camera();
		this.map.init();
		this.interfaces = {
			before: new Interface(),
			main: new Interface(),
		};
	}
	start({
		frames = 80, // fps
		resolution = 500, // ppi
	} = {}) {
		document.body.insertBefore(this.view.container, document.body.firstChild);
		this.map.config();
		this.view.start();
		this.intervalID = setInterval(() => {
			this.view.config(resolution);
			this.worker.postMessage({
				action: 'render',
			});
		}, 1000 / frames);
		/*
		 * const context = offscreen.getContext('2d');
		 * context.fillStyle = 'lightyellow';
		 * context.fillRect(0, 0, offscreen.width, offscreen.height);
		 */
		this.worker.addEventListener('message', event => {
			console.log(event.data);
		});
		/*
		 * window.addEventListener('resize', (() => {
		 * 	this.view.init();
		 * }).debounce(100));
		 * this.map.init();
		 * this.map.worker.postMessage({
		 * 	action: 'render',
		 * });
		 * this.map.worker.addEventListener('message', event => {
		 * 	this.map.canvas = event.data;
		 * 	this.map.context = this.map.canvas.getContext('2d');
		 * 	this.intervalID = setInterval(() => {
		 * 		this.map.context.fillStyle = 'lightyellow';
		 * 		this.map.context.fillRect(0, 0, this.map.canvas.width, this.map.canvas.height);
		 * 		this.view.context.drawImage(this.map.canvas.transferToImageBitmap(), ...[
		 * 			0,
		 * 			0,
		 * 			this.map.canvas.width,
		 * 			this.map.canvas.heigh,
		 * 		], ...[
		 * 			0,
		 * 			0,
		 * 			this.view.canvas.width,
		 * 			this.view.canvas.height,
		 * 		]);
		 * 	}, 1000 / frames);
		 * }, {
		 * 	once: true,
		 * });
		 */
	}
	stop() {
		clearInterval(this.intervalID);
		document.body.removeChild(this.view.container);
	}
}

/*
 *class Game {
 *constructor() {
 *this.canvas = document.createElement('canvas');
 *this.components = [];
 *}
 *start(overflow = true, width = 1000, height = 1000, resolution = 500, frames = 80) {
 *this.overflow = overflow;
 *this.width = width;
 *this.height = height;
 *this.resolution = resolution;
 *this.frames = frames;
 *this.context = this.canvas.getContext('2d');
 *this.cursor = {};
 *window.onmousemove = event => {
 *this.cursor = {
 *x: event.pageX / window.innerWidth * this.canvas.width / this.ratio,
 *y: event.pageY / window.innerHeight * this.canvas.height / this.ratio,
 *};
 *};
 *document.body.insertBefore(this.canvas, document.body.firstChild);
 *setInterval(() => {
 *this.canvas.width = resolution * window.innerWidth / 96;
 *this.canvas.height = resolution * window.innerHeight / 96;
 *this.ratio = this.overflow ?
 *Math.min(this.canvas.width / width, this.canvas.height / height) :
 *Math.max(this.canvas.width / width, this.canvas.height / height);
 *this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
 *this.components.forEach(component => {
 *const dx = (component.position.x + component.size.x / 2) * this.ratio;
 *const dy = (component.position.y + component.size.y / 2) * this.ratio;
 *const sx = component.size.x * this.ratio;
 *const sy = component.size.y * this.ratio;
 *const data = [dx, dy, sx, sy];
 *this.context.translate(dx, dy);
 *this.context.rotate(component.rotation);
 *this.context.translate(-dx, -dy);
 *if (component.source)
 *this.context.drawImage(component.source, ...data);
 *else {
 *this.context.fillStyle = 'black';
 *this.context.fillRect(...data);
 *}
 *this.context.resetTransform();
 *if (component.control === 0) {
 *component.velocity.x += component.acceleration.x / this.frames;
 *component.velocity.y += component.acceleration.y / this.frames;
 *} else if (component.control === 1) {
 *  //TODO
 *} else if (component.control === 2) {
 *component.velocity.x = component.speed * Math.cos(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *component.velocity.y = component.speed * Math.sin(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *component.acceleration.x = component.acceleration.linear * Math.cos(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *component.acceleration.y = component.acceleration.linear * Math.sin(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *  //if (Math.abs(this.cursor.x - component.position.x) <= component.speed / this.frames && Math.abs(this.cursor.y - component.position.y) <= component.speed / this.frames)
 *  //if (Math.abs(this.cursor.x - component.position.x) <= Math.abs(component.velocity.x / this.frames) || 0 &&
 *  //Math.abs(this.cursor.y - component.position.y) <= Math.abs(component.velocity.y / this.frames) || 0)
 *  //component.velocity.x = component.velocity.y = component.acceleration.x = component.acceleration.y = 0;
 *  //else
 *  //component.speed += component.acceleration.linear / this.frames;
 * }
 *component.position.x += component.velocity.x / this.frames;
 *component.position.y += component.velocity.y / this.frames;
 *});
 *this.context.beginPath();
 *this.context.moveTo(0, 0);
 *this.context.lineTo(this.canvas.width, this.canvas.height);
 *this.context.stroke();
 *this.context.beginPath();
 *this.context.moveTo(0, 0);
 *this.context.lineTo(this.width * this.ratio, this.height * this.ratio);
 *this.context.stroke();
 *this.context.font = '50px Arial';
 *this.context.fillText('Cursor: ' + this.cursor.x + ', ' + this.cursor.y, 100, 100);
 *}, 1000 / this.frames);
 *}
 *add(component) {
 *this.components.push(component);
 *component.game = this;
 *}
 *remove(component) {
 *this.components.splice(this.components.indexOf(component), 1);
 *component.game = null;
 *}
 *}
 */
/*
 * class Component {
 *constructor(source = null) {
 *if (source && typeof source === 'string') {
 *this.source = new Image();
 *this.source.src = source;
 *} else
 *this.source = source;
 *this.game = null;
 *this.size = {
 *x: 0,
 *y: 0,
 *};
 *this.position = {
 *x: 0,
 *y: 0,
 *};
 *this.rotation = 0;
 *this.velocity = {
 *linear: 0,
 *x: 0,
 *y: 0,
 *};
 *this.acceleration = {
 *linear: 0,
 *x: 0,
 *y: 0,
 *};
 *//**
    * @summary How this component moves.
    * @description 0 = no control; 1 = moves on key/touch event; 2 = constantly moves towards cursor/touch.
    *//*
		this.control = 0;
	}
	get speed() {
		return this.velocity.linear;
	}
	set speed(value) {
		this.velocity.linear = value;
	}
	stop() {
		this.velocity = {
			linear: 0,
			x: 0,
			y: 0,
		};
		this.acceleration = {
			linear: 0,
			x: 0,
			y: 0,
		};
	}
}
*/
