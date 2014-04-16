function Weapon() {};

Weapon.prototype.damage = function() {
  switch (this.damage_type) {
    case "normal":
      return function(stats) {
        randomIntFromInterval(this.damage_min, this.damage_max) * ((100 + stats.strength )/ 100);
      };
      break;
    case "magic":
      return function(stats) {
        randomIntFromInterval(this.damage_min, this.damage_max) * ((100 + stats.intelligence )/ 100);
      };
      break;
  };
};

weaponFactory = function(options) {
  var weapon = new Weapon();

  var weapon_type = weapon.getType(options.weapon_type);
  var weapon_damage = weapon.getDamage(options.weapon_damage);

  return weapon;
};