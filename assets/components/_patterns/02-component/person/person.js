/**
 * @file
 * Attach behaviors for the Person js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict'

  // Drupal Behaviors.
  Drupal.behaviors.personPopup = {
    attach: function (context, settings) {
      $('.js-person-popup', context).once('personPopup').each(function () {
        $(this).on('click', function (e) {
          e.preventDefault()

          const $popup = $(this).closest('.js-person')

          $.magnificPopup.open({
            items: {
              src: $popup.clone().addClass('person--large'),
              type: 'inline',
              fixedContentPos: 'true',
              midClick: true  // Allow opening popup on middle mouse click.
            },

            callbacks: {
              beforeOpen: function () {
                if (Modernizr.touch) {
                  $('html').addClass('mfp-helper')
                }
              },
              open: function () {
                const $btn = $popup.find('.mfp-close')
                $popup.parent().append($btn)
              },
              afterClose: function () {
                if (Modernizr.touch) {
                  $('html').removeClass('mfp-helper')
                }
              }
            }
          })
        })
      })
    }
  }

}(jQuery))
