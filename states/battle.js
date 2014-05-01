Game.states = (function(states) {
  var valid;
  var BattleState = function() {
    this.tile = null;
    this.tiles = {
      selected: null,
      highlighted: null
    }
  };

  BattleState.prototype.initialize = function() {
    this.fields = {
      friendly: Battle.fieldFactory(friendly_field_options),
      hostile: Battle.fieldFactory(hostile_field_options)
    }
  }

  BattleState.prototype.update = function() {
  };

  BattleState.prototype.render = function(context) {
    this.fields.friendly.render(context, false);
    this.fields.hostile.render(context, true);
  };

  BattleState.prototype.keydown = function(input) {
    valid = true;

    switch(input.key) {
      case "2":
        Game.setState("menu");
        break;
      case "3":
        Game.setState("overworld");
        break;
      default:
        valid = false;
    }
    return valid;
  }

  BattleState.prototype.mousemove = function(input) {
    this.tile = this.fields.friendly.getTile(input.position) || this.fields.hostile.getTile(input.position)
    if (this.tiles.highlighted) {
      this.tiles.highlighted.reset();
      if (this.tiles.selected) {
        this.tiles.selected.select();
      }
    }
    if (this.tile) {
      this.tiles.highlighted = this.tile; 
      this.tiles.highlighted.highlight();
    }
  }

  BattleState.prototype.mousedown = function(input) {
    this.tile = this.fields.friendly.getTile(input.position) || this.fields.hostile.getTile(input.position)
    if (this.tile) {
      this.tiles.selected = this.tile;
      this.tiles.selected.select();
      return true;
    } else {
      return false;
    }
  }

  BattleState.prototype.mouseup = function(input) {
    valid = true;

    this.tile = this.fields.friendly.getTile(input.position) || this.fields.hostile.getTile(input.position)
    if (this.tile) {
      valid = true;
    } else {
      valid = false;
    }

    if (this.tiles.selected) {
      this.tiles.selected.reset();
      this.tiles.selected = null;

      if (this.tiles.highlighted) {
        this.tiles.highlighted.highlight();
      }
    }

    return valid
  }

  BattleState.prototype.command = function(input) {
    this.tile = null;
    return this[input.type] && this[input.type](input);
  }

  states.battle = new BattleState;
  return states;
})(Game.states || {})
  