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
    expect(game.getDeck()).toBeInstanceOf(Deck);
    expect(game.getCurrentPlayer().getName()).toBe("Player");
    expect(game.getPlayers()[0].getName()).toBe("Player");
    expect(game.getPlayers()[1].getName()).toBe("Dealer");
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
    game.dealCards();
    game.switchPlayer();
    expect(game.getActivePlayer().getName()).toBe("Dealer");
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
    expect(game.getGameEnd()).toBeTruthy();
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
    expect(game.getDealer().getHandCards()[1].getIsHidden()).toBeFalsy();
    expect(game.getGameEnd()).toBeTruthy();
  });

  it("should draw", () => {
    deck = new Deck();
    // first for player then for dealer
    deck.dealCards = jest
      .fn()
      .mockReturnValueOnce([
        new Card("Ace", "Clubs"),
        new Card("King", "Diamonds"),
      ])
      .mockReturnValueOnce([
        new Card("Ace", "Hearts"),
        new Card("King", "Spades"),
      ]);
    game = new BlackjackGame(deck, players, 0);
    game.startGame();
    game.dealCards();
    expect(game.hasWinner()).toBeFalsy();
    expect(game.hasDraw()).toBeTruthy();
    expect(game.getDrawPlayers()[0].getName()).toBe("Player");
    expect(game.getDrawPlayers()[1].getName()).toBe("Dealer");
    expect(game.getGameEnd()).toBeTruthy();
  });

  it("should surrender", () => {
    game.startGame();
    game.dealCards();
    game.surrender();
    expect(game.getPlayers()[0].getIsSurrendered()).toBeTruthy();
    expect(game.hasWinner()).toBeFalsy();
    expect(game.hasDraw()).toBeFalsy();
  });

  it("should hit for one more card", () => {
    game.startGame();
    game.dealCards();
    game.hit();
    expect(game.getPlayers()[0].getHandCards()).toHaveLength(3);
  });

  it("should hit, bust and switch player", () => {
    deck = new Deck();
    deck.dealCards = jest
      .fn()
      .mockReturnValueOnce([
        new Card("7", "Clubs"),
        new Card("10", "Diamonds"),
        new Card("3", "Diamonds"),
      ])
      .mockReturnValueOnce([new Card("2", "Hearts"), new Card("5", "Spades")]);
    deck.dealCard = jest.fn().mockReturnValueOnce(new Card("2", "Spades"));
    game = new BlackjackGame(deck, players, 0);
    game.startGame();
    game.dealCards();
    game.hit();
    expect(game.getCurrentPlayer().getIsBusted()).toBeTruthy();
    expect(game.getActivePlayer().getName()).toBe("Dealer");
  });

  it("should stand", () => {
    game.startGame();
    game.dealCards();
    game.stand();
    expect(game.getActivePlayer().getName()).toBe("Dealer");
  });

  it("should hit and then stand", () => {
    game.startGame();
    game.dealCards();
    game.hit();
    game.stand();
    expect(game.getActivePlayer().getName()).toBe("Dealer");
  });

  it("should dealer hit", () => {
    game.startGame();
    game.dealCards();
    game.stand();
    expect(game.getActivePlayer().getName()).toBe("Dealer");
    let dealerHand = game.getActivePlayer().getHandCards();
    expect(dealerHand).toHaveLength(2);
    expect(dealerHand[0].getIsHidden()).toBeFalsy();
    expect(dealerHand[1].getIsHidden()).toBeFalsy();
    game.hit();
    dealerHand = game.getActivePlayer().getHandCards();
    expect(dealerHand).toHaveLength(3);
    expect(dealerHand[0].getIsHidden()).toBeFalsy();
    expect(dealerHand[1].getIsHidden()).toBeFalsy();
    expect(dealerHand[2].getIsHidden()).toBeFalsy();
  });

  it("should dealer stand and game end", () => {
    deck = new Deck();
    // first for player then for dealer
    deck.dealCards = jest
      .fn()
      .mockReturnValueOnce([
        new Card("Ace", "Clubs"),
        new Card("7", "Diamonds"),
      ])
      .mockReturnValueOnce([
        new Card("Ace", "Hearts"),
        new Card("8", "Spades"),
      ]);
    deck.dealCard = jest.fn().mockReturnValue(new Card("1", "Spades"));
    game = new BlackjackGame(deck, players, 0);

    game.startGame();
    game.dealCards();
    game.stand();
    game.stand();

    expect(game.getGameEnd()).toBeTruthy();
    expect(game.hasDraw()).toBeFalsy();
    expect(game.hasWinner()).toBeTruthy();
    expect(game.getWinner().getName()).toBe("Dealer");
    expect(game.getWinnerScore()).toBe(19);

    game.stand();
    expect(game.getActivePlayer().getName()).toBe("Dealer");
    game.hit();
    expect(game.getActivePlayer().getHandCards()).toHaveLength(2);
  });

  it("should reset game", () => {
    game.startGame();
    game.dealCards();
    game.stand();
    game.stand();
    expect(game.getGameEnd()).toBeTruthy();
    game.resetGame();

    expect(game.getGameEnd()).toBeFalsy();
    expect(game.getActivePlayer().getName()).toBe("Player");
    expect(game.getPlayers()[0].getHandCards()).toHaveLength(0);
    expect(game.getPlayers()[1].getHandCards()).toHaveLength(0);
    expect(game.getDeck().getCards()).toHaveLength(52);
    expect(game.hasDraw()).toBeFalsy();
    expect(game.hasWinner()).toBeFalsy();
    expect(game.getWinnerScore()).toBe(0);
  });
});
