 move = Battle.abilityFactory({
   animation: "animation",
   targets: "emptyTiles",
   effects: [
     ["meleeSingleTarget", "move"]
   ]
 });

 attack =  abilityFactory({
   animation: "animation",
   targets: "meleeSingleTarget",
   effects: [
     ["meleeSingleTarget", "damage"]
   ]
 });
 
var friendly_formation = 
[null,"test1","test2","test3",
null,"test4","test5","test6",
null,null,"test7","test8",
null,null,null,null];

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

