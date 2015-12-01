// A function 'requestAnimFrame', that takes a function 'callback' as inputparameter, and starts it after a certain interval (?)
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback){
            window.setTimeout(callback, 1000 / 30);
        }
    );
}();

// The 'setTimeout' method calls a specified function after the specified delay.
// A 'setInterval' would call the specified function repeatedly after each specified time interval.
window.setTimeout(getDirection, 100); // Changes direction (once) after 1 time set here
var x = 150, y = 100, w = 600, h = 600, r = 15;
var rgbFill ="blue";
var d,c,s;
var rColor,gColor,bColor;
var hd = "r"; // hd be direction ('l','r','u','d': left or right, up or down)
var horizontal = true;
window.onload = function () {
	try {
		c = document.getElementById("c"); // "c" is the canvas
		w = c.width;
		h = c.height;
		// The parseInt() function parses a string and returns an integer. Only the first number in the string is returned.
		// If the first character cannot be converted to a number, parseInt() returns NaN.
		s = parseInt( document.getElementById("speedy").value); // "speedy" is the ranger, so 's' will be speed (of beter: 'step' (stapgrootte))
		getDirection();
		drawBall();
		
		// Get the button to start the 'intensive work'
		//document.getElementById("intensiveWork").onclick = function () { DoIntensiveWork(); };
		
		var beserk;
		
		document.getElementById("beserk").onclick = function () {
			clearInterval(beserk);
			document.getElementById("speedy").value="12";
			document.getElementById("aText").innerHTML = 'Speed: 12'
			beserk = setInterval(getDirection, 100);
		}
		document.getElementById("chill").onclick = function () {
			clearInterval(beserk);
			document.getElementById("speedy").value="2";
			document.getElementById("aText").innerHTML = 'Speed: 2'
			window.setTimeout(getDirection, 0); // Changes direction (once) after 1 time set here
		}

		document.getElementById("intensiveWork").onclick = function () {
			var result = document.getElementById("workResult");
			result.innerHTML = "Calculating...";
			//Create a worker (to do calculations asynchronous)
			var worker = new Worker("js/RIK_CalculateWorker.js");
			// When the worker reports back:
			worker.onmessage = function (evt) {
				try {
					result.innerHTML = 'Work result: '+ evt.data.toExponential(3); // 'toExponential(3)' makes it 3 digits after the comma
				} catch (e) {
					alert(e.message);
				}
			}
			// When the worker gives an error:
			worker.onerror = function (err) {
				alert(err.message + err.filename + err.lineno);
			}
			// Now that the above is set up, start the worker:
			worker.postMessage("");
			// Make sure it can be terminated with the button:
			document.getElementById("stopWorker").onclick = function () {
				worker.terminate();
				var result = document.getElementById("workResult");
				result.innerHTML = "Worker stopped!";

			}
		};
		// Not sure how the below works, but mozilla needs window.event as a parameter, else it won't work.
		document.onkeydown = function (e) {
			var evt = e || window.event;
			switch (evt.keyCode) {
				case 40: // Keycode 40 = DOWN arrow
					horizontal = false;
					hd = "d";
					break;
				case 37: // Keycode 37 = LEFT arrow
					horizontal = true;
					hd = "l";
					break;
				case 38: // Keycode 38 = UP arrow
					horizontal = false;
					hd = "u";
					break;
				case 39: // Keycode 39 = RIGHT arrow
					horizontal = true;
					hd = "r";
					break;
			}
		}
	} catch (e) {
		alert(e.message);
	}
}
function increaseSpeed() { // By increasing step size s
	s++;
	document.getElementById("speedy").value = s;
}
function decreaseSpeed() { // By decreasing step size s
	s--;
	document.getElementById("speedy").value = s;
}
function changeDirection() {
	var cx = window.event.offsetX;
	var cy = window.event.offsetY;
	x = cx;
	y = cy;
	document.getElementById("speedy").value = s;
}

