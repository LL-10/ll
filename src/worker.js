/*
 *var i = 0;
 *
 *function timedCount() {
 *i = i + 1;
 *postMessage(i);
 *setTimeout("timedCount()",500);
 *}
 *
 *timedCount();
 */

self.addEventListener('message', event => {
	if (event.data.action === 'init')
		self.canvas = new OffscreenCanvas(event.data.width, event.data.height);
	else if (event.data.action === 'render')
		postMessage(self.canvas, [self.canvas]);
});
