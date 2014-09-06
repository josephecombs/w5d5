var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var HanoiGame = function() {
  this.towers = [[3, 2, 1], [], []];
};

HanoiGame.prototype.isWon = function() {
  return (this.towers[2].length === 3);
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  if (this.towers[startTowerIdx].length === 0) {
    return false;
  }
  if (this.towers[endTowerIdx].length === 0) {
    return true;
  }
  return (this.towers[startTowerIdx][this.towers[startTowerIdx].length - 1] 
    < this.towers[endTowerIdx][this.towers[endTowerIdx].length - 1]);
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx) {
  this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
};

HanoiGame.prototype.print = function() {
  console.log(JSON.stringify(this.towers));
};

HanoiGame.prototype.promptMove = function(callback) {
  this.print();
  reader.question("enter start tower index", function (answer) {
    //parseint something
    var startTowerIdx = parseInt(answer, 10);
    reader.question("enter end tower index", function (answer) {
      //parseint something
      var endTowerIdx = parseInt(answer, 10);      
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

HanoiGame.prototype.run = function(completionCallback) {
  
  this.promptMove(function(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.move(startTowerIdx, endTowerIdx);
      if (this.isWon()) {
        console.log("You Win");
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    } else {
      console.log("Bad Move");
      this.run(completionCallback);
    }
  }.bind(this));
};

var game = new HanoiGame();
game.run(function() {
  reader.close();
  console.log("Completion Callback");
});