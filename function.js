var myBind = function(context) {
  var fn = this;
  return function() {
    fn.apply(context);
  };
};

Function.prototype.myBind = myBind;

var obj = {
  name: "Earl Watts"
};

// weird function; how is `this` supposed to be set if we don't call
// `greet` method style?
function greet() {
  console.log("hello: " + this.name);
}

greet();

var newGreet = greet.myBind(obj);
newGreet();