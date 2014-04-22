tileFactory = (function () {
  //Tile Object
  function Tile() {};

  //rendering functions
  Tile.prototype.activate = function() {
    this.state = 1;
  };

  Tile.prototype.render = function(context, offset_x, offset_y, reverse) {
    switch(this.state) {
      case 0: // default state
      context.rect(offset_x, offset_y, 90, 90);
      context.stroke();
        break;

      case 1: // activated state
      console.log("cool");
      context.fillStyle = "#FF0000";
      context.fillRect(offset_x,offset_y,90,90);
        break;

    }
  };

  Tile.prototype.reset = function() {
    this.state = 0;
  };

  //logic funtions

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

    tile.state = 0;
    tile.entity = options.entity || null;
    tile.tile_sprite = options.tile_sprite || null;

    return tile;
  };

  return tileFactory();
})();
