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
const box33 = document.getElementById('33'); //gotten all boxes with their positional values

const board = [
    [box11, box12, box13],
    [box21, box22, box23],
    [box31, box32, box33]
]; //created a board array

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

const updateBoardWithPlayerShape = (playerBool, position) => {
    if (playerBool) {
        position.innerHTML = `
        <svg viewBox="0 0 100 100" style="width:100%; height:100%; display:block;">
            <style>
                .circle-box {
                    filter: drop-shadow(0px 1px 5px lightblue);
                    stroke-dasharray: 176;
                    stroke-dashoffset: 176;
                    animation: Draw 0.6s cubic-bezier(0.4, 0, 0.4, 1) forwards;
                    
                }

                @keyframes Draw{
                    to{
                        stroke-dashoffset:0;
                    }
                }
            </style>

            <circle class="circle-box" cx="50" cy="50" r="28" stroke="var(--playerO)" stroke-width="4" fill="none" stroke-linecap="round" transform="rotate(-90 50 50)"/>
        </svg>`;
         //innerHtml for Circle in the game
        return false;
    }else{
        position.innerHTML = `
        <svg viewBox="0 0 100 100" style="width:100%; height:100%; display:block">
            <style>
                .cross-line{
                    filter: drop-shadow(0px 1px 5px red);
                    stroke-dasharray:71;
                    stroke-dashoffset:71;
                    animation: DrawLine 0.6s cubic-bezier(0.4, 0, 0.4, 1) forwards; 
                }

                @keyframes DrawLine{
                    to {
                    stroke-dashoffset:0;}
                }
            
            </style>

            <line class="cross-line" x1="75" y1="25" x2="25" y2="75" stroke="var(--playerX)" stroke-width="3.5"/>
            <line class="cross-line" x1="75" y1="75" x2="25" y2="25" stroke="var(--playerX)" stroke-width="3.5"/>
        </svg>`;//innerHtml for Cross in the game
        return true;
    }
}

const winCond = () => {
    for (const i of winArray){
        if (board[i[0][0]][i[0][1]].innerHTML !== '' && board[i[0][0]][i[0][1]].innerHTML === board[i[1][0]][i[1][1]].innerHTML && board[i[0][0]][i[0][1]].innerHTML === board[i[2][0]][i[2][1]].innerHTML){
            return [i, true];
        }
    } 
    return [[], false];
};

const getCoordOfBoxes = (tripleAsked) => {
    const [start, end] = [tripleAsked[0], tripleAsked[2]];
    const startCoords = [start[0] * 33.33 + 16.67, start[1] * 33.33 + 16.67];
    const endCoords = [end[0] * 33.33 + 16.67, end[1] * 33.33 + 16.67];
    return [startCoords, endCoords];
};

const updateBoardAfterWin = (tripleAsked) => {
    const[startCoords, endCoords] = getCoordOfBoxes(tripleAsked);
};

let forPlayerO = true;
board.forEach(row => {
    row.forEach(col => {
        col.addEventListener('click', () => {
            if (col.innerHTML === ``) forPlayerO = updateBoardWithPlayerShape(forPlayerO, col);
            const [winTriple, isWin] = winCond();
            if (isWin){
                if (forPlayerO) console.log('Player X wins!');
                else console.log('Player O wins');
            }
        })
    })
})

