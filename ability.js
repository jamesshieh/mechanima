abilityFactory = (function() {
  var helpers = {
    aoe: {
      meleeSingleTarget: function(field, x, y) { 
        return field.tiles[x+y*4];
      },
      columnThreeCleave: function(field, x, y) {
        var valid;
        field.tiles[y+1], field.tiles[y], field.tiles[y-1];
      },
      fullRowPierce: function(field, x, y) {
        return helpers.getRow(field, x); 
      }
      
    },

    targets: {
      //takes in opposite field and target x y
      meleeSingleTarget: function(field, x, y) { 
        var valid = [];
        console.log(this.helpers);
        var targets = this.helpers.getRow(field, x);
        console.log(targets);
        for (i in targets) {
          console.log(targets[i]);
          valid.push(targets[i]);
          if (!targets[i].empty()) {
            break;
          }
        };
        return valid;
      },
      //Ranged hit any in a row
      rangedSingleTarget: function(field, x, y) {
        return this.helpers.getRow(field, x);
      },
      //All Empty Tiles
      emptyTiles: function(field) {
        var valid = [];
        for (i in field.tiles) {
          if (field.tiles[i].empty()) {
            valid.push(field.tiles[i]);
          };
        };
        return valid;
      },
      //All occupied Tiles
      occupiedTiles: function(field) {
        var valid = [];
        for (i in field.tiles) {
          if (!field.tiles[i].empty()) {
            valid.push(field.tiles[i]);
          };
        };
        return valid;
      },
      //All Tiles
      allTiles: function(field) {
        return field.tiles;
      }
    },

    action: {
      damage: function(dmg, target) {
        target.damage(dmg);
      },
      move: function(field) {

      }
    }
  };

  var helpers2 = {
    getRow: function(field, x) {
      var row;
      switch (x) 
      {
      case 0:
        row = field.tiles.slice(0,4);
        break;
      case 1:
        row = field.tiles.slice(4,8);
        break;
      case 2:
        row = field.tiles.slice(8,12);
        break;
      case 3:
        row = field.tiles.slice(12,16);
        break;
      };
      return row;
    },
    getColumn: function(field, y) {
      var column;
      for (var i;i < field.tiles.length;i++) {
        if (i % 4 == y) {
          column.push(field.tiles[i]);
        };
      };
      return column;
    }
  };
  

  function Ability() {
    this.effects = [];
  }
  Ability.prototype.animate = function() {
  }

  function abilityFactory(options) {
    var ability = new Ability();
    console.log("INITIALIZING ABILITY");

    // abilities options
    // {
    //   animation: { animation stuff... }
    //   targets: target_helper_key,
    //   effects: [
    //     [aoe_helper_key_1, action_helper_key_1],
    //     [aoe_helper_key_2, action_helper_key_2],
    //     ...
    //   ]
    // }
    ability.animation = options.animation;
    ability.targets = helpers.targets[options.targets];
    ability.helpers = helpers2;
    for (var i = 0; i < options.effects.length; i++) {
      ability.effects.push({
        aoe: options.effects[0],
        action: options.effects[1]
      });
    };

    return ability;
  }
  return abilityFactory;
})(); 