const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
let circleTurn;
const restartButton = document.getElementById('restartButton');
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
startGame();

restartButton.addEventListener('click', startGame);
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }
    swapTurns();
    setBoardHoverClass();
}

function endGame(draw){
    if(draw){
        winningMessageText.innerText = `Draw!`;
    }
    else{
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }

    winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn;
}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass){
    return WINNING_COMBOS.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}