// ROCK PAPER SCISSORS

const choices = ['rock','paper','scissors'];
const playerDisplay = document.getElementById('playerDisplay');
const computerDisplay = document.getElementById('computerDisplay');
const resultDisplay=document.getElementById('resultDisplay');
const playerScoreDisplay=document.getElementById('playerScoreDisplay');
const computerScoreDisplay=document.getElementById('computerScoreDisplay');
let playerScore=0;
let computerScore=0;


function playGame(playerChoice){
    const computerChoice= choices[Math.floor(Math.random()*3)];
    let result ="";

    if(playerChoice===computerChoice){
        result = "IT'S A TIE";
    }
    else{
        switch(playerChoice){
            case "rock":
                result = (computerChoice==="scissors") ? "YOU WIN" : "YOU LOSE";
                
                break;
            case "scissors":
               result= (computerChoice==="paper") ? "YOU WIN" : "YOU LOSE";
                break;
            case "paper":
              result=  (computerChoice==="rock") ? "YOU WIN" : "YOU LOSE";
                break;
         }
    }

    playerDisplay.textContent= `Player: ${playerChoice}`;
    computerDisplay.textContent= `Computer: ${computerChoice}`;
    resultDisplay.textContent=result;

    resultDisplay.classList.remove("greenText","redText","orangeText");

    // switch(result){
    //     case "YOU WIN":
    //         resultDisplay.classList.add("greenText");
    //         playerScore++;
    //         playerScoreDisplay.textContent=playerScore;
    //         switch(playerScore){
    //             case 5:
    //             alert('GAME OVER - PLAYER WINS');
    //             playerScoreDisplay.textContent=playerScore;

    //         }
    //         break;
    //     case "YOU LOSE":
    //          resultDisplay.classList.add("redText");
    //          computerScore++;
    //          computerScoreDisplay.textContent=computerScore;
    //          switch(computerScore){
    //             case 5:
    //             alert('GAME OVER - PLAYER WINS');
    //             computerScoreDisplay.textContent=computerScore;

    //         }
    //          break;
    //     case "IT'S A TIE":
    //         resultDisplay.classList.add("orangeText");
    // }

    if(result==='YOU WIN'){
       
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent=playerScore;
            if(playerScore===5){
               
                    playerScoreDisplay.textContent=playerScore;

                alert(`GAME OVER - PLAYER WINS ${playerScore} - ${computerScore}`);
                resetGame();
            }
            
           }
    else if(result==='YOU LOSE'){
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent=computerScore;
            if(computerScore===5){
              
                computerScoreDisplay.textContent=computerScore;

               alert(`GAME OVER - COMPUTER WINS ${computerScore} - ${playerScore}`);
               resetGame();
           }
        }
    else{
            resultDisplay.classList.add("orangeText");
           }

            
}




function resetGame(){
    playerScore=0;
    computerScore=0;
    playerScoreDisplay.textContent=playerScore;
    computerScoreDisplay.textContent=computerScore;
}
