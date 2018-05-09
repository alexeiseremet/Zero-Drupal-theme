/**
 * @file
 * Attach behaviors for the Messages js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal, Cookies */

;(function ($) {
  'use strict';

  // Remove status messages and set cookie.
  Drupal.behaviors.messages = {
    attach: function (context) {
      $('.js-messages', context).once('messages').each(function () {
        var $self = $(this);
        var $btn = $self.find('.js-messages-close');

        $btn.on('click', function () {
          $self.remove();

          if($self.hasClass('messages--cookiebar')) {
            Cookies.set('cookiebar', '1');
          }
        });
      });
    }
  };

}(jQuery));
