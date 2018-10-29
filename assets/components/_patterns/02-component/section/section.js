/**
 * @file
 * Attach behaviors for the Section js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict'

  // Animate section.
  Drupal.behaviors.animate = {
    attach: function (context, settings) {
      const $animated = $('[data-animated]', context)

      if ($animated.length) {
        $animated.once('animated').each(function (i) {
          const $elem = $(this)
          setTimeout(function () {
            $elem.waypoint(function () {
              $elem.addClass($elem.data('animated'))
            }, {
              offset: '100%'
            })
          }, 250 * i)
        })
      }

    }
  }

}(jQuery))
