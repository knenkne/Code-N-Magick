'use strict';
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла', 'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var random = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var wizards = [
  {
    name: random(WIZARD_NAMES),
    surname: random(WIZARD_SURNAMES),
    coat: random(COAT_COLORS),
    eyes: random(EYES_COLORS)
  },
  {
    name: random(WIZARD_NAMES),
    surname: random(WIZARD_SURNAMES),
    coat: random(COAT_COLORS),
    eyes: random(EYES_COLORS)
  },
  {
    name: random(WIZARD_NAMES),
    surname: random(WIZARD_SURNAMES),
    coat: random(COAT_COLORS),
    eyes: random(EYES_COLORS)
  },
  {
    name: random(WIZARD_NAMES),
    surname: random(WIZARD_SURNAMES),
    coat: random(COAT_COLORS),
    eyes: random(EYES_COLORS)
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
