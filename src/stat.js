const CLOUD = {
  height: 270,
  width: 490,
  color: `#fff`,
  x: 110,
  y: 10,
  step: 90
};

const SHADOW = {
  size: 10,
  color: `rgba(0, 0, 0, 0.7)`
};

const TEXT = {
  color: `#000`,
  font: `16px PT Mono`,
  padding: 17,
  messages: [`Ура вы победили!`, `Список результатов:`],
  gap: 10,
  x: 265,
  y: 10,
  height: 40
};

const BAR = {
  height: 150,
  width: 40,
  gap: 66,
  userColor: `rgba(255, 0, 0, 1)`,
  enemyColor: `rgba(0, 0, 255, `
};

const renderRect = (ctx, x, y, color, width, height) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const renderCloud = (ctx, x, y, color, width, height, stepHeight) => {
  const steps = height / stepHeight;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < steps; i++) {
    ctx.quadraticCurveTo(x * 0.8, y + stepHeight * i + stepHeight / 2, x, y + stepHeight * i + stepHeight);
  }
  ctx.lineTo(x + (width / 2), y + (height * 0.96));
  ctx.lineTo(x + width, y + height);
  for (let j = steps; j > 0; j--) {
    ctx.quadraticCurveTo(width + x * 1.2, y + stepHeight * j - stepHeight / 2, width + x, y + stepHeight * j - stepHeight);
  }
  ctx.lineTo(x, y);
  ctx.fill();
};

const renderText = (ctx, x, y, padding, color, font, messages) => {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = `hanging`;
  for (let i = 0; i < messages.length; i++) {
    ctx.fillText(messages[i], x + padding, y + padding * (i + 1));
  }
};

const renderName = (ctx, x, y, color, font, name, gap) => {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = `hanging`;
  ctx.fillText(name, x, y + gap);
};

const getRandomColor = (color) => color + Math.random();

const getMaxElement = (array) => {
  let maxElement = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, names, times) => {
  const maxTime = getMaxElement(times);

  // Тень
  renderCloud(ctx, CLOUD.x + SHADOW.size, CLOUD.y + SHADOW.size, SHADOW.color, CLOUD.width, CLOUD.height, CLOUD.step);

  // Облако
  renderCloud(ctx, CLOUD.x, CLOUD.y, CLOUD.color, CLOUD.width, CLOUD.height, CLOUD.step);

  // Сообщение
  renderText(ctx, TEXT.x, CLOUD.y, TEXT.padding, TEXT.color, TEXT.font, TEXT.messages);

  // Гистограмма
  for (let i = 0; i < names.length; i++) {
    const color = (names[i] !== `Вы`) ? getRandomColor(BAR.enemyColor) : BAR.userColor;
    const calculateX = () => CLOUD.x + BAR.gap * (i + 1) + BAR.width * i;
    const calculateY = () => CLOUD.y + CLOUD.height - TEXT.height;
    const getBarHeight = () => -(BAR.height * times[i]) / maxTime;

    // Столбец
    renderRect(ctx, calculateX(), calculateY(), color, BAR.width, getBarHeight());

    // Имя
    renderName(ctx, calculateX(), calculateY(), TEXT.color, TEXT.font, names[i], TEXT.gap);

    // Результат
    renderName(ctx, calculateX(), CLOUD.height - TEXT.height + getBarHeight(), TEXT.color, TEXT.font, Math.round(times[i]), -TEXT.gap);
  }
};
