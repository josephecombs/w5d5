function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  console.log(this.hours) + ' ' +
  console.log(this.minutes) + ' ' +
  console.log(this.seconds);

};

Clock.prototype.run = function () {
  var date = new Date();
  // 1. Set the currentTime.
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
  // 2. Call printTime.
  this.printTime();
  // 3. Schedule the tick interval.
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  this.seconds += 5;
  if (this.seconds > 60) {
    this.minutes +=1;
    this.seconds -= 60;
    if (this.minutes > 60) {
      this.hours += 1;
      this.minutes -= 60;
      if (this.hours > 24) {
        this.hours -= 24;
      }
    }
  }

  // 2. Call printTime.

  this.printTime();
};

// clock = new Clock();
// clock.run();

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter a number", function(answer) {
      var number = parseInt(answer);
      sum += number;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    })
  } else if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
  }
};

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});

var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfLessThan (el1, el2, callback) {
  // Prompt user to tell us whether el1 < el2; pass true back to the
  // callback if true; else false.
  reader.question("Is " + el1 + " less than " + el2 + "?", function(answer) {
    if (answer === "yes") {
      callback(true);
    } else if (answer === "no") {
      callback(false);
    } else {
      console.log("Invalid answer");
    }
  });
}

function innerBubbleSortLoop (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfLessThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
  if (i < arr.length - 1) {
    askIfLessThan(arr[i], arr[i + 1], function(isLessThan) {
      if (!isLessThan) {
        var t1 = arr[i];
        var t2 = arr[i+1];
        arr[i] = t2;
        arr[i+1] = t1;
        madeAnySwaps = true;
      } 
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
  
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

function absurdBubbleSort (arr, sortCompletionCallback) {
  function outerBubbleSortLoop (madeAnySwaps) {
    // Begin an inner loop if `madeAnySwaps` is true, else call
    // `sortCompletionCallback`.
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});