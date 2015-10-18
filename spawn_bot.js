'use strict';
var bot = require('./bot');
var randomExpression = require('./lib/math/expressionGenerator').randomExpression;

startAsking(
  bot({name: process.argv[2] || generateBotName()}),
  500 + Math.ceil(Math.random() * 100)
);

function startAsking(bot, interval) {
  setInterval(function () {
    var expression = randomExpression();
    bot.askMath(expression, function(solution) {
      bot.log(`SOLUTION: ${expression}${solution}`);
    });
  }, interval)
}

function generateBotName() {
  return 'BOT_' + Math.ceil(Math.random() * 1000);
}
