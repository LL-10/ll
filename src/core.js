class Game {
	constructor({
		map = {},
	} = {}) {
		const Map = class Map {
			constructor({
				width = 1000,
				height = 1000,
			} = {}) {
				this.canvas = document.createElement('canvas');
				this.canvas.width = width;
				this.canvas.height = height;
				this.context = this.canvas.getContext('2d');
			}
		};
		const View = class View {
			constructor() {
				this.canvas = document.createElement('canvas');
				this.context = this.canvas.getContext('2d');
			}
		};
		const Camera = class Camera {
			constructor({
				wide = false,
			} = {}) {}
		};
		this.map = new Map(map.width, map.height);
		this.view = new View();
		this.camera = new Camera();
	}
	start({
		frames = 80, // fps
		resolution = 500, // ppi
	} = {}) {
		document.body.insertBefore(this.view.canvas, document.body.firstChild);
		setInterval(() => {
			this.map.context.fillStyle = 'lightyellow';
			this.map.context.fillRect(0, 0, this.map.canvas.width, this.map.canvas.height);
			this.view.canvas.width = resolution * window.innerWidth / 96;
			this.view.canvas.height = resolution * window.innerHeight / 96;
			this.view.context.drawImage(this.map.canvas, 0, 0, this.map.canvas.width, this.map.canvas.height, 0, 0, this.view.canvas.width, this.view.canvas.height);
		}, 1000 / frames);
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
 *	this.cursor = {
 *		x: event.pageX / window.innerWidth * this.canvas.width / this.ratio,
 *		y: event.pageY / window.innerHeight * this.canvas.height / this.ratio,
 *	};
 *};
 *document.body.insertBefore(this.canvas, document.body.firstChild);
 *setInterval(() => {
 *	this.canvas.width = resolution * window.innerWidth / 96;
 *	this.canvas.height = resolution * window.innerHeight / 96;
 *	this.ratio = this.overflow ?
 *		Math.min(this.canvas.width / width, this.canvas.height / height) :
 *		Math.max(this.canvas.width / width, this.canvas.height / height);
 *	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
 *	this.components.forEach(component => {
 *		const dx = (component.position.x + component.size.x / 2) * this.ratio;
 *		const dy = (component.position.y + component.size.y / 2) * this.ratio;
 *		const sx = component.size.x * this.ratio;
 *		const sy = component.size.y * this.ratio;
 *		const data = [dx, dy, sx, sy];
 *		this.context.translate(dx, dy);
 *		this.context.rotate(component.rotation);
 *		this.context.translate(-dx, -dy);
 *		if (component.source)
 *			this.context.drawImage(component.source, ...data);
 *		else {
 *			this.context.fillStyle = 'black';
 *			this.context.fillRect(...data);
 *		}
 *		this.context.resetTransform();
 *		if (component.control === 0) {
 *			component.velocity.x += component.acceleration.x / this.frames;
 *			component.velocity.y += component.acceleration.y / this.frames;
 *		} else if (component.control === 1) {
 *			//TODO
 *		} else if (component.control === 2) {
 *			component.velocity.x = component.speed * Math.cos(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *			component.velocity.y = component.speed * Math.sin(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *			component.acceleration.x = component.acceleration.linear * Math.cos(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *			component.acceleration.y = component.acceleration.linear * Math.sin(Math.atan2(this.cursor.y - component.position.y, this.cursor.x - component.position.x)) || 0;
 *			//if (Math.abs(this.cursor.x - component.position.x) <= component.speed / this.frames && Math.abs(this.cursor.y - component.position.y) <= component.speed / this.frames)
 *			//if (Math.abs(this.cursor.x - component.position.x) <= Math.abs(component.velocity.x / this.frames) || 0 &&
 *			//	Math.abs(this.cursor.y - component.position.y) <= Math.abs(component.velocity.y / this.frames) || 0)
 *			//	component.velocity.x = component.velocity.y = component.acceleration.x = component.acceleration.y = 0;
 *			//else
 *			//	component.speed += component.acceleration.linear / this.frames;
 *		}
 *		component.position.x += component.velocity.x / this.frames;
 *		component.position.y += component.velocity.y / this.frames;
 *	});
 *	this.context.beginPath();
 *	this.context.moveTo(0, 0);
 *	this.context.lineTo(this.canvas.width, this.canvas.height);
 *	this.context.stroke();
 *	this.context.beginPath();
 *	this.context.moveTo(0, 0);
 *	this.context.lineTo(this.width * this.ratio, this.height * this.ratio);
 *	this.context.stroke();
 *	this.context.font = '50px Arial';
 *	this.context.fillText('Cursor: ' + this.cursor.x + ', ' + this.cursor.y, 100, 100);
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

/**.
 *.
 *.
 *.
 *.
 *.
 *.
 *.
 *.
 * class Component {
 *constructor(source = null) {
 *if (source && typeof source === 'string') {
 *	this.source = new Image();
 *	this.source.src = source;
 *} else
 *	this.source = source;
 *this.game = null;
 *this.size = {
 *	x: 0,
 *	y: 0,
 *};
 *this.position = {
 *	x: 0,
 *	y: 0,
 *};
 *this.rotation = 0;
 *this.velocity = {
 *	linear: 0,
 *	x: 0,
 *	y: 0,
 *};
 *this.acceleration = {
 *	linear: 0,
 *	x: 0,
 *	y: 0,
 *};
 * /**
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
