const box = document.querySelectorAll('.box');
const box11 = document.querySelector('[class="box 11"]');
const box12 = document.querySelector('[class="box 12"]');
const box13 = document.querySelector('[class="box 13"]');
const box21 = document.querySelector('[class="box 21"]');
const box22 = document.querySelector('[class="box 22"]');
const box23 = document.querySelector('[class="box 23"]');
const box31 = document.querySelector('[class="box 31"]');
const box32 = document.querySelector('[class="box 32"]');
const box33 = document.querySelector('[class="box 33"]');

const board = [
    [box11, box12, box13],
    [box21, box22, box23],
    [box31, box32, box33]
]

const updateBoard = (playerBool, position) => {
    if (playerBool) {
        position.textContent = 'O';
        position.style.color = 'var(--playerO)';
    }else{
        position.textContent = 'X';
        position.style.color = 'var(--playerX)';
    }
}

box.addEventListener('click', () => {
    updateBoard(true, box12);
})
