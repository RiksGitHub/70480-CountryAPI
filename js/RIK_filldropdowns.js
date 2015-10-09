//-------------------------------------------------------------------------------------------------------------------------------------------		
// De regions ophalen doen we zo:

var XMLHTTPReadyState_COMPLETE = 4; // ('readyState' == 4) staat voor 'request/opdracht compleet/klaar'
var xReq = new XMLHttpRequest();
// Synchronous calls block the user interface while the request is being made. To prevent this, the call should be
// asynchronous, by using 'true' (instead of 'false', for synchronous):
xReq.open("GET", "http://www.rogerkeizer.nl/service/api/regions", true);
xReq.timeout = 5000; // Time in millisecs (0 = default = infinite)
xReq.ontimeout = function () { // Mocht het binnen de opgegeven tijd niet lukken, dan krijgt de gebruiker een melding
	document.getElementById("feedback").innerHTML = "Failed to retrieve data for Region dropdown list (timed out)";
}

// 'onreadystatechange' sets an event handler for when the state of the request has changed. Used for asynchronous calls.
// Assign er een functie aan vast:
xReq.onreadystatechange = function (e) { // De 'e' variabele hier is nog een raadsel
	// When the request is complete, the 'readyState' changes to complete ('readyState' == 4).
	if (xReq.readyState == XMLHTTPReadyState_COMPLETE) { // 'readyState' gets the current state of the object
		// At this point, the HTTP return status can be evaluated and then the processing of the XML data can occur.
		if (xReq.status = "200") { // 'status ' gets the HTTP status code of the request (such as 200, for a success value)
			document.getElementById("regions").innerHTML=""; // Just clearing whatever was in it before starting
			var data = JSON.parse(xReq.response); // De opgehaalde data (xReq.response) is een string, dus hier omgezet naar JS met JSON.parse
			// console.log("Consolelog:" + JSON.stringify(data));
			for (var i=0; i<data.length; i++){
				var opt = document.createElement("option");
				document.getElementById("regions").appendChild(opt);
				opt.value = data[i].normalizedName;
				opt.innerHTML = data[i].regionName;
			}
		} 
		else if (xReq.status = "404") { // 404 betekent iets als 'de link verwijst niet naar een bestaande lokatie'
			document.getElementById("feedback").appendChild(xr);
			console.log("The requested link for Region does not exist");
		}
		else { // Indien HTTP status code geen 200
			var xr = document.createElement("p");
			xr.innerHTML = xReq.statusText;
			document.getElementById("feedback").appendChild(xr);
			console.log("Failed to retrieve data for Region dropdown list: " + xReq.statusText);
		}
	}
}
// 'send' makes the HTTP request and receives the response, 
xReq.send(null); // send(null) is ondat er geen data naar de server gaat (zelfde als send(), denk ik).

//-------------------------------------------------------------------------------------------------------------------------------------------		
// De landen ophalen en in de lijst zetten doen we zo:

// Binding a change event to execute an anonymous function to the "regions" select field:
document.getElementById("regions").addEventListener("change", function(){
	var selection = document.getElementById("regions").value; // Create variable from the user selected option
	var XMLHTTPReadyState_COMPLETE = 4; // ('readyState' == 4) staat voor 'request/opdracht compleet/klaar'
	var xReq = new XMLHttpRequest();
	// Synchronous calls block the user interface while the request is being made. To prevent this, the call should be
	// asynchronous, by using 'true' (instead of 'false', for synchronous):
	xReq.open("GET", "http://www.rogerkeizer.nl/service/api/region/dropdown/" + selection, true);
	xReq.timeout = 5000; // Time in millisecs (0 = default = infinite)
	xReq.ontimeout = function () { // Mocht het binnen de opgegeven tijd niet lukken, dan krijgt de gebruiker een melding
		document.getElementById("feedback").innerHTML = "Failed to retrieve data for Country dropdown list (timed out)";
	}
	
	// 'onreadystatechange' sets an event handler for when the state of the request has changed. Used for asynchronous calls.
	// Assign er een functie aan vast:
	xReq.onreadystatechange = function (e) { // De 'e' variabele hier is nog een raadsel (wellicht is het mogelijk om er de feedback van de request in te zetten)
		// When the request is complete, the 'readyState' changes to complete ('readyState' == 4).
		if (xReq.readyState == XMLHTTPReadyState_COMPLETE) { // 'readyState' gets the current state of the object
			// At this point, the HTTP return status can be evaluated and then the processing of the XML data can occur.
			if (xReq.status = "200") { // 'status ' gets the HTTP status code of the request (such as 200, for a success value)
				document.getElementById("country").innerHTML=""; // Just clearing whatever was in it before starting
				var data = JSON.parse(xReq.response); // De opgehaalde data (xReq.response) is een string, dus hier omgezet naar JS met JSON.parse
				//console.log("Consolelog:" + JSON.stringify(data));
				for (var i=0; i<data.length; i++){
					var opt = document.createElement("option");
					opt.value = data[i].Value;
					opt.innerHTML = data[i].Name;
					document.getElementById("country").appendChild(opt);
				}
			} 
			else if (xReq.status = "404") {
				document.getElementById("feedback").appendChild(xr);
				console.log("The requested link for Country does not exist");
			}
			else { // Indien HTTP status code geen 200
				var xr = document.createElement("p");
				xr.innerHTML = xReq.statusText;
				document.getElementById("feedback").appendChild(xr);
				console.log("Failed to retrieve data for Country dropdown list: " + xReq.statusText);
			}
		}
	}
	// 'send' makes the HTTP request and receives the response
	xReq.send(null); // Vooralsnog steeds geen idee wat dit doet, maar vermoedelijk stopt dit het request nadat alles opgehaald is.
});