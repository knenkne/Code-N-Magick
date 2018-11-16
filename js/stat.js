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
  color: ['rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 0.9)', 'rgba(0, 0, 255, 0.7)', 'rgba(0, 0, 255, 0.4)']
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
      var x = CLOUD.x + BAR.gap * (i + 1) + BAR.width * i;
      return x;
    };

    var calculateY = function () {
      var y = CLOUD.y + CLOUD.height - TEXT.height;
      return y;
    };

    var barHeight = function () {
      var height = -(BAR.height * times[i]) / maxTime;
      return height;
    };

    // Столбец
    renderRect(ctx, calculateX(), calculateY(), BAR.color[i], BAR.width, barHeight());

    // Имя
    renderName(ctx, calculateX(), calculateY(), TEXT.color, TEXT.font, names[i], TEXT.gap);

    // Результат
    renderName(ctx, calculateX(), CLOUD.height - TEXT.height + barHeight(), TEXT.color, TEXT.font, Math.round(times[i]), -TEXT.gap);
  }
};
