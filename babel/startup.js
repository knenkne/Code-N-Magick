'use strict';

var fireballSize = 22;
var getFireballSpeed = function getFireballSpeed(left) {
  return left ? 5 : 2;
};
var wizardSpeed = 3;
var wizardWidth = 70;
var getWizardHeight = function getWizardHeight() {
  return 1.337 * wizardWidth;
};
var getWizardX = function getWizardX(width) {
  return (width - wizardWidth) / 2;
};
var getWizardY = function getWizardY(height) {
  return (height - getWizardHeight()) * 2 / 3;
};