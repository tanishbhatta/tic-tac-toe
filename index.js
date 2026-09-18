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
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
];

let toWinner;
const updateBoard = (playerBool, position) => {
    if (playerBool) {
        toWinner =  'O';
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
        toWinner =  'X';
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
        if (i[0].innerHTML !== '' && i[0].innerHTML === i[1].innerHTML && i[0].innerHTML === i[2].innerHTML) return true;
    }
};

let flag = true;
board.forEach(row => {
    row.forEach(col => {
        col.addEventListener('click', () => {
            if (col.innerHTML === ``) flag = updateBoard(flag, col);
            if (winCond() === true){
                console.log(`Player ${toWinner} won.`)
            }
        })
    })
})

