class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.isBusted = false;
    this.isSurrender = false;
    this.hasBlackJack = false;
    this.score = 0;
  }

  setIsSurrendered() {
    this.isSurrender = true;
  }

  getIsSurrender() {
    return this.isSurrender;
  }

  getName() {
    return this.name;
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

  addCard(card) {
    this.hand.push(card);
    this.calculateHand();
  }

  setHand(cards) {
    this.hand = cards;
    this.calculateHand();
  }

  getHandCards() {
    return this.hand;
  }

  calculateHand() {
    let total = 0;
    let aceCount = 0;
    for (let card of this.hand) {
      total += card.getValue();
      if (card.rank === "Ace") {
        aceCount += 1;
      }
    }

    if (total > 21) {
      total -= aceCount * 10;
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

  clearHand() {
    this.hand = [];
    this.isBusted = false;
    this.hasBlackJack = false;
    this.score = 0;
  }
}

export default Player;
