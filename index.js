'use strict';
const fullBoard = document.getElementById('full-board');
const box11 = document.getElementById('11');
const box12 = document.getElementById('12');
const box13 = document.getElementById('13');
const box21 = document.getElementById('21');
const box22 = document.getElementById('22');
const box23 = document.getElementById('23');
const box31 = document.getElementById('31');
const box32 = document.getElementById('32');
const box33 = document.getElementById('33'); //got all boxes by id with their positional values

//board array of boxes
const board = [
    [box11, box12, box13],
    [box21, box22, box23],
    [box31, box32, box33]
];

//win condition array
const winArray = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
];

//svg markup for the 'O' player
const O_MARKUP = `
        <svg viewBox="0 0 100 100" style="width:100%; height:100%; display:block;">

            <circle class="circle-box" cx="50" cy="50" r="28" stroke="var(--playerO)" stroke-width="4" fill="none" stroke-linecap="round" transform="rotate(-90 50 50)"/>
            </svg>`;

//svg markup for the 'X' player          
const X_MARKUP = `
        <svg viewBox="0 0 100 100" style="width:100%; height:100%; display:block">

            <line class="cross-line" x1="75" y1="25" x2="25" y2="75" stroke="var(--playerX)" stroke-width="3.5"/>
            <line class="cross-line" x1="75" y1="75" x2="25" y2="25" stroke="var(--playerX)" stroke-width="3.5"/>
        </svg>`

//Functionality of drawing shapes (O, X) after we click on the box
const updateBoardWithPlayerShape = (playerBool, position) => {
    if (playerBool) {
        position.innerHTML = O_MARKUP; //innerHtml for Circle in the game
        return false;
    }else{
        position.innerHTML = X_MARKUP; //innerHtml for Cross in the game
        return true;
    }
}

//Defining the condition for winning
const winCond = () => {
    for (const i of winArray){
        if (board[i[0][0]][i[0][1]].innerHTML !== '' && board[i[0][0]][i[0][1]].innerHTML === board[i[1][0]][i[1][1]].innerHTML && board[i[0][0]][i[0][1]].innerHTML === board[i[2][0]][i[2][1]].innerHTML){
            return [i, true];
        }
    } 
    return [[], false];
};

//Taking coordinates of the winning combination of three boxes
const getCoordOfBoxes = (tripleAsked) => {
    const [start, end] = [tripleAsked[0], tripleAsked[2]];
    const startCoords = [start[1] * 33.33 + 16.67, start[0] * 33.33 + 16.67];
    const endCoords = [end[1] * 33.33 + 16.67, end[0] * 33.33 + 16.67];
    return [startCoords, endCoords];
};

//Drawing line after the player's win
const updateBoardAfterWin = (tripleAsked, playerBool) => {
    const[startCoords, endCoords] = getCoordOfBoxes(tripleAsked);
    const dashArrayLength = Math.sqrt(((endCoords[0] - startCoords[0]) ** 2) + ((endCoords[1] - startCoords[1]) ** 2)); //dash array length using Distance formula

    if (playerBool){
    fullBoard.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 100 100" style="position:absolute; pointer-events:none; width:100%; height:100%; display:block;">
            <style>
                .win-line{
                    filter: drop-shadow(0px 1px 10px red);
                    stroke-dasharray:${dashArrayLength};
                    stroke-dashoffset:${dashArrayLength};
                    animation: DrawLine 0.6s cubic-bezier(0.4, 0, 0.4, 1) forwards;
                }

                @keyframes DrawLine{
                    to {
                    stroke-dashoffset:0;}
                }
            </style>

            <line class="win-line" x1="${startCoords[0]}" y1="${startCoords[1]}" x2="${endCoords[[0]]}" y2="${endCoords[1]}" stroke="var(--playerX)" stroke-width="1.5"/>
        </svg>
        `)
    }else
    {fullBoard.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 100 100" style="position:absolute; pointer-events:none; width:100%; height:100%; display:block;">
            <style>
                .win-line{
                    filter: drop-shadow(0px 2px 10px lightblue);
                    stroke-dasharray:${dashArrayLength};
                    stroke-dashoffset:${dashArrayLength};
                    animation: DrawLine 0.6s cubic-bezier(0.4, 0, 0.4, 1) forwards;
                }

                @keyframes DrawLine{
                    to {
                    stroke-dashoffset:0;}
                }
            </style>

            <line class="win-line" x1="${startCoords[0]}" y1="${startCoords[1]}" x2="${endCoords[[0]]}" y2="${endCoords[1]}" stroke="var(--playerO)" stroke-width="1.5"/>
        </svg>
        `)
    }
};

//Tie condition created if the whole board fills
const tieCond = () => {
    for (const i of board)
    {
        if (i[0].innerHTML === '' || i[1].innerHTML === '' || i[2].innerHTML === '') return false;
    }
    return true;
};

const enlargeWinTriple = (askedTriple) => {
    for (const i of askedTriple){
        board[i[0]][i[1]].classList.add('winner');
    }
}

let forPlayerO = true; //Always 'O' plays the first
let gameOver = false; //created game end scenario

//created array for state check
let stateArray = [
    [null, null, null],
    [null, null, null], 
    [null, null, null]
];

//For each box, creating an event listener on clicking
board.forEach(row => {
    row.forEach(col => {
        col.addEventListener('click', () => {
            const rowPosIndex = board.indexOf(row);
            const colPosIndex = row.indexOf(col);

            //Just if the box is empty update the board
            if (!gameOver){
                if (col.innerHTML === ``) forPlayerO = updateBoardWithPlayerShape(forPlayerO, col);

                //pushed into the specific cols and rows
                if (forPlayerO) stateArray[rowPosIndex][colPosIndex] = 'X';
                else stateArray[rowPosIndex][colPosIndex] = 'O';

                //storing return from the win condition function
                const [winTriple, isWin] = winCond();
                if (isWin){
                    updateBoardAfterWin(winTriple, forPlayerO);
                    if (forPlayerO) console.log('Player X wins!');
                    else console.log('Player O wins');
                    enlargeWinTriple(winTriple);
                    gameOver = true;
                }else{

                    //storing return from the tie condition function
                    const isTie = tieCond();
                    if (isTie){
                        fullBoard.classList.add('grow');
                        gameOver = true;
                    };
                }
            }
            
            
        })
    })
})
console.log(stateArray);



