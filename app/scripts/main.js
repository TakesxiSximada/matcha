var map;
var defaultCenter = new google.maps.LatLng(-34.397, 150.644);
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var msgMap= {};
var msgId = 0;

function initializeMap() {
	var mapOptions = {
		zoom: 8,
		center: defaultCenter
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

    matcha_loader_run();
	// addMessageMarker(1, -34.397, 150.644); // TODO this will be called upon server call, not here
}

function addMessageMarker(id_, lat, lng, message) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		icon: iconBase + 'schools_maps.png'
	});
	msgMap[id_] = message;
}

google.maps.event.addDomListener(window, 'load', initializeMap);
