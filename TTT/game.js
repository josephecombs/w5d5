var Board = require("./board");

// var reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

var TTTGame = function(reader) {
  this.board = new Board();
  this.reader = reader;
  this.mark = "x";
};

TTTGame.prototype.switchMark = function() {
  if (this.mark === "x") {
    this.mark = "o";
  } else {
    this.mark = "x";
  }
};

TTTGame.prototype.run = function(completionCallback) {
  this.getMove(function(rowIdx, colIdx) {
    if (this.board.isEmpty([rowIdx, colIdx])) {
      this.board.placeMark([rowIdx, colIdx], this.mark);
      if (this.board.isWon()) {
        console.log(this.mark + " wins");
        completionCallback();
      } else if (this.board.isDraw()) {
        console.log("Tie game");
        completionCallback();
      } else {
        console.log(this.mark);
        this.switchMark();
        console.log(this.mark);
        this.run(completionCallback);
      }
    } else {
      console.log("position is occupied");
      this.run(completionCallback);
    }
  }.bind(this));
};

TTTGame.prototype.getMove = function(callback) {
  this.board.print();
  this.reader.question(this.mark + "'s move: enter row index:", function(answer) {
    var rowIdx = parseInt(answer, 10);
    this.reader.question("enter col index:", function(answer) {
      var colIdx = parseInt(answer, 10);
      callback(rowIdx, colIdx);
    });
  }.bind(this));

};

module.exports = TTTGame;