//Battle Object
function Battle() {};

//Set up the two fields at the beginning of battle
Battle.prototype.initializeBattle = function(left_formation, right_formation, left_terrain, right_terrain) {
  this.left_field = fieldFactory({ formation: left_formation, terrain: left_terrain });
  this.right_field = fieldFactory({ formation: right_formation, terrain : right_terrain });

};

//Handle a move command
Battle.prototype.move = function(player,x1,y1,x2,y2) {
  switch (player) {
    case "Left":
      left_formation.move(x1,y1,x2,y2);
    case "Right":
      right_formation.move(x1,y1,x2,y2);
  };
};

//Battle Factory
battleFactory = function(options) {
  var battle = new Battle();

  battle.initializeBattle(left_formation, right_formation, left_terrain, right_terrain);

  return battle;
};