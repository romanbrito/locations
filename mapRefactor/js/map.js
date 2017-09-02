var EVT = new EventEmitter2(); // now can be used in multiple places,
// doesn't need to be inside document.ready

function initMap() {
    // https://developers.google.com/maps/documentation/javascript/examples/distance-matrix
    // https://developers.google.com/maps/documentation/javascript/reference

    // create google map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 30.395012, lng: -97.749017},
        zoom: 10
    });

    // distance matrix
    var service = new google.maps.DistanceMatrixService;

    EVT.emit("google-service", service);

    service.getDistanceMatrix({
        origins: [{lat: 30.395012, lng: -97.749017}],
        destinations: [{lat: 30.474465, lng: -97.801183}],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status === 'OK') {
            // console.log('distance matrix ' + JSON.stringify(response.rows[0].elements[0].distance.text));
            // console.log('distance matrix ' + JSON.stringify(response));
        } else {
            alert('Geocode was not successful due to: ' + status);
        }
    });

    // markers
    var markersArray = [];
    markersArray.push(new google.maps.Marker({
        map: map,
        position: {lat: 30.395012, lng: -97.749017}
    }));
    markersArray.push(new google.maps.Marker({
        map: map,
        position: {"lat": 33.106217, "lng": -96.824965}
    }));

    // bounds
    var bounds = new google.maps.LatLngBounds;
    map.fitBounds(bounds.extend({"lat": 30.395012, "lng": -97.749017}));
    map.fitBounds(bounds.extend({"lat": 30.474465, "lng": -97.801183}));
    map.fitBounds(bounds.extend({"lat": 33.106217, "lng": -96.824965}));

} // end function init

// generate jsonp tag
var tag = document.createElement("script");
tag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZAdtCTX8ZlyU39tML3S_dOmmWWAh6cdk&callback=initMap';

document.getElementsByTagName("body")[0].appendChild(tag);


