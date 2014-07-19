'use strict';

mapApp.controller('TodoCtrl', function ($scope) {
    'use strict';

    var $overlay = $('<div class="overlay"></div>');
    var $textarea = $('<textarea class="form-control" rows="3" placeholder="Add something to be done" id="styled"></textarea>');

    $overlay.append($textarea);

    $(".container").append($overlay);

    var toggleStatus = function () {

        if ($(this).hasClass('checked')) {
            $(this).removeClass('checked');
            $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-unchecked');
        } else {
            $(this).addClass('checked');
            $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-check');

        }
    }

    var showLightBox = function () {
        //Show the overlay
        $overlay.show();
        //Update the overlay with the text-box, save button and map 
    }

    var hideOverlay = function () {
        //$overlay.hide();
    }

    //Click the button
    $("#newTodo").on('click', showLightBox);

    $(".overlay").on('click', hideOverlay);

    $('.timeline-badge').on('click', toggleStatus);

});