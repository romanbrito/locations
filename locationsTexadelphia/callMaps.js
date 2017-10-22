function loadMapsScript() {
    var Google_Maps_API_Script = document.createElement('script');

    Google_Maps_API_Script.onload = function () {

        $.getJSON('locations.json', function (data) {

            var o = GoogleMap();
            o.addMarkers(o.getGoogleMaps(data).map, data);

            Location.renderLocations(data.locations);

        });

    };

    Google_Maps_API_Script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZAdtCTX8ZlyU39tML3S_dOmmWWAh6cdk";

    document.head.appendChild(Google_Maps_API_Script);
}

loadMapsScript();






