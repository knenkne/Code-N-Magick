const fireballSize = 50;
const getFireballSpeed = (left) => left ? 5 : 2;
const wizardSpeed = 3;
const wizardWidth = 70;
const getWizardHeight = () => 1.337 * wizardWidth;
const getWizardX = (width) => (width - wizardWidth) / 2;
const getWizardY = (height) => (height - getWizardHeight()) * 2 / 3;
