class Card {

  static flipedCards = [];

  constructor(cardClassName) {
    this.allCards = document.querySelectorAll(cardClassName);
    this.allCards.forEach((card) =>
      card.addEventListener("click", () => this.flipCard(card))
    );
    this.hasBeenFlipped = false;
    
  }

  flipCard(card) {
    card.classList.toggle("flip");

    if (!this.hasBeenFlipped) {
      // first time ?
      this.hasBeenFlipped = true;
      Card.flipedCards[0] = card;

      console.table(this.hasBeenFlipped, Card.flipedCards[0]);
    }
  }
}
