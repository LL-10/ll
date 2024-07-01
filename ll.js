/**
 * @file Set up server.
 */

require('./core/base.js');

const fs = require('fs');
const crypto = require('crypto');
//console.log(crypto.getHashes());

const WebSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer(function() {});
server.listen(1337, function() {});
new WebSocketServer({
	httpServer: server,
}).on('request', function(request) {
	//console.log(request.origin);
	const connection = request.accept(null, request.origin);
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			console.log(crypto.createHash('sha256').update(message.utf8Data)
				.digest('base64'));
			connection.sendUTF(crypto.createHash('sha256').update(message.utf8Data)
				.digest('base64'));
		}
		if (message.type === 'binary')
			console.log('Messaggio di dimensione: ' + message.binaryData.length + ' bytes');
	});
	/*
	 *connection.on('close', function(connection) {
	 *console.log('Connection ' + connection + ' closed');
	 *});
	 */
});

/*
 *const canvas = require('canvas');
 *const Canvas = canvas.createCanvas;
 *
 *const context = new Canvas(200, 200, 'pdf');
 *const ctx = context.getContext('2d');
 * //const ctx2 = new CanvasRenderingContext2D(context);
 *
 *ctx.fillStyle = 'green';
 *ctx.fillRect(10, 10, 150, 100);
 *ctx.beginPath();
 *ctx.lineTo(100, 100);
 *ctx.lineTo(200, 200);
 *ctx.stroke();
 *
 *const path = './out/';
 *if (!fs.existsSync(path))
 * fs.mkdirSync(path, true);
 *fs.createWriteStream(path + 'a.pdf').write(context.toBuffer());
 */

