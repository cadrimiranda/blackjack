class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCard(cards) {
    this.hand.push(cards);
  }

  getHandCards() {
    return this.hand;
  }
}

export default Player;
