let currentPlayer = 'X';
        const cells = document.querySelectorAll('.cell');
        const winner = document.querySelector('.winner');
        const playButton = document.querySelector('.playAgain');
        const lines = document.querySelectorAll('.line');

        linesDraw();
        function makeMove(index) {
            if (cells[index].textContent === '') {
                cells[index].textContent = currentPlayer;
                if(currentPlayer === 'X'){
                    cells[index].classList.add('green');
                }
                else{
                    cells[index].classList.add('orange');

                }
                setTimeout(function(){
                    if (checkWinner()) {
                        if(currentPlayer==='X'){
                            winner.textContent='Player wins!';
                        }else{
                            winner.textContent='Computer wins';
                        }
                    

                        
                } else if (checkDraw()) {
                    winner.textContent='Its a draw!';
                    
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    if (currentPlayer === 'O') {
                        setTimeout(function(){
                            makeAIMove();
                        }, 100);
                    
                }
                }
                }, 1);
                
            }
        }

        function makeAIMove() {
            // Check if the computer can win in the next move
            let winningMove = checkNextMove('O');
            if (winningMove !== -1) {
                makeMove(winningMove);
                return;
            }

            // Check if the player can win in the next move, and block if necessary
            let blockingMove = checkNextMove('X');
            if (blockingMove !== -1) {
                makeMove(blockingMove);
                return;
            }

            // If no winning or blocking move, make a random move
            let emptyCells = [];
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === '') {
                    emptyCells.push(i);
                }
            }
            if (emptyCells.length > 0) {
                let randomIndex = Math.floor(Math.random() * emptyCells.length);
                let move = emptyCells[randomIndex];
                setTimeout(() => {
                    makeMove(move);
                }, 500);
            }
        }

function checkNextMove(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        let emptyIndex = -1;
        let count = 0;
        for (let index of combo) {
            if (cells[index].textContent === '') {
                emptyIndex = index;
            } else if (cells[index].textContent === player) {
                count++;
            } else {
                emptyIndex = -1;
                break;
            }
        }
        if (count === 2 && emptyIndex !== -1) {
            return emptyIndex;
        }
    }
    return -1;
}
        function linesDraw(){
            setTimeout(function() {
                lines[0].classList.add('show');
            }, 500);
            setTimeout(function() {
                lines[1].classList.add('show');
            }, 1500);
            setTimeout(function() {
                lines[2].classList.add('show');
            }, 2500);
            setTimeout(function() {
                lines[3].classList.add('show');
            }, 3500);
        }
        
        function checkWinner() {
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            return winningCombos.some(combo => {
                return combo.every(index => {
                    return cells[index].textContent === currentPlayer;
                });
            });
        }

        function checkDraw() {
            return [...cells].every(cell => {
                return cell.textContent !== '';
            });
        }

        function resetBoard() {
            currentPlayer='X';

            
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('green');
                cell.classList.remove('orange');
                winner.textContent='Make your move';

            });
          
        }

        function playComputerFirst(){
            resetBoard();
            currentPlayer='O';
            makeAIMove();
        }