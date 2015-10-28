window.onload = function () {
	
	var defaultDescription = "";//See below a collection of exercises I practiced with"
	$("#infoP").html(defaultDescription);
	
	var descriptions = [
		{title:"Event Listening",
		description:"A simple visualization of events being captured and how they bubble.",
		pictureUrl:"img/randomize/01.png"},
		{title:"Positioning",
		description:"Positioning html elements either absolutely or relatively.",
		pictureUrl:"img/randomize/02.png"},
		{title:"Range, Focus",
		description:"Using a slider (html 'range' element) with some regular expression testing in combination with a focus event handler.",
		pictureUrl:"img/randomize/03.png"},
		{title:"Show, Hide",
		description:"Showing and hiding an html element with javascript.",
		pictureUrl:"img/randomize/04.png"},
		{title:"Transformations",
		description:"Remnant of CSS some transformation tests.",
		pictureUrl:"img/randomize/05.png"},
		{title:"Dragging/Dropping",
		description:"Small exercise programming drag-drop behavior in Javascript.",
		pictureUrl:"img/randomize/06.png"},
		{title:"Regular Expressions",
		description:"Using regular expression test to evaluate an input value.",
		pictureUrl:"img/randomize/07.png"},
		{title:"Validating User Input",
		description:"Simple form with some standard html input fields.",
		pictureUrl:"img/randomize/08.png"},
		{title:"SVG",
		description:"Small example of drawing with scalable vector graphics.",
		pictureUrl:"img/randomize/09.png"},
		{title:"Web Storage",
		description:"Visualization of using 'Local Storage' to store small amounts of data on the client side.",
		pictureUrl:"img/randomize/10.png"},
		{title:"Video file",
		description:"Unfinished html video example with custom video controls (w.i.p.)",
		pictureUrl:"img/randomize/11.png"},
		{title:"Canvas",
		description:"Small example using the html 'Canvas' element in combination with Javascript to create a drawing.",
		pictureUrl:"img/randomize/12.png"},
		{title:"Websocket Chat Pane",
		description:"Example using websocket functionality. (It would require to be set up on the server side aswell, before it would work. So it is not a working example).",
		pictureUrl:"img/randomize/13.png"},
		{title:"Bouncing ball",
		description:"Drawing a bouncing ball animation on Canvas using Javascript and then using this animation to demontrate the use of a 'Web Worker', that can do work (a calculation) in the background.",
		pictureUrl:"img/randomize/14.png"},
		{title:"Loose ends",
		description:"Just some more unsorted random stuff",
		pictureUrl:"img/randomize/15.png"},
		{title:"Select randomly",
		description:"Let the computer select one randomly.<br/>This doesn't yet work in internet Explorer, IE doesn't recognize the dispatchEvent(evt) that was used (work-around to be implemented at some point).",
		pictureUrl:"img/randomize/16.png"},
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
		$("#infoP").html(
			"<h1>"+descriptionObject[this.id].title+"</h1>"+
			'<br /><img src="'+descriptionObject[this.id].pictureUrl+'"/>'+
			"<p>"+descriptionObject[this.id].description+"</p>"
		);
	};
	
	function clearDescription() {
		$("#infoP").html(defaultDescription);
	};
	
	//To light up the fact that it doesn't yet work in IE
	// (when this is removed, don't forget to remove the notice id and class in the html):
	$(".notice").hover(
		NoticeColor,
	    clearNoticeColor
	);
	
	function NoticeColor() {
		// Use the id of current div to look up and display the description in the description object:
		$("#notice").css("background-color", "hsl(20,80%,70%)");
	};
	
	function clearNoticeColor() {
		$("#notice").css("background-color", "transparent");
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
