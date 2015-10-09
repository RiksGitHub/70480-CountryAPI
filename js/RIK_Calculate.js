// This function does nothing more than calculate the sum of a series of squares and display the result to users:
function DoIntensiveWork() {
	var result = document.getElementById("workResult");
	result.innerHTML = sum;
	var maxWork = 25000000; // (increases calculation time exponentially)
		
	// Just to randomize it a bit (so you can see it actually does something):
	var minWork = 15000000;
	var work = Math.round(minWork + (maxWork-minWork)*Math.random()); // Pick a random value between minWork and maxWork
	
	var i = 0;
	var a = new Array(work); // New array, with length 'work')
	var sum = 0;
	for (i = 0; i < work; i++) {
		// Doing this work with the array makes it a take a bit longer (nothing to do with 'sum' or anything else)
		a[i] = i * i; // fills the array with a (long) list of squares [0,1,4,9,16,25,..]
		sum += i * i; // sum = "sum + i * i" adds up all of the squares
	}
	result.innerHTML = 'Work result: ' + sum.toExponential(3); // 'toExponential(3)' makes it 3 digits after the comma
}
