class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.isBusted = false;
    this.hasBlackJack = false;
    this.score = 0;
  }

  getIsBusted() {
    return this.isBusted;
  }

  getScore() {
    return this.score;
  }

  getHasBlackJack() {
    return this.hasBlackJack;
  }

  addCard(cards) {
    this.hand.push(cards);
    this.calculateHand();
  }

  getHandCards() {
    return this.hand;
  }

  calculateHand() {
    let total = 0;
    let hasAce = false;
    for (let card of this.hand) {
      total += card.getValue();
      if (card.rank === "Ace") {
        hasAce = true;
      }
    }

    if (total > 21 && hasAce) {
      total -= 10;
    }

    if (total > 21) {
      this.isBusted = true;
    }

    if (total === 21) {
      this.hasBlackJack = true;
    }

    this.score = total;
  }

  getHandTotal() {
    this.calculateHand();
    return this.score;
  }
}

export default Player;
