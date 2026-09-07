const box11 = document.getElementById('o11');
const box12 = document.getElementById('o12');
const box13 = document.getElementById('o13');
const box21 = document.getElementById('o21');
const box22 = document.getElementById('o22');
const box23 = document.getElementById('o23');
const box31 = document.getElementById('o31');
const box32 = document.getElementById('o32');
const box33 = document.getElementById('o33');
const winBox = document.querySelector('.winner-card')

const array = [
    [box11, box12, box13],
    [box21, box22, box23],
    [box31, box32, box33]
];

function checkTrue(){
    const val = (r,c) => array[r][c].innerText;

    for (i=0; i<3; i++){
        if(
            val(i,0) !== '' && val(i,0) === val(i,1) && val(i,0) === val(i,2)
        ){return true}
    }

    for (i=0; i<3; i++){
        if(
            val(0,i) !== '' && val(0,i) === val(1, i) && val(0,i) === val(2, i)
        ){return true}
    }

    if (
        val(0,0) !== '' && val(0,0) === val(1,1) && val(0,0) === val(2,2)
    ){return true}

    if (
        val(2, 0) !== '' && val(2, 0) === val(1,1) && val(2, 0) === val(0, 2)
    ){return true}

    return false
};

let currentPlayer = '○';
let gameActive = true;

array.forEach(row => {
    row.forEach(box => {
        box.textContent = '';
        box.addEventListener('click', () => {
            if (!gameActive || box.innerText === '×' || box.innerText === '○') return;
            box.innerText = currentPlayer;

            if(checkTrue()){
                gameActive = false;
                winBox.classList.remove('hidden');
                setTimeout(() => {
                    alert(`${currentPlayer} wins the match!`);
                }, 50);
                window.location.reload();
            }
            
            if (box.innerText === '○'){
                currentPlayer = '×';
            }else if(box.innerText === '×'){
                currentPlayer = '○';
            }
        })
    })
})



