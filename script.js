const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

const emojis = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑', '🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
let shuffledEmojis = [];
let flippedCards = [];
let matchedPairs = 0;

const shuffleEmojis = () => {
  shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
};

const createBoard = () => {
  gameBoard.innerHTML = '';
  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);
    card.setAttribute('data-aos', 'zoom-in');
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
};

const flipCard = (e) => {
  const clickedCard = e.target;
  const cardIndex = clickedCard.getAttribute('data-index');
  if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
    clickedCard.classList.add('flipped');
    clickedCard.textContent = shuffledEmojis[cardIndex];
    flippedCards.push(clickedCard);
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
};

const checkForMatch = () => {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    matchedPairs++;
    card1.style.backgroundColor = '#00cc66';
    card2.style.backgroundColor = '#00cc66';
    flippedCards = [];
    if (matchedPairs === emojis.length / 2) {
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
    flippedCards = [];
  }
};

const restartGame = () => {
  matchedPairs = 0;
  flippedCards = [];
  shuffleEmojis();
  createBoard();
};

shuffleEmojis();
createBoard();
restartBtn.addEventListener('click', restartGame);

VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});

AOS.init();
