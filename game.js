Game = (function() {
  console.log("GAME MODULE LOADED");
  var PLAYBACK_JITTER = 5;
  var FPS = 5;
  var fps_counter = document.getElementById('fps')
  var MS_FRAME_DELAY = (1000)/FPS;

  var last_frame_at;
  var current_frame_at;

  var playing = false;

  var input = {
    type: null,
    key: null,
    position: {
      x: null,
      y: null
    }
  }

  // function clearInput() {
  //   input.type = null;
  //   input.key = null;
  //   input.position.x = null;
  //   input.position.y = null;
  // }

  function normalizeInput(e, type) {
    input.type = type;
    input.key = e.which ? normalizeKey(e.which) : null;
    input.position.x = e.pageX
    input.position.y = e.pageY

    return input;
  }

  function normalizeKey(key) {
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


  function Game() {
    this.states = {};
    this.installEventListeners();

    this.canvas        = document.getElementById("game");
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.context = this.canvas.getContext('2d');
  }

  Game.prototype.update = function() {
    this.currentState().update();
  }

  Game.prototype.start = function() {
    if (!playing) {
      playing = setInterval(this.render.bind(this), MS_FRAME_DELAY);

      current_frame_at = null;
      last_frame_at = null;
    }
  }

  Game.prototype.stop = function() {
    if (playing) {
      window.clearInterval(playing);

      playing = null;
    }
  }

  Game.prototype.render = function() {
    current_frame_at = Date.now();
    if (last_frame_at) {
      fps_counter.innerHTML = "FPS: " + parseInt(1000/(current_frame_at - last_frame_at));
    }
    last_frame_at = current_frame_at;
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

  Game.prototype.command = function(input) {
    if (this.currentState().command(input)) {
      this.update();
    }
  }

  Game.prototype.installEventListeners = function() {
    document.addEventListener("keydown", function(e) {
      this.command(normalizeInput(e, 'keydown'));
    }.bind(this));

    document.addEventListener("mousedown", function(e) {
      this.command(normalizeInput(e, 'mousedown'));
    }.bind(this));

    document.addEventListener("mouseup", function(e) {
      this.command(normalizeInput(e, 'mouseup'));
    }.bind(this));

    document.addEventListener("mousemove", function(e) {
      this.command(normalizeInput(e, 'mousemove'));
    }.bind(this));
  }
  return new Game();
})();