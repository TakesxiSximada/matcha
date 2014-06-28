var map;

function initializeMap() {
	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(-34.397, 150.644)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

    matcha_loader_run();
}

google.maps.event.addDomListener(window, 'load', initializeMap);
