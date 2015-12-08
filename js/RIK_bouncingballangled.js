// A function 'requestAnimFrame': Either it already exists, or it is created here, as a function that repeats itself after a set interval
// Nice explanation here: http://creativejs.com/resources/requestanimationframe/
// requestAnimationFrame is used exactly like setTimeout, without specifying the timer. // The timer rate depends on the frame rate of your
// browser and computer, but typically it’s 60fps. // The key difference here is that you are requesting the browser to draw your animation
// at the next available opportunity, not at a predetermined interval.
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        // Only when 'requestAnimationFrame' is not recognized in the current browser, use 'setTimeout' (1000/30 = refresh rate 30x per sec)
        function(somefunction){
            window.setTimeout(somefunction, 1000 / 30); 
        }
    );
}();

var x, y, w, h, r, angle, s, fps; // Startpositie (x, y), breedte-hoogte (w, h), straal (r), hoek, stapgrootte (s), redraws per second (fps)
var startColor = "black" // Start kleur van de cirkel
var rgbFill = startColor; 
var rColor,gColor,bColor; // Kleurkanalen (rood, groen, blauw)
var beserkSettings; // De intervalvariabele voor de berserk functie, zodat het interval ook weer kan worden uitgezet

window.onload = function () {
	var c = document.getElementById("c"); // "c" is the canvas
	document.getElementById("berserk").onclick = BERSERK;
	document.getElementById("chill").onclick = CHILL;
	document.getElementById("reset").onclick = reset;
	reset(); // Reset x, y, r, s, fps, angle and fill color
	try {
		w = c.width;
		h = c.height;
		s = readValue("stepSlider"); // 's' is stapgrootte)
		fps = readValue("fpsSlider"); // 'fps' is refresh time per seconds)
		angle = readValue("angleSlider"); // 'angle' is the moving direction in degrees)
		drawBall(); // Tekent de cirkel (zichzelf herhalende functie, dus geanimeerd)
		
		// Het besturen van de cirkel met de (pijltjes)toetsen=================================================================================================
		//=====================================================================================================================================================
		var storedSpeed = s; // Om de stapgrootte (s) in vast te leggen tijdens pauzeren
		var keysDownTracker = []; // Als toetsen worden ingedrukt gaat deze keysDownTracker er zo uitzien: [23:false, 24:false, 25:true, 66:true, 67:false, etc]
		
		document.onkeyup = function(e){
		    e = e || window.event; // Mozilla needs window.event as a parameter, else it may not work.
		    // onkeyup sets the value for the pressed key in the keysDownTracker to false:
		    keysDownTracker[e.keyCode] = e.type == 'keydown'; // 'e.type' is either 'keyup' or 'keydown', so map[e.keyCode] = true || false
		}
		document.onkeydown = function (e) {
			var evt = e || window.event; // Mozilla needs window.event as a parameter, else it may not work.			
		    // onkeydown sets the value for the pressed key in the keysDownTracker to true:
		    keysDownTracker[e.keyCode] = e.type == 'keydown'; // 'e.type' is either 'keyup' or 'keydown', so map[e.keyCode] = true || false
			
			switch (evt.keyCode) {
				case 37: // Keycode 37 = LEFT arrow 
					if (keysDownTracker[16]){ // SHIFT key ook ingedrukt
						if (angle>=0){
							angle=angle-5; 
							if (angle<0) {angle = angle+360;}
							setAngle(angle);
						};
					} else { // SHIFT key niet ingedrukt
						setAngle(180); // Indien alleen LEFT arrow is ingedrukt
						
						if (s<1) { // Als de step size (snelheid) 0 is, en shift niet ingedrukt, maak hem dan wat ie daarvoor was
							if (storedSpeed > 1) {setStep(storedSpeed);	}
							else {s = 4; storedSpeed = s; setStep(storedSpeed)};
						} 
						// als UP, RIGHT of DOWN ook is ingedrukt
						if (keysDownTracker[38]) {setAngle(225);} // Als UP arrow ook is ingedrukt
						if (keysDownTracker[39]) {if (s > 0) {storedSpeed = s; setStep(0);};} // RIGHT arrow ook ingedrukt, onthoud de stepsize en maak 'm dan 0 (als ie niet al 0 was)
						if (keysDownTracker[40]) {setAngle(135);} // DOWN arrow ook ingedrukt
					};
					break;
				case 38: // Keycode 38 = UP arrow 
					if (keysDownTracker[16]){ // SHIFT key ook ingedrukt
						if (s<20){
							s++;
							if (s<20){storedSpeed = s;}
							setStep(s);
						};
					} else { // SHIFT key niet ingedrukt
						setAngle(270); // Indien alleen UP arrow is ingedrukt
						
						if (s<1) { // Als de step size (snelheid) 0 is, maak hem dan wat ie daarvoor was
							if (storedSpeed > 1) {setStep(storedSpeed);	}
							else {s = 4; storedSpeed = s; setStep(storedSpeed)};
						} 
						// als LEFT, RIGHT of DOWN ook is ingedrukt
						if (keysDownTracker[37]) {setAngle(225);} // Als LEFT arrow ook is ingedrukt
						if (keysDownTracker[39]) {setAngle(315);} // RIGHT arrow ook ingedrukt
						if (keysDownTracker[40]) {if (s > 0) {storedSpeed = s; setStep(0);};} // DOWN arrow ook ingedrukt, onthoud de stepsize en maak 'm dan 0 (als ie niet al 0 was)
					};
					break;
				case 39: // Keycode 39 = RIGHT arrow 
					if (keysDownTracker[16]){ // SHIFT key ook ingedrukt
						if (angle<=359){
							angle=angle+5; 
							if (angle>359) {angle = angle -360;}
							//if (s<20){storedSpeed = s;}
							setAngle(angle);
						};
					} else { // SHIFT key niet ingedrukt
						setAngle(0); // Indien alleen RIGHT arrow is ingedrukt
						
						if (s<1) { // Als de step size (snelheid) 0 is, maak hem dan wat ie daarvoor was
							if (storedSpeed > 1) {setStep(storedSpeed);	}
							else {s = 4; storedSpeed = s; setStep(storedSpeed)};
						}
						// als LEFT, UP of DOWN ook is ingedrukt
						if (keysDownTracker[37]) {if (s > 0) {storedSpeed = s; setStep(0);};} // LEFT arrow ook ingedrukt, onthoud de stepsize en maak 'm dan 0 (als ie niet al 0 was)
						if (keysDownTracker[38]) setAngle(315); // UP arrow ook ingedrukt
						if (keysDownTracker[40]) setAngle(45); // DOWN arrow ook ingedrukt
					};
					break;
				case 40: // Keycode 40 = DOWN arrow 
					if (keysDownTracker[16]){ // SHIFT key ook ingedrukt
						if (s>0){
							s--; 
							if (s>0) {storedSpeed = s;}
							setStep(s);
						};
					} else { // SHIFT key niet ingedrukt
						setAngle(90); // Indien alleen DOWN arrow is ingedrukt
						if (s<1) { // Als de step size (snelheid) 0 was, en shift niet ingedrukt, maak hem dan wat ie daarvoor was
							if (storedSpeed > 1) {setStep(storedSpeed);}
							else {s = 4; storedSpeed = s; setStep(storedSpeed)};
						} 
						// als LEFT, UP of DOWN ook is ingedrukt
						if (keysDownTracker[37]) setAngle(135);// Als LEFT arrow ook is ingedrukt
						if (keysDownTracker[38]) {if (s > 0) {storedSpeed = s; setStep(0);};} // UP arrow ook ingedrukt, onthoud de stepsize en maak 'm dan 0 (als ie niet al 0 was)
						if (keysDownTracker[39]) setAngle(45); // RIGHT arrow ook ingedrukt
					};
					break;
                case 66: // Keycode 66 = 'b'
	                BERSERK();
	                break;
                case 67: // Keycode 67 = 'c'
	                CHILL();
	                break;
                case 82: // Keycode 82 = 'r'
	                reset();
	                break;
			}
		}
		//=====================================================================================================================================================
		//=====================================================================================================================================================
	} catch (e) {
		alert(e.message);
	}
}

