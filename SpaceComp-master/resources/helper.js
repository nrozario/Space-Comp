class Helper {
  constructor(active, events, alivePlayers) {
    this.active = active;
    this.events = events;
    this.alivePlayers = alivePlayers;
  }

  getYourState(owner) {
    let your_state = new Map();

    this.active.forEach((item, i) => {
      your_state.set(i, item.exportOwner(owner));
    });

    return your_state;
  }

  getOtherPlayer(your_state, type) {
    // Return a set of IDs
    // type is "Planet" or "Ship"

    const my_planets = new Set(your_state.get(type).keys());
    const all_planets = new Set(this.getWorldState().get(type).keys());

    var other_planets = new Set();
    all_planets.forEach((item, i) => {
      if (!my_planets.has(i)) {
        other_planets.add(i);
      }
    });

    return other_planets;
  }

  getDistance(type, idOne, idTwo) {
    return this.active.get(type).getDistance(idOne, idTwo);
  }

  getPlanetShipDistance(planetID, shipID) {
    const planet = this.active.get("Planet").find(planetID);
    const ship = this.active.get("Ship").find(shipID);

    return planet.rect.dist(ship.rect) - planet.radius;
  }

  getPlanetDelay(planetID, ship) {
    // Return seconds required for ship to reach planet
    const planet = this.active.get("Planet").find(planetID);
    const dist = planet.rect.dist(ship.rect) - planet.radius;

    return Math.max(0, dist / ship.SPEED);
  }

  getWorldState() {
    let world_state = new Map();
    this.active.forEach((item, i) => {
      world_state.set(i, item.exportAll());
    });

    world_state.set("Events", this.events);
    world_state.set("Alive Players", this.alivePlayers);

    return world_state;
  }

  shipCollided(shipID) {
    const destId = this.active.get("Ship").find(shipID).targetID;
    const dest = this.active.get("Planet").find(destId);

    return inCircle(dest.rect, ...this.active.get("Ship").find(id).rect.center());
  }
}
