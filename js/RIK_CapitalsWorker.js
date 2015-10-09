// A worker file always has the 'onmessage' property being assigned a function to process on the first line:
onmessage = function (evt) {
	var text = evt.data;
	var textCaps = text.toUpperCase();
	
	self.postMessage(textCaps);
}
// Somewhere in the worker process, where a result should be sent back to the calling application, the postMessage method is called:
// The self keyword is similar to the this keyword. The worker process runs in its own context, meaning that it has its own global
// namespace. The self keyword gives access to the global namespace within the worker process.

// (The worker context has no access to the window object, document object, or any parent object.)
