
function RIK_drawCanvas1 () {
	var canvas1 = document.getElementById("myCanvas1");
	var ctxt = canvas1.getContext("2d");
	
	// Vierkant
	var squareSize = 350;
	ctxt.beginPath();
	ctxt.rect((canvas1.width-squareSize)/2, (canvas1.height-squareSize)/2, squareSize, squareSize);
	ctxt.lineWidth = 10;
	// Set ctxt transparency:
	ctxt.globalAlpha = 0.5;
	ctxt.fillStyle = 'lightgrey';
	ctxt.fill();
	ctxt.strokeStyle = 'grey';
	ctxt.stroke();
	
	// Driehoek
	ctxt.beginPath();
	ctxt.moveTo(300, 10);
	ctxt.lineTo(590, 390);
	ctxt.lineTo(10, 390);
	ctxt.lineTo(300, 10);
	ctxt.lineWidth = 5;
	ctxt.globalAlpha = 1;
	ctxt.strokeStyle = '#ff0';
	ctxt.fillStyle = 'rgba(128,0,160,0.3)';
	ctxt.fill();
	ctxt.stroke();

	// Cirkel
	var circleSize = 300;
	ctxt.beginPath();
	ctxt.arc(canvas1.width/2, canvas1.height/2,circleSize/2,0,2 * Math.PI, false);
	ctxt.lineWidth = 5;
	// This code creates the gradient object by passing in the start and end points of a gradient line:
	ctxt.globalAlpha = 0.8;
	var gradient = ctxt.createLinearGradient(canvas1.width/2, (canvas1.height-circleSize)/2, canvas1.width/2, (canvas1.height+circleSize)/2);
	// You then add three color stops:
	gradient.addColorStop(0.15, "black");
	gradient.addColorStop(0.4, "grey");
	gradient.addColorStop(.8,"white");
	ctxt.fillStyle = gradient;
	ctxt.fill();
	ctxt.globalAlpha = 1;
	ctxt.strokeStyle = '#0f0';
	ctxt.stroke();
}

function RIK_drawCanvas2 () {
	//===============================================================================================================
    var canvas2 = document.getElementById("myCanvas2");
    var ctxt2 = canvas2.getContext("2d");
    var ga = 0.0; // Variable for transparency
    var col = 0; // Variable for text color
    var fadeTime = 5000;
    var stepSize = 0.05; // steps to gradually set globalAlpha (starts at 0, stops at 1.0)
    // Do 'increaseVisibility()' every x amount of ms (and save this interval in the variable timerId so it can be cleared later):
    var timerId = setInterval(increaseVisibility, fadeTime * stepSize);
	
	// 'increaseVisibility()' clears anything drawn, then increases 'ctxt2.globalAlpha' by 0.1, as long as ga =< 1.0 and redraws the picture
    function increaseVisibility() {
        ctxt2.clearRect(0,0, canvas2.width,canvas2.height);
        // 'globalAlpha' is transparency setting
        ctxt2.globalAlpha = ga;
        var ie = new Image();
        ie.onload = function() {
            ctxt2.drawImage(ie, 0, 0, canvas2.width,canvas2.height);
        };
        ie.src = "img/orange.jpg";

        ga = ga + stepSize;
        col = col + 255*stepSize;
        document.getElementById("transparency").style.color = 'rgb('+col+','+2*col/3+','+col/3+')';
        document.getElementById("transparency").innerHTML ='Visibility: '+ga.toFixed(2);
        
        // stop doing the function at the set interval as soon as 'ga' = 1.0:
        if (ga > 1.0) {
            ga ==1.0;
            clearInterval(timerId);
        }
    }
}
