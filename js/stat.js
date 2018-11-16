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
  gap: 10
};

var BAR = {
  height: 150,
  width: 40,
  gap: 48,
  color: 'rgba(255, 0, 0, 1)'
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
  ctx.fillText(secondMessage, x + padding, y + padding * 2);
};

var renderName = function (ctx, x, y, color, font, name, gap) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText(name, x, y + gap);
};

window.renderStatistics = function (ctx, names) {
  names = ['Вы', 'Вика', 'Данил', 'Люся', 'Пётр'];

  // Тень
  renderRect(ctx, CLOUD.x + SHADOW.size, CLOUD.y + SHADOW.size, SHADOW.color, CLOUD.width, CLOUD.height);

  // Облако
  renderRect(ctx, CLOUD.x, CLOUD.y, CLOUD.color, CLOUD.width, CLOUD.height);

  // Сообщение
  renderText(ctx, CLOUD.x, CLOUD.y, TEXT.padding, TEXT.color, TEXT.font, 'Ура вы победили!', 'Список результатов:');

  // Гистограмма
  for (var i = 0; i < names.length; i++) {
    renderRect(ctx, CLOUD.x + BAR.gap * (i + 1) + BAR.width * i, CLOUD.y + CLOUD.height - BAR.height - BAR.gap, BAR.color, BAR.width, BAR.height);
    renderName(ctx, CLOUD.x + BAR.gap * (i + 1) + BAR.width * i, CLOUD.y + CLOUD.height - BAR.gap, TEXT.color, TEXT.font, names[i], TEXT.gap);
  }
};
