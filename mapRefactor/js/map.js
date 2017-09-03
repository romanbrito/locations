function initMap() { // outer function from jsonp

    // https://developers.google.com/maps/documentation/javascript/examples/distance-matrix
    // https://developers.google.com/maps/documentation/javascript/reference

    var service = new google.maps.DistanceMatrixService;

    // getting json object to have data available
    $.getJSON('../json/locations.json', function (data) {

        console.log(data.locations);

        getPosition(function (position) { //getPosition callback
            var current_position = position;

            // var current_position = {
            //     "lat": 35.46395,
            //     "lng": -97.510094
            // };

            var locations_coordinates = data.locations.map(function (current_location, index) {
                return current_location.coordinates;
            });

            //console.log(locations_coordinates);

                getDistance(current_position, locations_coordinates, service, function (distance) { // getDistance callback

                    var location_distance = distance.map(function (element, index) {
                        data.locations[index].distance = element.distance.value;
                        return data.locations[index];
                    }).sort(function (a, b) {
                        return a.distance - b.distance;
                    });

                    console.log(location_distance);

                    SearchLocation.getData(location_distance); // rendering locations

                }); // end getDistance callback


            // setTimeout(function () {
            //     SearchLocation.getData(data.locations); // rendering locations
            // },500);




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
            destinations: destination,
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status === 'OK') {
                //console.log('distance matrix ' + JSON.stringify(response.rows[0].elements[0].distance.value));
                cb(response.rows[0].elements);
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
        return a.distance.value - b.distance.value;
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
