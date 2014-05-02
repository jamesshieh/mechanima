Battle.abilityFactory = (function() {
  var helpers = {
    aoe: {
      meleeSingleTarget: function(field, cord) { 
        return targetingHelpers.getTile(field, cord);
      },
      columnThreeCleave: function(field, cord) {
        var valid;
        field.tiles[cord + 4], field.tiles[cord], field.tiles[cord - 4];
      },
      fullRowPierce: function(field, cord) {
        return targetingHelpers.getRow(field, cord); 
      }
      
    },

    targets: {
      //takes in opposite field and target x y
      meleeSingleTarget: function(field, cord) { 
        var valid = [];
        var targets = this.targetingHelpers.getRow(field, cord);
        for (var i = 0; i < targets.length; i++) {
          valid.push(targets[i]);
          if (!targets[i].empty()) {
            break;
          }
        };
        return valid;
      },
      //Ranged hit any in a row
      rangedSingleTarget: function(field, cord) {
        return this.targetingHelpers.getRow(field, cord);
      },
      //All Empty Tiles
      emptyTiles: function(field, cord) {
        return this.targetingHelpers.getEmpty(field, cord);
      },
      //All occupied Tiles
      occupiedTiles: function(field, cord) {
        return this.targetingHelpers.getOccupied(field, cord);
      },
      //All Tiles
      allTiles: function(field, cord) {
        return this.targetingHelpers.getAll(field, cord);
      }
    },

    action: {
      damage: function(field, aoe, options) {
        targetingHelpers.getTile(field, options.c_cord).damage(options.dmg);
      },
      move: function(field, aoe, c_cord, t_cord) {
        var entity = targetingHelpers.getTile(field, c_cord);
        var target = aoe(field, t_cord);
        if (target.empty()) {
          target.set(entity);
          return true;
        };
        return false;
      }
    }
  };

  var targetingHelpers = {
    getRow: function(field, cord) {
      var row;
      switch (Math.floor(cord/4)) 
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
    getColumn: function(field, cord) {
      var column;
      for (var i;i < field.tiles.length;i++) {
        if (i % 4 == cord % 4) {
          column.push(field.tiles[i]);
        };
      };
      return column;
    },
    getTile: function(field, cord) {
      return field.tiles[cord];
    },
    getAll: function(field, cord) {
      return field.tiles;
    },
    getEmpty: function(field, cord) {
      var valid = [];
      for (var i = 0; i < field.tiles.length; i++) {
        if (field.tiles[i].empty()) {
          valid.push(field.tiles[i]);
        };
      };
      return valid;
    },
    getOccupied: function(field, cord) {
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

  Ability.prototype.execute = function(fields, c_cord, t_cord) {
    var field = (this.is_friendly) ? fields.friendly : fields.hostile;
    for (var i = 0; i < this.effects.length; i++) {
      (this.effects[i].action(field, this.effects[i].aoe, c_cord, t_cord)) ? console.log("Command Executed") : console.log("Command Failure");
    };
  };

  Ability.prototype.getTargets = function(fields, cord) {
    var field = (this.is_friendly) ? fields.friendly : fields.hostile;
    console.log(this.targets(field, cord))
    return this.targets(field, cord);
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
    ability.is_friendly = options.is_friendly;
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