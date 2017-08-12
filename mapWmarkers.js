function initMap() {

    var pos = {};

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log("lat", position.coords.latitude);
        console.log("lng", position.coords.longitude);

        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            //center: {lat: 30.3947961, lng: -97.7490322}
            center: pos
        });

        // Create an array of alphabetical characters used to label the markers.
        //var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location.coordinates,
                //label: labels[i % labels.length]
                label: location.label,
            });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        // Add links to markers to open in google maps
        var gMapsClick = locations.map(function (location, i) {
            return markers[i].addListener('click', function () {
                console.log(location.locationURL);
                //window.location.href = location.locationURL();
                window.open(location.locationURL(),'_blank');

                //window.location.href = 'https://www.google.com/maps/search/?api=1&place=Texadelphia&query=' + location.lat + ',' + location.lng;
                //window.location.href = 'https://www.google.com/maps/search/?api=1&query_place_id=ChIJOyLf3YPMRIYRPnExMnxcU04'
            })
        });

        var infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(pos);
        infoWindow.setContent('Your Location');
        infoWindow.open(map);

    });
}
var locations = [
    {
        name: 'Texadelphia Great Hills',
        address: '9828 Great Hills Trail #140',
        city: 'Austin',
        state: 'TX',
        zip: '78759',
        phone: '512-338-1338',
        hours1: 'Mon-Sat 11am - 9pm',
        hours2: 'Sun 11am - 6pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'GH',
        coordinates: {lat: 30.395012, lng:  -97.749017},
        houseMenuUrl: '',
        cateringMenuUrl: '', // great hills
    },
    {
        name: 'Texadelphia Lakeline',
        address: '14010 US-183 #500',
        city: 'Austin',
        state: 'TX',
        zip: '78717',
        phone: '512-249-0249',
        hours1: 'Mon-Thur 11am - 8pm',
        hours2: 'Fri-Sat 11am - 9pm',
        hours3: 'Sun 11am - 7pm',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'LL',
        coordinates: {lat: 30.474465, lng: -97.801183},
        houseMenuUrl: '',
        cateringMenuUrl: '',// lake line
    },
    {
        name: 'Texadelphia Sunset Valley',
        address: '5400 Brodie Ln #230',
        city: 'Sunset Valley',
        state: 'TX',
        zip: '78745',
        phone: '512-891-6464',
        hours1: 'Mon-Sat 11am - 9pm',
        hours2: 'Sun 11am - 6pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'SS',
        coordinates: {lat: 30.228924, lng: -97.822714},
        houseMenuUrl: '',
        cateringMenuUrl: '',// sunset valley
    },
    {
        name: 'Texadelphia Frisco-Warren Pkwy',
        address: '6801 Warren Pkwy #125',
        city: 'Frisco',
        state: 'TX',
        zip: '75034',
        phone: '214-619-1590',
        hours1: 'Mon-Sat 11am - 9pm',
        hours2: 'Sun 11am - 7pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'FR',
        coordinates: {lat: 33.106217, lng: -96.824965},
        houseMenuUrl: '',
        cateringMenuUrl: '',// frisco
    },
    {
        name: 'Texadelphia Las Colinas',
        address: '7601 N MacArthur Blvd # 105',
        city: 'Irving',
        state: 'TX',
        zip: '75063',
        phone: '972-432-0725',
        hours1: 'Mon-Sun 11am - 9pm',
        hours2: '',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'CO',
        coordinates: {lat: 32.909483, lng: -96.959442},
        houseMenuUrl: '',
        cateringMenuUrl: '',// las colinas
    },
    {
        name: 'Texadelphia Old Town',
        address: '5500 Greenville Ave #600',
        city: 'Dallas',
        state: 'TX',
        zip: '75206',
        phone: '214-265-8044',
        hours1: 'Sun-Wed 11am - 9pm',
        hours2: 'Thur-Sat 11am - 10pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'OT',
        coordinates: {lat: 32.853438, lng: -96.768555},
        houseMenuUrl: '',
        cateringMenuUrl: '',// old town
    },
    {
        name: 'Texadelphia Plano',
        address: '5813 Preston Rd #574',
        city: 'Plano',
        state: 'TX',
        zip: '75093',
        phone: '972-781-1616',
        hours1: 'Mon-Sat 11am - 9pm',
        hours2: 'Sun 11am - 7pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'PL',
        coordinates: {lat: 33.053774, lng: -96.796717},
        houseMenuUrl: '',
        cateringMenuUrl: '',// plano,
    },
    {
        name: 'Texadelphia Richardson',
        address: '100 S Central Expy #44',
        city: 'Richardson',
        state: 'TX',
        zip: '75080',
        phone: '214-484-9363',
        hours1: 'Mon-Sun 10:30am - 10pm',
        hours2: '',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'RI',
        coordinates: {lat: 32.949224, lng: -96.736778},
        houseMenuUrl: '',
        cateringMenuUrl: '',// richardson
    },
    {
        name: 'Texadelphia Arlington',
        address: '445 Spaniolo Dr',
        city: 'Arlington',
        state: 'TX',
        zip: '76019',
        phone: '817-460-0808',
        hours1: 'Mon-Sun 11am - 10pm',
        hours2: '',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'UTA',
        coordinates: {lat: 32.732301, lng:  -97.108553},
        houseMenuUrl: '',
        cateringMenuUrl: '',// uta
    },
    {
        name: 'Texadelphia OKC',
        address: '200 S Oklahoma Ave #110',
        city: 'Oklahoma City',
        state: 'OK',
        zip: '73104',
        phone: '405-208-4000',
        hours1: 'Sun-Thur 10:30am - 10pm',
        hours2: 'Fri-Sat 10:30am - 11pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'BR',
        coordinates: {lat: 35.463950, lng: -97.510094},
        houseMenuUrl: '',
        cateringMenuUrl: '',// bricktown
    },
    {
        name: 'Texadelphia Laredo',
        address: '1408 E Del Mar Blvd #4B',
        city: 'Laredo',
        state: 'TX',
        zip: '78041',
        phone: '956-753-3311',
        hours1: 'Sun-Wed 11am - 9pm',
        hours2: 'Thur-Sat 11am - 10pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'LR',
        coordinates: {lat: 27.575264, lng: -99.471407},
        houseMenuUrl: '',
        cateringMenuUrl: '',// laredo
    },
    {
        name: 'Texadelphia McAllen',
        address: '1400 E Expy 83 #160',
        city: 'McAllen',
        state: 'TX',
        zip: '78503',
        phone: '956-627-6714',
        hours1: 'Sun-Thur 11am - 9pm',
        hours2: 'Fri-Sat 11am - 10pm',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'MC',
        coordinates: {lat: 26.194533, lng: -98.205324},
        houseMenuUrl: '',
        cateringMenuUrl: '',// mcallen
    },
    {
        name: 'Texadelphia Houston-Westheimer',
        address: '8383 WESTHEIMER RD',
        city: 'Houston',
        state: 'TX',
        zip: '77063',
        phone: '',
        hours1: '',
        hours2: '',
        hours3: '',
        place_id: '',
        locationURL: function () {
            return 'https://www.google.com/maps/dir/?api=1&destination='+ this.coordinates.lat + ',' + this.coordinates.lng;
        },
        label: 'WE',
        coordinates: {lat: 29.7368233, lng: -95.513883},
        houseMenuUrl: '',
        cateringMenuUrl: '',// westheimer
    },
];
