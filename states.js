// game states
//   update:  for play loop, runs upon valid command
//   render:  for graphics loop
//   command: state event handler, returns true or false if command was valid
Game.states = (function() {
  // battle state
  var valid;
  var Battle = function() {
    this.fields = {
      friendly: fieldFactory(friendly_field_options),
      hostile: fieldFactory(hostile_field_options)
    }

    this.tile = null;
    this.tiles = {
      activated: null,
      highlighted: null
    }
  };

  Battle.prototype.update = function() {
  };

  Battle.prototype.render = function(context) {
    this.fields.friendly.render(context, false);
    this.fields.hostile.render(context, true);
  };

  Battle.prototype.keydown = function(input) {
    valid = true;

    switch(input.key) {
      case "2":
        Game.setState("menu");
        break;
      default:
        valid = false;
    }
    return valid;
  }

  Battle.prototype.mousemove = function(input) {
    this.tile = this.fields.friendly.getTile(input.position);
    if (this.tiles.highlighted) {
      this.tiles.highlighted.reset();
      if (this.tiles.activated) {
        this.tiles.activated.activate();
      }
    }
    if (this.tile) {
      this.tiles.highlighted = this.tile; 
      this.tiles.highlighted.highlight();
    }
  }

  Battle.prototype.mousedown = function(input) {
    this.tile = this.fields.friendly.getTile(input.position); // || this.fields.hostile.getTile(input.position)
    if (this.tile) {
      this.tiles.activated = this.tile;
      this.tiles.activated.activate();
      return true;
    } else {
      return false;
    }
    // this.fields.hostile.pingTile(input.position);
  }

  Battle.prototype.mouseup = function(input) {
    valid = true;

    this.tile = this.fields.friendly.getTile(input.position); // || this.fields.hostile.getTile(input.position)
    if (this.tile) {
      valid = true;
    } else {
      valid = false;
    }
    this.tiles.activated.reset();
    this.tiles.activated = null;
    this.tiles.highlighted.highlight();

    return valid
    // this.fields.hostile.pingTile(input.position);
  }

  Battle.prototype.command = function(input) {
    this.tile = null;
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
    valid = true;

    switch(input.key) {
      case "1":
        Game.setState("battle");
        break;
      default:
        valid = false;
    }

    return valid;
  }

  return {
    battle: new Battle,
    menu: new Menu
  }
})()