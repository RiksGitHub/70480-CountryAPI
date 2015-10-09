var coords = [52.1588, 4.4926]; // A  start location, say Leiden

//-------------------------------------------------------------------------------------------------------------------------------------------		
// De eigen lokatie ophalen doen we zo (werkt alleen in Firefox, niet in Chrome):

// This code saves a reference to the Geolocation API in a variable to provide shorthand access to the API during future use.
var geoLocator = window.navigator.geolocation;
var posOptions = {enableHighAccuracy: true,timeout: 10000}; // Settings voor 'getCurrentPosition'

// 'getCurrentPosition' takes 3 inputs (only the first is mandatory). They don't look like functions, but they are:
geoLocator.getCurrentPosition(successPosition,errorPosition,posOptions);

// Tell the getCurrentPosition what to do: 
// If getting the current position was successful:
function successPosition(pos) { // 'getCurrentPosition' geeft 'pos' of 'err' terug met daarin positiedata of error gegevens
	coords[0] = pos.coords.latitude;
	coords[1] = pos.coords.longitude;
	
	// Plaats de coordinaten als text in de pagina
	var sp = document.createElement("p"); // Maak een <p></p> aan
	sp.innerHTML = "Current Location (Lat, Lon):<br />" + pos.coords.latitude + ", " + pos.coords.longitude; // Zet dit in de <p></p>
	document.getElementById("geoResults").appendChild(sp); // Zet de <p>...</p> in de div met ID 'geoResults'
	
	// Add a marker in the given location, attach some popup content to it and open the popup
	var myMarker = L.marker(coords, { title:"Current Location",alt:"You are here",draggable:true } ).addTo(map)
		.bindPopup('You are here')
		.openPopup();
}
// If getting the current position failed:
function errorPosition(err) {
	var sp = document.createElement("p");
	sp.innerHTML = "Geolocation werkt niet in deze browser<br />" + "(Error code \"" + err.code + "\" - \"" + err.message + "\")";
	document.getElementById("geoResults").appendChild(sp);
}

var oCountry = {};
oCountry.LatLon = [];
oCountry.setCountry = function(zoomlevel){map.setView(this.LatLon, zoomlevel);};
oCountry.CapitolLatLon= [];
oCountry.geoData = {};

// Function for placing a marker at the capital
function setCapitol(){
	var myMarker = L.marker(oCountry.CapitolLatLon, { title:"Capital",alt:"Capital with a big C",draggable:true } ).addTo(map);
};

// Functie voor het aanmaken van een laag (d.m.v de Leaflet-eigen functie 'geoJson') in de vorm van een polyline
function setBorders(){
	var geolayer = L.geoJson(oCountry.geoData).addTo(map);
};

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', { center: coords , zoom: 12 } );

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution:  'Huiswerk Rik B&copy;uwman'}).addTo(map);

//-------------------------------------------------------------------------------------------------------------------------------------------		
// De boel op de kaart zetten plus een polyline maken van hoofdstad naar hoofdstad doen we zo:

localStorage.clear(); // Maak de Storage leeg (elke keer dat de pagina wordt ververst)
var keyKeeper = new Array(); // Nieuw array om de storage sleutels te onthouden in de goede volgorde

