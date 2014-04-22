// game states
//   update:  for play loop, runs upon valid command
//   render:  for graphics loop
//   command: state event handler, returns true or false if command was valid
Game.states = (function() {
  // battle state
  var Battle = function() {
    this.fields = {
      friendly: fieldFactory(friendly_field_options),
      hostile: fieldFactory(hostile_field_options)
    }
    this.activeTiles = [];
  };

  Battle.prototype.update = function() {
    console.log("update battle");
  };

  Battle.prototype.render = function(context) {
    this.fields.friendly.render(context, false);
    this.fields.hostile.render(context, true);
  };

  Battle.prototype.keydown = function(input) {
    var valid = true;

    switch(input.key) {
      case "2":
        Game.setState("menu");
        break;
      default:
        console.log("input not recognized");
        valid = false;
    }
  }

  Battle.prototype.mousedown = function(input) {
    console.log("mousedown");

    var tile = this.fields.friendly.getTile(input.position); // || this.fields.hostile.getTile(input.position)
    if (tile) {
      this.activeTiles.push(tile);
      tile.activate();
      return true;
    } else {
      return false;
    }
    // this.fields.hostile.pingTile(input.position);
  }

  Battle.prototype.mouseup = function(input) {
    var valid = true;
    console.log("mouseup");

    var tile = this.fields.friendly.getTile(input.position); // || this.fields.hostile.getTile(input.position)
    if (tile) {
      valid =  true;
    } else {
      valid = this.activeTiles.length > 0 ? true : false;
    }
    while (this.activeTiles.length) {
      this.activeTiles.pop().reset();
    }

    return valid
    // this.fields.hostile.pingTile(input.position);
  }

  Battle.prototype.command = function(input) {
    return this[input.type] && this[input.type](input);
  }
  // menu state
  var Menu = function() {

  };

  Menu.prototype.update = function() {
  };

  Menu.prototype.render = function(context) {
    console.log("1. Start Battle");
  };

  Menu.prototype.command = function(input) {
    var valid = true;
    switch(input.key) {
      case "1":
        Game.setState("battle");
        break;
      default:
        console.log("input not recognized");
        valid = false;
    }

    return valid;
  }

  return {
    battle: new Battle,
    menu: new Menu
  }
})()