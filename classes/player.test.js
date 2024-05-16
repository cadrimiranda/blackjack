import Player from "./player";
import Card from "./card";

describe("Player", () => {
  let player;

  beforeEach(() => {
    player = new Player("John");
  });

  it("should initialize with a name", () => {
    expect(player.name).toBe("John");
  });

  it("should add a card to the player's hand", () => {
    expect(player.getHandCards()).toHaveLength(0);
    player.addCard(new Card("Ace", "Spades"));
    expect(player.getHandCards()).toHaveLength(1);
  });

  it("should return the player's hand cards", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("King", "Hearts"));
    const [card1, card2] = player.getHandCards();
    expect(card1).toBeInstanceOf(Card);
    expect(card1.toString()).toBe("Ace of Spades");
    expect(card2).toBeInstanceOf(Card);
    expect(card2.toString()).toBe("King of Hearts");
  });
});
