/* Field Array Setup:
      T O P

F     C  0  1  2  3
R   R
O   0    0  1  2  3
N   1    4  5  6  7
T   2    8  9  10 11
    3    12 13 14 15 

*/
function Field() {};

//Init field with a 16 length formation array and 16 length terrain sprite array
Field.prototype.initializeField = function(formation, terrain) {
  this.field = new Array(16);

  for (i=0; i < 16; i++) {
    this.field[i] = new tileFactory({ entity:formation[i], tile_sprite: terrain[i] });
  };
}

//Return a tile at position xy
Field.prototype.getTile = function(x,y) {
  return this.field[x+y*4];
};

//Set a tile at position xy
Field.prototype.setTile = function(x,y,entity) {
  getTile(x,y).set(entity);
};

//Fetch entity from a tile at position xy
Field.prototype.getTileEntity = function(x,y,entity) { 
  getTile(x,y).get(entity);
};

//Move a unit from xy to xy
Field.prototype.move = function(x1,y1,x2,y2) {
  initial = getTile(x1,y1);
  target = getTile(x2,y2);

  if(target.empty) {}
}

//Fetch row x
Field.prototype.getRow = function(x) {
  return this.field.filter(function(x,i) { 
    var min = x*4;
    var max = (x+1)*4-1;
    return i >= min||i <= max;
  }); 
};

//Fetch column y
Field.prototype.getColumn = function(y) {
  return this.field.filter(function(y,i) {
    return i%4 == y
  });
};

//Return the tiles that can be selected for a particular move type
Field.prototype.getPossibleMoves = function(x, y, target_type) {
  switch (target_type) {
    case "melee":
      for (tile in this.getRow(x)) {
        if (tile.entity != null) {
          return tile;
        };
      };
      break;
    case "ranged":
      return this.getRow(x)
      break;
  };

};

//Field Factory
fieldFactory = function(options) {
  var field = new Field();

  field.initializeField(options.formation, options.terrain);

  return field;
};
