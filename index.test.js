import { findByText, fireEvent, getByText } from "@testing-library/dom";
import Render from "./classes/render";
import Deck from "./classes/deck";
import Card from "./classes/card";
import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
// global.window.body = dom.window.document.body;

import { jest } from "@jest/globals";

describe("Render", () => {
  let render;
  let container;
  beforeEach(() => {
    render = new Render();
    render.body = dom.window.document.body;
    render.renderInitialPage();
    container = render.body;
  });

  afterEach(() => {
    dom.window.document.body.innerHTML = "";
  });

  it("should render a heading", async () => {
    expect(getByText(container, "Blackjack")).toBeInTheDocument();
  });

  it("should render a button to start the game", () => {
    expect(getByText(container, "Start Game")).toBeInTheDocument();
  });

  describe("during game", () => {
    const startGame = () => {
      fireEvent.click(getByText(container, "Start Game"));
    };

    const mockCardsNotBlackjack = () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([new Card("3", "Hearts"), new Card("3", "Spades")])
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ]);
      render.game.deck = deck;
    };

    it("should render a button to reset the game", () => {
      startGame();
      expect(getByText(container, "Reset")).toBeInTheDocument();
    });

    it("should render a button to hit", () => {
      startGame();
      expect(getByText(container, "Hit")).toBeInTheDocument();
    });

    it("should render a button to stand", () => {
      startGame();
      expect(getByText(container, "Stand")).toBeInTheDocument();
    });

    it("should render a button to surrender", () => {
      startGame();
      expect(getByText(container, "Surrender")).toBeInTheDocument();
    });

    it("should render the player's hand", () => {
      startGame();
      expect(getByText(container, "Player Hand")).toBeInTheDocument();
    });

    it("should render the dealer's hand", () => {
      startGame();
      expect(getByText(container, "Dealer Hand")).toBeInTheDocument();
    });

    it("should render 4 initial cards", () => {
      startGame();
      expect(container.querySelectorAll(".card")).toHaveLength(4);
    });

    it("should render 2 cards for the player", () => {
      startGame();
      expect(container.querySelectorAll("#Player .card")).toHaveLength(2);
    });

    it("should render 2 cards for the dealer", () => {
      mockCardsNotBlackjack();
      startGame();
      const dealerCards = container.querySelectorAll("#Dealer .card");
      expect(dealerCards).toHaveLength(2);
      expect(dealerCards[1]).toHaveTextContent("?");
    });

    it("should render the player score and hidden dealer score", () => {
      mockCardsNotBlackjack();
      startGame();
      let score = container.querySelector("#score-Player");
      expect(score).toHaveTextContent("Score: 6");
      score = container.querySelector("#score-Dealer");
      expect(score).toHaveTextContent("Score: 0");
    });

    it("should hit and render a new card", () => {
      mockCardsNotBlackjack();
      startGame();
      fireEvent.click(getByText(container, "Hit"));
      expect(container.querySelectorAll("#Player .card")).toHaveLength(3);
    });

    it("should stand and show dealer score and unhide card", () => {
      mockCardsNotBlackjack();
      startGame();
      fireEvent.click(getByText(container, "Stand"));
      expect(container.querySelectorAll("#Player .card")).toHaveLength(2);
      expect(container.querySelectorAll("#Dealer .card")).toHaveLength(2);

      const dealerCards = container.querySelectorAll("#Dealer .card");
      expect(dealerCards).toHaveLength(2);
      expect(dealerCards[1]).not.toHaveTextContent("?");

      expect(container.querySelector("#score-Dealer")).toHaveTextContent(
        "Score: 4"
      );
    });

    it("should dealer hit be able to hit", () => {
      mockCardsNotBlackjack();
      startGame();
      fireEvent.click(getByText(container, "Stand"));
      fireEvent.click(getByText(container, "Hit"));
      expect(container.querySelectorAll("#Dealer .card")).toHaveLength(3);
    });

    it("should surrender and end the game", () => {
      mockCardsNotBlackjack();
      startGame();
      fireEvent.click(getByText(container, "Surrender"));
      let status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("Surrendered!");
      status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
    });

    it("should dealer surrender and player win", () => {
      mockCardsNotBlackjack();
      startGame();
      fireEvent.click(getByText(container, "Stand"));
      fireEvent.click(getByText(container, "Surrender"));
      let status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("Surrendered!");
      status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
    });

    it("should player blackjack", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([
          new Card("Ace", "Hearts"),
          new Card("Jack", "Spades"),
        ])
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ]);
      render.game.deck = deck;
      startGame();
      let status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
    });

    it("should dealer blackjack", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ])
        .mockReturnValueOnce([
          new Card("Ace", "Hearts"),
          new Card("Jack", "Spades"),
        ]);
      render.game.deck = deck;
      startGame();
      let status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
    });

    it("should player hit and win", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([new Card("9", "Hearts"), new Card("9", "Spades")])
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ]);
      deck.dealCard = jest.fn().mockReturnValueOnce(new Card("3", "Spades"));
      render.game.deck = deck;
      startGame();
      fireEvent.click(getByText(container, "Hit"));
      let status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
    });

    it("should player hit and lose", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([new Card("9", "Hearts"), new Card("9", "Spades")])
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ]);
      deck.dealCard = jest.fn().mockReturnValueOnce(new Card("10", "Spades"));
      render.game.deck = deck;
      startGame();
      fireEvent.click(getByText(container, "Hit"));
      let status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
      status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("Busted");
    });

    it("should dealer hit and win", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ])
        .mockReturnValueOnce([
          new Card("9", "Hearts"),
          new Card("9", "Spades"),
        ]);
      deck.dealCard = jest.fn().mockReturnValueOnce(new Card("3", "Spades"));
      render.game.deck = deck;
      startGame();
      fireEvent.click(getByText(container, "Stand"));
      fireEvent.click(getByText(container, "Hit"));
      let status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
    });

    it("should dealer hit and lose", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ])
        .mockReturnValueOnce([
          new Card("9", "Hearts"),
          new Card("9", "Spades"),
        ]);
      deck.dealCard = jest.fn().mockReturnValueOnce(new Card("10", "Spades"));
      render.game.deck = deck;
      startGame();
      fireEvent.click(getByText(container, "Stand"));
      fireEvent.click(getByText(container, "Hit"));
      let status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("WINNER WINNER CHIKEN DINER!");
      status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("Busted");
    });

    it("should draw", () => {
      let deck = new Deck();
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
      render.game.deck = deck;
      startGame();
      let status = container.querySelector("#status-Player");
      expect(status).toHaveTextContent("Draw");
      status = container.querySelector("#status-Dealer");
      expect(status).toHaveTextContent("Draw");
    });

    it("should reset", () => {
      let deck = new Deck();
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ])
        .mockReturnValueOnce([
          new Card("9", "Hearts"),
          new Card("9", "Spades"),
        ]);
      deck.dealCard = jest.fn().mockReturnValue(new Card("2", "Spades"));
      render.game.deck = deck;
      startGame();
      fireEvent.click(getByText(container, "Hit"));
      fireEvent.click(getByText(container, "Stand"));
      fireEvent.click(getByText(container, "Hit"));
      fireEvent.click(getByText(container, "Stand"));
      deck.dealCards = jest
        .fn()
        .mockReturnValueOnce([
          new Card("2", "Clubs"),
          new Card("2", "Diamonds"),
        ])
        .mockReturnValueOnce([
          new Card("9", "Hearts"),
          new Card("9", "Spades"),
        ]);
      fireEvent.click(getByText(container, "Reset"));

      expect(container.querySelectorAll("#Player .card")).toHaveLength(2);
      const dealerCards = container.querySelectorAll("#Dealer .card");
      expect(dealerCards).toHaveLength(2);
      expect(dealerCards[1]).toHaveTextContent("?");
    });
  });
});
