/**
 * @file
 * Attach behaviors for the Carousel js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict';

  // Drupal Behaviors.
  Drupal.behaviors.Carousel = {
    attach: function (context, settings) {
      var $carousel = $('.js-carousel', context);
      // var classBtnPrev = '.js-carousel-btn-prev';
      // var classBtnNext = '.js-carousel-btn-next';

      var globalCarouselOptions = {
        adaptiveHeight: true,
        infinite: true,
        fade: true,
        touchThreshold: 10,
        swipe: true,
        swipeToSlide: true
      };

      $carousel.once('carousel').each(function () {
        var carouselOptions = $.extend({}, {
          dots: true
        }, globalCarouselOptions);

        // Init Slick.
        $(this).slick(carouselOptions);
      });
    }
  };

}(jQuery));
