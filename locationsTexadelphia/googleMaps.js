function GoogleMap() {

        function getGoogleMaps() {

            var position = {lat: 28.3852377, lng: -81.5660627};
            var google_map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: position
            });

            return {
                map: google_map
            }

        }

        function addMarkers( map ) {

                var position = {lat: 28.3852377, lng: -81.5660627};

                var marker = new google.maps.Marker({
                    position: position,
                    map: map
                });

        }

        return {
            getGoogleMaps: getGoogleMaps,
            addMarkers: addMarkers
        };
}

