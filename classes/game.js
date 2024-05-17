export class BlackjackGame {
  constructor(deck, players, currentPlayer) {
    this.deck = deck;
    this.players = players;
    this.currentPlayer = players[currentPlayer];
    this.currentPlayerIndex = currentPlayer;
    this.activePlayer = players[0];
    this.activePlayerIndex = 0;
    this.isWinner = false;
    this.isDraw = false;
    this.drawPlayers = [];
    this.winner = null;
    this.gameEnd = false;
  }

  getDrawPlayers() {
    return this.drawPlayers;
  }

  getWinner() {
    return this.winner;
  }

  hasWinner() {
    return this.isWinner;
  }

  hasDraw() {
    return this.isDraw;
  }

  getDeck() {
    return this.deck;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  getPlayers() {
    return this.players;
  }

  startGame() {
    this.deck.shuffle();
    this.players.forEach((player) => {
      player.clearHand();
    });
    this.currentPlayer = this.players[this.currentPlayerIndex];
  }

  verifyGameEnd() {
    if (this.activePlayerIndex === this.players.length - 1) {
      this.gameEnd = true;
    }
  }

  handleWinnerDraw(player) {
    if (player.getHasBlackJack()) {
      if (this.hasWinner()) {
        if (!this.hasDraw()) {
          this.drawPlayers.push(this.winner);
          this.isDraw = true;
        }
        this.drawPlayers.push(player);
      } else {
        this.isWinner = true;
        this.winner = player;
      }
    }
  }

  dealCards() {
    let cards;
    this.players.forEach((player) => {
      cards = this.deck.dealCards(2);
      if (player.getName() === "Dealer") {
        cards[1].setIsHidden(true);
      }
      player.setHand(cards);
      this.handleWinnerDraw(player);
    });
  }

  switchPlayer() {
    this.activePlayerIndex = this.activePlayerIndex += 1;
    this.activePlayer = this.players[this.activePlayerIndex];

    if (this.activePlayer.getName() === "Dealer") {
      this.activePlayer.getHandCards()[1].setIsHidden(false);
    }
  }

  surrender() {
    this.activePlayer.setIsSurrendered();
    this.switchPlayer();
  }

  hit() {
    let card = this.deck.dealCard();
    this.activePlayer.addCard(card);
  }

  stand() {
    this.switchPlayer();
  }
}

export default BlackjackGame;