var googleMapMarkers = (function () {
    function googleMapMarkers(key, map) {
        this.bound = false;
        this.key = key;
        this.map = map;
        this.loadedPoints = [];
        this.loadedMarkers = [];
        this.markersData = [];
    }
    googleMapMarkers.prototype.setCenter = function (lat, lng) {
        var point = new google.maps.LatLng(lat, lng);
        this.map.setCenter(point);
    };
    googleMapMarkers.prototype.zoom = function (zoom) {
        this.map.setZoom(zoom);
    };
    googleMapMarkers.prototype.mapType = function (type) {
        this.map.setMapTypeId(type);
    };
    googleMapMarkers.prototype.addMarker = function (lat, lng, data, callback) {
        var point = new google.maps.LatLng(lat, lng);
        var image = {
            url: data.image,
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        };
        var marker = new google.maps.Marker({
            position: point,
            title: (data) ? data.title : "",
            map: this.map,
            data: data,
            icon: image
        });
        this.loadedPoints.push(point);
        this.loadedMarkers.push(marker);
        google.maps.event.addListener(marker, 'click', function (e) {
            if (callback) {
                callback(marker);
            }
        });
    };
    googleMapMarkers.prototype.addMarkers = function (markers) {
        var _this = this;
        this.markersData = markers;
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
    googleMapMarkers.prototype.clearMarkers = function () {
        this.loadedMarkers.forEach(function (marker, index) {
            marker.setMap(null);
        });
    };
    googleMapMarkers.prototype.near = function (lat, lng, radius) {
        var _this = this;
        this.clearMarkers();
        var lat = lat;
        var lng = lng;
        var R = 6371; // radius of earth in km
        var distances = [];
        var closest = -1;
        var thisCallback = this.markersData.callback;
        this.markersData.data.forEach(function (marker, index) {
            var mlat = marker.lat;
            var mlng = marker.lng;
            if (mlat != '' && mlng != '') {
                var dLat = _this.rad(mlat - lat);
                var dLong = _this.rad(mlng - lng);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(_this.rad(lat)) * Math.cos(_this.rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                distances[index] = d;
                if (Math.round(d) < (radius * 1.60934)) {
                    _this.addMarker(marker.lat, marker.lng, marker, thisCallback);
                }
            }
        });
    };
    googleMapMarkers.prototype.rad = function (x) {
        return x * Math.PI / 180;
    };
    return googleMapMarkers;
}());
//# sourceMappingURL=googleMapMarkers.js.map