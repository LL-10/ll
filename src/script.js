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

document.body.addEventListener('online', () => {
	alert('You are online again.');
});
document.body.addEventListener('offline', () => {
	alert('You are currently offline.');
});

const game = new Game();
console.log(game);
document.getElementById('start').addEventListener('click', event => {
	event.target.style.display = 'none';
	game.start();
	(() => {
		game.stop();
		document.getElementById('start').style.display = null;
	}).debounce(5000)();
});
/*
 *const component = new Component('https://cache.modd.io/asset/spriteImage/1714657821294_pig.png');
 *component.position = {
 *x: 100,
 *y: 100,
 *};
 *component.size = {
 *x: 100,
 *y: 100,
 *};
 *component.rotation = Math.radians(180);
 * //component.control = 2;
 *component.speed = 1000;
 *game.add(component);
 */
