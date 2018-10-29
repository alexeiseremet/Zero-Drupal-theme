/**
 * @file
 * Attach behaviors for the Responsive Media js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal, objectFitImages */

;(function ($) {
  'use strict'

  objectFitImages('img', {watchMQ: true})

  function imgLazyLoad (img) {
    img.on('load', function () {
      img.addClass('is-loaded')
    }).each(function () {
      if (this.complete) {
        $(this).trigger('load')
      }
    })
  }

  Drupal.imgLazyLoad = imgLazyLoad

  Drupal.behaviors.lazyLoad = {
    attach: function (context, settings) {
      $('.js-img-placeholder', context).once('lazyLoad').each(function () {
        const $img = $(this).next('picture').find('img')

        Drupal.imgLazyLoad($img)
      })
    }
  }

}(jQuery))
