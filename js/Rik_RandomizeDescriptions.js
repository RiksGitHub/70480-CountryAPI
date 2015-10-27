window.onload = function () {
	
	var defaultDescription = "See below a collection of exercises I practiced with"
	$("#infoP").html(defaultDescription);
	
	var descriptions = [
		"<h1>Event Listening</h1><p>A simple visualization of events being captured and how they bubble.</p>",
		"<h1>Positioning</h1><p>Positioning html elements either absolutely or relatively.</p>",
		"<h1>Range, Focus</h1><p>Using a slider (html 'range' element) with some regular expression testing in combination with a focus event handler.</p>",
		"<h1>Show, Hide</h1><p>Showing and hiding an html element with javascript.</p>",
		"<h1>Transformations</h1><p>Remnant of CSS some transformation tests.</p>",
		"<h1>Dragging/Dropping</h1><p>Small exercise programming drag-drop behavior in Javascript.</p>",
		"<h1>Regular Expressions</h1><p>Using regular expression test to evaluate an input value.</p>",
		"<h1>Validating User Input</h1><p>Simple form with some standard html input fields.</p>",
		"<h1>SVG</h1><p>Small example of drawing with scalable vector graphics.</p>",
		"<h1>Web Storage</h1><p>Visualization of using 'Local Storage' to store small amounts of data on the client side.</p>",
		"<h1>Video file</h1><p>Unfinished html video example with custom video controls (w.i.p.)</p>",
		"<h1>Canvas</h1><p>Small example using the html 'Canvas' element in combination with Javascript to create a drawing.</p>",
		"<h1>Websocket Chat Pane</h1><p>Example using websocket functionality. (It would require to be set up on the server side aswell, before it would work. So it is not a working example).</p>",
		"<h1>Bouncing ball</h1><p>Drawing a bouncing ball animation on Canvas using Javascript and then using this animation to demontrate the use of a 'Web Worker', that can do work (a calculation) in the background.</p>",
		"<h1>Loose ends</h1><p>Just some more unsorted random stuff</p>",
		"<h1>Select randomly</h1><p>Let the computer select one randomly.<br/>This doesn't yet work in internet Explorer, IE doesn't recognize the dispatchEvent(evt) that was used (work around w.i.p.)."
	];

    var descriptionObject = {};
	// Put each of this class together in one object (so they can be counted)
	// And add unique id to each of them
    var randomDiv = document.getElementsByClassName("random");
    for (var i = 0; i < randomDiv.length; i++) {
    	try {
	    	if (i < 10) {
	    		// Add id for each div:
	    		randomDiv[i].setAttribute("id", 'nr0' + (i+1).toString());
	    		//var x = "nr0" + i.toString();
		    	// adding the name:value pair to the descriptions object:
		    	descriptionObject['nr0' + (i+1).toString()] = descriptions[i];
	    	}
	    	else {
	    		// Add id for each div:
	    		randomDiv[i].setAttribute("id", 'nr' + (i+1).toString());
	    		//var x = "nr" + i.toString();
		    	// adding the name:value pair to the descriptions object:
		    	descriptionObject['nr' + (i+1).toString()] = descriptions[i];
	    	}
    	}
    	catch (err){$("#infoP").html("Something went wrong"); }
    }

	// Function to display the descriptions from the descriptions object when hovering:
	$(".random").hover(
		changeDescription,
	    clearDescription
	);
	
	function changeDescription() {
		// Use the id of current div to look up and display the description in the description object:
		$("#infoP").html(descriptionObject[this.id]);
	};
	
	function clearDescription() {
		$("#infoP").html(defaultDescription);
	};
}

//===================================================================================================================================================
// Functionality for chosing randomly:
function RandomChoice(){
	var Pietje = ["eventlistening", "positioning", "rangefocus", "showinghiding", "transforms", "dragdrop", "regularexpression", 
	"validatinguserinput", "svg", "webstorage", "video", "canvas", "websocket", "bouncingball", "looseends"];
	// Random number 0 to X : Math.round((X+1)*Math.random()-0.5). (In theory this might result in -1 or X+1, but what are the odds :)
	var b = Math.round(Pietje.length*Math.random()-0.5);
	if(confirm('Now opening \''+Pietje[b]+'.html\'\n(Does not work in Internet Explorer)')){
		openNewURLInTheSameWindow(Pietje[b]+'.html')
	};
}
// This function will setup a virtual anchor element and fire click handler to open new URL in the same room
// (works better with popup blockers than location.href=something or location.reload()):
function openNewURLInTheSameWindow(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}
// this function can fire onclick handler for any DOM-Element:
function fireClickEvent(x) {
    var evt = new window.MouseEvent('click', {view: window, bubbles: true, cancelable: true});
    x.dispatchEvent(evt);
}
