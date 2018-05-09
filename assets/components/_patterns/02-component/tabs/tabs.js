/**
 * @file
 * Attach behaviors for the Tabs js.
 */

/* jslint browser: true */
/* global $, jQuery, Modernizr, Drupal, enquire */

;(function ($) {
  'use strict';

  var activeClass = 'is-active';

  Drupal.behaviors.tabsNav = {
    attach: function (context, settings) {
      var trigger = '[data-collapse="tab"]';

      $('.js-tabs', context).once('tabsNav').each(function () {
        var $btn = $(trigger, $(this));

        $btn.on('click', function (e) {
          e.preventDefault();

          var $this = $(this);
          var targetID = $this.attr('href');
          var $thisParent = $this.parent();

          if (!$thisParent.hasClass(activeClass)) {
            // Reset active nav items.
            $thisParent.siblings().removeClass(activeClass);
            // Activate current nav item.
            $thisParent.addClass(activeClass);
          }

          // Reset active content items.
          $(targetID).siblings().hide();
          // Show current content item.
          $(targetID).show();
        });

        // Make active first item in tabs.
        $btn.first().trigger('click');
      });
    }
  };

}(jQuery));
