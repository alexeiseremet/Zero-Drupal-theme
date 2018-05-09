/**
 * @file
 * Attach behaviors for the Collapse js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict';

  var activeClass = 'is-active';
  var showClass = 'is-open';

  Drupal.behaviors.collapseAccordion = {
    attach: function (context, settings) {
      var trigger = '[data-collapse="accordion"]';
      var $btn = $(trigger, context);
      var accordionWrap = '.js-accordion';
      var accordionItem = '.js-accordion-item';
      var $accordion = $(accordionWrap, context);
      var content = '.js-accordion-content';

      $accordion.once('accordion').each(function () {
        $btn.on('click', function (e) {
          e.preventDefault();

          var targetID = $(this).attr('href');
          var $thisClosest = $(this).closest(accordionWrap);
          var $thisParent = $(this).closest(accordionItem);

          // Reset active items.
          if (!$thisParent.hasClass(showClass)) {
            $thisClosest.find(accordionItem).removeClass(showClass);
            $thisClosest.find(content).slideUp('fast');
          }

          // Toggle active item.
          $thisParent.toggleClass(showClass);
          $thisParent.find(targetID).slideToggle('fast');
        });

        // Make active first item in accordion.
        $(trigger, $(this)).first().trigger('click');
      });
    }
  };

  Drupal.behaviors.collapseToggle = {
    attach: function (context, settings) {
      var trigger = '[data-collapse="toggle"]';

      $(trigger, context).once('toggle').on('click', function (e) {
        e.preventDefault();

        var targetID = $(this).attr('href');

        // Toggle item.
        $(targetID).toggleClass(showClass);
        $(this).parent().toggleClass(activeClass);
      });
    }
  };

}(jQuery));
