var googleMapMarkers = (function () {
    function googleMapMarkers(key, map) {
        this.bound = false;
        this.key = key;
        this.map = map;
        this.loadedPoints = [];
    }
    googleMapMarkers.prototype.setCenter = function (lat, lng) {
        var point = new google.maps.LatLng(lat, lng);
        this.map.setCenter(point);
    };
    googleMapMarkers.prototype.zoom = function (zoom) {
        this.map.setZoom(zoom);
    };
    googleMapMarkers.prototype.addMarker = function (lat, lng, data, callback) {
        var point = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: point,
            title: (data) ? data.title : "",
            map: this.map,
            data: data
        });
        this.loadedPoints.push(point);
        google.maps.event.addListener(marker, 'click', function (e) {
            if (data) {
                callback(marker);
            }
        });
    };
    googleMapMarkers.prototype.addMarkers = function (markers) {
        var _this = this;
        markers.data.forEach(function (marker, index) {
            _this.addMarker(marker.lat, marker.lng, marker, markers.callback);
        });
        if (this.bound) {
            this.setBound();
        }
    };
    googleMapMarkers.prototype.setBound = function () {
        var bounds = new google.maps.LatLngBounds();
        this.loadedPoints.forEach(function (point, index) {
            bounds.extend(point);
        });
        this.map.fitBounds(bounds);
    };
    return googleMapMarkers;
}());
//# sourceMappingURL=googleMapMarkers.js.map