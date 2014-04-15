//Tile Object
function Tile() {
  this.entity = null;
  this.tile_sprite = null;
};

//Set the tile entity
Tile.prototype.set = function(entity) {
  this.entity = entity;
};

//Get the tile entity
Tile.prototype.get = function() {
  return this.entity;
};

//Clear current tile and return entity if occupied
Tile.prototype.remove = function() {
  curr = this.entity;
  this.entity = null;
  return curr;
};

//Is empty?
Tile.prototype.empty = function() {
  this.entity == null ? true : false;
};

//Tile Factory
tileFactory = function(options) {
  var tile = new Tile();

  tile.entity = options.entity;
  tile.tile_sprite = options.tile_sprite;

  return tile
};
