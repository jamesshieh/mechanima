function Tile() {
  this.entity = null;
  this.tile_sprite = null;
};

Tile.prototype.set = function(entity) {
  this.entity = entity;
};

Tile.prototype.get = function() {
  return this.entity;
};

tileFactory = function(options) {
  var tile = new Tile();
  tile.entity = options.entity;
  tile.tile_sprite = options.tile_sprite;

  // further tile modifications...

  return tile
};
