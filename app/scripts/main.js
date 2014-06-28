var map;
var defaultCenter = new google.maps.LatLng(-34.397, 150.644);
var iconBase = 'images/';
var msgMap= {};

function initializeMap() {
	var mapOptions = {
		zoom: 8,
		center: defaultCenter
	};
	map = new google.maps.Map($("#map-canvas")[0],
		mapOptions);

	matcha_loader_run();

	google.maps.event.addListener(map, 'click', function() {
		$(".sheep-message-open").css("visibility", "hidden");
		$(".sheep-default").css("visibility", "visible");
	});
}

function addMessageMarker(id_, lat, lng, message) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		icon: iconBase + 'message1.png'
	});
	msgMap[id_] = message;

	google.maps.event.addListener(marker, 'click', function() {
		marker.setIcon(iconBase + "message2.png");
		$(".sheep-default").css("visibility", "hidden");
		$(".sheep-message-deliver").css("visibility", "visible");
		setTimeout(function() {
			$(".sheep-message-deliver").css("visibility", "hidden");
			$(".sheep-message-open").css("visibility", "visible");
            $("#message-content").text(msgMap[id_]);
		}, 1000);

	});
}

google.maps.event.addDomListener(window, 'load', initializeMap);
