// : DOM elements
const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const displayGrid = document.querySelector('.grid-display');
const ships = document.querySelectorAll('.ship');
const destroyer = document.querySelector('.destroyer-container');
const submarine = document.querySelector('.submarine-container');
const cruiser = document.querySelector('.cruiser-container');
const battleship = document.querySelector('.battleship-container');
const carrier = document.querySelector('.carrier-container');
const setupBtn = document.querySelector('.setup-buttons');
const startButton = document.querySelector('#start');
const rotateButton = document.querySelector('#rotate');
const turnDisplay = document.querySelector('#whose-go');
const infoDisplay = document.querySelector('#info');

// : Usefull variables
const width = 10;
const userSquares = [];
const computerSquares = [];
let isHorizontal = true;
let isGameOver = false;
let currentPlayer = 'user';

// : Create board
function createBoard(grid, squares) {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.dataset.id = i;
    grid.appendChild(square);
    squares.push(square);
  }
}

createBoard(userGrid, userSquares);
createBoard(computerGrid, computerSquares);

// Ships
const shipArray = [
  {
    name: 'destroyer',
    directions: [
      // Horizontal
      [0, 1],
      // Vertical = 0, 10
      [0, width],
    ],
  },
  {
    name: 'submarine',
    directions: [
      [0, 1, 2],
      [0, width, width * 2],
    ],
  },
  {
    name: 'cruiser',
    directions: [
      [0, 1, 2],
      [0, width, width * 2],
    ],
  },
  {
    name: 'battleship',
    directions: [
      [0, 1, 2, 3],
      [0, width, width * 2, width * 3],
    ],
  },
  {
    name: 'carrier',
    directions: [
      [0, 1, 2, 3, 4],
      [0, width, width * 2, width * 3, width * 4],
    ],
  },
];

// : Draw the random computer ships
function generate(ship) {
  // Random vertical or horizontal (directions[ran])
  let randomDirection = Math.floor(Math.random() * ship.directions.length);
  // shipArray.directions[vertical || horizontal]
  let current = ship.directions[randomDirection];

  // Horizontal
  if (randomDirection === 0) direction = 1;
  // Vertical
  if (randomDirection === 1) direction = 10;

  // Num between 0/99 * ship length * horizontal/vertical
  let randomStart = Math.abs(
    Math.floor(
      Math.random() * computerSquares.length -
        ship.directions[0].length * direction
    )
  );

  // Not overlay the ships
  const isTaken = current.some((index) =>
    computerSquares[randomStart + index].classList.contains('taken')
  );

  // If the remainder is  === 9
  const isAtRightEdge = current.some(
    (index) => (randomStart + index) % width === width - 1
  );

  // If the remainder is  === 0
  const isAtLeftEdge = current.some(
    (index) => (randomStart + index) % width === 0
  );

  //TODO : FIX THE COL10
  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
    // sacar &&!left
    current.forEach((index) =>
      computerSquares[randomStart + index].classList.add('taken', ship.name)
    );
  } else {
    generate(ship);
  }
}

generate(shipArray[0]);
generate(shipArray[1]);
generate(shipArray[2]);
generate(shipArray[3]);
generate(shipArray[4]);

// : Rotate ships button
function rotate() {
  if (isHorizontal) {
    destroyer.classList.toggle('destroyer-container-vertical');
    submarine.classList.toggle('submarine-container-vertical');
    cruiser.classList.toggle('cruiser-container-vertical');
    battleship.classList.toggle('battleship-container-vertical');
    carrier.classList.toggle('carrier-container-vertical');
    isHorizontal = false;
    return;
  }
  if (!isHorizontal) {
    destroyer.classList.toggle('destroyer-container-vertical');
    submarine.classList.toggle('submarine-container-vertical');
    cruiser.classList.toggle('cruiser-container-vertical');
    battleship.classList.toggle('battleship-container-vertical');
    carrier.classList.toggle('carrier-container-vertical');
    isHorizontal = true;
    return;
  }
}
rotateButton.addEventListener('click', rotate);

// : User ships movement
ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
userSquares.forEach((square) =>
  square.addEventListener('dragstart', dragStart)
);
userSquares.forEach((square) => square.addEventListener('dragover', dragOver));
userSquares.forEach((square) =>
  square.addEventListener('dragenter', dragEnter)
);
userSquares.forEach((square) =>
  square.addEventListener('dragleave', dragLeave)
);
userSquares.forEach((square) => square.addEventListener('drop', dragDrop));
userSquares.forEach((square) => square.addEventListener('dragend', dragEnd));

let selectedShipNameWithIndex;
let draggedShip;
let draggedShipLength;

ships.forEach((ship) =>
  ship.addEventListener('mousedown', (e) => {
    selectedShipNameWithIndex = e.target.id;
  })
);

function dragStart() {
  draggedShip = this;
  draggedShipLength = this.childNodes.length;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  // console.log('dragLeave');
}

function dragEnd() {
  // console.log('dragend');
}

function dragDrop() {
  let shipNameWithLastId = draggedShip.lastChild.id;
  let shipClass = shipNameWithLastId.slice(0, -2);
  let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
  let shipLastId = lastShipIndex + parseInt(this.dataset.id);

  const notAllowedHorizontal = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81,
    91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83,
    93,
  ];
  const notAllowedVertical = [
    99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
    80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62,
    61, 60,
  ];

  let newNotAllowedHorizontal = notAllowedHorizontal.splice(
    0,
    10 * lastShipIndex
  );
  let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex);

  selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

  shipLastId = shipLastId - selectedShipIndex;

  if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
    for (let i = 0; i < draggedShipLength; i++) {
      userSquares[
        parseInt(this.dataset.id) - selectedShipIndex + i
      ].classList.add('taken', shipClass);
    }
  } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
    for (let i = 0; i < draggedShipLength; i++) {
      userSquares[
        parseInt(this.dataset.id) - selectedShipIndex + width * i
      ].classList.add('taken', shipClass);
    }
  } else return;

  displayGrid.removeChild(draggedShip);
}

