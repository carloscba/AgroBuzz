angular.module('mapApp', []).controller('mapCtrl', function($scope, $http) {
	
	$scope.estacion = {}

	$http({
		method: 'GET',
		url: './xmlDatosEstaciones'
	}).then(function successCallback(response) {
		
		var canvas = new google.maps.Map(document.getElementById('map-canvas'));
		var map = new googleMapMarkers("AIzaSyCvzWscengQ1ItOtYVWjldACDm7jBH3o7I", canvas);
		
		map.setCenter(-31.6507, -63.3158);
		map.zoom(7);
		

		var markers = {
			data: response.data,
			callback: function (m) {
				
				$scope.estacion = m.data; 
				map.setCenter(m.data.lat, m.data.lng);
				map.zoom(9);
				$scope.$apply();
			}
		};

		map.addMarkers(markers);
	});
});