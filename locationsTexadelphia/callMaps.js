function loadMapsScript() {
    var script = document.createElement('script');

    script.onload = function () {
        var o = GoogleMap();
        o.addMarkers(o.getGoogleMaps().map);
    };
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZAdtCTX8ZlyU39tML3S_dOmmWWAh6cdk";

    document.head.appendChild(script);
}

loadMapsScript();
