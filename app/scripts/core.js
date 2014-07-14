'use strict';
$(function() {

    //config
    var imagesFolder = 'images/';//the path to images
    var duration = 500;//animation's duration in mileseconds
    var imageSize = '40%';//amount of image revealed on hover

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
            $(this).css('zIndex','2');
            if($(this).hasClass('last')){
                $(this).stop().animate({
                    width:imageSize,
                    left:String((($(this).position().left) - (($(this).position().left)*20)/100))+'px'
                },
                duration,
                'easeOutQuint'
                );
            }
            else {
                $(this).stop().animate({
                    width:imageSize,
                },
                duration,
                'easeOutQuint'
                );
            }
        },

        //out
        function(){
            $(this).css('zIndex','1');
            if($(this).hasClass('last')){
                $(this).stop().animate({
                    width:imageSize,
                    left: String(imageWidth * ($image.length-1)) + '%'
                },
                duration,
                'easeOutQuint'
                );
            }
            else {
                $(this).stop().animate({
                    width:imageSize,
                },
                duration,
                'easeOutQuint'
                );
            }
        }

    );

    // //animators
    // function animatorIn(images) {
    //     switch(animationType)
    //     {
    //         case 1:
    //             images.stop().animate({
    //                 width: imageSize},
    //                 duration,
    //                 'easeOutQuint');
    //             break;
    //         default:
    //             //nothing
    //     }
    // }
    // function animatorOut(){
    //     //nothing here yet;
    // }

    // $('.plus').css({opacity:0});

    // $('.viva-a-vida').mouseenter(function(){
    //     $(this).stop().animate({
    //         opacity:0
    //     }, 100, 'linear', function(){
    //         $(this).hide();
    //     });
    // });

    // $('.accordion').mouseleave(function(){
    //     $('.viva-a-vida').show();
    //     $('.viva-a-vida').stop().animate({
    //         opacity:1
    //     }, 100, 'linear');
    // });

    // var duration = 500;

    // $('.accordion-img').hover(
    //     function () {

    //         var className = $(this)[0].className;
    //         var $this = $(this);

    //         $this.css({zIndex:'2'});

    //         $this.stop().animate({
    //             width:'40%',
    //             opacity: 1
    //         }, duration, 'easeOutQuint');

    //         $('.plus', $(this)).stop().animate({
    //            opacity: 1
    //         }, 100, 'easeOutQuint');

    //         if(className === 'accordion-img last') {
    //             var positionLast = $this.position().left;
    //             var quinzePercent = ((positionLast*20)/100);

    //             $this.stop().animate({
    //                 left:String((positionLast - quinzePercent))+'px',
    //                 width:'40%',
    //                 opacity: 1
    //             }, duration, 'easeOutQuint');
    //         }

    //     },

    //     function () {

    //         var className = $(this)[0].className;
    //         var $this = $(this);

    //         $this.stop().animate({
    //             width:'25%',
    //             opacity: 0.2
    //         }, 100, 'linear', function () {
    //             $this.css({zIndex:'1'});
    //         });
    //         $('.plus', $(this)).stop().animate({
    //            opacity: 0
    //         }, 100, 'easeOutQuint');

    //         if(className === 'accordion-img last') {
    //             $this.css({zIndex:'1'});
    //             $this.stop().animate({
    //                 left:'75%',
    //                 width:'25%',
    //                 opacity: 0.4
    //             }, 100, 'linear');
    //         }
    //     }

    //     );
});
