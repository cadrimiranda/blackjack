import Deck from "./deck";

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
    const originalCards = deck.getCards();
    deck.shuffle();
    const shuffledCards = deck.getCards();
    expect(shuffledCards).not.toEqual(originalCards);
  });

  it("should deal a card", () => {
    const card = deck.deal();
    expect(card).toBeInstanceOf(Card);
    expect(deck.getCards()).toHaveLength(MAX_CARDS - 1);
  });

  it("should deal more than one card", () => {
    const numberToRetrieve = 5;
    const cards = deck.deals(numberToRetrieve);
    expect(cards).toHaveLength(numberToRetrieve);
    expect(deck.getCards()).toHaveLength(MAX_CARDS - numberToRetrieve);
  });

  it("should reset the deck", () => {
    deck.shuffle();
    deck.deals(10);
    deck.reset();
    expect(deck.getCards()).toHaveLength(52);
  });
});
