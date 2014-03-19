//initialize empty home formation
var home = new Array();
for (var i = 0; i < 16; i++){
  home.push(new Tile('None', i%4,Math.floor(i/4)))
}

//initialize empty visitor formation
var visitor = new Array();
for (var i = 0; i < 16; i++){
  visitor.push(new Tile('None', i%4,Math.floor(i/4)))
}

//entire battlefield proto
function BattleField(home, visitor){
  this.home = new BattleGrid(home)
  this.visitor = new BattleGrid(visitor)
}

//BattleGrid proto
function BattleGrid(grid){
  this.grid = grid
  this.getTile = function getTile(x,y) {
   return this.grid[x+y*4]
  }
  this.insert = function insert(entity, x, y){
    var curTile = this.getTile(x,y)
    curTile.entity = entity
  }
  for (k in grid) 
}

//tile proto
function Tile(entity, x, y) {
  this.entity = entity
  this.x = x
  this.y = y
}

//entity proto
function Entity(type, damage, hp) {
  this.type = type
  if (type == 'Soldier') {
    this.attack_type = 'Melee'
  }
  else if (type == 'Ranger') {
    this.attack_type = 'Ranged'
  }
  this.damage = damage
  this.hp = hp
}