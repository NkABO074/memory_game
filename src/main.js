const cards = document.querySelectorAll(".memory_card");
const scoreDisplay = document.querySelector("#score");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.cats === secondCard.dataset.cats;
  if (isMatch) {
    disableCards(); // Call only on match
    scoreCalculation(true);
  } else {
    scoreCalculation(false);
    unflipCards();
  }
}

function disableCards() {
  // firstCard.removeEventListener("click", flipCard);
  // secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("hide");
  secondCard.classList.add("hide");

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function scoreCalculation(desition) {
  if (desition) {
    score += 10;
  } else {
    score -= 5;
  }

  if (score <= 0) {
    score = 0;
  }

  scoreDisplay.textContent = "Score: " + score;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
