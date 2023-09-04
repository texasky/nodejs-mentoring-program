const repl = require('node:repl');

function getRandomNumber() {
    console.log(Math.random());
}

repl.start('>').context.getRandomNumber = getRandomNumber;