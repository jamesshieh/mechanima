Game = (function() {
  function Game() {
    this.states = {};
    this.installEventListeners();

    this.canvas  = document.getElementById("game");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.context = this.canvas.getContext('2d');
  }

  Game.prototype.update = function() {
    this.currentState().update();
    this.render();
  }

  Game.prototype.render = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentState().render(this.context);
  }

  Game.prototype.setState = function(state) {
    console.log("switching states from " + this.state + " to " + state);
    this.state = state;
    this.render();
  }

  Game.prototype.currentState = function() {
    return this.states[this.state];
  }

  // all states share event listeners
  // events are transformed into an input object for a shared input api
  // each state has it's own handler for the input
  Game.prototype.normalizeInput = function(e, type) {
    var input = {
      type: type,
      key: this.normalizeKey(e.which),
      position: {
        x: e.pageX,
        y: e.pageY
      }
    };
    console.log(e.pageX, e.pageY);

    return input
  }

  Game.prototype.normalizeKey = function(key) {
    switch (key) {
      case 27:
        return "esc"; 
        break;
      case 37:
        return "left";
        break;
      case 38:
        return "up";
        break;
      case 39:
        return "right";
        break;
      case 40:
        return "down";
        break;
      default:
        return String.fromCharCode(key);
    }
  }

  Game.prototype.command = function(input) {
    console.log(input);
    if (this.currentState().command(input)) {
      this.update();
    }
  }

  Game.prototype.installEventListeners = function() {
    document.addEventListener("keydown", function(e) {
      console.log("key down event:");
      var input = this.normalizeInput(e, 'keydown');
      this.command(input);
      
    }.bind(this));

    document.addEventListener("mousedown", function(e) {
      console.log("mouse down event:");
      var input = this.normalizeInput(e, 'mousedown');
      this.command(input);
      
    }.bind(this));

    document.addEventListener("mouseup", function(e) {
      console.log("mouse up event:");
      var input = this.normalizeInput(e, 'mouseup');
      this.command(input);
      
    }.bind(this));
  }
  return new Game();
})();