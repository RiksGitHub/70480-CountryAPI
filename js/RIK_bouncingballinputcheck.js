// Some preliminary settings/values:
var alertBox = document.getElementById("alertBox");
var instructionBox = document.getElementById("instructionBox");
var alertDefault = "..bounce.. ..bounce.. ..bounce.."
var instructionDefault = "Choose your settings:"
var alert; // Variable for error message
var color; // Variable for text color
alertboxStyling(alertBox, alertDefault, 'black');

// Step settings:
applySettings("stepInput", "stepValue", "stepSlider", 0, 20,'Choose a value from 0 to 20');
// Fps settings:
applySettings("fpsInput", "fpsValue", "fpsSlider", 1, 100,'Choose a value from 1 to 100');
// Angle settings:
applySettings("angleInput", "angleValue", "angleSlider", 0, 359,'Choose a value from 0 to 359');


// Settings :=========================================================================================================
//====================================================================================================================

function applySettings(inputID, valueID, sliderID, min, max, instruction){
	document.getElementById(inputID).onkeypress = function(e){ // To make the input fields lose focus when pressing enter:
		if (!e) {e = window.event}; // Mozilla needs window.event as a parameter, else it may not work.
		var keyCode = e.keyCode || e.which; // Determine which key was pressed
		if (keyCode == '13'){ // Enter pressed
			this.blur();
			return false; // Remove any default enter pressed behavior
		}
	}
	document.getElementById(inputID).addEventListener("focus", function () {focusFunction(this, instruction, 'white', 'black')});
	document.getElementById(inputID).addEventListener("blur", function () {blurFunction(this, min, max, inputID, valueID, sliderID)});			
}

// General styling / messaging:=======================================================================================
//====================================================================================================================
function alertboxStyling(element, message, color) {
	element.innerHTML = message;
	element.style.color = color;
};

function InputStyling(element, background, color) {
	element.style.backgroundColor = background;
	element.style.color = color;
};

function focusFunction(element, instruction, background, color) {
	element.value ='';
	InputStyling(element, background, color); // Set inputbox colors when receiving focus
	alertboxStyling(instructionBox, instruction, color); // Set colors of alertBox when receiving focus
};

function blurFunction(element, min, max, inputID, valueID, sliderID){	
	removeSpaces(element); // If user types only spaces, replace by empty string
	if (element.value == "") { // Take the value of the slider when input is empty
		element.value = document.getElementById(sliderID).value.toString();
		InputStyling(element, 'white','black');
		alertboxStyling(alertBox, alertDefault, 'black');
	}
	else { 
		if (element.value < min) {
			alert = 'Value too low';
			color = 'red';
			InputStyling(element, '#FDD','red');
		} else {
			if (element.value > max) {
				alert = 'Value too high';
				color = 'red';
				InputStyling(element, '#FDD','red');
			} else {
				if (isNaN(element.value)) { // (This check is only useful if type="text" is used for the field, not now that type="number" is used)
					alert = 'Numbers only please';
					color = 'red';
					InputStyling(element, '#FDD','red');
				} else {
					alert = alertDefault;
					color = 'black';
					InputStyling(element, 'white','black');
					changeValues(sliderID, valueID, inputID);
					alertboxStyling(instructionBox, instructionDefault, color)
				}
			}
		}
		alertboxStyling(alertBox, alert, color);
	}
};

function changeValues(sliderID,ValueID,InputID) {
	document.getElementById(sliderID).value = document.getElementById(InputID).value;
	document.getElementById(ValueID).innerHTML = document.getElementById(InputID).value;
};

// Check for, and remove (only) spaces:
function removeSpaces(element) {
	// Create a regular expression object to have RegEx methods available:
	var regExpression = /^\s*$/; // A string that contains any number of spaces
	if (regExpression.test(element.value))	{		
		element.value="";
	}
}