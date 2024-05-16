class Card {
  constructor(suit, rank, isHidden = false) {
    this.suit = suit;
    this.rank = rank;
    this.isHidden = isHidden;
  }

  getSuit() {
    return this.suit;
  }

  setSuit(value) {
    this.suit = value;
  }

  getRank() {
    return this.rank;
  }

  setRank(value) {
    this.rank = value;
  }

  getIsHidden() {
    return this.isHidden;
  }

  setIsHidden(value) {
    this.isHidden = value;
  }

  toString() {
    return `${this.suit} of ${this.rank}`;
  }
}

export default Card;
