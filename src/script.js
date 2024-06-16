const webSocket = new WebSocket('ws://localhost:1337');
webSocket.onopen = function send(event) {
	if (event.isTrusted)
		webSocket.send('IT WORKS!');
};
webSocket.onmessage = function receive(event) {
	console.log(event.data);
	webSocket.close();
};
//console.log(webSocket.bufferedAmount);
