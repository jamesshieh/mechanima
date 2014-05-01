function Equip() {

};

// expects options hash
// option.stats: stat array
// option.abilities: array of abilities granted by item
// option.slot: equipment slot type used
equipFactory = function(options) {
  equip = new Equip();
  equip.stats = [options.str, options.dex, options.int, options.vit];
  equip.abilities = options.abilities;
  equip.slot = option.slots;

  return equip;
}
