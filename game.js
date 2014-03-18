//initialize empty home formation
var home = new Array();
for (var i = 0; i < 16; i++){
  home.push(new tile('None', i%4,Math.floor(i/4)))
}

//initialize empty visitor formation
var visitor = new Array();
for (var i = 0; i < 16; i++){
  visitor.push(new tile('None', i%4,Math.floor(i/4)))
}

//entire battlefield proto
function battlefield(home, visitor){
  this.home = new battlegrid(home)
  this.visitor = new battlegrid(visitor)
}

//battlegrid proto
function battlegrid(grid){
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
function tile(entity, x, y) {
  this.entity = entity
  this.x = x
  this.y = y
}

//entity proto
function entity(type, damage, hp) {
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