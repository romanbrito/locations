<!--mustache script-->
    var RunTemplate = (function ($) {

        function loadTemplate(data, cb) {
            var template = $('#locationtpl').html();
            var html = Mustache.to_html(template, data);
            $('#locationInfo').html(html);

            cb();
        }

        return {
            tmplt: loadTemplate
        }
    })(jQuery); //function

