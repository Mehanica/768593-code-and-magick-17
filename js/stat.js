'use strict';

var Histogram = {
  x: 70,
  y: 220,
  height: 150
};

var COLUMN_WIDTH = 40;
var BAR_GAP = 50;
var NAME_GAP = 40;
var NAME_START_Y = 235;
var INTENT = 5;

var renderCloud = function (ctx) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(100, 10);
  ctx.bezierCurveTo(20, 35, 70, 55, 60, 70);
  ctx.bezierCurveTo(10, 80, 20, 90, 50, 130);
  ctx.bezierCurveTo(30, 130, 20, 140, 55, 160);
  ctx.bezierCurveTo(40, 270, 100, 260, 180, 240);
  ctx.bezierCurveTo(90, 250, 320, 270, 330, 240);
  ctx.bezierCurveTo(340, 270, 430, 240, 400, 200);
  ctx.bezierCurveTo(430, 190, 430, 160, 400, 140);
  ctx.bezierCurveTo(410, 144, 430, 120, 400, 110);
  ctx.bezierCurveTo(430, 10, 380, 20, 310, 30);
  ctx.bezierCurveTo(180, 5, 160, 10, 100, 10);
  ctx.stroke();
  ctx.fill();
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
};

var getMaxElement = function (arr) {

  if (arr.length > 0) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }
  return 'Максимальный элемент не может быть найден из-за отсутствия данных.';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx);

  var drawText = function (text, x, y, color, font) {

    ctx.fillStyle = color || 'black';
    ctx.font = font || '16px Ph Mono';
    ctx.fillText(text, x, y);
  };
  drawText('Ура вы победили!', 140, 35);
  drawText('Список результатов:', 95, 50);

  var getBlueOpacity = function () {

    return 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
  };

  var getColor = function (player) {

    return (player === 'Вы') ? 'rgba(225, 0, 0, 1)' : getBlueOpacity();
  };

  var maxTime = getMaxElement(times);

  var getStartX = function (index) {

    return Histogram.x + (NAME_GAP + BAR_GAP) * index;
  };

  var getStartY = function (index) {

    return Histogram.y - ((Histogram.height * times[index]) / maxTime);
  };

  var getColumnHeight = function (index) {

    return (Histogram.height * times[index]) / maxTime;
  };

  for (var i = 0; i < players.length; i++) {

    ctx.fillStyle = getColor(players[i]);

    ctx.fillText(players[i], getStartX(i), NAME_START_Y);
    ctx.fillRect(getStartX(i), getStartY(i), COLUMN_WIDTH, getColumnHeight(i));
    ctx.fillText(times[i].toFixed(), getStartX(i), getStartY(i) - INTENT);
  }
};

