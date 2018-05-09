/**
 * @file
 * Attach behaviors for the Section js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict';

  // Animate section.
  Drupal.behaviors.animate = {
    attach: function (context, settings) {
      var $animated = $('[data-animated]', context);

      if($animated.length) {
        $animated.once('animated').each(function(i){
          var $elem = $(this);
          setTimeout(function(){
            $elem.waypoint(function () {
              $elem.addClass($elem.data('animated'));
            }, {
              offset: '100%'
            });
          }, 250 * i);
        });
      }

    }
  };

}(jQuery));
