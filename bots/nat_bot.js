/*
Each planet attacks the planet with the lowest combined distance and hp
*/

class NatBot {
  action(your_state, world_state, helper) {
    var actions = new Set();
    var otherPlanets = helper.getOtherPlayer(your_state, "Planet");

    // Do nothing
    if (otherPlanets.size == 0) return actions;



    your_state.get("Planet").forEach((item, id) => {
      
      if (item.get("Health") > 0) {
        let action = new Map();
        let pop = ~~(item.get("Health") / 2);

        action.set("Health", pop);
        action.set("Type", "Attack");
        action.set("Source ID", id);
        action.set("Source Type", "Planet");

        var targetId =  NatBot.weakestPlanet(helper, otherPlanets, id);
        action.set("Target", targetId);

        actions.add(action);
      }
    });

    return actions;
  }
  
  static weakestPlanet(helper, otherPlanets, sourceID) {
    var healthDistFactor = false;
    var target = null;

    for (var otherID of otherPlanets) {
      let hp = otherID.hp ;
      let dist = helper.getDistance("Planet", sourceID, otherID);
      let newFactor = hp + dist * dist;
      if (healthDistFactor === false || newFactor < healthDistFactor) {
        target = otherID;
        healthDistFactor = newFactor;
      }
    }

    return target;
  }
}
