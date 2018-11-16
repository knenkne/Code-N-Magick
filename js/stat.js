'use strict';

var CLOUD = {
  height: 270,
  width: 420,
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
  padding: 17
};


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
};

var renderText = function (ctx, x, y, padding, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', x + padding, y + padding);
  ctx.fillText('Список результатов:', x + padding, y + padding * 2);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD.x + SHADOW.size, CLOUD.y + SHADOW.size, SHADOW.color);
  renderCloud(ctx, CLOUD.x, CLOUD.y, CLOUD.color);
  renderText(ctx, CLOUD.x, CLOUD.y, TEXT.padding, TEXT.color, TEXT.font);
};
