get_the_data(); // load info
search_the_data(); // search data
getDistance({lat: 30.395012, lng: -97.749017}, {lat: 30.474465, lng: -97.801183});
getDistance({lat: 30.395012, lng: -97.749017}, {lat: 32.909483,lng: -96.959442});
getPosition();

function getPosition() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log('current position ' + JSON.stringify(pos));

            return pos

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

function getDistance( origin, destination) {
EVT.on("google-service", function (service) {
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status === 'OK') {
            console.log('distance matrix ' + JSON.stringify(response.rows[0].elements[0].distance.text));
            // console.log('distance matrix ' + JSON.stringify(response));
        } else {
            alert('Geocode was not successful due to: ' + status);
        }
    });
})
}

function search_the_data() {
    $('#search').keyup(function () {
        var searchField = $('#search').val();
        var myExp = new RegExp(searchField, "i");
        $.getJSON('../json/locations.json', function (data) {
            var output = '<ul class="searchresults">';
            $.each(data.locations, function (key, val) {
                if ((val.name.search(myExp) != -1) ||
                    (val.address.search(myExp) != -1) ||
                    (val.zip.search(myExp) != -1) ||
                    (val.state.search(myExp) != -1) ||
                    (val.city.search(myExp) != -1)) {

                    output += get_output(val); // function
                }
            });
            output += '</ul>';
            $('#update').html(output);
        }); //get JSON
    });
}


function get_the_data() {
    $.getJSON('../json/locations.json', function (data) {
        var output = '<ul class="searchresults">';
        $.each(data.locations, function (key, val) {

            output += get_output(val); // function


        });
        output += '</ul>';
        $('#update').html(output);
    }); // get JSON
}

function get_output( val ) {
    var output = '';

    output += '<li>';
    output += '<div class="row main-location">';

    output += '<div class="location-info col-lg-6">';
    output += '<h4>' + val.name + '</h4>';
    output += '<p>' + val.address + '</p>';
    output += '<p>' + val.city + ', ';
    output += val.state + ' ';
    output += val.zip + '</p>';
    output += '<a href="tel:' + val.phone + '">' + 'T. ' + val.phone + '</a>';
    output += '<p>' + val.hours1 + '</p>';
    output += '<p>' + val.hours2 + '</p>';
    output += '<p>' + val.hours3 + '</p>';
    output += '</div>';

    output += '<div class="location-buttons col-lg-6">';
    output += '<div class="row">';
    output += '<a class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-6" role="button" data-toggle="modal" data-target="' + '#' + val.label + 'menuModal"> Menu</a>';
    output += '<a class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-6" role="button" data-toggle="modal" data-target="' + '#' + val.label + 'catModal"> Catering Menu</a>';
    output += '</div>';
    output += '<div class="row">';
    output += '<a class="btn btn-danger" href="https://www.google.com/maps/dir/?api=1&destination=' + val.coordinates.lat + ',' + val.coordinates.lng + '" target="_blank" role="button"> Directions</a>';
    output += '</div>';
    output += '</div>';

    output += '</div>';
    output += '</li>';

    return output;
}
