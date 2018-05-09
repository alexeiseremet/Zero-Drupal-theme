/**
 * @file
 * Attach behaviors for the Text Block js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict';

  var target_elem = '.js-mfp-video';

  Drupal.behaviors.videoPopup = {
    attach: function (context) {
      $(target_elem, context).once('videoPopup').each(function () {
        $(this).magnificPopup({
          type: 'iframe',
          fixedContentPos: 'true',
          midClick: true,  // Allow opening popup on middle mouse click.
          mainClass: 'magnific-popup',

          iframe: {
            patterns: {
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1'
              }
            }
          },

          callbacks: {
            beforeOpen: function () {
              if (Modernizr.touch) {
                $('html').addClass('mfp-helper');
              }
            },
            afterClose: function () {
              if (Modernizr.touch) {
                $('html').removeClass('mfp-helper');
              }
            }
          }
        });
      });
    }
  };

}(jQuery));
