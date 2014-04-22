fieldFactory = (function() {
  var spacing = 100;
  var reverse_offset = 500;

  function Field() {
    this.tiles = [];
  }

  // offset_x: how far to the right to render
  // reverse:  reverse coordinates boolean
  Field.prototype.render = function(context, reverse) {
    var offset_x, offset_y;
    for (var i = 0; i < 16; i++) {
      offset_x = i % 4 * spacing;
      offset_y = Math.floor(i / 4) * spacing;

      if (reverse) {
        // reverse, then also add spacing to offset for reverse
        offset_x = reverse_offset + (4 * spacing) - offset_x;
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
    if (Math.floor(position.x % 100) > 90 || Math.floor(position.y % 100) > 90) {
      return null
    }

    x = parseInt(position.x / 100);
    y = parseInt(position.y / 100);

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

  function fieldFactory(options) {
    var field = new Field();

    field.reverse = options.reverse;
    console.log(options.formation[1]);
    for (var i = 0; i < 16; i++) {
      field.tiles.push(tileFactory({ entity: options.formation[i], tile_sprite: options.terrain[i] }));
    }

    return field;
  }

  return fieldFactory;
})();



/* Field Array Setup:
      T O P

F     C  0  1  2  3
R   R
O   0    0  1  2  3
N   1    4  5  6  7
T   2    8  9  10 11
    3    12 13 14 15 

*/
// function Field() {};

// //Init field with a 16 length formation array and 16 length terrain sprite array
// Field.prototype.initializeField = function(formation, terrain) {
//   this.field = new Array(16);

//   for (i=0; i < 16; i++) {
//     this.field[i] = tileFactory({ entity:formation[i], tile_sprite: terrain[i] });
//   };
// }

// //Return a tile at position xy
// Field.prototype.getTile = function(x,y) {
//   return this.field[x+y*4];
// };

// //Set a tile at position xy
// Field.prototype.setTile = function(x,y,entity) {
//   getTile(x,y).set(entity);
// };

// //Fetch entity from a tile at position xy
// Field.prototype.getTileEntity = function(x,y,entity) { 
//   getTile(x,y).get(entity);
// };

// //Move a unit from xy to xy
// Field.prototype.move = function(x1,y1,x2,y2) {
//   initial = getTile(x1,y1);
//   target = getTile(x2,y2);

//   if (target.empty) {
//     target.set(initial.remove);
//   }
//   else {
//     return "Target Occupied";
//   };
// };

// //Fetch row x
// Field.prototype.getRow = function(x) {
//   return this.field.filter(function(x,i) { 
//     var min = x*4;
//     var max = (x+1)*4-1;
//     return i >= min||i <= max;
//   }); 
// };

// //Fetch column y
// Field.prototype.getColumn = function(y) {
//   return this.field.filter(function(y,i) {
//     return i%4 == y
//   });
// };

// //Return the tiles that can be selected for a particular move type
// Field.prototype.getPossibleMoves = function(x, y, target_type) {
//   switch (target_type) {
//     case "melee":
//       for (tile in this.getRow(x)) {
//         if (tile.entity != null) {
//           return tile;
//         };
//       };
//       break;
//     case "ranged":
//       return this.getRow(x)
//       break;
//   };

// };

// //Field Factory
// fieldFactory = function(options) {
//   var field = new Field();

//   field.initializeField(options.formation, options.terrain);

//   return field;
// };
