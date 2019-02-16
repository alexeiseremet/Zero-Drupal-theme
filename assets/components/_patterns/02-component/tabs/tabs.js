/**
 * @file
 * Attach behaviors for the Tabs js.
 */

/* jslint browser: true */
/* global $, jQuery, Modernizr, Drupal, enquire */

;(function ($) {
  'use strict'

  const activeClass = 'is-active'

  Drupal.behaviors.tabsNav = {
    attach: function (context, settings) {
      const clickHandler = '[data-collapse="tab"]'

      $(document).once('tabsNav').on('click', clickHandler, function (e) {
        e.preventDefault()

        const $self = $(this)
        const targetID = $self.attr('aria-controls')

        // Set current nav item.
        $self.attr('aria-selected', true).addClass(activeClass)
          .siblings().attr('aria-selected', false).removeClass(activeClass)

        // Show current content item.
        $(targetID).removeAttr('hidden')
          .siblings().attr('hidden', true)
      })
    }
  }
}(jQuery))
