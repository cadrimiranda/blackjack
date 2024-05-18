import Deck from "./deck.js";
import BlackjackGame from "./game.js";
import Player from "./player.js";

class Render {
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

  renderWinnerOrDrawMessage = () => {
    const hasWinner = this.game.hasWinner();
    const winner = this.game.getWinner();
    const hasDraw = this.game.hasDraw();
    const drawPlayers = this.game.getDrawPlayers();
    let message = "";

    if (hasWinner) {
      return `<span>WINNER WINNER CHIKEN DINER!!!!!!! ${winner.getName()} wins!</span>`;
    } else if (hasDraw) {
      return `<span>It's a draw between ${drawPlayers[0].getName()} and ${drawPlayers[1].getName()}!</span>`;
    }
  };

  renderGame = () => {
    this.clearScreen();
    const isGameEnd = this.game.getGameEnd();

    const htmlString = `<div class="container">
        <h1>Blackjack Game</h1>
        ${
          isGameEnd
            ? this.renderWinnerOrDrawMessage()
            : `<p>Turn: ${this.game.getActivePlayer().getName()}</p>`
        }
        
        <div class="hand" id="dealer-hand">
            <h2>Dealer's Hand</h2>
            <div id="dealer-hand">${this.game
              .getDealer()
              .getHandCards()
              .map((x) => `<span>${x.toString()}</span>`)}</div>
            <h3>Your Score: ${this.game.getDealer().getScore()}<h3>
        </div>
        <div class="hand" id="player-hand">
            <h2>Your Hand ${
              this.game.getPlayers()[0].getIsBusted() ? "BUSTED" : ""
            }</h2>
            <div id="player-hand">
            ${this.game
              .getPlayers()[0]
              .getHandCards()
              .map((x) => `<span>${x.toString()}</span>`)}
            </div>
            <h3>Your Score: ${this.game.getPlayers()[0].getScore()}</h3>
        </div>
        <div class="buttons">
            <button ${isGameEnd ? "disabled" : ""} id="hit-button">Hit</button>
            <button ${
              isGameEnd ? "disabled" : ""
            } id="stand-button">Stand</button>
            <button ${
              isGameEnd ? "disabled" : ""
            } id="surrender-button">Surrender</button>
        </div>
      <div id="message"></div>`;

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
    this.surrender();
  };

  playGame = () => {
    const hitButton = document.getElementById("hit-button");
    const standButton = document.getElementById("stand-button");
    const surrenderButton = document.getElementById("surrender-button");

    hitButton.addEventListener("click", this.hit);
    standButton.addEventListener("click", this.stand);
    surrenderButton.addEventListener("click", this.surrender);
  };
}

export default Render;
