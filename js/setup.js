var WIZARDS_AMOUNT = 4;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабе', 'Вальц', 'Онопко', 'Топольн', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var similarWizardsList = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');  


function getRandomItem (items) {
    return items[Math.floor(Math.random() * items.length)];
};

function toggleSetup() {
    setupSimilar.classList.toggle('hidden');
    setup.classList.toggle('hidden');
}

function getWizardData() {
    return {
        'name': getRandomItem(names) + ' ' + getRandomItem(surnames),
        'coatColor': getRandomItem(coatColors),
        'eyesColor': getRandomItem(eyesColors)
    };
};

function getWizardsData(amount) {
    var wizardsData = [];

    for (var i = 0; i < amount; i++) {
        var wizardData = getWizardData();
        wizardsData.push(wizardData);
    }

    return wizardsData;
};

function createWizard(data) {
    var wizard = similarWizardTemplate.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = data.name;
    wizard.querySelector('.wizard-coat').style.fill = data.coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = data.eyesColor;

    return wizard;
};

function renderWizards(data, container) {
    var fragment = document.createDocumentFragment();
    var wizards = data.map(createWizard);

    wizards.forEach(function(wizard) {
        fragment.appendChild(wizard);
    });

    container.appendChild(fragment);
}

var wizardsData = getWizardsData(WIZARDS_AMOUNT);
toggleSetup();
renderWizards(wizardsData, similarWizardsList);