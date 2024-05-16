class Render {
  static renderInitialPage = () => {
    const title = document.createElement("h1");
    title.textContent = "Blackjack";

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-game");

    const body = document.querySelector(".blackjack");
    body.appendChild(title);
    body.appendChild(startButton);
  };
}

export default Render;
