Game.states = (function(states) {

  var Overworld = function() {

  }

  Overworld.prototype.update = function() {

  }

  Overworld.prototype.render = function(context) {
    console.log("overworld!");
  }

 
  Overworld.prototype.command = function(input) {
    valid = true;

    switch(input.key) {
      case "1":
        Game.setState("battle");
        break;
      case "2":
        Game.setState("menu");
        break;
      default:
        valid = false;
    }

    return valid;
  } 

  states.overworld = new Overworld;
  return states;


  var OverworldArea = function(options) {
    this.length = options.length;
    this.width  = options.width;
  }

  OverworldArea.prototype.link = function(area, dir) {

  }

  var OverworldEntity = function() {

  }

  var Party = function() {

  }
  // var OverworldEntity = function() {

  // }
})(Game.states || {})
