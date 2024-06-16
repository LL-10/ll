/**
 * @file Starting point.
 */

require('./core/base.js');

const fs = require('fs');
//const childProcess = require('child_process');

const WebSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer(function() {});
server.listen(1337, function() {});
new WebSocketServer({
	httpServer: server,
}).on('request', function(request) {
	console.log(request.origin);
	const connection = request.accept(null, request.origin);
	connection.on('message', function(message) {
		// Metodo eseguito alla ricezione di un messaggio
		if (message.type === 'utf8') {
			// Se il messaggio è una stringa, possiamo leggerlo come segue:
			console.log(message.utf8Data);
			connection.sendUTF('Perfect');
		}
		if (message.type === 'binary') {
			console.log('Messaggio di dimensione: ' + message.binaryData.length + ' bytes');
			connection.sendBytes(message.binaryData);
		}
	});
	connection.on('close', function(connection) {
		console.log('Connection ' + connection + ' closed');
	});
});

const canvas = require('canvas');
const Canvas = canvas.createCanvas;

const context = new Canvas(200, 200, 'pdf');
const ctx = context.getContext('2d');
//const ctx2 = new CanvasRenderingContext2D(context);

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);
ctx.beginPath();
ctx.lineTo(100, 100);
ctx.lineTo(200, 200);
ctx.stroke();

const path = './out/';
if (!fs.existsSync(path))
	fs.mkdirSync(path, true);
fs.createWriteStream(path + 'a.pdf').write(context.toBuffer());

// Write "Awesome!"
/*
 *ctx.font = '30px Impact';
 *ctx.rotate(0.1);
 *ctx.fillText('Awesome!', 50, 100);
 */

// Draw line under text
/*
 *var text = ctx.measureText('Awesome!');
 *ctx.strokeStyle = 'rgba(0,0,0,0.5)';
 *ctx.beginPath();
 *ctx.lineTo(50, 102);
 *ctx.lineTo(50 + text.width, 102);
 *ctx.stroke();
 */

/*
 *const http = require('http');
 *
 *http.createServer(function (req, res) {
 *res.writeHead(200, {'Content-Type': 'text/html'});
 *res.end('<body><img src="' + context.toDataURL() + '" /></body>');
 *}).listen(1337, "127.0.0.1");
 *
 *console.log('Server running at http://127.0.0.1:1337/');
 */

// Draw cat with lime helmet
/*
 *loadImage('examples/images/lime-cat.jpg').then((image) => {
 *ctx.drawImage(image, 50, 0, 70, 70)
 *
 *})
 */
