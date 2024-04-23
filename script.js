let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let newGame = document.querySelector("#newGame");
let msg = document.querySelector("#msg");

let turnO = true;  //playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) =>{
    box.addEventListener('click', () => {
        console.log("Button was clicked:");
        if (turnO) {
            box.innerHTML = 'O';
            turnO = false;
        } else {
            box.innerHTML = 'X';
            turnO = true;
        }
          box.disabled = true;
          checkWinner();
    });
});

const newGm = () => {
    turnO = true;
    enabledBtns();
    msgContainer.classList.add("hide");
};

const enabledBtns = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
};

const disabledBtns = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) =>{
    msg.innerHTML = `Congratulations, You are the Winner: ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBtns();
};

// const checkWinner = () => {
//     let draw = true; 
//    for( let pattern of winPatterns) {
//      let pos1Val = boxes[pattern[0]].innerHTML;
//      let pos2Val = boxes[pattern[1]].innerHTML;
//      let pos3Val = boxes[pattern[2]].innerHTML;
//      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
//         if (pos1Val == pos2Val && pos2Val == pos3Val) {
//             showWinner(pos1Val);
//         }
//        }
//    } 
//    for (let box of boxes) {
//     if (box.innerHTML === "") {
//         draw = false; // If any box is empty, the game is not a draw
//         break;
//     }
// }

// if (draw) {
//     msg.innerHTML = "It's a Draw!";
//     msgContainer.classList.remove("hide");
//     disabledBtns();
// }
// };

// newGame.addEventListener("click", newGm);
// reset.addEventListener("click", newGm);
const checkWinner = () => {
    let draw = true; // Assume a draw initially

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // If there's a winner, exit the function
            }
        }
    }

    // Check for a draw
    for (let box of boxes) {
        if (box.innerHTML === "") {
            draw = false; // If any box is empty, the game is not a draw
            break;
        }
    }

    if (draw) {
        msg.innerHTML = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disabledBtns();
    }
};

// Add this function to reset the game state on a new game
const resetGame = () => {
    newGm();
    enabledBtns();
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