// Voor de Berserk functie:
function getDirection() {
	// Alleen een random nieuwe richting kiezen als je binnen de lijnen zit, anders breekt ie eruit:
	if (x > r && x < w - r && y > r && y < h - r){
			angle = angle + Math.round(Math.random()*180 - 90);
	} 
	// Zorg dat de hoek waarde tussen 0 en 360 blijft:
	angle = angleCheck(angle);

	// Pas de waarden aan in de pagina (die zijn leidend):
	setAngle(angle);
}

// Het tekenen van de cirkel (zichzelf herhalend, telkens na het bepalen van een nieuwe (x,y) met 'setNewPoint'):
var growing; // Variable that sets if linewhidth is getting thicker or thinner (growing = true/false)
var lineWidth = 3; // Variabele voor de (varierende) lijndikte
var OrbitAngle1 = 0; // the angle of the orbiting ball
var OrbitAngle2 = 180; // the angle of the orbiting ball
var OrbitAngle3 = 270; // the angle of the orbiting ball
function drawBall() {
	try {
		setTimeout(function() { // to be able to set framerate
			requestAnimationFrame(drawBall); // More efficient with cpu than the simpler 'setTimeout' (makes self repeating function)
			// Randomize de kleur van de rand elke keer dat de cirkel nieuw wordt getekend:
			var rgbChange = randomRGB(1,255,255,255);//"rgb(128,128,128)";
			var ctxt = c.getContext("2d");
			ctxt.clearRect(0, 0, c.width, c.height);
			
			// Main circle
			ctxt.beginPath();
			ctxt.arc(x, y, r-(0.5*lineWidth), 0, 360);
			ctxt.fillStyle = rgbChange;
			ctxt.fill();

			// Main circle stroke (with shadow)
			ctxt.shadowColor = "hsla(200,50%,20%,0.5)"; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
			ctxt.shadowOffsetX = 1; // integerHorizontal distance of the shadow, in relation to the text.
			ctxt.shadowOffsetY = 2; // integerVertical distance of the shadow, in relation to the text.
			ctxt.shadowBlur = 1.5; // integerBlurring effect to the shadow, the larger the value, the greater the blur.
			lineWidth = thickness(lineWidth,3, 0.90*r, 1500); // Strokewidth min -max : 1 - 0.95*r
			ctxt.lineWidth = lineWidth;
			ctxt.strokeStyle = rgbFill;
			ctxt.stroke();
			
			var edgeColorTail = rgbChange;//"hsla(200,40%,70%,0.75)";
			var edgeColorside = "hsla(200,40%,70%,0.75)";
			var edgeColorNose = "hsla(240,50%,80%,0.95)";
			
			// Main circle side edges:
			ctxt.lineWidth = 1;
			ctxt.beginPath();
			ctxt.strokeStyle = edgeColorside;
			ctxt.arc(x, y, r, (1+angle/180)*Math.PI, (1.2+angle/180)*Math.PI);
			ctxt.stroke();
			ctxt.beginPath();
			ctxt.strokeStyle = edgeColorside;
			ctxt.arc(x, y, r, (0.8+angle/180)*Math.PI, (1+angle/180)*Math.PI);
			ctxt.stroke();
			
			// Nose 'headlights'
			ctxt.shadowColor = rgbChange; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
			ctxt.shadowOffsetX = 3*Math.cos(angle*Math.PI/180); // integerHorizontal distance of the shadow, in relation to the text.
			ctxt.shadowOffsetY = 3*Math.sin(angle*Math.PI/180); // integerVertical distance of the shadow, in relation to the text.
			ctxt.shadowBlur = 3.5; // integerBlurring effect to the shadow, the larger the value, the greater the blur.
			ctxt.lineWidth = 2;
			ctxt.strokeStyle = edgeColorNose;
			ctxt.beginPath();
			ctxt.arc(x, y, r, (-0.2+angle/180)*Math.PI, (-0.1+angle/180)*Math.PI);
			ctxt.stroke();
			ctxt.beginPath();
			ctxt.arc(x, y, r, (0.1+angle/180)*Math.PI, (0.2+angle/180)*Math.PI);
			ctxt.stroke();
			
			// Main circle inner edge
			ctxt.shadowColor = "hsla(200,50%,20%,0.5)"; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
			ctxt.shadowOffsetX = 1; // integerHorizontal distance of the shadow, in relation to the text.
			ctxt.shadowOffsetY = 2; // integerVertical distance of the shadow, in relation to the text.
			ctxt.shadowBlur = 1.5; // integerBlurring effect to the shadow, the larger the value, the greater the blur.
			ctxt.beginPath();
			ctxt.lineWidth = 1;
			ctxt.strokeStyle = edgeColorside;
			ctxt.arc(x, y, r-lineWidth, 0, 360);
			ctxt.stroke();
			
			// Orbiting circle 01
			var distance01 = r+3;
			var rad01 = 1.5;
			ctxt.beginPath();
			// Orbiting around main circle:
			ctxt.arc(x+distance01*Math.cos(OrbitAngle1*Math.PI/180), y+distance01*Math.sin(OrbitAngle1*Math.PI/180), rad01, 0, 2*Math.PI);
			ctxt.fillStyle = rgbFill;
			ctxt.fill();

			// Trailing circle 1
			var distance1 = r+8;
			var rad1 = 5;
			ctxt.beginPath();
			ctxt.arc(x-distance1*Math.cos(angle*Math.PI/180), y-distance1*Math.sin(angle*Math.PI/180), rad1, 0, 2*Math.PI);
			ctxt.fillStyle = rgbFill;
			ctxt.fill();
			
			// Trailing circle 1 edge
			ctxt.lineWidth = 1;
			ctxt.strokeStyle = edgeColorside;
			ctxt.stroke();
			
			// Orbiting circle 02
			var distance02 = rad1+3;
			var rad02 = 2;
			ctxt.beginPath();
			// Orbiting around trailing circle 1:
			ctxt.arc(x+distance02*Math.cos(OrbitAngle2*Math.PI/180)-distance1*Math.cos(angle*Math.PI/180),
			 y+distance02*Math.sin(OrbitAngle2*Math.PI/180)-distance1*Math.sin(angle*Math.PI/180), rad01, 0, 2*Math.PI);
			ctxt.fillStyle = rgbFill;
			ctxt.fill();
			
			// Trailing circle 2
			var distance2 = distance1 + 10;
			var rad2 = 0.5*rad1;
			ctxt.shadowColor = rgbChange; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
			ctxt.shadowOffsetX = -4*Math.cos(angle*Math.PI/180); // integerHorizontal distance of the shadow, in relation to the text.
			ctxt.shadowOffsetY = -4*Math.sin(angle*Math.PI/180); // integerVertical distance of the shadow, in relation to the text.
			ctxt.shadowBlur = 5.5; // integerBlurring effect to the shadow, the larger the value, the greater the blur.
			ctxt.beginPath();
			ctxt.arc(x-distance2*Math.cos(angle*Math.PI/180), y-distance2*Math.sin(angle*Math.PI/180), rad2, 0, 2*Math.PI);
			ctxt.fillStyle = rgbFill;
			ctxt.fill();
			
			// Trailing circle 2 (partial) edge
			ctxt.shadowColor = "transparent";
			ctxt.beginPath();
			ctxt.arc(x-distance2*Math.cos(angle*Math.PI/180), y-distance2*Math.sin(angle*Math.PI/180), rad2, (0.8+angle/180)*Math.PI, (1.2+angle/180)*Math.PI);
			ctxt.lineWidth = 1.5;
			ctxt.strokeStyle = edgeColorTail;
			ctxt.stroke();

			// Orbiting circle 03
			var distance03 = rad2+3;
			var rad03 = 1.25;
			ctxt.beginPath();
			// Orbiting around trailing circle 2:
			ctxt.arc(x+distance03*Math.cos(OrbitAngle3*Math.PI/180)-distance2*Math.cos(angle*Math.PI/180),
			 y+distance03*Math.sin(OrbitAngle3*Math.PI/180)-distance2*Math.sin(angle*Math.PI/180), rad03, 0, 2*Math.PI);
			ctxt.fillStyle = rgbFill;
			ctxt.fill();

			// Controleer telkens wat de waarden in de pagina zijn voordat de cirkel wordt getekend (die zijn leidend):
			s = readValue("stepSlider"); 
			fps = readValue("fpsSlider"); 
			angle = readValue("angleSlider");
			// Bepaal met deze waarden waar de nieuwe (x,y) komt:
			setNewPoint();
			
			// Voor de 'orbiting' cirkeltjes, bepaal de nieuwe hoek:
			OrbitAngle1 = OrbitAngle1+OrbitAngleStepSize(5000, 1.8);
			OrbitAngle2 = OrbitAngle2-OrbitAngleStepSize(5000, 2.0);
			OrbitAngle3 = OrbitAngle3+OrbitAngleStepSize(5000, 2.2);
		}, 1000 / fps);
	} catch (e) {
		alert(e.message);
	}
}

