/**
 * @file
 * Attach behaviors for the Dropdown js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict'

  const dropdown = '.js-dropdown'
  const dropdown_active = '.is-show'
  const dropdown_active_class = 'is-show'
  const dropdown_on_hover_class = 'js-dropdown-on-hover'
  const btn = '.js-dropdown-button'
  const btn_active_class = 'is-hover'
  const menu_active_class = 'is-open'

  Drupal.behaviors.dropdown = {
    attach: function (context) {
      const $self = this

      $(dropdown, context).once('dropdown').each(function () {
        const $parent = $(this)
        const $btn_children = $parent.children(btn)

        if (!Modernizr.touch && $parent.hasClass(dropdown_on_hover_class)) {
          // show dropdown on :hover
          $parent.hover(function () {
            $btn_children.trigger('click')
          }, function () {
            if ($btn_children.hasClass(btn_active_class)) {
              $btn_children.trigger('click')
            }
          })
        }

        $btn_children.on('click', function (e) {
          e.preventDefault()

          const $this = $(this)

          if ($this.hasClass(btn_active_class)) {
            // close this active dropdown
            const $ctx = $this.closest(dropdown)
            $self.resetAll($ctx)
          }
          else {
            // close all active dropdown
            if ($this.parents(dropdown_active).length === 0) {
              $self.resetAll()
            }

            // activate new dropdown
            $this.offsetParent().addClass(dropdown_active_class)

            $this.addClass(btn_active_class)
              .next()
              .addClass(menu_active_class)
              .find('input:first')
              .focus()
          }
        })

        // Close dropdown if click outside.
        $(document).once('clickOutsideDropdown').on('click touchstart', function (e) {
          if ($(e.target).closest(dropdown).length === 0) {
            Drupal.behaviors.dropdown.resetAll()
          }
        })
      })
    },

    resetAll: function ($ctx) {
      if ($ctx) {
        $ctx.removeClass(dropdown_active_class)
      }
      else {
        $ctx = $(document)
        $ctx.find(dropdown).removeClass(dropdown_active_class)
      }

      $ctx
        .find(btn)
        .removeClass(btn_active_class)
        .next()
        .removeClass(menu_active_class)
    }
  }

}(jQuery))
