function getCurrentPosition(cb) {
    // HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            cb(pos);

        }, function () {
            //Error
            console.log('geolocation error');
            var pos = null;

            cb(pos);
        });
    } else {
        console.log('The browser does not support geolocation');
        var pos = null;

        cb(pos);
    }
}
