var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var TTT = require("./TTT");

var game = new TTT.Game(reader);
game.run(function() {
  reader.close();
  console.log("completion callback");
});