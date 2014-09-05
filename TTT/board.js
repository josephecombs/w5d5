var Board = function() {
  this.tiles = [[null, null ,null],[null, null, null],[null, null, null]];
};

Board.prototype.isWon = function() {
  return this.winner() !== null;
};

Board.prototype.isDraw = function() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (this.tiles[i][j] === null) {
        return false;
      }
    }
  }
  if (this.isWon()) {
    return false;
  }
  return true;
};

Board.prototype.winner = function() {
  for (var i = 0; i < 3; i++) {
    //vertical case
    if (this.tiles[i][0] === this.tiles[i][1] &&
      this.tiles[i][0] === this.tiles[i][2] && 
      this.tiles[i][0] !== null ) {
      return this.tiles[i][0];
    }
    //horizontal case
    if (this.tiles[0][i] === this.tiles[1][i] &&
      this.tiles[0][i] === this.tiles[2][i] &&
      this.tiles[0][i] !== null ) {
      return this.tiles[0][i];
    }
  }
  //one diag case
  if (this.tiles[0][0] === this.tiles[1][1] &&
    this.tiles[0][0] === this.tiles[2][2] &&
   this.tiles[0][0]!== null ) {
    return this.tiles[0][0];
  }
  //other diag win case
  if (this.tiles[0][2] === this.tiles[1][1] &&
    this.tiles[0][2] === this.tiles[2][0] && 
    this.tiles[0][0]!== null) {
    return this.tiles[0][2];
  } else {
    return null;
  }
};

Board.prototype.isEmpty = function(pos) {
  return this.tiles[pos[0]][pos[1]] == null;
};

Board.prototype.placeMark = function(pos, mark) {
  this.tiles[pos[0]][pos[1]] = mark;
};

Board.prototype.print = function() {
  console.log(" 0 1 2");
  for (var i = 0; i < 3; i++) {
    var nextLine = "" + i;
    for (var j = 0; j < 3; j++) {
      if (this.tiles[i][j] === null) {
        nextLine += "  ";
      } else {
        nextLine += this.tiles[i][j] + " ";
      }
    }
    console.log(nextLine);
  }
  // console.log('   0   1   2   ');
  // console.log('0' + this.tiles[0]);
  // console.log('1' + this.tiles[1]);
  // console.log('2' + this.tiles[2]);
};

module.exports = Board;