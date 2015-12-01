//Global object summarizing the pages:
var descriptions = [
    {
        title: "Event Listening",
        filename: "eventlistening",
        description: "A simple visualization of events being captured and how they bubble.",
        pictureUrl: "img/randomize/01.png"
    },
	{
	    title: "Positioning",
	    filename: "positioning",
	    description: "Positioning html elements either absolutely or relatively.",
	    pictureUrl: "img/randomize/02.png"

	},
	{
	    title: "Range, Focus",
	    filename: "rangefocus",
	    description: "Using a slider (html 'range' element) with some regular expression testing in combination with a focus event handler.",
	    pictureUrl: "img/randomize/03.png"
	},
	{
	    title: "Show, Hide",
	    filename: "showinghiding",
	    description: "Showing and hiding an html element with javascript.",
	    pictureUrl: "img/randomize/04.png"

	},
	{
	    title: "Transformations",
	    filename: "transforms",
	    description: "Remnant of CSS some transformation tests.",
	    pictureUrl: "img/randomize/05.png"
	},
	{
	    title: "Dragging/Dropping",
	    filename: "dragdrop",
	    description: "Small exercise programming drag-drop behavior in Javascript.",
	    pictureUrl: "img/randomize/06.png"
	},
    {
        title: "Regular Expressions",
        filename: "regularexpression",
        description: "Using regular expression test to evaluate an input value.",
        pictureUrl: "img/randomize/07.png"
    },
	{
	    title: "Validating User Input",
	    filename: "validatinguserinput",
	    description: "Simple form with some standard html input fields.",
	    pictureUrl: "img/randomize/08.png"
	},
	{
	    title: "SVG",
	    filename: "svg",
	    description: "Small example of drawing with scalable vector graphics.",
	    pictureUrl: "img/randomize/09.png"
	},
    {
        title: "Web Storage",
        filename: "webstorage",
        description: "Visualization of using 'Local Storage' to store small amounts of data on the client side.",
        pictureUrl: "img/randomize/10.png"
    },
	{
	    title: "Video file",
	    filename: "video",
	    description: "Unfinished html video example with custom video controls (w.i.p.)",
	    pictureUrl: "img/randomize/11.png"
	},
	{
	    title: "Canvas",
	    filename: "canvas",
	    description: "Small example using the html 'Canvas' element in combination with Javascript to create a drawing.",
	    pictureUrl: "img/randomize/12.png"
	},
	{
	    title: "Websocket Chat Pane",
	    filename: "websocket",
	    description: "Example using client side websocket functionality. (Needs to be set up on the server side as well for it to work). Let's call it a work in progress...",
	    pictureUrl: "img/randomize/13.png"
	},
	{
	    title: "Bouncing ball",
	    filename: "bouncingball",
	    description: "Drawing a bouncing ball animation on Canvas using Javascript and then using this animation to demontrate the use of a 'Web Worker', that can do work (a calculation) in the background.",
	    pictureUrl: "img/randomize/14.png"
	},
	{
	    title: "Bouncing Ball MkII",
	    filename: "bouncingballangled",
	    description: "Bouncing ball animation on Canvas further developed with angles and everything.",
	    pictureUrl: "img/randomize/15.png"
	},
	{
	    title: "Loose ends",
	    filename: "looseends",
	    description: "Just some more unsorted random stuff",
	    pictureUrl: "img/randomize/16.png"
	},
	{
		title:"JQuery Promise",
	    filename: "promises",
		description:"Let JQuery do some work, and when it's done the work (fullfilled it's promise), let it do something else (w.i.p.)",
		pictureUrl:"img/randomize/17.png"
	},
	{
		title:"A Canvas Clock",
	    filename: "clock",
		description:"A real time clock, created on canvas using javascript",
		pictureUrl:"img/randomize/18.png"
	}
];
var defaultDescription = "<h1>. . . . . . . . . . . . . . . . . . . . .</h1>"; // When not hovering over anything to show a description
var randomDivs = document.getElementsByClassName("random"); // Put each of "random" class together in one object (to be able to count them)
window.onload = function () {
    $("#infoP").html(defaultDescription); // Start with the default description in the description paragraph (#infoP)
	$(".random").hover(function(){changeDescription(this.id)}, clearDescription); // Display the descriptions from the descriptions object when hovering
	$(".notice").hover(Notice, clearNotice); // Functionality of the randomize button
}

// Asign a unique id (i) to each of the random divs (so they can be selected)
for (var i = 0; i < randomDivs.length; i++) {
        // Add id for each div:
        randomDivs[i].setAttribute("id", i);
}

function changeDescription(id) {
    // Use the id of the element to look up and display the description:
    if(descriptions[id]){ // Only if the ID (number) is found in 'descriptions'
	    $("#infoP").html(
	        "<h1>" + descriptions[id].title + "</h1>" +
	        '<br /><img src="' + descriptions[id].pictureUrl+'" />' +
	        "<p>" + descriptions[id].description + "</p>"
	    );
	} else { // If the ID is not found in the descriptionObject
		$("#infoP").html("<h1>Description not available</h1><br /><br /><p>(W. I. P.)</p>");
	}
};

function clearDescription() {
    $("#infoP").html(defaultDescription);
};

//===================================================================================================================================================
// Functionality for choosing randomly:
var fileNames = [];
var b; // Random number to select a description
var backgroundSettings; // To remember background settings before changing them (so they can be changed back)
var noticeColor = "hsla(60,80%,80%,0.6)";
function Notice() { // When hovering the random selector div
    for (var i = 0; i < randomDivs.length; i++) {
        fileNames[i] = descriptions[i].filename; // Put the pagefilenames in an array
    };
    b = Math.round(descriptions.length * Math.random() - 0.5);
    
    // Show randomly chosen option:
    $("#notice").html("Your choice:<br/><b style='font-size:large;'>" + descriptions[b].title.toUpperCase() + "</b>");
    $("#notice").css("background-color", noticeColor);
    $("#notice").css("box-shadow", "0px 5px 10px -5px hsla(0,70%,15%,0.5)");
    
    // Store background settings of matching div, then change it
    backgroundSettings = $("#"+b.toString()).css("background"); 
    $("#"+b.toString()).css("background", noticeColor);
    
    // Show the description:
    changeDescription(b);
};

// Setting stuff back to what it was before hovering over the randomly selecting div:
function clearNotice() {
    $("#notice").html("<br />Select one randomly<br/><br/>");
    $("#notice").css("background-color", "transparent");
    $("#notice").css("box-shadow", "none");
    $("#infoP").html(defaultDescription);
    $("#"+b.toString()).css("background", backgroundSettings);
    $("#test").css("background", "none");
};

function RandomChoice(){
    try {
            openNewURLInTheSameWindow(descriptions[b].filename+".html")
    } catch (e) {
            openNewURLInTheSameWindow(descriptions[0].filename+".html")
    }
};

// Pop-up blockers may say no thank you, otherwise this will load the page in the requested url:
function openNewURLInTheSameWindow(targetURL) {
	window.location.href = targetURL;
};
function openNewURLInNewWindow(targetURL) {
	window.open(targetURL); 
};