// Binding a change event to execute an anonymous function to the "country" select field:
document.getElementById("country").addEventListener("change", function(){
	var polylineArray=[coords]; // Nieuw array voor de hoofdstad coordinaten (bij elke change opnieuw gevuld vanuit de Storage) 
	var	countryValue = document.getElementById("country").value; // Create variable from the user selected option
						
	// Replace any whitespaces in the countryname by a dash (/.../ = regex, '\s = space, 'g' means global, so not just the first but all spaces):
	countryValue = countryValue.replace(/\s+/g, '-');
	
	// Maak alles lowercase (kan geen kwaad):
	var selection = countryValue.toLowerCase();
	
	var XMLHTTPReadyState_COMPLETE = 4; // ('readyState' == 4) staat voor 'request/opdracht compleet/klaar'
	var xReq = new XMLHttpRequest(); // Nieuwe ajax call
	
	// Synchronous calls block the user interface while the request is being made. To prevent this, the call should be
	// asynchronous, by using 'true' (instead of 'false', for synchronous):
	xReq.open("GET", "http://www.rogerkeizer.nl/service/api/country/" + selection, true);
	xReq.timeout = 8534; // Time in millisecs (0 = default = infinite)
	xReq.ontimeout = function () { // Mocht het binnen de opgegeven tijd niet lukken, dan krijgt de gebruiker een melding
		document.getElementById("results").innerHTML = "Getting map data request Timed out";
	}
	
	// 'onreadystatechange' sets an event handler for when the state of the request has changed. Used for asynchronous calls.
	// Assign er een functie aan vast:
	xReq.onreadystatechange = function (e) { // De 'e' variabele hier is nog een raadsel
		// When the request is complete, the 'readyState' changes to complete ('readyState' == 4).
		if (xReq.readyState == XMLHTTPReadyState_COMPLETE) { // 'readyState' gets the current state of the object
			// At this point, the HTTP return status can be evaluated and then the processing of the XML data can occur.
			if (xReq.status = "200") { // 'status ' gets the HTTP status code of the request (such as 200, for a success value)
				try {
					var data = JSON.parse(xReq.response); // De opgehaalde data (xReq.response) is een string, dus hier omgezet naar JS met JSON.parse
				} catch (e) {
					console.log('\n=======================\nCountries with a space still give unexpected results back from the server: \n=======================\n'+xReq.response);
				}
				// Als er geen latlng in de data van het geselecteerde land zit, geef dan een melding:
				try {
					oCountry.LatLon = data.latlng; // Location of country on the map
					//////oCountry.setCountry(6); // toon de kaart bij zoomlevel 6 (uitgezet voor polyline zoom)
				} catch (e) {
					alert("Location of country unknown.\nIncorrect server feedback for country");
				}
				
				try {
					// In the JSON data, 'results' is an array (as opposed to object), meaning no properties, so take the first value of it
					oCountry.CapitolLatLon[0] = data.capitalDetails.results[0].geometry.location.lat;
					oCountry.CapitolLatLon[1] = data.capitalDetails.results[0].geometry.location.lng;
					
					var capitolKey = guid(); // Maak een (random) key aan
					keyKeeper.push(capitolKey); // Onthoud deze key
					//console.log("keyKeeper: " + keyKeeper);
					
					// Zet de capitol met key in de local storage:
					localStorage.setItem(capitolKey, JSON.stringify(oCountry.CapitolLatLon));
					console.log(localStorage);
	
					if (localStorage.length > 0) { // Indien de Storage 1 of meer waarden heeft:
						for (var i = 0; i < keyKeeper.length; i++) { // Voor elke key bewaard in de keyKeeper
							var val = JSON.parse(localStorage.getItem(keyKeeper[i])); // Pak de value en zet deze om naar JS
							polylineArray.push(val); // vul de polylineArray aan met de waarden zojuist uit de storage gehaald.
						}
					} else { // Indien de Storage leeg is:
						document.getElementById("results").innerHTML = "No data in local storage."
					}				
					console.log("Polyline Coordinates: " + JSON.stringify(polylineArray));
	
					// create a red polyline from an array of LatLng points (polyline komt over de al bestaande polyline(s) heen te liggen)
					var polyline = L.polyline(polylineArray, {color: 'red'}).addTo(map);
					
					// zoom the map to the polyline
					map.fitBounds(polyline.getBounds()); /**/
					
					setCapitol(); // Place marker at Capital
					
				} catch (e) {
					alert("Data for country does not contain capitol data");
				}
				
				try {
					// Vul het geoData object (border werkt niet voor de meeste landen):
					// ($.parseJSON zet correcte JSON string om in nette javascript code, JSON.stringify zet javascript code om naar JSON string)
					oCountry.geoData = JSON.parse("{\"type\":\"Feature\",\"properties\":{},\"geometry\":" + JSON.stringify(data.geodata)+ "}");
					
					// Teken de polygon:
					setBorders(); 
				} catch (e) {
					alert("Data for country does not contain Border data");
				}

				// latlon van de capitol reset
				oCountry.CapitolLatLon=[];
			}
			else if (xReq.status = "404") {
				document.getElementById("results").appendChild(xr);
				console.log("De link bestaat niet");
			}
			else { // Indien HTTP status code geen 200 of 404
				var xr = document.createElement("p");
				xr.innerHTML = xReq.statusText;
				document.getElementById("results").appendChild(xr);
				console.log("XMLHttpRequest voor countrylist is mislukt:" + xReq.statusText);
			}
		}
	}
	// 'send' makes the HTTP request and receives the response
	xReq.send(null); // Vooralsnog steeds geen idee wat dit doet, maar vermoedelijk stopt dit het request nadat alles opgehaald is.
});