// Berekenen van de nieuwe lijndikte:
function thickness(lineWidth, minWidth, maxWidth, cycletime){ // current line width(px), min/max linewidth (px), approx. cycletime (milliseconds)
	if (growing){
		lineWidth+= (maxWidth-minWidth)/(fps*cycletime/2000);
		if (lineWidth> maxWidth) {growing = false;};
	} else {
		lineWidth-= (maxWidth-minWidth)/(fps*cycletime/2000);
		if (lineWidth< minWidth) {growing = true;};
	}
	return lineWidth;
}

// Bepaal hoek increment bij gegeven cycle tijd en rondes per cycle
function OrbitAngleStepSize(CycleTime, RoundsPerCycleTime){
	return (360*RoundsPerCycleTime)/(fps*CycleTime/2000);
};

// Bepaal a.d.h.v. de randvoorwaarden (huidige locatie, richting en de rand) waar de volgende (x,y) komt:
function setNewPoint() { 
	try{
		
		// Indien de cirkel zich tegen (of buiten) de rand van het canvas bevindt, verander eerst de richting:
		if (x <= r || x >= w - r) { // Stuiter tegen linker || rechter vertikale wand
			angle = 180-angle;
			// Zorg dat de hoek waarde tussen 0 en 360 blijft:
			angle = angleCheck(angle);
			// Pas de waarden in de pagina aan (die zijn leidend)
			setAngle(angle);
			// Verander de kleur:
			rgbFill = randomRGB(0.4,255,255,255);
		} 
		
		if (y <= r || y >= h - r) { // Stuiter tegen bovenste || onderste horizontale wand
			angle = 360-angle;
			// Maak dat angle tussen 0 en 360 blijft:
			angle = angleCheck(angle);
			// Pas de waarden in de pagina aan (die zijn leidend)
			setAngle(angle);
			// Verander de kleur:
			rgbFill = randomRGB(0.4,255,255,255);
		} 
		
		// Pas de waarden aan in het plaatje:
		setBallValues(rgbFill);

		// Bereken de volgende (x,y) voor de cirkel
		x= x + s*Math.cos(angle*Math.PI/180);
		y= y + s*Math.sin(angle*Math.PI/180);
		
		// Zorg dat de cirkel niet voorbij de rand wordt getekend:
		if(x > w - r) x = w-r;
		if(x < r) x = r;
		if(y > h - r) y = h-r;
		if(y < r) y = r;

	} catch (e) {
		alert(e.message);
	}
}

