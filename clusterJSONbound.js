function initMap() {

    // var pos = {};
    //
    // navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log("lat", position.coords.latitude);
    //     console.log("lng", position.coords.longitude);
    //
    //     pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     };

    var map = new google.maps.Map(document.getElementById('map'), {
        //zoom: 11,
        //center: {lat: 30.3947961, lng: -97.7490322}
        //center: pos
    });

    // center to bounds
    var bounds = new google.maps.LatLngBounds();

    // Create an array of alphabetical characters used to label the markers.
    //var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    $.getJSON('locations.json', function (data) {

        var markers = data.locations.map(function (location, i) {
            // center to bounds
            var loc = new google.maps.LatLng(location.coordinates);
            bounds.extend(loc);

            return new google.maps.Marker({
                position: location.coordinates,
                //label: labels[i % labels.length]
                label: location.label,
            });
        });
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        // Add links to markers to open in google maps
        var gMapsClick = data.locations.map(function (location, i) {
            return markers[i].addListener('click', function () {
                window.open('https://www.google.com/maps/dir/?api=1&destination=' + location.coordinates.lat + ',' + location.coordinates.lng, '_blank');

                //window.location.href = 'https://www.google.com/maps/search/?api=1&place=Texadelphia&query=' + location.lat + ',' + location.lng;
                //window.location.href = 'https://www.google.com/maps/search/?api=1&query_place_id=ChIJOyLf3YPMRIYRPnExMnxcU04'
            })
        });
        // center to bounds
        map.fitBounds(bounds);
        map.panToBounds(bounds);

        // var infoWindow = new google.maps.InfoWindow;
        // infoWindow.setPosition(pos);
        // infoWindow.setContent('Your Location');
        // infoWindow.open(map);

    });

    //});
}
