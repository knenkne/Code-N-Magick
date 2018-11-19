'use strict';

var CLOUD = {
  height: 270,
  width: 490,
  color: '#fff',
  x: 110,
  y: 10,
  step: 90
};

var SHADOW = {
  size: 10,
  color: 'rgba(0, 0, 0, 0.7)'
};

var TEXT = {
  color: '#000',
  font: '16px PT Mono',
  padding: 17,
  messages: ['Ура вы победили!', 'Список результатов:'],
  gap: 10,
  x: 265,
  y: 10,
  height: 40
};

var BAR = {
  height: 150,
  width: 40,
  gap: 66,
  userColor: 'rgba(255, 0, 0, 1)',
  enemyColor: 'rgba(0, 0, 255, '
};

var renderRect = function (ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderCloud = function (ctx, x, y, color, width, height, stepHeight) {
  var steps = height / stepHeight;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (var i = 0; i < steps; i++) {
    ctx.quadraticCurveTo(x * 0.8, y + stepHeight * i + stepHeight / 2, x, y + stepHeight * i + stepHeight);
  }
  ctx.lineTo(width + x, height + y);
  for (var j = steps; j > 0; j--) {
    ctx.quadraticCurveTo(width + x * 1.2, y + stepHeight * j - stepHeight / 2, width + x, y + stepHeight * j - stepHeight);
  }
  ctx.lineTo(x, y);
  ctx.fill();
};

var renderText = function (ctx, x, y, padding, color, font, messages) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  for (var i = 0; i < messages.length; i++) {
    ctx.fillText(messages[i], x + padding, y + padding * (i + 1));
  }
};

var renderName = function (ctx, x, y, color, font, name, gap) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText(name, x, y + gap);
};

var getRandomColor = function (color) {
  return color + Math.random();
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  // Тень
  renderCloud(ctx, CLOUD.x + SHADOW.size, CLOUD.y + SHADOW.size, SHADOW.color, CLOUD.width, CLOUD.height, CLOUD.step);

  // Облако
  renderCloud(ctx, CLOUD.x, CLOUD.y, CLOUD.color, CLOUD.width, CLOUD.height, CLOUD.step);

  // Сообщение
  renderText(ctx, TEXT.x, CLOUD.y, TEXT.padding, TEXT.color, TEXT.font, TEXT.messages);

  // Гистограмма
  for (var i = 0; i < names.length; i++) {
    var color = (names[i] !== 'Вы') ? getRandomColor(BAR.enemyColor) : BAR.userColor;
    var calculateX = function () {
      return CLOUD.x + BAR.gap * (i + 1) + BAR.width * i;
    };

    var calculateY = function () {
      return CLOUD.y + CLOUD.height - TEXT.height;
    };

    var getBarHeight = function () {
      return -(BAR.height * times[i]) / maxTime;
    };

    // Столбец
    renderRect(ctx, calculateX(), calculateY(), color, BAR.width, getBarHeight());

    // Имя
    renderName(ctx, calculateX(), calculateY(), TEXT.color, TEXT.font, names[i], TEXT.gap);

    // Результат
    renderName(ctx, calculateX(), CLOUD.height - TEXT.height + getBarHeight(), TEXT.color, TEXT.font, Math.round(times[i]), -TEXT.gap);
  }
};
