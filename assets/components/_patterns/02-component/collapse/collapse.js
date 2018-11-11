/**
 * @file
 * Attach behaviors for the Collapse js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict'

  const activeClass = 'is-active'

  Drupal.behaviors.collapseAccordion = {
    attach: function (context, settings) {
      const clickHandler = '[data-collapse="accordion"]'
      const accordionItem = '.js-accordion-item'

      $(document).once('accordion').on('click', clickHandler, function (e) {
        e.preventDefault()

        const $self = $(this)
        const $thisParent = $self.closest(accordionItem)
        const isActive = $thisParent.hasClass(activeClass)

        // Toggle active item.
        $thisParent.toggleClass(activeClass)
        $self.attr('aria-expanded', !isActive)
      })
    }
  }

  Drupal.behaviors.collapseToggle = {
    attach: function (context, settings) {
      const clickHandler = '[data-collapse="toggle"]'

      $(document).once('toggle').on('click', clickHandler, function (e) {
        e.preventDefault()

        const $self = $(this)
        const targetID = $self.attr('aria-controls')

        // Toggle item.
        $(targetID).toggleClass(activeClass)
        $self.parent().toggleClass(activeClass)
      })
    }
  }

}(jQuery))
