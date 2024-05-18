import Card from "./card";

describe("Card", () => {
  let card;

  beforeEach(() => {
    card = new Card("Ace", "Spades");
  });

  it("should have a suit", () => {
    expect(card.getSuit()).toBe("Spades");
  });

  it("should have a rank", () => {
    expect(card.getRank()).toBe("A");
  });

  it("should not be hidden by default", () => {
    expect(card.getIsHidden()).toBe(false);
  });

  it("should allow setting a new suit", () => {
    card.setSuit("Hearts");
    expect(card.getSuit()).toBe("Hearts");
  });

  it("should allow setting a new rank", () => {
    card.setRank("King");
    expect(card.getRank()).toBe("K");
  });

  it("should allow setting the hidden state", () => {
    card.setIsHidden(true);
    expect(card.getIsHidden()).toBe(true);
  });

  it("should return a string representation of the card", () => {
    expect(card.toString()).toBe("Ace of Spades");
  });

  it("should return a string representation of the card when hidden", () => {
    card.setIsHidden(true);
    expect(card.toString()).toBe("Hidden");
  });

  it("should return King, Queen, Jack for the face cards", () => {
    card.setRank("King");
    expect(card.getRank()).toBe("K");
    card.setRank("Queen");
    expect(card.getRank()).toBe("Q");
    card.setRank("Jack");
    expect(card.getRank()).toBe("J");
    card.setRank("Ace");
    expect(card.getRank()).toBe("A");
  });

  it("should return the card value for Ace, King, Queen and Jack", () => {
    card.setRank("Ace");
    expect(card.getValue()).toBe(11);
    card.setRank("King");
    expect(card.getValue()).toBe(10);
    card.setRank("Queen");
    expect(card.getValue()).toBe(10);
    card.setRank("Jack");
    expect(card.getValue()).toBe(10);
  });

  it("should return the card value for 2-10", () => {
    card.setRank("2");
    expect(card.getValue()).toBe(2);
    card.setRank("3");
    expect(card.getValue()).toBe(3);
    card.setRank("4");
    expect(card.getValue()).toBe(4);
    card.setRank("5");
    expect(card.getValue()).toBe(5);
    card.setRank("6");
    expect(card.getValue()).toBe(6);
    card.setRank("7");
    expect(card.getValue()).toBe(7);
    card.setRank("8");
    expect(card.getValue()).toBe(8);
    card.setRank("9");
    expect(card.getValue()).toBe(9);
    card.setRank("10");
    expect(card.getValue()).toBe(10);
  });
});