// : Game logic
function playGame() {
  const unplacedShips = displayGrid.childElementCount;
  if (isGameOver) return;

  if (!unplacedShips) {
    setupBtn.style.display = 'none';
    if (currentPlayer === 'user') {
      turnDisplay.innerHTML = 'You Go';

      computerSquares.forEach((square) =>
        square.addEventListener('click', (e) => {
          revealSquare(square);
        })
      );
    }
    if (currentPlayer === 'computer') {
      turnDisplay.innerHTML = 'Computers Go';

      setTimeout(computerGo, 500);
    }
  } else {
    turnDisplay.innerHTML = 'Place all your ships for the battle!';
  }
}
startButton.addEventListener('click', playGame);

let destroyerCount = 0;
let submarineCount = 0;
let cruiserCount = 0;
let battleshipCount = 0;
let carrierCount = 0;

function revealSquare(square) {
  if (!isGameOver) {
    if (
      square.classList.contains('boom') ||
      square.classList.contains('miss')
    ) {
      infoDisplay.innerHTML = 'Square already used!';
    } else {
      if (!square.classList.contains('boom')) {
        if (square.classList.contains('destroyer')) destroyerCount++;
        if (square.classList.contains('submarine')) submarineCount++;
        if (square.classList.contains('cruiser')) cruiserCount++;
        if (square.classList.contains('battleship')) battleshipCount++;
        if (square.classList.contains('carrier')) carrierCount++;
      }

      if (square.classList.contains('taken')) {
        square.classList.add('boom');
      } else {
        square.classList.add('miss');
      }

      infoDisplay.innerHTML = '';
      checkForWins();
      currentPlayer = 'computer';
      playGame();
    }
  }
}

let cpuDestroyerCount = 0;
let cpuSubmarineCount = 0;
let cpuCruiserCount = 0;
let cpuBattleshipCount = 0;
let cpuCarrierCount = 0;

function computerGo() {
  let random = Math.floor(Math.random() * userSquares.length);

  if (!userSquares[random].classList.contains('boom')) {
    userSquares[random].classList.add('miss');

    if (userSquares[random].classList.contains('destroyer')) {
      userSquares[random].classList.add('boom');
      cpuDestroyerCount++;
    }
    if (userSquares[random].classList.contains('submarine')) {
      userSquares[random].classList.add('boom');
      cpuSubmarineCount++;
    }
    if (userSquares[random].classList.contains('cruiser')) {
      userSquares[random].classList.add('boom');

      cpuCruiserCount++;
    }
    if (userSquares[random].classList.contains('battleship')) {
      userSquares[random].classList.add('boom');

      cpuBattleshipCount++;
    }
    if (userSquares[random].classList.contains('carrier')) {
      userSquares[random].classList.add('boom');

      cpuCarrierCount++;
    }
    checkForWins();
  } else {
    computerGo();
  }
  currentPlayer = 'user';
  turnDisplay.innerHTML = 'You Go';
}

function checkForWins() {
  if (destroyerCount === 2) {
    infoDisplay.innerHTML = 'You sunk a computer destroyer';
    destroyerCount = 10;
  }
  if (submarineCount === 3) {
    infoDisplay.innerHTML = 'You sunk a computer submarine';
    submarineCount = 10;
  }
  if (cruiserCount === 3) {
    infoDisplay.innerHTML = 'You sunk a computer cruiser';
    cruiserCount = 10;
  }
  if (battleshipCount === 4) {
    infoDisplay.innerHTML = 'You sunk a computer battleship';
    battleshipCount = 10;
  }
  if (carrierCount === 5) {
    infoDisplay.innerHTML = 'You sunk a computer carrier';
    carrierCount = 10;
  }

  if (cpuDestroyerCount === 2) {
    infoDisplay.innerHTML = 'The computer sank your destroyer';
    cpuDestroyerCount = 10;
  }
  if (cpuSubmarineCount === 3) {
    infoDisplay.innerHTML = 'The computer sank your submarine';
    cpuSubmarineCount = 10;
  }
  if (cpuCruiserCount === 3) {
    infoDisplay.innerHTML = 'The computer sank your cruiser';
    cpuCruiserCount = 10;
  }
  if (cpuBattleshipCount === 4) {
    infoDisplay.innerHTML = 'The computer sank your battleship';
    cpuBattleshipCount = 10;
  }
  if (cpuCarrierCount === 5) {
    infoDisplay.innerHTML = 'The computer sank your carrier';
    cpuCarrierCount = 10;
  }

  if (
    destroyerCount +
      submarineCount +
      cruiserCount +
      battleshipCount +
      carrierCount ===
    50
  ) {
    gameOver();
    infoDisplay.innerHTML = 'You win!';
  }
  if (
    cpuDestroyerCount +
      cpuSubmarineCount +
      cpuCruiserCount +
      cpuBattleshipCount +
      carrierCount ===
    50
  ) {
    gameOver();
    infoDisplay.innerHTML = 'Computer win!';
  }
}

function gameOver() {
  isGameOver = true;
  startButton.removeEventListener('click', playGame);
}
