abilityFactory = (function() {
  var helpers = {
    aoe: {

    },

    targets: {

    },

    action: {

    }

  }

  function Ability() {
    this.effects = [];
  }
  Ability.prototype.animate = function() {
    console.log(this.animation);
  }

  function abilityFactory(options) {
    var ability = new Ability();

    // abilities options
    // {
    //   animation: { animation stuff... }
    //   targets: target_helper_key,
    //   effects: [
    //     [aoe_helper_key_1, action_helper_key_1],
    //     [aoe_helper_key_2, action_helper_key_2],
    //     ...
    //   ]
    // }
    ability.animation = options.animation
    ability.targets = helpers.targets[options.aoe];
    for (var i = 0; i < options.effects.length; i++) {
      ability.effects.push({
        aoe: options.aoe[0],
        action: options.action[1]
      });
    }

    return ability;
  }
  return abilityFactory;
})();