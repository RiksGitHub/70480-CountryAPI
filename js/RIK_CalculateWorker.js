// A worker file always has the 'onmessage' property being assigned a function to process on the first line:
onmessage = function (evt) {
	var maxWork = 25000000; // (increases calculation time exponentially)
	
	// Just to randomize it a bit (so you can see it actually does something):
	var minWork = 0.5*maxWork;
	var work = Math.round(minWork + (maxWork-minWork)*Math.random()); // Pick a random value between minWork and maxWork
	
	var i = 0;
	var a = new Array(work); // New array, with length 'work')
	var sum = 0;
	for (i = 0; i < work; i++) {
		// Doing this work with the array makes it a take a bit longer (nothing to do with 'sum' or anything else)
		a[i] = i * i; // fills the array with a (long) list of squares [0,1,4,9,16,25,..]
		sum += i * i; // sum = "sum + i * i" adds up all of the squares
	}
	// Somewhere in the worker process, where a result should be sent back to the calling application, the postMessage method is called:
	self.postMessage(sum);
	// The self keyword is similar to the this keyword. The worker process runs in its own context, meaning that it has its own global
	// namespace. The self keyword gives access to the global namespace within the worker process.
	
	// (The worker context has no access to the window object, document object, or any parent object.)
}