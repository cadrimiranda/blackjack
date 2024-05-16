import { jest } from "@jest/globals";

import Deck from "./deck";
import BlackjackGame from "./game";
import Card from "./card";
import Player from "./player";

// Used this youtube video to help me understand how to write game logic tests:
// https://www.youtube.com/watch?v=xjqTIzYkGdI

describe("Blackjack Game logic", () => {
  let game;
  let deck;
  let players;

  beforeEach(() => {
    deck = new Deck();
    players = [new Player("Player"), new Player("Dealer")];
    game = new BlackjackGame(deck, players, 0);
  });

  it("should create a new game", () => {
    expect(game.getDeck()).toHaveLength(0);
    expect(game.getCurrentPlayer()).toBeNull();
    expect(game.getPlayers()).toEqual([undefined, undefined]);
  });

  it("should start a new game", () => {
    game.startGame();
    expect(game.getDeck()).toHaveLength(Deck.MAX_CARDS);
    expect(game.getPlayers()[0].getName()).toBe("Player");
    expect(game.getPlayers()[1].getName()).toBe("Dealer");
    expect(game.currentPlayer).toBe(game.getPlayers()[0]);
  });

  it("should deal cards to players", () => {
    game.startGame();
    game.dealCards();
    expect(game.getPlayers()[0].getHandCards()).toHaveLength(2);
    expect(game.getPlayers()[1].getHandCards()).toHaveLength(2);
    expect(game.getPlayers()[1].getHandCards()[1].isHidden).toBe(true);
  });

  it("should get the current player", () => {
    game.startGame();
    expect(game.getCurrentPlayer().getName()).toBe("Player");
  });

  it("should switch to the next player", () => {
    game.startGame();
    game.switchPlayer();
    expect(game.getCurrentPlayer().getName()).toBe("Dealer");
  });

  it("should player win with the 2 first cards", () => {
    deck = new Deck();
    // first for player then for dealer
    deck.dealCards = jest
      .fn()
      .mockReturnValueOnce([
        new Card("Ace", "Hearts"),
        new Card("King", "Spades"),
      ])
      .mockReturnValueOnce([
        new Card("Ace", "Clubs"),
        new Card("2", "Diamonds"),
      ]);
    game = new BlackjackGame(deck, players, 0);
    game.startGame();
    game.dealCards();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.hasDraw()).toBeFalsy();
    expect(game.getWinner().getName()).toBe("Player");
  });

  it("should dealer win with the 2 first cards", () => {
    deck = new Deck();
    // first for player then for dealer
    deck.dealCards = jest
      .fn()
      .mockReturnValueOnce([
        new Card("Ace", "Clubs"),
        new Card("2", "Diamonds"),
      ])
      .mockReturnValueOnce([
        new Card("Ace", "Hearts"),
        new Card("King", "Spades"),
      ]);
    game = new BlackjackGame(deck, players, 0);
    game.startGame();
    game.dealCards();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.hasDraw()).toBeFalsy();
    expect(game.getWinner().getName()).toBe("Dealer");
  });

  it("should draw", () => {
    deck = new Deck();
    // first for player then for dealer
    deck.dealCards = jest
      .fn()
      .mockReturnValueOnce([
        new Card("Ace", "Clubs"),
        new Card("2", "Diamonds"),
      ])
      .mockReturnValueOnce([
        new Card("Ace", "Hearts"),
        new Card("King", "Spades"),
      ]);
    game = new BlackjackGame(deck, players, 0);
    game.startGame();
    game.dealCards();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.hasDraw()).toBeTruthy();
    expect(game.getDraw()[0].getName()).toBe("Player");
    expect(game.getDraw()[1].getName()).toBe("Dealer");
  });
});
