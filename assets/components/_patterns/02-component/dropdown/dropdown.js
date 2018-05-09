/**
 * @file
 * Attach behaviors for the Dropdown js.
 */

/* jslint browser: true */
/* global jQuery, window, document, Modernizr, Drupal */

;(function ($) {
  'use strict';

  var dropdown = '.js-dropdown';
  var dropdown_active = '.is-show';
  var dropdown_active_class = 'is-show';
  var dropdown_on_hover_class = 'js-dropdown-on-hover';
  var btn = '.js-dropdown-button';
  var btn_active_class = 'is-hover';
  var menu_active_class = 'is-open';

  Drupal.behaviors.dropdown = {
    attach: function (context) {
      var $self = this;

      $(dropdown, context).once('dropdown').each(function () {
        var $parent = $(this);
        var $btn_children = $parent.children(btn);

        if (!Modernizr.touch && $parent.hasClass(dropdown_on_hover_class)) {
          // show dropdown on :hover
          $parent.hover(function () {
            $btn_children.trigger('click');
          }, function () {
            if ($btn_children.hasClass(btn_active_class)) {
              $btn_children.trigger('click');
            }
          });
        }

        $btn_children.on('click', function (e) {
          e.preventDefault();

          var $this = $(this);

          if ($this.hasClass(btn_active_class)) {
            // close this active dropdown
            var $ctx = $this.closest(dropdown);
            $self.resetAll($ctx);
          }
          else {
            // close all active dropdown
            if ($this.parents(dropdown_active).length === 0) {
              $self.resetAll();
            }

            // activate new dropdown
            $this.offsetParent().addClass(dropdown_active_class);

            $this.addClass(btn_active_class)
                .next()
                .addClass(menu_active_class)
                .find('input:first')
                .focus();
          }
        });

        // Close dropdown if click outside.
        $(document).once('clickOutsideDropdown').on('click touchstart', function (e) {
          if ($(e.target).closest(dropdown).length === 0) {
            Drupal.behaviors.dropdown.resetAll();
          }
        });
      });
    },

    resetAll: function ($ctx) {
      if ($ctx) {
        $ctx.removeClass(dropdown_active_class);
      }
      else {
        $ctx = $(document);
        $ctx.find(dropdown).removeClass(dropdown_active_class);
      }

      $ctx
          .find(btn)
          .removeClass(btn_active_class)
          .next()
          .removeClass(menu_active_class);
    }
  };

}(jQuery));
