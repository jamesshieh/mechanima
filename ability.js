abilityFactory = (function() {
  var helpers = {
    aoe: {
      meleeSingleTarget: function(field, x, y) { 
        return targetingHelpers.getTile(field, x, y);
      },
      columnThreeCleave: function(field, x, y) {
        var valid;
        field.tiles[y+1], field.tiles[y], field.tiles[y-1];
      },
      fullRowPierce: function(field, x, y) {
        return targetingHelpers.getRow(field, x, y); 
      }
      
    },

    targets: {
      //takes in opposite field and target x y
      meleeSingleTarget: function(field, x, y) { 
        var valid = [];
        var targets = this.targetingHelpers.getRow(field, x, y);
        for (var i = 0; i < targets.length; i++) {
          valid.push(targets[i]);
          if (!targets[i].empty()) {
            break;
          }
        };
        return valid;
      },
      //Ranged hit any in a row
      rangedSingleTarget: function(field, x, y) {
        return this.targetingHelpers.getRow(field, x, y);
      },
      //All Empty Tiles
      emptyTiles: function(field, x, y) {
        return this.targetingHelpers.getEmpty(field, x, y);
      },
      //All occupied Tiles
      occupiedTiles: function(field, x, y) {
        return this.targetingHelpers.getOccupied(field, x, y);
      },
      //All Tiles
      allTiles: function(field, x, y) {
        return this.targetingHelpers.getAll(field, x, y);
      }
    },

    action: {
      damage: function(dmg, target) {
        target.damage(dmg);
      },
      move: function(field, aoe, cx, cy, tx, ty) {
        var entity = targetingHelpers.getTile(field, cx, cy);
        var target = aoe(field, tx, ty);
        if (target.empty()) {
          target.set(entity);
          return true;
        };
        return false;
      }
    }
  };

  var targetingHelpers = {
    getRow: function(field, x, y) {
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
    getColumn: function(field, x, y) {
      var column;
      for (var i;i < field.tiles.length;i++) {
        if (i % 4 == y) {
          column.push(field.tiles[i]);
        };
      };
      return column;
    },
    getTile: function(field, x, y) {
      return field.tiles[x+y*4];
    },
    getAll: function(field, x, y) {
      return field.tiles;
    },
    getEmpty: function(field, x, y) {
      var valid = [];
      for (var i = 0; i < field.tiles.length; i++) {
        if (field.tiles[i].empty()) {
          valid.push(field.tiles[i]);
        };
      };
      return valid;
    },
    getOccupied: function(field, x, y) {
      var valid = [];
        for (var i = 0; i < field.tiles.length; i++) {
          if (!field.tiles[i].empty()) {
            valid.push(field.tiles[i]);
          };
        };
      return valid;
    }
  };
  

  function Ability() {
    this.effects = [];
  };

  Ability.prototype.animate = function() {
  };

  Ability.prototype.execute = function(field, cx, cy, tx, ty) {
    for (var i = 0; i < this.effects.length; i++) {
      (this.effects[i].action(field, this.effects[i].aoe, cx, cy, tx, ty)) ? console.log("Command Executed") : console.log("Command Failure");
    };
  };

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
    ability.targetingHelpers = targetingHelpers;
    for (var i = 0; i < options.effects.length; i++) {
      ability.effects.push({
        aoe: helpers.aoe[options.effects[i][0]],
        action: helpers.action[options.effects[i][1]]
      });
    };

    return ability;
  }
  return abilityFactory;
})(); 