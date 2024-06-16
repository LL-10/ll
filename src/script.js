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
	const webSocket = new globalThis.WebSocket('ws://localhost:1337');
	webSocket.onopen = function send(event) {
		if (event.isTrusted)
			webSocket.send(message);
	};
	webSocket.onmessage = function receive(event) {
		console.log(event.data);
		webSocket.close();
	};
}
