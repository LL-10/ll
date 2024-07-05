/**
 * @file Web Worker.
 */

self.addEventListener('message', event => {
	if (event.data.action === 'init')
		self[event.data.origin] = event.data.canvas;
	else if (event.data.action === 'config') {
		self[event.data.origin].width = event.data.opts.width;
		self[event.data.origin].height = event.data.opts.height;
		if (event.data.opts.resolution) {
			self[event.data.origin].width *= event.data.opts.resolution / 96;
			self[event.data.origin].height *= event.data.opts.resolution / 96;
		}
	} else if (event.data.action === 'start') {
		self[event.data.origin].context = self[event.data.origin].getContext('2d');
	} else if (event.data.action === 'render') {
		self.view.context.fillStyle = 'blue';
		self.view.context.fillRect(0, 0, self.view.width, self.view.height);
	}
});
