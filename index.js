#!/usr/bin/env node
const { throwCoin, trowCoin } = require("./src/coin");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const stdIO = require("./src/terminalIO");
const fs = require("fs");

const args = yargs(hideBin(process.argv)).parse();

const writeFile = fs.createWriteStream(args._[0]);
const say = (msg) => console.log(msg);

const makeLog = () => {
  const data = `Раунд: ${
    round + 1
  } Выпало: ${result} победил: ${winner} (Выиграно: ${playerPoints} Проиграно: ${appPoints})`;
  writeFile.write(`${data}\n`);
};

const prepareString = (str) => str.toLowerCase().trim();
const greeting = "орел или решка?";

// gamedata
let result = throwCoin();
let winner = null;
let roundEnd = false;
let round = 0;
let playerPoints = 0;
let appPoints = 0;

// gameplay
say(greeting);

stdIO.on("line", (msg) => {
  if (!roundEnd && prepareString(msg) === result) {
    roundEnd = true;
    winner = "Игрок";
    playerPoints += 1;
    round += 1;
    say("ТОЧНО!", result, "!");
    makeLog();
    say("Еще? [да/нет]");
  }
  if (!roundEnd && prepareString(msg) !== result) {
    roundEnd = true;
    winner = "Монетка";
    appPoints += 1;
    round += 1;
    makeLog();
    say(
      `Ты проиграл, человек! Правильный ответ: ${result}. Шучу - монетка упала на ребро!`
    );
    say("Еще? [да/нет]");
  }
  if (roundEnd && prepareString(msg) === "да") {
    playerWon = false;
    result = throwCoin();
    say(greeting);
    roundEnd = false;
  }
  if (roundEnd && prepareString(msg) === "нет") {
    writeFile.end();
    process.exit();
  }
  if (
    roundEnd &&
    (prepareString(msg) !== "да" || prepareString(msg) !== "нет")
  ) {
    say("Просто введи 'да' или 'нет' кириллицей, кожанный мешок!");
    say("Еще? [да/нет]");
  }
});
