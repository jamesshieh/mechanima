function Equipment() {};

Equipment.prototype.damage = function(weapontype) {
  return weapontype();
};

equipmentFactory = function(options) {
  var equipment = new Equipment();

  return equipment;
};

