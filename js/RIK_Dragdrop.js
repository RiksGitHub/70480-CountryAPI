/// <reference path="jquery-1.11.3.min.js" />

// The following code shows the use of the dragstart and dragend events to change the style of the item being dragged
// until the dragging ends:
var $draggedItem;

$(document).ready(function () {
	// If you’re using jQuery to bind events, the 'dataTransfer' property will be missing, but it can be added by adding
	// the following statement to the document ready function:
	jQuery.event.props.push('dataTransfer');
	// (jQuery creates a wrapper object that resembles the original event and copies only the data from the original object
	// that jQuery needs. This statement tells jQuery to look for the dataTransfer property on the original object and, if
	// it exists, to copy it to the jQuery wrapper)

	$('.item').on('dragstart', dragging);
	$('.item').on('dragend', draggingEnded);
	// The dragenter and dragover events default to rejecting dragged items, enable dropping by cancelling
	// the default action on these events:
	$('.hole').on('dragenter', preventDefault);
	$('.hole').on('dragover', preventDefault);
	$('.hole').on('drop', dropItem);
});

function dragging(e) {
	// Add the dragging CSS class when the dragging starts:
	$(e.target).addClass('dragging');
	// Set the $draggedItem with the value of the item being dragged:
	$draggedItem = $(e.target);
}

function draggingEnded(e) {
	// e.target is the item being 'dragended':
	$(e.target).removeClass('dragging');
}

// Here 'e' will be 'dragenter' or 'dragover': 
function preventDefault(e) {
	e.preventDefault();
}

// Here 'e' will be 'drop':
function dropItem(e) {
	//  Create variable 'hole', with the value of the item being dropped:
	var hole = $(e.target);
	// If the drop target is a hole and has no children, you can drop:
	if (hole.hasClass('hole') && hole.children().length == 0) {
		// jQuery detaches the dragged item from the DOM:
		$draggedItem.detach();
		// and then appends draggedItem to the drop target:
		$draggedItem.appendTo($(e.target));
	}
}

// All nice and dandy, but it still doen't work in FF (and prolly Safari)