var SearchLocation = (function () {

    function search_the_data(locations) {
        $('#search').keyup(function () {
            var searchField = $('#search').val();
            var myExp = new RegExp(searchField, "i");
            //$.getJSON('../json/locations.json', function (data) {
                var output = '<ul class="searchresults">';
                $.each(locations, function (key, val) {
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
            //}); //get JSON
        });
    }


    function get_the_data(locations) {
        //$.getJSON('../json/locations.json', function (data) {
            var output = '<ul class="searchresults">';
            $.each(locations, function (key, val) {

                output += get_output(val); // function


            });
            output += '</ul>';
            $('#update').html(output);
        //}); // get JSON
    }

    function get_output(val) {
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

    return {
        getData: get_the_data,
        searchData: search_the_data
    }

})();
