//------------------------------------------------------------------------------------------------------------------------------
// De functie die checked of de country naam valid is,
// De ingevoerde data online checkt om te zien of het een correcte JSON string is (en melding geeft als ie niet klopt)
// De boel opstuurt naar de server en de melding van de server weergeeft.
function submitData () {
	
//===========================================================================================================================================	
// Checkfunctie om te zien of de ingevoerde string voldoet aan de voorwaarden (met de validate functie van 'http://geojsonlint.com/'):

	var JSONinput = document.getElementById("GeoJSONData").value;
	function processSuccess(data) {
	    if (data.status === 'ok') {
			document.getElementById('feedback').style.color='green';
	        document.getElementById('feedback').innerHTML ='The entered GeoJSON was accepted.';
	        //Ga verder met het checken van de country name:
	        checkCountryname();
	    } else if (data.status === 'error') {
			document.getElementById('feedback').style.color='purple';
	        document.getElementById('feedback').innerHTML ='There was a problem with your GeoJSON: ' + data.message;
	    }
	}
	
	function processError() {
		document.getElementById('feedback').style.color='orange';
	    document.getElementById('feedback').innerHTML ='A problem occurred while validating the data at \'http://geoJSONlint.com/validate\'.';
	}
	
	// Stuur de data naar de datavalidatie server van geoJSONlint:
	$.ajax({
	    url: 'http://geojsonlint.com/validate',
	    type: 'POST',
	    data: JSONinput,
	    dataType: 'json',
	    success: processSuccess,
	    error: processError
	});
	
//===========================================================================================================================================	
// Check of de ingevoerde country naam voldoet aan de regular expression
// (Deze check is met gebruik van de automatisch gevulde dropdown list niet meer nodig, maar toch leuk om te bewaren):

	function checkCountryname() {
		var s = document.getElementById('country').value;
		//The regExpression check for 'country':
		// Start with a string consisting of regular or capital letters. Add (or don't add) a max of 10 words with an optional single space (' ') or dash ('-'). End with letters somehow still works (what the $ is for here)
		var regExpression = /^[a-zA-Z]+(([\s{1}|\-{1}]?[a-zA-Z])*){10}$/;
		
		// Indien de country name voldoet aan de regular expression:
		if (regExpression.test(s)){
			uploadData();		
		// Indien de country name niet voldoet aan de regular expression:
		} else {
			document.getElementById('feedback').style.color='red';
			document.getElementById('feedback').innerHTML ='Invalid country name.<br />Use only letters and an occasional space or dash (\'-\') please (and don\'t leave blank).';
		};
	}

//===========================================================================================================================================	
// De functie voor het uploaden van de data:

	function uploadData() {	
		// Maak van de in het textveld ingevoerde string een object 'GeoJSONdata':
		var GeoJSONdata = JSON.parse(document.getElementById("GeoJSONData").value);
		var countryValue = document.getElementById("country").value;
		
		// Vervang spaties door een 'streepje':
		countryValue = countryValue.replace(/\s+/g, '-');
		// Maak alles lowercase (kan geen kwaad):
		var country = countryValue.toLowerCase();
		
		// Maak een nieuw object 'nameproperty' aan en ken er de property 'name' met de waarde van 'country' aan toe:
		var nameproperty = {}; 
		nameproperty.name = country; 
		
		// Zet de {"name":"country"} in het op te sturen data object 'GeoJSONdata':
		GeoJSONdata.features[0].properties = nameproperty; 
		
		// Nu de invoer data (GeoJSONdata) klaar is (als object) doen we de upload:
		$.ajax({
			url: 'http://www.rogerkeizer.nl/service/api/country',
			// By setting the cache property to false jQuery will append a timestamp to the URL, so the browser won't cache it (as the URL is unique for every request):
			cache: false,
			// POST voor versturen:
			type: "POST",
			// 'dataType' is what you're expecting back from the server ('json' = JSON string)
			dataType: "json",
			// 'contentType' is the type of data you're sending ('application/json' = JSON string)
			contentType:"application/json; charset=utf-8",
			// De server wil een string, dus maak weer een string van het data object:
			data: JSON.stringify(GeoJSONdata), 
			
			// De server stuurt een bericht terug als de data in goede orde is ontvangen ('r' van response):
			success: function (r) {
				document.getElementById('feedback').style.color='blue';
				document.getElementById('feedback').innerHTML ='Bericht van de server:<br />' + r.Message;
			},
			
			// Als de server een error terug stuurt: The error function is passed three parameters:
			// 1. The HTTP request itself; 2. The HTTP error number (such as 404) and 3. The error text
			error: function (xhr, textStatus, errorThrown) {
				/* Voorbeeld:
				xhr = {
					"readyState":4,
					"responseText":"{\"Message\":\"Geen data\",\"Type\":\"ERROR\"}",
					"responseJSON":{"Message":"Geen data","Type":"ERROR"},
					"status":500,
					"statusText":"Internal Server Error"
				}
				textStatus = error
				errorThrown = Internal Server Error
				*/
				document.getElementById('feedback').style.color='brown';
				document.getElementById('feedback').innerHTML ='\'t zit zo: ' + JSON.parse(xhr.responseText).Type + ' (' + JSON.parse(xhr.responseText).Message +')';
			}
		}); // End ajax call
	}; // End uploadData()
}; // End submitData()



