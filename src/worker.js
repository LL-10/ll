/**
 * @file Web Worker.
 */

self.addEventListener('message', event => {
	if (event.data.action === 'init')
		self.canvas = new OffscreenCanvas(event.data.width, event.data.height);
	else if (event.data.action === 'render')
		postMessage(self.canvas, [self.canvas]);
});
