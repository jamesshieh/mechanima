abilityFactory = (function() {
  var helpers = {
    aoe: {
      meleeSingleTarget: function(field, x, y) { 
        return field[x+y*4];
      },
      columnThreeCleave: function(field, x, y) {
        var valid;
        field[y+1], field[y-1];
      },
      fullRowPierce: function(field, x, y) {
        return helpers.targeting.getRow(field, x); 
      }
      
    },

    targets: {
      //takes in opposite field and target x y
      meleeSingleTarget: function(field, x, y) { 
        var valid;
        var targets = this.get_row(field, x);
        for (tile in targets) {
          valid.push(tile);
          if (!tile.empty) {
            break;
          }
        };
        return valid;
      },
      //Ranged hit any in a row
      rangedSingleTarget: function(field, x, y) {
        return this.get_row(field, x);
      },
      getRow: function(field, x) {
        var row;
        switch (x) 
        {
        case 1:
          row = field.tiles.slice(0,3);
          break;
        case 2:
          row = field.tiles.slice(4,7);
          break;
        case 3:
          row = field.tiles.slice(8,11);
          break;
        case 4:
          row = field.tiles.slice(12,15);
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

    },

    action: {
      damage: function(dmg, target) {
        target.damage(dmg);
      }

    }

  }

  function Ability() {
    this.effects = [];
  }
  Ability.prototype.animate = function() {
  }

  function abilityFactory(options) {
    var ability = new Ability();

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
    ability.animation = options.animation
    ability.targets = helpers.targets[options.aoe];
    for (var i = 0; i < options.effects.length; i++) {
      ability.effects.push({
        aoe: options.effects[0],
        action: options.effects[1]
      });
    }

    return ability;
  }
  return abilityFactory;
})(); 