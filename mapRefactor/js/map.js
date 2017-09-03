function initMap() { // outer function from jsonp

    // https://developers.google.com/maps/documentation/javascript/examples/distance-matrix
    // https://developers.google.com/maps/documentation/javascript/reference

    var service = new google.maps.DistanceMatrixService;

    // getting json object to have data available
    $.getJSON('../json/locations.json', function (data) {

        getPosition(function (position) { //getPosition callback
            var current_position = position;

                        // changing each index of data.locations to distance

            var locations_array = data.locations.map(function (current_location, index) {

                    getDistance(current_position, current_location.coordinates, service, function (distance) { // getDistance callback
                        current_location.distance = distance;
                        locations_array[distance] = current_location;

                    }); // end getDistance callback

            }).filter(function (n) { // remove undefined
                return n != undefined
            });

            console.log(locations_array);

            setTimeout(function () {
                SearchLocation.getData(locations_array); // rendering locations
            },500);




            //
            // $.each(data.locations, function (key, val) {
            //
            //     getDistance(current_position, data.locations[key].coordinates, service, function (distance) { // getDistance callback
            //         data.locations[key].distance = distance;
            //         console.log(data.locations[key]);
            //         locations_array[distance] = data.locations[key];
            //
            //     }); // end getDistance callback
            //
            //     // Once finished adding the distance to each sort array
            //     if (key === (data.locations.length - 1)) {
            //         // var locations_array = [] = data.locations;
            //         // console.log(JSON.stringify(locations_array));
            //         console.log(data.locations[0].distance);
            //
            //         setTimeout(function () {
            //             console.log(locations_array);
            //         }, 200);
            //
            //         //console.log(locations_array);
            //     }
            //
            // }); // end each


            //SearchLocation.getData(data.locations); // rendering locations

        }); // end getPosition callback


    }); // end get json object

    // distance matrix

    function getDistance(origin, destination, service, cb) {
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status === 'OK') {
                //console.log('distance matrix ' + JSON.stringify(response.rows[0].elements[0].distance.text));
                cb(response.rows[0].elements[0].distance.value);
                // console.log('distance matrix ' + JSON.stringify(response));
            } else {
                alert('Geocode was not successful due to: ' + status);
            }
        });
    }


    // create google map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 30.395012, lng: -97.749017},
        zoom: 10
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

function getPosition(cb) {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            cb(pos); // callback function

            //console.log('current position ' + JSON.stringify(pos));

        }, function () {
            //handleLocationError(true, infoWindow, map.getCenter());
            console.log('error');
        });
    } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
        console.log('no geolocation');
    }
}

function sortLocations(array) {
    // sort by distance
    array.sort(function (a, b) {
        return a.distance - b.distance;
    });
}

// addPropAndSort receives data.locations, current_positio and returns an array
function addPropAndSort(locations, current_position, service, cb) {
    $.each(locations, function (key, val) {

        getDistance(current_position, data.locations[key].coordinates, service, function (distance) { // getDistance callback
            locations[key].distance = distance;
        }); // end getDistance callback

        if (key = locations.length - 1) {
            return locations
        }

    }); // end each
}
