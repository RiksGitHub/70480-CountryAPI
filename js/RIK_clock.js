//Het javascript dat de klok tekent in het veld: -->

var canvas = document.getElementById("canvasClock"); // Maak van je veld een object aan
var ctx1 = canvas.getContext("2d"); // Creeer een 2D teken object voor de achtergrond
var scale = 0.7;
var radius = scale*(canvas.height / 2); // Begin met radius (bijv. precentage halve lengte of hoogte)
ctx1.translate(radius/scale, radius/scale); // Maak het middelpunt je nulpunt voor de achtergrond
//ctx2.translate(radius/scale, radius/scale); // Maak het middelpunt je nulpunt voor de wijzers
drawClock(ctx1); // Teken de klok

setInterval(function(){drawClock(ctx1, radius)}, 1000); // Teken de klok met onderstaande functies, elke 1000 milliseconden
//drawClock();

var shadowcolor ="hsla(200,50%,20%,0.4)"
function drawClock(context) { //Teken de klok in 3 stappen (functies)
    
	context.save(); // Store the current transformation matrix
	context.setTransform(1, 0, 0, 1, 0, 0); // Use the identity matrix while clearing the canvas
	context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
	context.restore(); // Restore the transform
	
	context.shadowColor = shadowcolor; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
	context.shadowOffsetX = 0; // integerHorizontal distance of the shadow, in relation to the text.
	context.shadowOffsetY = 3; // integerVertical distance of the shadow, in relation to the text.
	context.shadowBlur = 9; // integerBlurring effect to the shadow, the larger the value, the greater the blur.

	drawFace(context, radius); // 1. De klok achtergrond
	
	context.shadowColor = 'transparent'; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
	drawNumbers(context, radius); // 2. De klok nummers
	context.shadowOffsetX = 0; // integerHorizontal distance of the shadow, in relation to the text.
	context.shadowOffsetY = 2; // integerVertical distance of the shadow, in relation to the text.
	context.shadowBlur = 3; // integerBlurring effect to the shadow, the larger the value, the greater the blur.
	context.shadowColor = shadowcolor; // stringColor of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
	drawTime(context, radius); // 3. De klok wijzerbladen
}

// 1. De klok achtergrond:
function drawFace(context, radius) { 
	context.beginPath();
	var grd = context.createRadialGradient(0,0,.5*radius,0,0,radius); // Definieer een circulaire gradient voor de wijzerplaat
	grd.addColorStop(0,"#FAEBE1"); // Binnenste kleur
	grd.addColorStop(.6,"#def"); // Middelste kleur
	grd.addColorStop(1,"#F0F8FF"); // Buitenste kleur
	context.arc(0, 0, radius, 0, 2*Math.PI); // Teken een cirkel op 0,0; straal = radius en lopend van 0 tot 360graden
	context.fillStyle = grd; // Gebruik de gradient als vulling
	context.fill(); // Pas de vulkleur toe
	var grad = context.createRadialGradient(0,0,radius*0.92, 0,0,radius*1.08); // Definieer een circulaire gradient voor de rand, bijvoorbeeld van .95R tot 1.05R
	grad.addColorStop(0, '#ace');
	grad.addColorStop(0.75, '#F0F8FF');
	grad.addColorStop(1, 'hsl(200,20%,40%)'); // Geef de gradient definities
	context.strokeStyle = grad; // Definieer vulling van de stroke als de zojuist gedefinieerde gradient
	context.lineWidth = radius*0.16; // Maak de stroke net zo breed als de zojuist gedefinieerde gradient
	context.stroke(); // Teken de stroke (en dus de gradient)
	// Extra cirkeltje voor de mooi:
	context.shadowColor = 'transparent';
	context.beginPath();
	context.arc(0, 0, radius*0.5, 0, 2*Math.PI); // Definieer een cirkeltje in het midden
	context.fillStyle = 'hsla(200,10%,95%,0.95)'; // Definieer de vulkleur
	context.lineWidth = 1; // Maak de stroke net zo breed als de zojuist gedefinieerde gradient
	context.strokeStyle = "hsl(200,20%,50%)";
	context.stroke(); // Teken de stroke (en dus de gradient)
	context.fill(); // Pas de vulkleur toe
}

