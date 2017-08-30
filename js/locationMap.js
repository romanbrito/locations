// get Json using plain javascript to avoid conflict with jquery
var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

function initMap() {

     var map = new google.maps.Map(document.getElementById('map'), {
     // center and zoom in bounds
    });

    // center to bounds
    var bounds = new google.maps.LatLngBounds();

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    // https://googlemaps.github.io/js-marker-clusterer/examples/advanced_example.html
    getJSON('../wp-content/themes/texsite/json/locations.json', function (err, data) {

        console.log(detectIE());
        if (detectIE() === false) {

            var markers = data.locations.map(function (location, i) {
                // center to bounds
                var loc = new google.maps.LatLng(location.coordinates);
                bounds.extend(loc);

                // adding markers
                return new google.maps.Marker({
                    position: location.coordinates,
                    //labels
                    label: location.label,
                });
            });

        } else {
        var markers = JSON.parse(data).locations.map(function (location, i) {
            // center to bounds
            var loc = new google.maps.LatLng(location.coordinates);
            bounds.extend(loc);

            // adding markers
            return new google.maps.Marker({
                position: location.coordinates,
                //labels
                label: location.label,
            });
        });
        }

        if (detectIE() === false) {
            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                {
                    gridSize: 15,
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                });

            // Add links to markers to open in google maps for directions
            var gMapsClick = data.locations.map(function (location, i) {
                return markers[i].addListener('click', function () {
                    window.open('https://www.google.com/maps/dir/?api=1&destination=' + location.coordinates.lat + ',' + location.coordinates.lng, '_blank');
                });
            });

        } else {
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {
                gridSize: 15,
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            });

        // Add links to markers to open in google maps for directions
        var gMapsClick = JSON.parse(data).locations.map(function (location, i) {
            return markers[i].addListener('click', function () {
                window.open('https://www.google.com/maps/dir/?api=1&destination=' + location.coordinates.lat + ',' + location.coordinates.lng, '_blank');
            });
        });
        }

        // center to bounds
        map.fitBounds(bounds);
        map.panToBounds(bounds);

    });


}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}