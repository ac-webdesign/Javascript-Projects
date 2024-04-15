const cards = ['🍎', '🍌', '🍒', '🍓', '🍇', '🥥', '🍋', '🥝'];

let shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5);

let openedCards = [];
let matchedCards = [];
const cardsGrid = document.querySelector('.cards-grid');
const restartButton = document.getElementById('restart-btn');

function initializeGame() {
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.innerHTML = '<span class="hidden"></span>';
        cardElement.addEventListener('click', handleCardClick);
        cardsGrid.appendChild(cardElement);
    });
}

function handleCardClick() {
    const clickedCard = this;
    const clickedIndex = clickedCard.dataset.index;

    if (openedCards.length < 2 && !openedCards.includes(clickedIndex) && !matchedCards.includes(clickedIndex)) {
        openedCards.push(clickedIndex);
        clickedCard.classList.add('flip'); 

        setTimeout(() => {
            clickedCard.innerHTML = `<span>${shuffledCards[clickedIndex]}</span>`;
        }, 250);
        if (openedCards.length === 2) {
            const [firstIndex, secondIndex] = openedCards;
            const firstCard = document.querySelector(`[data-index="${firstIndex}"]`);
            const secondCard = document.querySelector(`[data-index="${secondIndex}"]`);

            
            
            setTimeout(() => {
                if (shuffledCards[firstIndex] !== shuffledCards[secondIndex]) {
                    firstCard.innerHTML = '<span class="hidden"></span>';
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');

                    secondCard.innerHTML = '<span class="hidden"></span>';
                }
                
                
                openedCards = [];
                checkGameEnd();
            }, 1000);
            if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                matchedCards.push(firstIndex, secondIndex);
            }
        }
    }
}

function checkGameEnd() {
    if (matchedCards.length === shuffledCards.length) {
        alert('Congratulations! You won the game!');
    }
}

function restartGame() {
    openedCards = [];
    matchedCards = [];
    cardsGrid.innerHTML = '';
    shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
    initializeGame();
}

restartButton.addEventListener('click', restartGame);

initializeGame();