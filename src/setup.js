import {getRandomArrayElement} from './utils';
import {KeyCodes} from './data';

const MAX_WIZARDS = 4;
const WIZARD_PARAMS =
  {
    name: [
      `Иван`,
      `Хуан Себастьян`,
      `Мария`,
      `Кристоф Виктор`,
      `Юлия`,
      `Люпита`,
      `Вашингтон`
    ],
    surname: [
      `да Марья`,
      `Верон`,
      `Мирабелла`, `Вальц`,
      `Онопко`,
      `Топольницкая`,
      `Нионго`,
      `Ирвинг`
    ],
    coat: [
      `rgb(101, 137, 164)`,
      `rgb(241, 43, 107)`,
      `rgb(146, 100, 161)`,
      `rgb(56, 159, 117)`,
      `rgb(215, 210, 55)`,
      `rgb(0, 0, 0)`
    ],
    eyes: [
      `black`,
      `red`,
      `blue`,
      `yellow`,
      `green`
    ]
  };

const setup = document.querySelector(`.setup`);
const wizardSetup = setup.querySelector(`.setup-wizard`);
const openButton = document.querySelector(`.setup-open`);
const closeButton = setup.querySelector(`.setup-close`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const wizardsList = document.querySelector(`.setup-similar-list`);
const wizardCoat = wizardSetup.querySelector(`.wizard-coat`);

// Events
const onOpenButtonOpen = () => {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onSetupEscPress);
};

onOpenButtonOpen();
const onCloseButtonClose = () => {
  setup.classList.add(`hidden`);
};

const onSetupEscPress = (evt) => {
  if (evt.keyCode === KeyCodes.ESC) {
    onCloseButtonClose();
  }
};

openButton.addEventListener(`click`, onOpenButtonOpen);
openButton.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === KeyCodes.ENTER) {
    onOpenButtonOpen();
  }
});
closeButton.addEventListener(`click`, onCloseButtonClose);

/*
let coatColorIndex = 0;
const onItemColorChange = (itemColorIndex, colors) => {
  if (itemColorIndex === colors.length - 1) {
    itemColorIndex = 0;
  } else {
    ++itemColorIndex;
  }
  wizardCoat.style.fill = colors[itemColorIndex];
};
*/
let coatColorIndex = 0;
const switchToNextColor = (colors, colorIndex) => {
  if (++colorIndex === colors.length) {
    colorIndex = 0;
  }
  return colorIndex;
};

wizardCoat.addEventListener(`click`, () => {
  switchToNextColor(WIZARD_PARAMS.coat, coatColorIndex);
  wizardCoat.style.fill = WIZARD_PARAMS.coat[coatColorIndex];
  console.log(coatColorIndex);
});

// Mock
const renderWizard = (params) => {
  const wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = `${getRandomArrayElement(params.name)} ${getRandomArrayElement(params.surname)}`;
  wizardElement.querySelector(`.wizard-coat`).style.fill = getRandomArrayElement(params.coat);
  wizardElement.querySelector(`.wizard-eyes`).style.fill = getRandomArrayElement(params.eyes);

  return wizardElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < MAX_WIZARDS; i++) {
  fragment.appendChild(renderWizard(WIZARD_PARAMS));
}

const addWizards = () => wizardsList.appendChild(fragment);

export {addWizards};
