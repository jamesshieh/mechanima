Game.states = (function(states) {
  var valid;
  var Menu = function() {

  };

  Menu.prototype.update = function() {
  };

  Menu.prototype.render = function(context) {
  };

  Menu.prototype.command = function(input) {
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

  states.menu = new Menu;
  return states;
})(Game.states || {})
  