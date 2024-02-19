/* eslint-disable */
'use strict'

require('hof/frontend/themes/gov-uk/client-js');
const govuk = require('govuk-frontend');
const $ = require('jquery');
const accessibleAutocomplete = require('accessible-autocomplete');

$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});

$(document).ready(function () {
  if ($('#loader-container')) {
    $('.govuk-button').on('click', function () {
      $('#loader-container').addClass('spinner-loader');
      $('#report-submit').addClass('visuallyhidden');
    });
  }
});

govuk.initAll();
