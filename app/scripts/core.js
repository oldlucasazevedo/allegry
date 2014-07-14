'use strict';
$(function() {

    //config
    var imagesFolder = 'images/';//the path to images
    var duration = 500;//animation's duration in mileseconds
    var imageSize = '40%';//amount of image revealed on hover
    var initialOpacity = .4;

    //variables
    var $image = $('.image');

    //calculate imageWidth relative to number of images
    var imageWidth = (100/$image.length);

    //don't touch it
    var leftOffset = -imageWidth;

    //setting up background images
    $image.each(function(){
        var imagePath = imagesFolder + $(this).data('image');
        $(this).css({
            width: String(imageWidth) + '%',
            backgroundImage:'url('+imagePath+')',
            left: String(leftOffset + imageWidth) + '%'
        });

        leftOffset = leftOffset + imageWidth;
    });

    //add class to last image
    $image.last().addClass('last');

    //hover effects
    $image.hover(

        //hover
        function(){
            $(this).css('zIndex','1');
            if($(this).hasClass('last')){
                $(this).stop().animate({
                    opacity:1,
                    width:imageSize,
                    left:String((($(this).position().left) - (($(this).position().left)*20)/100))+'px'
                },
                duration,
                'easeOutQuint'
                );
            }
            else {
                $(this).stop().animate({
                    opacity:1,
                    width:imageSize,
                },
                duration,
                'easeOutQuint'
                );
            }
        },

        //out
        function(){
            $(this).css('zIndex','0');
            if($(this).hasClass('last')){
                $(this).stop().animate({
                    opacity:initialOpacity,
                    width:String(imageWidth) + '%',
                    left: String(imageWidth * ($image.length-1)) + '%'
                },
                duration,
                'easeOutQuint'
                );
            }
            else {
                $(this).stop().animate({
                    opacity:initialOpacity,
                    width:String(imageWidth) + '%',
                },
                duration,
                'easeOutQuint'
                );
            }
        }

    );
});
