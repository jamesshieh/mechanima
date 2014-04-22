fieldFactory = (function() {
  var TILE_SPACING = 100;
  var TILE_SIZE = 90;
  var REVERSE_OFFSET = 500;

  function Tile() {
    this.contents = null;
    this.state = 0;
  }

  Tile.prototype.activate = function() {
    console.log("ACTIVATED");
    this.state = 2;
  }

  Tile.prototype.highlight = function() {
    if (this.state < 1) {
      this.state = 1;
      return true
    } else {
      return false
    }
  }

  Tile.prototype.render = function(context, offset_x, offset_y, reverse) {
    switch(this.state) {
      case 0: // default state
        context.rect(offset_x, offset_y, TILE_SIZE, TILE_SIZE);
        context.stroke();
        break;

      case 1: // highlighted state
        context.fillStyle = "#FFFF00";
        context.fillRect(offset_x, offset_y, TILE_SIZE, TILE_SIZE);
        break;

      case 2: // activated state
        context.fillStyle = "#FF0000";
        context.fillRect(offset_x, offset_y, TILE_SIZE, TILE_SIZE);
        break;

    }
  }

  Tile.prototype.clear = function() {
    this.contents = null;
  }

  Tile.prototype.reset = function() {
    this.state = 0;
  }

  function Field() {
    this.tiles = [];
  }

  // offset_x: how far to the right to render
  // reverse:  reverse coordinates boolean
  Field.prototype.render = function(context, reverse) {
    var offset_x, offset_y;
    for (var i = 0; i < 16; i++) {
      offset_x = i % 4 * TILE_SPACING;
      offset_y = Math.floor(i / 4) * TILE_SPACING;

      if (reverse) {
        // reverse, then also add spacing to offset for reverse
        offset_x = REVERSE_OFFSET + (4 * TILE_SPACING) - offset_x;
      }

      this.tiles[i].render(context, offset_x, offset_y, reverse);
    }
  }
  // debugging
  Field.prototype.pingTile = function(position) {
    var tile = this.getTile(position);
    console.log((this.reversed ? "H" : "F") +   ": " + this.tiles.indexOf(tile));
  }

  Field.prototype.getTile = function(position) {
    // skip over cracks inbetween tiles
    if (Math.floor(position.x % TILE_SPACING) > TILE_SIZE || Math.floor(position.y % TILE_SPACING) > TILE_SIZE) {
      return null
    }

    x = parseInt(position.x / TILE_SPACING);
    y = parseInt(position.y / TILE_SPACING);

    // only check within possible bounds
    if (x > 3 || y > 3) {
      return null
    }

    return this.tiles[x + (y * 4)];
  }

  Field.prototype.initialize = function(formation) {
    for (var i = 0; i < 16; i++) {
      this.tiles[i].contents = formation[i];
    }
  }

  function fieldFactory(reverse) {
    var field = new Field();

    field.reverse = reverse;
    for (var i = 0; i < 16; i++) {
      field.tiles.push(new Tile());
    }

    return field;
  }

  return fieldFactory;
})()