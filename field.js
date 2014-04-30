fieldFactory = (function() {
  console.log("FIELD MODULE LOADED");
  var TILE_SPACING   = 100;
  var TILE_SIZE      = 90;
  var REVERSE_OFFSET = 500;
  var i;

  function Tile(offset_x, offset_y, contents, terrain) {
    this.contents = contents;
    this.terrain = terrain;
    this.state = 0;

    this.offset_x = offset_x;
    this.offset_y = offset_y;
  };

  Tile.prototype.select = function() {
    this.state = 2;
  };

  Tile.prototype.highlight = function() {
    if (this.state < 1) {
      this.state = 1;
      return true
    } else {
      return false
    };
  };

  Tile.prototype.render = function(context, reverse) {
    switch(this.state) {
      case 0: // default state
        context.rect(this.offset_x, this.offset_y, TILE_SIZE, TILE_SIZE);
        context.stroke();
        break;

      case 1: // highlighted state
        context.fillStyle = "#FFFF00";
        context.fillRect(this.offset_x, this.offset_y, TILE_SIZE, TILE_SIZE);
        break;

      case 2: // selected state
        context.fillStyle = "#FF0000";
        context.fillRect(this.offset_x, this.offset_y, TILE_SIZE, TILE_SIZE);
        break;

    };
  };

  Tile.prototype.clear = function() {
    this.contents = null;
  };

  Tile.prototype.set = function(entity) {
    this.contents = entity;
  };

  Tile.prototype.reset = function() {
    this.state = 0;
  };

  Tile.prototype.empty = function() {
    return this.contents == null;
  };

  function Field() {
    this.tiles = [];
  };

  // offset_x: how far to the right to render
  // reverse:  reverse coordinates boolean
  Field.prototype.render = function(context, reverse) {
    for (i = 0; i < 16; i++) {
      this.tiles[i].render(context, reverse);
    }
  }
  // debugging
  Field.prototype.pingTile = function(position) {
    var tile = this.getTile(position);
  }

  Field.prototype.getTile = function(position) {
    // skip over cracks inbetween tiles
    if (Math.floor(position.x % TILE_SPACING) > TILE_SIZE || Math.floor(position.y % TILE_SPACING) > TILE_SIZE) {
      return null
    }


    if (this.reverse) {
      x = parseInt((REVERSE_OFFSET + (TILE_SPACING * 5) - position.x)/TILE_SPACING);
    } else {
      x = parseInt(position.x / TILE_SPACING);
    }

    y = parseInt(position.y / TILE_SPACING);

    // only check within possible bounds
    if (x > 3 || x < 0 || y > 3 || y < 0) {
      return null
    }

    return this.tiles[x + (y * 4)];
  };

  Field.prototype.initialize = function(formation) {
    for (i = 0; i < 16; i++) {
      this.tiles[i].contents = formation[i];
    };
  };

  function fieldFactory(options) {
    var field = new Field();
    field.reverse = options.reverse;
    for (i = 0; i < 16; i++) {
      offset_x = i % 4 * TILE_SPACING;
      offset_y = Math.floor(i / 4) * TILE_SPACING;

      if (field.reverse) {
        // reverse, then also add spacing to offset for reverse
        offset_x = REVERSE_OFFSET + (4 * TILE_SPACING) - offset_x;
      }
      field.tiles.push(new Tile(offset_x, offset_y, options.formation[i], options.terrain[i]));
    }

    return field;
  };

  return fieldFactory;
})()