function setNewPoint(d) { // 'd' might stand for direction
	try{
		switch (horizontal) { // Check if d = 'horizontal'
		case true:
			if (x < (w - r) && hd == "r") // Indien niet tegen de rechter rand && bewegend naar rechts
				x += s; // stap naar rechts
			else if(x > r && hd == "l") // Indien niet tegen de linker rand && bewegend naar links
				x -= s; // stap naar links
			break;
		case false: // 'd' = verticaal (of horizontal = false)
			if (y < (h - r) && hd == "d")
				y += s;
			else if (y > r && hd == "u")
				y -= s;
			break;
		}
		// Verander de kleur en richting als de rand wordt geraakt:
		if (x >= (w - r)) { // Indien tegen of voorbij de rechterrand; maak hd direction naar left 'l'
			hd = "l";
			var red = Math.round(Math.random()*255);
			var green = Math.round(Math.random()*255);
			var blue = Math.round(Math.random()*255);
			var clr = document.getElementById("ballColor");
			clr.innerHTML = "R: "+red+"<br />G: "+green+"<br />B: "+blue;
			rgbFill = "rgb("+red+","+green+","+blue+")";
		}
		if (x <= r) {
			hd = "r";
			var red = Math.round(Math.random()*255);
			var green = Math.round(Math.random()*255);
			var blue = Math.round(Math.random()*255);
			var clr = document.getElementById("ballColor");
			clr.innerHTML = "R: "+red+"<br />G: "+green+"<br />B: "+blue;
			rgbFill = "rgb("+red+","+green+","+blue+")";
		}
		if (y >= (h - r)){
			hd = "u";
			var red = Math.round(Math.random()*255);
			var green = Math.round(Math.random()*255);
			var blue = Math.round(Math.random()*255);
			var clr = document.getElementById("ballColor");
			clr.innerHTML = "R: "+red+"<br />G: "+green+"<br />B: "+blue;
			rgbFill = "rgb("+red+","+green+","+blue+")";
		}
		if (y <= r){
			hd = "d";
			var red = Math.round(Math.random()*255);
			var green = Math.round(Math.random()*255);
			var blue = Math.round(Math.random()*255);
			var clr = document.getElementById("ballColor");
			clr.innerHTML = "R: "+red+"<br />G: "+green+"<br />B: "+blue;
			rgbFill = "rgb("+red+","+green+","+blue+")";
		}
	} catch (e) {
		alert(e.message);
	}
}
function getDirection() {
	// '!' is the 'logical NOT operator' in JavaScript. Case the result of the evaluation and convert it to a boolean, then make it the opposite.
	// 1. Take 'horizontal' and evaluate it. 2. If it exists: true, if undefined: false. 3. Now take the opposite.
	horizontal = !horizontal; // If horizontal is undefined, horizontal = true. If horizontal is defined/true, horizontal = false.
	
	// 'Math.ceil()' rounds a number upward to it's nearest integer.
	// 'Math.random()' returns a random number between 0 (inclusive) and 1 (exclusive).
	var d = Math.ceil(Math.random() * 2); // 'd' might stand for direction
	if (horizontal) {
		if (d == 1) {
			hd = "r";
		} else {
			hd = "l";
		}
	} else {
		if (d == 1) {
			hd = "u";
		} else {
			hd = "d";
		}
	}
}

function drawBall() {
	try {
		// randomize stroke color everytime it's redrawn:
		var red = Math.round(Math.random()*255);
		var green = Math.round(Math.random()*255);
		var blue = Math.round(Math.random()*255);
		var rgbStroke = "rgb("+red+","+green+","+blue+")";//"rgb(128,128,128)";
		setNewPoint(d);
		var ctxt = c.getContext("2d");
		ctxt.clearRect(0, 0, c.width, c.height);
		ctxt.beginPath();
		ctxt.lineWidth = "2";
		ctxt.strokeStyle = rgbStroke;
		ctxt.arc(x, y, r, 0, 360);
		ctxt.fillStyle = rgbFill;
		ctxt.fill();
		ctxt.stroke();
		s = parseInt(document.getElementById("speedy").value); // Converts the value (that is read as a string) to an integer
		requestAnimFrame(function () { // After a certain interval, it repeats itself, I think
			drawBall();
		});
	} catch (e) {
		alert(e.message);
	}
}