// Functie die maakt dat angle tussen 0 en 360 blijft:
function angleCheck(angle){
	var Checkangle = angle;
	if (Checkangle >= 360) {Checkangle = Checkangle - 360;};	
	if (Checkangle < 0) {Checkangle = Checkangle + 360;};
	return Checkangle;
};

// Functie om de fps waarden in de pagina aan te passen
function setFps(input){
	document.getElementById("fpsSlider").value = input.toString();
    document.getElementById("fpsValue").innerHTML = input.toString();
    document.getElementById("fpsInput").value = input.toString();
};

// Functie om de stepsize waarden in de pagina aan te passen
function setStep(input){
	document.getElementById("stepSlider").value = input.toString();
    document.getElementById("stepValue").innerHTML = input.toString();
    document.getElementById("stepInput").value = input.toString();
};

// Functie om de angle waarden in de pagina aan te passen
function setAngle(input){
		document.getElementById("angleSlider").value = input.toString();
		document.getElementById("angleValue").innerHTML = input.toString();
		document.getElementById("angleInput").value = input.toString();
};

// Functie om de cirkelkleur te wijzigen en de waarden in de pagina aan te passen
function randomRGB(maxLightness, maxRed, maxGreen, maxBlue){ // lightness 0.0-1.0
	function color(maxLightness, color){
		return Math.round(Math.random()*maxLightness*color);
	}
	color = "rgb("+color(maxLightness, maxRed)+","+color(maxLightness, maxGreen)+","+color(maxLightness, maxBlue)+")";
	return color;
};
function setBallValues(color){
	var values = document.getElementById("ballValues");
	values.innerHTML = "&alpha;: "+ angle +"<br />" + color;
};

// Functie om de waarde van een element in de pagina als string uit te lezen (en als integer terug te geven)			
function readValue(element){
	return parseInt(document.getElementById(element).value);
};

function BERSERK() {
    clearInterval(beserkSettings);
    setStep(20);
    setFps(60);
    beserkSettings = setInterval(getDirection, 200);
};

function CHILL() {
    clearInterval(beserkSettings);
    setStep(2);
    setFps(20);
};

function reset() { // Startpositie (x, y), straal (r).
    clearInterval(beserkSettings);
	x = 50; y = 50; r = 12;
	rgbFill = startColor;
	setStep(4);
    setFps(30);
    setAngle(45);
};
