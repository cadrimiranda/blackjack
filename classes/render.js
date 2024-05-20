import Deck from "./deck.js";
import BlackjackGame from "./game.js";
import Player from "./player.js";

class Render {
  SPADE = "&#9824;";
  HEART = "&#9829;";
  DIAMOND = "&#9830;";
  CLUB = "&#9827;";

  constructor() {
    const deck = new Deck();
    const players = [new Player("Player"), new Player("Dealer")];
    const game = new BlackjackGame(deck, players, 0);
    this.body = document.querySelector(".blackjack");
    this.game = game;
  }

  renderInitialPage = () => {
    const title = document.createElement("h1");
    title.textContent = "Blackjack";
    title.classList.add("intro-title");

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-game");
    startButton.addEventListener("click", this.startGame);

    this.body.appendChild(title);
    this.body.appendChild(startButton);
  };

  clearScreen = () => {
    this.body.innerHTML = "";
  };

  renderCard = (card) => {
    const suit = card.getSuit();
    const rank = card.getRank();
    const isHidden = card.getIsHidden();

    let suitIcon;
    switch (suit) {
      case "Spades":
        suitIcon = this.SPADE;
        break;
      case "Hearts":
        suitIcon = this.HEART;
        break;
      case "Diamonds":
        suitIcon = this.DIAMOND;
        break;
      case "Clubs":
        suitIcon = this.CLUB;
        break;
      default:
        suitIcon = "";
    }

    if (isHidden) {
      return `<ul class="card card-hidden">
        <div class="card-content">
        <div class="card-icon">?</div>
            <p class="suit top-left">?</p>
            <p class="suit bottom-right">?</p>
        </div>
    </ul>`;
    }

    return `<ul class="card ${suit}">
        <div class="card-content">
            <div class="card-icon">${suitIcon}</div>
            <p class="suit top-left">${rank}<span>${suitIcon}</span></p>
            <p class="suit bottom-right">${rank}<span>${suitIcon}</span></p>
        </div>
    </ul>`;
  };

  getIsPlayerActive = (player) => {
    return this.game.getActivePlayer().getName() === player.getName();
  };

  getHandClassname = (player) => {
    let handClassname = "player-hand-cards";
    if (this.getIsPlayerActive(player)) {
      handClassname += " active-hand";
    }
    return handClassname;
  };

  renderHand = (player) => {
    return `<li class="${this.getHandClassname(player)}">${player
      .getHandCards()
      .map(this.renderCard)
      .join(" ")}</li>`;
  };

  renderScore = (player) => {
    return `<p>Score: ${player.getScore()}</p>`;
  };

  renderPlayerStatus = (player) => {
    let message = null;
    if (player.getIsBusted()) {
      message = `Busted!`;
    }
    if (player.getHasBlackJack()) {
      message = `Blackjack!`;
    }
    if (player.getIsSurrendered()) {
      message = `Surrendered!`;
    }

    if (
      this.game.hasWinner() &&
      this.game.getWinner().getName() === player.getName()
    ) {
      message = `WINNER WINNER CHIKEN DINER!`;
    }

    if (
      this.game.hasDraw() &&
      this.game.getDrawPlayers().some((p) => p.getName() === player.getName())
    ) {
      return `Draw!`;
    }

    if (message === null) return "";

    return `<p class="player-status">${message}</p>`;
  };

  renderActionButton = (id, text) => {
    const isGameEnd = this.game.getGameEnd();
    return `<button
              class="action-button"
              id="${id}"
              ${isGameEnd ? "disabled" : ""}
            >${text}</button>`;
  };

  renderPlayerActions = () => `
    <div class="player-actions">
      ${this.renderActionButton("hit-button", "Hit")}
      ${this.renderActionButton("stand-button", "Stand")}
      ${this.renderActionButton("surrender-button", "Surrender")}
      <button
        id="reset-button"
        class="action-button"
      >Reset</button>
    </div>
  `;

  renderPlayer = (player) => {
    return `
    <div class="hand" id="player-hand">
        <h2>${player.getName()} Hand</h2>
        ${this.renderScore(player)}
        ${this.renderHand(player)}
        ${this.renderPlayerStatus(player)}
    </div>
    ${this.getIsPlayerActive(player) ? this.renderPlayerActions() : ""}`;
  };

  renderGame = () => {
    this.clearScreen();

    const htmlString = `
      <div class="container">
        <h1>Blackjack Game</h1>
        ${this.renderPlayer(this.game.getDealer())}
        ${this.renderPlayer(this.game.getCurrentPlayer())}
      </div>
    `;

    this.body.innerHTML += htmlString;
    this.playGame();
  };

  startGame = () => {
    this.game.startGame();
    this.game.dealCards();
    this.renderGame();
  };

  hit = () => {
    this.game.hit();
    this.renderGame();
  };

  stand = () => {
    this.game.stand();
    this.renderGame();
  };

  surrender = () => {
    this.game.surrender();
    this.renderGame();
  };

  reset = () => {
    this.game.resetGame();
    this.startGame();
  };

  playGame = () => {
    const hitButton = document.getElementById("hit-button");
    const standButton = document.getElementById("stand-button");
    const surrenderButton = document.getElementById("surrender-button");
    const resetButton = document.getElementById("reset-button");

    hitButton.addEventListener("click", this.hit);
    standButton.addEventListener("click", this.stand);
    surrenderButton.addEventListener("click", this.surrender);
    resetButton.addEventListener("click", this.reset);
  };
}

export default Render;
