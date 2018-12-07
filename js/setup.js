'use strict';

(function () {
  var SETUP = {

    top: '80px',
    left: '50%'
  };
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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
        'green'
      ],
      fireball: [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848'
      ],
    };
  var colorsIndex = {
    coat: 0,
    eyes: 0,
    fireball: 0
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
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var setDefaultPosition = function () {
    setup.style.top = SETUP.top;
    setup.style.left = SETUP.left;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
      hidePopup();
      setDefaultPosition();
    }
  };

  var showPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var hidePopup = function () {
    setup.classList.add('hidden');
  };

  setupOpen.addEventListener('click', function () {
    showPopup();
  });

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      showPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    hidePopup();
    setDefaultPosition();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hidePopup();
      setDefaultPosition();
    }
  });


  var switchToNextColor = function (colors, colorNumber) {
    if (++colorNumber === colors.length) {
      colorNumber = 0;
    }
    return colorNumber;
  };

  wizardCoat.addEventListener('click', function () {
    colorsIndex.coat = switchToNextColor(WIZARD_PARAMS.coat, colorsIndex.coat);
    wizardCoat.style.fill = WIZARD_PARAMS.coat[colorsIndex.coat];
  });

  wizardEyes.addEventListener('click', function () {
    colorsIndex.eyes = switchToNextColor(WIZARD_PARAMS.eyes, colorsIndex.eyes);
    wizardEyes.style.fill = WIZARD_PARAMS.eyes[colorsIndex.eyes];
  });

  wizardFireball.addEventListener('click', function () {
    colorsIndex.fireball = switchToNextColor(WIZARD_PARAMS.fireball, colorsIndex.fireball);
    wizardFireball.style.backgroundColor = WIZARD_PARAMS.fireball[colorsIndex.fireball];
  });

})();
