 move = abilityFactory({
   animation: "animation",
   targets: "emptyTiles",
   effects: [
     ["meleeSingleTarget", "move"]
   ]
 });


var friendly_formation = 
[null,"test","test","test",
null,"test","test","test",
"test",null,"test","test",
"test","test","test","test"];

var hostile_formation  = 
["test","test","test","test",
"test","test","test","test",
"test","test","test","test",
"test","test","test","test"];

var friendly_terrain = 
["grass","grass","grass","grass",
"grass","grass","grass","grass",
"grass","grass","grass","grass",
"grass","grass","grass","grass"];

var hostile_terrain = 
["grass","grass","grass","grass",
"grass","grass","grass","grass",
"grass","grass","grass","grass",
"grass","grass","grass","grass"];

var friendly_field_options = { 
  reverse: false,
  formation: friendly_formation,
  terrain: friendly_terrain
}

var hostile_field_options = { 
  reverse: true,
  formation: hostile_formation,
  terrain: hostile_terrain
}

