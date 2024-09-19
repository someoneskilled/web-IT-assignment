const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // PlayerX, PlayerO
let count = 0; // To Track Draw

const win = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to check the winner
const checkWinner = () => {
  for (const pattern of win) {
    const [pos1, pos2, pos3] = pattern.map(index => boxes[index].innerText);

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true;
      }
    }
  }
  return false;
};

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  location.reload();
  msgContainer.classList.add("hide");
};

// Event listener for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const currentPlayer = turnO ? "O" : "X";
    event.target.style.backgroundColor="white";
    box.innerText = currentPlayer;
    box.disabled = true;
    turnO = !turnO;
    count++;

    if (count === 9 && !checkWinner()) {
      gameDraw();
    } else {
      checkWinner();
    }
  });
});

// Function for a draw
const gameDraw = () => {
  showMessage("Draw");
  disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Function to enable all boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Function to show the winner
const showWinner = (winner) => {
  showMessage(`${winner} wins`);
  disableBoxes();
};

// Function to display a message
const showMessage = (message) => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
};

// Event listener for the reset button
resetBtn.addEventListener('click', resetGame);