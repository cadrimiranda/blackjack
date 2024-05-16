import { findByText, fireEvent, getByText } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { getContainer } from "./utils/test";

let container;

describe("before game start", () => {
  beforeEach(async () => {
    container = await getContainer();
  });

  it("should render a heading", async () => {
    expect(getByText(container, "Blackjack")).toBeInTheDocument();
  });

  it("should render a button to start the game", () => {
    expect(getByText(container, "Start Game")).toBeInTheDocument();
  });
});

describe("during game", () => {
  beforeEach(() => {
    container = getContainer();
    fireEvent.click(getByText(container, "Start game"));
  });

  it("should render a button to deal the cards", () => {
    expect(getByText(container, "Deal")).toBeInTheDocument();
  });

  it("should render a button to reset the game", () => {
    expect(getByText(container, "Reset game")).toBeInTheDocument();
  });

  it("should render a button to hit", () => {
    expect(getByText(container, "Hit")).toBeInTheDocument();
  });

  it("should render a button to stand", () => {
    expect(getByText(container, "Stand")).toBeInTheDocument();
  });

  it("should render a button to double down", () => {
    expect(getByText(container, "Double down")).toBeInTheDocument();
  });

  it("should render a button to split", () => {
    expect(getByText(container, "Split")).toBeInTheDocument();
  });

  it("should render a button to surrender", () => {
    expect(getByText(container, "Surrender")).toBeInTheDocument();
  });

  it("should render a button to insure", () => {
    expect(getByText(container, "Insure")).toBeInTheDocument();
  });

  it("should render the player's hand total", () => {
    expect(getByText(container, "Player: 0")).toBeInTheDocument();
  });

  it("should render the dealer's hand total", () => {
    expect(getByText(container, "Dealer: 0")).toBeInTheDocument();
  });

  it("should render the player's hand", () => {
    expect(getByText(container, "Player")).toBeInTheDocument();
  });

  it("should render 2 cards for the player", () => {
    expect(container.querySelectorAll(".player-card")).toHaveLength(2);
  });

  it("should render the dealer's hand", () => {
    expect(getByText(container, "Dealer")).toBeInTheDocument();
  });

  it("should render 2 cards for the dealer", () => {
    const dealerCards = container.querySelectorAll(".dealer-card");
    expect(dealerCards).toHaveLength(2);
    expect(dealerCards[0]).toHaveTextContent("?"); // The first card is hidden
  });
});
