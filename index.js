const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// let's create a function to initialise the game..
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pr empty bhi karna padega.
    newGameBtn.classList.remove("active");
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // jitne ke bd green light ko hatana bhi hai
        // boxes ki sari css propreties initialize kr dia
        box.classList=`box box${index+1}`
    });
    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function handleClick(index) {
    if (gameGrid[index] === "") {

        // it changes in UI
        boxes[index].innerText = currentPlayer;
        // it changes in gridgame in index.js
        gameGrid[index] = currentPlayer;
        // swap kro turn ko
        swapTurn();
        // check koi jeet to nhi gya
        checkGameOver();
        boxes[index].style.pointerEvents = "none";
    }
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else
        currentPlayer = "X";

    // UI update kr do abb
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        // all 3 box should contain non- empty value or exact same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            // check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //  disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we  know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //  let's check whether there is tied
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    })

    // when board is filled ,game is TIE
    if (fillCount == 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

