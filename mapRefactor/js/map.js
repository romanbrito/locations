function initMap() { // outer function from jsonp

    // https://developers.google.com/maps/documentation/javascript/examples/distance-matrix
    // https://developers.google.com/maps/documentation/javascript/reference

    // load menu svg event listener

    // support for touchscreens
    var eventsHandler;

    eventsHandler = {
        haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
        , init: function(options) {
            var instance = options.instance
                , initialScale = 1
                , pannedX = 0
                , pannedY = 0

            // Init Hammer
            // Listen only for pointer and touch events
            this.hammer = Hammer(options.svgElement, {
                inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
            })

            // Enable pinch
            this.hammer.get('pinch').set({enable: true})

            // Handle double tap
            this.hammer.on('doubletap', function(ev){
                instance.zoomIn()
            })

            // Handle pan
            this.hammer.on('panstart panmove', function(ev){
                // On pan start reset panned variables
                if (ev.type === 'panstart') {
                    pannedX = 0
                    pannedY = 0
                }

                // Pan only the difference
                instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
                pannedX = ev.deltaX
                pannedY = ev.deltaY
            })

            // Handle pinch
            this.hammer.on('pinchstart pinchmove', function(ev){
                // On pinch start remember initial zoom
                if (ev.type === 'pinchstart') {
                    initialScale = instance.getZoom()
                    instance.zoom(initialScale * ev.scale)
                }

                instance.zoom(initialScale * ev.scale)

            })

            // Prevent moving the page on some devices when panning over SVG
            options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
        }

        , destroy: function(){
            this.hammer.destroy()
        }
    }

    // end support for touch screens
    // without suport for touch follows
    var $menuSVG = $("[rel*='svg-']");
    console.log($menuSVG);

    $menuSVG.on('load', function (evt) {
        console.log('loaded');

        svgPanZoom('#' + $(evt.target).attr("id"), {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: 1,
            center: 1,
            customEventsHandler: eventsHandler
        });

    });
    // end load menu svg event listener

    var service = new google.maps.DistanceMatrixService;

    // getting json object to have data available
    $.getJSON('../json/locations.json', function (data) {



        getPosition(function (position) { //getPosition callback
            var current_position = position;

            // var current_position = {
            //     "lat": 35.46395,
            //     "lng": -97.510094
            // };

            var locations_coordinates = data.locations.map(function (current_location, index) {
                return current_location.coordinates;
            });

            getDistance(current_position, locations_coordinates, service, function (distance) { // getDistance callback

                var location_distance = distance.map(function (element, index) { // merging distance with locations array
                    data.locations[index].distance = element.distance.value;
                    return data.locations[index];
                }).sort(function (a, b) {  // sorting locations array
                    return a.distance - b.distance;
                });

                SearchLocation.getData(location_distance); // rendering locations
                SearchLocation.searchData(location_distance); // rendering location for search

            }); // end getDistance callback

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

} // end function initMap

// generate jsonp tag
var tag = document.createElement("script");
tag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBZAdtCTX8ZlyU39tML3S_dOmmWWAh6cdk&callback=initMap';

document.getElementsByTagName("body")[0].appendChild(tag);

// this functions gets the current position
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
