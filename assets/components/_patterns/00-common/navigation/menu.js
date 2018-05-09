/**
 * @file
 * Attach behaviors for the Menu js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict';

  // Move Secondary menu items to Main menu and set visible-mobile class.
  Drupal.behaviors.secondaryMenu = {
    attach: function (context, settings) {
      $('.js-site-secondary-menu', context).once('secondaryMenu').each(function () {
        $(this).find('li').each(function () {
          var copyItem = $(this).clone().addClass('visible-mobile');
          $('.js-menu-main').append(copyItem);
        });
      });
    }
  };

}(jQuery));
