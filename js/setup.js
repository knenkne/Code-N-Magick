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

// Events
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var wizardSetup = setup.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');

setup.classList.remove('hidden');
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 || !setupUserName.focus) {
      setup.classList.add('hidden');
    }
  });
});

setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    setup.classList.remove('hidden');
  }
  if (evt.keyCode === 27 || !setupUserName.focus) {
    setup.classList.add('hidden');
  }
});

setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    setup.classList.add('hidden');
  }
});


var currentColor = WIZARD_PARAMS.coat[0];
wizardCoat.addEventListener('click', function () {
  if (currentColor === WIZARD_PARAMS.coat[0]) {
    wizardCoat.style.fill = WIZARD_PARAMS.coat[1];
  }
});