// 2. De klok nummers en streepjes:
function drawNumbers(context, radius) { 
	var ang; // Definieer een variable voor de hoek
	var num; // Definieer een variable voor de nummers
	context.fillStyle = '#000'; // Kleur van de nummers
	context.strokeStyle ='#432'; // Kleur van de streepjes
	context.font = radius*0.25 + "px helvetica"; // String (lees het als "10px arial"), wordt het lettertype en grootte
	context.textBaseline="middle";
	context.textAlign="center"; // Met deze 2 regels is het ankerpunt van de tekst vertikaal en horizontaal in het midden
	for(num = 1; num <= 12; num++){ // Itereer van 1 tot 12 (met stappen van 1)
		ang = num * Math.PI / 6; // Cirkel rond = 2*PI = 2*Math.PI dus dit is daar 1/12 van
		context.rotate(ang); // Roteer over hoek
		context.translate(0, -radius*0.75); // Transleer naar nummer lokatie
		context.rotate(-ang); // Roteer terug over hoek (om tekst recht te zetten)
		context.fillText(num.toString(), 0, 0); // Plaats de variabele 'num' nu als string
		context.rotate(ang); // Roteer weer over hoek
		context.translate(0, radius*0.75); // Transleer terug naar nulpunt
		context.rotate(-ang); // Roteer terug over hoek (zodat ook orientatie weer terug is bij af)
	}
	// De streepjes:
	for(num = 1; num <= 4; num++){ // Itereer van 1 tot 4 (met stappen van 1)
		ang = num * Math.PI / 2; // Cirkel rond = 2*PI = 2*Math.PI dus dit is daar 1/4 van
		context.rotate(ang); // Roteer over hoek
		context.translate(0, -radius*0.95); // Transleer naar marker lokatie
		drawMark(context, radius*.1, radius*.1); // Functie voor de markering/strepen (ctx, lengte, breedte)
		context.translate(0, radius*0.95); // Transleer terug naar nulpunt
		context.rotate(-ang); // Roteer terug over hoek (zodat ook orientatie weer terug is bij af)
	}
	for(num = 1; num <= 12; num++){ // Itereer van 1 tot 12 (met stappen van 1)
		ang = num * Math.PI / 6; // Cirkel rond = 2*PI = 2*Math.PI dus dit is daar 1/12 van
		context.rotate(ang); // Roteer over hoek
		context.translate(0, -radius*0.95); // Transleer naar marker lokatie
		drawMark(context, radius*.075, radius*.05); // Functie voor de markering/strepen (ctx, lengte, breedte)
		context.translate(0, radius*0.95); // Transleer terug naar nulpunt
		context.rotate(-ang); // Roteer terug over hoek (zodat ook orientatie weer terug is bij af)
	}
	for(num = 1; num <= 60; num++){ // Itereer van 1 tot 60 (met stappen van 1)
		ang = num * Math.PI / 30; // Cirkel rond = 2*PI = 2*Math.PI dus dit is daar 1/60 van
		context.rotate(ang); // Roteer over hoek
		context.translate(0, -radius*0.95); // Transleer naar marker lokatie
		drawMark(context, radius*.05, radius*.025); // Functie voor de markering/strepen (ctx, lengte, breedte)
		context.translate(0, radius*0.95); // Transleer terug naar nulpunt
		context.rotate(-ang); // Roteer terug over hoek (zodat ook orientatie weer terug is bij af)
	}
}

function drawMark(context, length, width) { // ctx = 2D tekenobject, lengte van de lijn en breedte
    context.beginPath(); // 'Begin te tekenen'
    context.lineWidth = width; // Stel lijnbreedte in
    context.lineCap = "round"; // Stel lijn uiteinde vorm in
    context.moveTo(0,0); // Begin bij nulpunt
    context.lineTo(0, -length); // Definieer vanuit hier en onder deze hoek een lijn, 0 opzij en -length' omhoog
    context.stroke(); // Plaats de lijn
}

// 3. De klok wijzers
function drawTime(context, radius){ 
    var now = new Date(); // Neem de tijd
    var hour = now.getHours(); hour = hour % 12;// Pak de uren (0-24) en maak ze (0-12)
    var minute = now.getMinutes(); // Pak de minuten (0-60)
    var second = now.getSeconds(); // Pak de seconden (0-60)
    
    // Bereken de exacte hoek in radialen voor de wijzers (12 uur = 12*60 min = 12*60*60 sec = 2*PI rad):
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(360*60)); // 60sec per minuut, hoek per seconde:(2*PI/(12*60*60))
    context.strokeStyle = '#999'; // Set de kleur van de urenwijzer
    drawHand(context, hour, radius*0.5, radius*0.07); // Teken een lijn a.d.h.v. de functie drawHand (urenwijzer)
    
    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    context.strokeStyle = '#666'; // Set de kleur van de minutenwijzer
    drawHand(context, minute, radius*0.65, radius*0.07); // Teken een lijn a.d.h.v. de functie drawHand (minutenwijzer)
    
    second = (second*Math.PI/30);
    context.strokeStyle = '#333'; // Set de kleur van de secondenwijzer
    drawHand(context, second, radius*0.8, radius*0.02); // Teken een lijn a.d.h.v. de functie drawHand (secondenwijzer)
	context.beginPath();
	context.arc(0, 0, radius/15, 0, 2*Math.PI); // Teken een cirkel op 0,0; straal = radius/15 en lopend van 0 tot 360graden
    context.fillStyle = '#333'; // Set de kleur van de middelste cirkel (en secondenwijzer)
	context.fill(); // Pas de vulkleur toe

}

function drawHand(context, pos, length, width) { // ctx = 2D tekenobject, pos = de hoek/positie, lengte van de lijn en breedte
    context.beginPath(); // 'Begin te tekenen'
    context.lineWidth = width; // Stel lijnbreedte in
    context.lineCap = "round"; // Stel lijn uiteinde vorm in
    context.moveTo(0,0); // Definieer het nulpunt
    context.rotate(pos); // Roteer over hoek pos (moet dus worden opgegeven/ingevuld wanneer de formule wordt aangeroepen)
    context.lineTo(0, -length); // Definieer vanuit hier en onder deze hoek een lijn, 0 opzij en -length' omhoog
    context.stroke(); // Plaats de lijn
    context.rotate(-pos); // Roteer terug naar 0
}