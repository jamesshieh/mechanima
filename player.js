function Player() {};

Player.prototype.formation = function () {

};

Player.prototype.insert = function (character, x, y) {
  this.formation[x+y*4] = character;
};

Player.prototype.remove = function (character, x, y) {
  this.formation[x+y*4] = null;

};

playerFactory = function(options) {
  var player = new Player();

  this.characters = {};
  this.formation = options.formation;

  return player;
};