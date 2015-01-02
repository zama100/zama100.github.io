$(document).ready(function() {

    var currentPlayer = 2;
    var moveInProgress = false;
    var specialInProgress = false;
    var ballSpeed = 5000;
    var soccerball = $('.soccerball');
    var stands = $('.stands');
    var standUp = false;
    var annoucement = $('.annoucement');
    var crowd;

    function initialize () {
        moveCloud();
        centerCircle();
        crowd = setInterval(crowdCheer, 500);
    }
    
    function moveCloud() {
        $.each($('.cloud'), function(idx, element) {
            var windowWidth = $(window).width();
            var cloud = $(element);
            var randomLeft = 9;
            var randomTop = getRandomInt(0, 100);
            var speed = getRandomInt(15000, 50000);

            cloud.css('left', randomLeft + 'px');
            cloud.css('top', randomTop + 'px')
            cloud.animate({
                left: "+=" + (windowWidth-150) + "px"
            },speed,'linear', function(){
                moveCloud();
            });
        });
    }

    function centerCircle() {
        var circle = $('.circle');
        var center = ($(window).width() - 100) / 2;

        circle.css('left', center);
    }

    function attack (direction) {
        var goal = ($(window).width() - soccerball.width());

        if (direction == 'left') {
            soccerball.animate({
                left: "0px"
            },ballSpeed,'linear',finishedMove);
        } else {
            soccerball.animate({
                left: goal + "px"
            },ballSpeed,'linear',finishedMove);
        }
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function crowdCheer () {
        if(standUp) {
            stands.css('background-position-y', '2px');
            standUp = false;
        } else {
            stands.css('background-position-y', '0px');
            standUp = true;
        }
    }

    // Events
    $(window).on('load', initialize);
    $(window).on('resize', updateWindow);
    $(window).on('keypress', activateMove);
    $(window).on('keydown', activateSpecial);
    $(window).on('keyup', releaseSpecial);

    function resetGame (e) {
        clearInterval(crowd);
        moveInProgress = false;
        ballSpeed = 5000;
        soccerball.css('left', ($(window).width() / 2 - 100) + 'px');
    }

    function updateWindow (e) {
        centerCircle();
    }

    function finishedMove (e) {
        soccerball.find('img').attr('src', 'images/soccerball.png');
    }

    function activateMove(e) {
        switch(e.which) {
            case 119:
                $('#player-1').css('top', ($('#player-1').position().top - 10) + 'px');
                break;
            case 115:
                $('#player-1').css('top', ($('#player-1').position().top + 10) + 'px');
                break;
            case 56:
                $('#player-2').css('top', ($('#player-2').position().top - 10) + 'px');
                break;
            case 50:
                $('#player-2').css('top', ($('#player-2').position().top + 10) + 'px');
                break;
        }
    }

    function activateSpecial (e) {
        ballSpeed -= 1000;
        if(ballSpeed <= 0){
            soccerball.find('img').attr('src', 'images/soccerball-fire.png');
        }
    }

    function releaseSpecial (e) {
        if (currentPlayer == 1){
            switch(e.which) {
                case 32:
                    attack('right');
                    resetGame();
                    break;
            }
            currentPlayer = 2;
        } else {
            switch(e.which) {
                case 13:
                    attack('left');
                    resetGame();
                    break;
            }
            currentPlayer = 1;
        }

    }
    
});