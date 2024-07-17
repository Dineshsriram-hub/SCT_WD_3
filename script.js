// Select HTML elements
const boxs = document.querySelectorAll(".box");
const statusTxt = document.querySelector("#status");
const btnReset = document.querySelector("#reset");

// Define images for X and O
const x = "<i class='bx bx-x'></i>";
const o = "<i class='bx bx-circle'></i>";

// Define winning combinations
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game variables
let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = x;
let player = "X";
let running = false;

// Initialize the game
init();

function init() {
    boxs.forEach(box => box.addEventListener('click', boxClick));
    btnReset.addEventListener('click', reset);
    statusTxt.textContent = `${player}: Your turn`;
    running = true;
}

// ... (rest of the code remains the same)

function boxClick() {
    const index = this.dataset.index;
    if (options[index] !== "" || !running) {
        return;
    }
    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentplayer;
}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];
        if (box1 === "" || box2 === "" || box3 === "") {
            continue;
        }
        if (box1 === box2 && box2 === box3) {
            isWon = true;
            break;
        }
    }

    if (isWon) {
        statusTxt.textContent = `${player} Won...!`;
        running = false;
    } else if (!options.includes("")) {
        statusTxt.textContent = "It's a draw!";
        running = false;
    } else {
        player = changeSymbol(player);
        currentplayer = player === 'X' ? x : o;
        statusTxt.textContent = `${player}: Your turn`;
    }
}

function changeSymbol(player) {
    return player === 'X'? 'O' : 'X';
}

function reset() {
    options = ["", "", "", "", "", "", "", "", ""];
    boxs.forEach(box => box.innerHTML = "");
    init();
}