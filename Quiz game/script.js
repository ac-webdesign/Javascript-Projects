
let questions;

fetch('questions.json')
    .then(response => response.json())
    .then(data=> {
            questions = data;
            displayQuestion();
    }).catch(error => console.error('Error loading questions',error));

    
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextButton');
const resultElement = document.getElementById('result');
const currentPrize=document.querySelectorAll('.prize');
const startButton = document.getElementById('startButton');

function restartGame(){
    
    startButton.style.display='none';
    nextButton.style.display='block';
    currentPrize[(14-currentQuestionIndex)].classList.remove('activePrize');
    currentQuestionIndex=0;
    displayQuestion();
    resultElement.style.display='none';
}
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    currentPrize[(14-currentQuestionIndex)].classList.add('activePrize');
    if(currentQuestionIndex>0){
        currentPrize[(15-currentQuestionIndex)].classList.remove('activePrize');
    }
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(optionElement => {
        optionElement.removeEventListener('click', () => {});
        if (optionElement.textContent === currentQuestion.answer) {
            optionElement.classList.add('correctAnswer');
        } else if (optionElement.textContent === selectedOption) {
            optionElement.style.backgroundColor = 'red';
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    else {
        setTimeout(function(){
            resultElement.textContent = `You lost! Try again`;
            resultElement.style.display='flex';
            nextButton.style.display='none';
            startButton.style.display='block';
        }, 1000);
        
        }
        if (selectedOption === currentQuestion.answer && score ===15) {
            showResult();
        }
    nextButton.disabled = false; 
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        nextButton.disabled = true; 
    } 
});
function showResult() {

    resultElement.textContent = `Congratulations! 
    You scored ${score} out of ${questions.length} questions. 
    You win 1.000.000&euro;`;
    resultElement.style.display='flex';
}
