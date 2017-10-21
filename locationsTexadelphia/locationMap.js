function initMap() {
    var $ = jQuery;
    var service = new google.maps.DistanceMatrixService;

    // getting json object to have data available
    $.getJSON('../wp-content/themes/texsite/json/locations.json', function (data) {

        console.log(data.locations);

        <!--mustache script-->
        RunTemplate.tmplt(data, function () {

            // cycle for multipage svg
            $('.item:first-child').addClass("active");

            // load menu svg event listener

            // support for touchscreens
            var eventsHandler;

            eventsHandler = {
                haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
                , init: function (options) {
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
                    this.hammer.on('doubletap', function (ev) {
                        instance.zoomIn()
                    })

                    // Handle pan
                    this.hammer.on('panstart panmove', function (ev) {
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
                    this.hammer.on('pinchstart pinchmove', function (ev) {
                        // On pinch start remember initial zoom
                        if (ev.type === 'pinchstart') {
                            initialScale = instance.getZoom()
                            instance.zoom(initialScale * ev.scale)
                        }

                        instance.zoom(initialScale * ev.scale)

                    })

                    // Prevent moving the page on some devices when panning over SVG
                    options.svgElement.addEventListener('touchmove', function (e) {
                        e.preventDefault();
                    });
                }

                , destroy: function () {
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
        });

        getPosition(data.locations, function (position) { //getPosition callback
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
                    data.locations[index].miles = element.distance.text;
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

    // this functions gets the current position, needs https
    function getPosition(error_locations, cb) {
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
                SearchLocation.getData(error_locations); // rendering locations
                SearchLocation.searchData(error_locations); // rendering location for search
            });
        } else {
            // Browser doesn't support Geolocation
            //handleLocationError(false, infoWindow, map.getCenter());
            console.log('no geolocation');
            SearchLocation.getData(error_locations); // rendering locations
            SearchLocation.searchData(error_locations); // rendering location for search
        }
    }

    // same postion but for testing without https
    // function getPosition(cb) {
    //     // Try HTML5 geolocation.
    //     var pos = {
    //         "lat": 35.46395,
    //         "lng": -97.510094
    //     };
    //     cb(pos); // callback function
    // }


/////////
    $.getJSON('../wp-content/themes/texsite/json/locations.json', function (data) {

        console.log(detectIE());
        //if (detectIE() === false) {

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

        // } else {
        //     var markers = JSON.parse(data).locations.map(function (location, i) {
        //         // center to bounds
        //         var loc = new google.maps.LatLng(location.coordinates);
        //         bounds.extend(loc);
        //
        //         // adding markers
        //         return new google.maps.Marker({
        //             position: location.coordinates,
        //             //labels
        //             label: location.label,
        //         });
        //     });
        // }

        // if (detectIE() === false) {
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

        // } else {
        //     // Add a marker clusterer to manage the markers.
        //     var markerCluster = new MarkerClusterer(map, markers,
        //         {
        //             gridSize: 15,
        //             imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        //         });
        //
        //     // Add links to markers to open in google maps for directions
        //     var gMapsClick = JSON.parse(data).locations.map(function (location, i) {
        //         return markers[i].addListener('click', function () {
        //             window.open('https://www.google.com/maps/dir/?api=1&destination=' + location.coordinates.lat + ',' + location.coordinates.lng, '_blank');
        //         });
        //     });
        // }

        // center to bounds
        map.fitBounds(bounds);
        map.panToBounds(bounds);

    });

    //map and bounds
    var map = new google.maps.Map(document.getElementById('map'), {
        // center and zoom in bounds
    });

    // center to bounds
    var bounds = new google.maps.LatLngBounds();

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