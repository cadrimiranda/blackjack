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
    this.winnerScore = 0;
    this.gameEnd = false;
  }

  getGameEnd() {
    return this.gameEnd;
  }

  getDrawPlayers() {
    return this.drawPlayers;
  }

  getWinner() {
    return this.winner;
  }

  getWinnerScore() {
    return this.winnerScore;
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

  clearDraw() {
    this.drawPlayers = [];
    this.isDraw = false;
  }

  addDrawPlayer(player) {
    if (!this.hasDraw() && this.hasWinner()) {
      this.drawPlayers.push(this.winner);
      this.isDraw = true;
      this.clearWinner();
    }
    this.drawPlayers.push(player);
  }

  setWinner(player) {
    this.winner = player;
    this.winnerScore = player.getHandTotal();
    this.isWinner = true;
  }

  clearWinner() {
    this.winner = null;
    this.winnerScore = 0;
    this.isWinner = false;
  }

  verifyGameEnd() {
    if (this.gameEnd) {
      return;
    }

    if (this.activePlayerIndex === this.players.length - 1) {
      this.gameEnd = true;
      this.players.forEach((player) => {
        if (!player.getIsSurrendered() && !player.getIsBusted()) {
          if (player.getHandTotal() > this.winnerScore) {
            this.setWinner(player);
            this.clearDraw();
          } else if (player.getHandTotal() === this.winnerScore) {
            this.addDrawPlayer(player);
          }
        }
      });
    }
  }

  handleWinnerDraw(player) {
    if (player.getHasBlackJack()) {
      if (this.hasWinner()) {
        this.addDrawPlayer(player);
      } else {
        this.setWinner(player);
      }
    }
  }

  dealCards() {
    if (this.gameEnd) {
      return;
    }

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

  isDealerPlaying() {
    return this.activePlayer.getName() === "Dealer";
  }

  switchPlayer() {
    if (this.isDealerPlaying()) {
      this.verifyGameEnd();
      return;
    }

    this.activePlayerIndex = this.activePlayerIndex += 1;
    this.activePlayer = this.players[this.activePlayerIndex];

    if (this.isDealerPlaying()) {
      this.activePlayer.getHandCards()[1].setIsHidden(false);
    }
  }

  surrender() {
    if (this.gameEnd) {
      return;
    }

    this.activePlayer.setIsSurrendered();
    this.switchPlayer();
  }

  hit() {
    if (this.gameEnd) {
      return;
    }

    let card = this.deck.dealCard();
    this.activePlayer.addCard(card);
  }

  stand() {
    if (this.gameEnd) {
      return;
    }

    this.switchPlayer();
  }
}

export default BlackjackGame;
