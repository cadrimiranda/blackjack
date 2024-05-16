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

  it("should return player black jack with Ace and King", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("King", "Hearts"));
    expect(player.getHandTotal()).toBe(21);
  });

  it("should return player black jack with Ace and Queen", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("Queen", "Hearts"));
    expect(player.getHandTotal()).toBe(21);
  });

  it("should return player black jack with Ace and Jack", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("Jack", "Hearts"));
    expect(player.getHandTotal()).toBe(21);
  });

  it("should return player black jack with Ace and 10", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("10", "Hearts"));
    expect(player.getHandTotal()).toBe(21);
  });

  it("should return ace with 1 point when player hand would bust", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("9", "Hearts"));
    player.addCard(new Card("9", "Spades"));
    expect(player.getHandTotal()).toBe(19);
  });

  it("should return ace with 11 points when player hand would not bust", () => {
    player.addCard(new Card("Ace", "Spades"));
    player.addCard(new Card("9", "Hearts"));
    expect(player.getHandTotal()).toBe(20);
  });

  it("should return bust when player hand is over 21", () => {
    player.addCard(new Card("10", "Spades"));
    player.addCard(new Card("10", "Hearts"));
    player.addCard(new Card("2", "Diamonds"));
    expect(player.getHandTotal()).toBe(22);
  });
});
