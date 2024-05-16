import Card from "./card";

describe("Card", () => {
  let card;

  beforeEach(() => {
    card = new Card("Spades", "Ace");
  });

  it("should have a suit", () => {
    expect(card.getSuit()).toBe("Spades");
  });

  it("should have a rank", () => {
    expect(card.getRank()).toBe("Ace");
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
    expect(card.getRank()).toBe("King");
  });

  it("should allow setting the hidden state", () => {
    card.setIsHidden(true);
    expect(card.getIsHidden()).toBe(true);
  });
});
