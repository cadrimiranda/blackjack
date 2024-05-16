import Deck from "./deck";
import Card from "./card";

const MAX_CARDS = 52;

describe("Deck", () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it("should initialize with 52 cards", () => {
    expect(deck.getCards()).toHaveLength(MAX_CARDS);
  });

  it("should shuffle the deck", () => {
    const originalCards = [...deck.getCards()];
    deck.shuffle();
    const shuffledCards = deck.getCards();
    expect(shuffledCards).not.toStrictEqual(originalCards);
  });

  it("should deal a card", () => {
    const card = deck.dealCard();
    expect(card).toBeInstanceOf(Card);
    expect(deck.getCards()).toHaveLength(MAX_CARDS - 1);
  });

  it("should deal more than one card", () => {
    const numberToRetrieve = Math.floor(Math.random() * 10) + 2;
    const cards = deck.dealCards(numberToRetrieve);
    expect(cards).toHaveLength(numberToRetrieve);
    expect(deck.getCards()).toHaveLength(MAX_CARDS - numberToRetrieve);
  });

  it("should reset the deck", () => {
    deck.shuffle();
    deck.dealCards(2);
    deck.reset();
    expect(deck.getCards()).toHaveLength(MAX_CARDS);
  });
});
