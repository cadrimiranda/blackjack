class Card {
  constructor(rank, suit, isHidden = false) {
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
    if (this.rank === "King") {
      return "K";
    }

    if (this.rank === "Queen") {
      return "Q";
    }

    if (this.rank === "Jack") {
      return "J";
    }

    if (this.rank === "Ace") {
      return "A";
    }

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
    if (this.isHidden) {
      return "Hidden";
    }

    return `${this.rank} of ${this.suit}`;
  }

  getValue() {
    if (this.rank === "Ace") {
      return 11;
    }

    if (["King", "Queen", "Jack"].includes(this.rank)) {
      return 10;
    }

    return Number.parseInt(this.rank);
  }
}

export default Card;
