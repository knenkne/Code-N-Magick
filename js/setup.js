'use strict';

var MAX_WIZARDS = 4;
var WIZARD_PARAMS =
  {
    name: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    surname: [
      'да Марья',
      'Верон',
      'Мирабелла', 'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ],
    coat: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    eyes: [
      'black',
      'red',
      'blue',
      'yellow',
      'green',
    ],
    fireball: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

document.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = getRandomElement(wizard.name) + ' ' + getRandomElement(wizard.surname);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandomElement(wizard.coat);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandomElement(wizard.eyes);
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < MAX_WIZARDS; i++) {
  fragment.appendChild(renderWizard(WIZARD_PARAMS));
}

similarListElement.appendChild(fragment);

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardSetup = setup.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');

var setupToggle = function () {
  setup.classList.toggle('hidden');
};

setupOpen.addEventListener('click', function () {
  setupToggle();
});

setupClose.addEventListener('click', function () {
  setupToggle();
});

wizardCoat.addEventListener('click', function () {
  for (var j = 0; j < WIZARD_PARAMS.coat.length; j++) {
    wizardCoat.style.fill = WIZARD_PARAMS.coat[j];
  }
});
