/**
 * @file
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict'

  $(document).ready(function () {
    $('a[href="#nolink"], a[href="#"]').on('click', function (e) {
      e.preventDefault()
    })

    // Fix header on document ready.
    const $header = $('.js-header')
    const user_logged_in = $('body').hasClass('user-logged-in')

    function fixedHeader () {
      const height = $header.outerHeight()

      $header.addClass('is-fixed')
      $('body').css({paddingTop: height})
    }

    if ($header.length && !user_logged_in) {
      fixedHeader()

      $(window).on('resize', function () {
        fixedHeader()
      })
    }
  })

}(jQuery))
