Game.states = (function(states) {
  var valid;
  var MenuState = function() {

  };

  MenuState.prototype.update = function() {
  };

  MenuState.prototype.render = function(context) {
  };

  MenuState.prototype.command = function(input) {
    valid = true;

    switch(input.key) {
      case "1":
        Game.setState("battle");
        break;
      case "3":
        Game.setState("overworld");
        break;
      default:
        valid = false;
    }

    return valid;
  }

  states.menu = new MenuState;
  return states;
})(Game.states || {})
  