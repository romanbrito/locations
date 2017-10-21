function GoogleMap() {

    function getGoogleMaps(data) {

        //map and bounds
        var google_map = new google.maps.Map(document.getElementById('map'));
        var bounds = new google.maps.LatLngBounds();

        //center and fit to bounds
        data.locations.map(function (location, i) {
            var loc = new google.maps.LatLng(location.coordinates);
            bounds.extend(loc);
            google_map.fitBounds(bounds);
            google_map.panToBounds(bounds);
        });

        return {
            map: google_map
        }

    }

    function addMarkers(map, data) {
        // Add markers
        var markers = data.locations.map(function (location, i) {

            // adding markers
            return new google.maps.Marker({
                position: location.coordinates,
                label: location.label,
                map: map
            });

        });

        // Add links to markers to open in google maps for directions
        var gMapsClick = data.locations.map(function (location, i) {
            return markers[i].addListener('click', function () {
                window.open('https://www.google.com/maps/dir/?api=1&destination=' + location.coordinates.lat + ',' + location.coordinates.lng, '_blank');
            });
        });

        // Add a marker clusterer to manage the markers.
        var MarkerClustererScript = document.createElement('script');
        MarkerClustererScript.onload = function () {

            var markerCluster = new MarkerClusterer(map, markers,
                {
                    gridSize: 15,
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });

        };
        MarkerClustererScript.src = "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
        document.head.appendChild(MarkerClustererScript);

    }

    return {
        getGoogleMaps: getGoogleMaps,
        addMarkers: addMarkers
    };
}

