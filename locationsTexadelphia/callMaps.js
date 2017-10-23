function loadMapsScript() {
    var Google_Maps_API_Script = document.createElement('script');


    $.getJSON('locations.json', function (data) {

        // locations coordinates array
        var destinations = data.locations.map(function (current_location, index) {
            return current_location.coordinates;
        });

        Google_Maps_API_Script.onload = function () {

            var g_map = GoogleMap();

            // render map with markers
            g_map.addMarkers(g_map.getGoogleMaps(data).map, data);

            // render in order of distance to current postion
            getCurrentPosition(function (current_position) {

                g_map.getDistance(current_position, destinations, function (distance) {

                    var location_distance = distance.map(function (element, index) { // merging distance with locations array
                        data.locations[index].distance = element.distance.value;
                        data.locations[index].miles = element.distance.text;
                        return data.locations[index];
                    }).sort(function (a, b) {  // sorting locations array
                        return a.distance - b.distance;
                    });

                    Location.renderLocations(location_distance);

                })
            });

        };

        Location.renderLocations(data.locations);

        RunTemplate.loadTemplate(data);

    });

    Google_Maps_API_Script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZAdtCTX8ZlyU39tML3S_dOmmWWAh6cdk";

    document.head.appendChild(Google_Maps_API_Script);
}

loadMapsScript();








