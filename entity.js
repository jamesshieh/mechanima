//Entity Object

function Entity() {};

Entity.prototype.heal = function(n) {
  this.hp += n;
  this.hp > this.maxHp ? this.hp = this.maxHp : this.hp;
  return this.hp;
};

Entity.prototype.damage = function(n) {
  this.hp -= n;
  this.hp <= 0 ? this.death() 
};

Entity.prototype.alive = function(n) {
  return this.hp > 0 ? true : false;
};

Entity.prototype.initializeEntity = function() {
  this.maxHp = stats.vitality * 10;
  this.maxMp = stats.wisdom * 10;
  this.hp = this.maxHp, this.mp = this.maxMp;
  this.critical = (stats.dexterity * 3.5 + stats.agility * 2);
  this.evasion = (stats.dexterity * 1.5 + stats.agility * 3);
  this.maxAp = stats.agility * 1.5;
};

entityFactory = function(options) {
  var entity = new Entity();

  //stats = { strength, dexterity, vitality, intelligence, wisdom, agility }
  var stats = options.stats;
  var ap;

  entity.initializeEntity(options.entity_type);

  return entity;
};