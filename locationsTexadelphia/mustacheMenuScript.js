<!--mustache script-->
var RunTemplate = (function ($) {

    function loadTemplate(data) {
        var template = $('#locationtpl').html();
        var html = Mustache.to_html(template, data);
        $('#locationInfo').html(html);
    }

    return {
        tmplt: loadTemplate
    }
})(jQuery); //function

