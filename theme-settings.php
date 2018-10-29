<?php

/**
 * @file
 * Contains the theme's settings form.
 */


/**
 * Implements hook_form_FORM_ID_alter().
 */
function zero_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {
  if (isset($form_id)) {
    return;
  }

  $form['cookiebar'] = [
    '#type' => 'details',
    '#title' => t('Cookie compliance'),
    '#tree' => TRUE,
    '#open' => TRUE,
  ];

  $form['cookiebar']['message'] = [
    '#type' => 'text_format',
    '#title' => t('Message'),
    '#default_value' => theme_get_setting('cookiebar.message.value'),
    '#format' => filter_default_format(),
  ];
}
