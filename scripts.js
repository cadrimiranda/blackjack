window.onload = function () {
  const title = document.createElement("h1");
  title.textContent = "Blackjack";

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";

  const body = document.querySelector(".blackjack");
  body.appendChild(title);
  body.appendChild(startButton);
};
