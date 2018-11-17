'use strict';

var CLOUD = {
  height: 270,
  width: 490,
  color: '#fff',
  x: 110,
  y: 10
};

var SHADOW = {
  size: 10,
  color: 'rgba(0, 0, 0, 0.7)'
};

var TEXT = {
  color: '#000',
  font: '16px PT Mono',
  padding: 17,
  firstMessage: 'Ура вы победили!',
  secondMessage: 'Список результатов:',
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

var renderText = function (ctx, x, y, padding, color, font, firstMessage, secondMessage) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText(firstMessage, x + padding, y + padding);
  ctx.fillText(secondMessage, x, y + padding * 2);
};

var renderName = function (ctx, x, y, color, font, name, gap) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText(name, x, y + gap);
};

var getRandomColor = function () {
  return BAR.enemyColor + Math.random();
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
  names = ['Вы', 'Вика', 'Данил', 'Люся'];
  var maxTime = getMaxElement(times);

  // Тень
  renderRect(ctx, CLOUD.x + SHADOW.size, CLOUD.y + SHADOW.size, SHADOW.color, CLOUD.width, CLOUD.height);

  // Облако
  renderRect(ctx, CLOUD.x, CLOUD.y, CLOUD.color, CLOUD.width, CLOUD.height);

  // Сообщение
  renderText(ctx, TEXT.x, CLOUD.y, TEXT.padding, TEXT.color, TEXT.font, 'Ура вы победили!', 'Список результатов:');

  // Гистограмма
  for (var i = 0; i < names.length; i++) {
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
    if (i === 0) {
      renderRect(ctx, calculateX(), calculateY(), BAR.userColor, BAR.width, getBarHeight());
    } else {
      renderRect(ctx, calculateX(), calculateY(), getRandomColor(), BAR.width, getBarHeight());
    }

    // Имя
    renderName(ctx, calculateX(), calculateY(), TEXT.color, TEXT.font, names[i], TEXT.gap);

    // Результат
    renderName(ctx, calculateX(), CLOUD.height - TEXT.height + getBarHeight(), TEXT.color, TEXT.font, Math.round(times[i]), -TEXT.gap);
  }
};
