/**
 * @file Starting point.
 */

require('./core/base.js');

const fs = require('fs');
//const childProcess = require('child_process');

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

fs.mkdir('.out/', {
	recursive: true,
}, function(error) {
	if (error)
		console.log(error);
});
fs.createWriteStream('./out/a.pdf').write(context.toBuffer());

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
