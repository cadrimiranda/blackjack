import Card from "./card.js";

class Deck {
  suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  deck = [];
  static MAX_CARDS = 52;

  constructor() {
    this.initialize();
    this.shuffle();
  }

  initialize() {
    this.deck = [];
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        this.deck.push(new Card(rank, suit));
      });
    });
  }

  //Fisher-Yates Shuffle Algorithm
  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  getCards() {
    return this.deck;
  }

  dealCard() {
    return this.deck.pop();
  }

  dealCards(numberToRetrieve) {
    return this.deck.splice(0, numberToRetrieve);
  }

  reset() {
    this.initialize();
    this.shuffle();
  }
}

export default Deck;
