const board = document.getElementById('board');
  const statusText = document.getElementById('status');
  let currentPlayer = 'X';
  let gameActive = true;
  const cells = [];

  function createBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
      cells.push(cell);
    }
  }

  function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    if (checkWinner()) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWinner() {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // columns
      [0,4,8],[2,4,6]          // diagonals
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      );
    });
  }

  function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";
    gameActive = true;
  }

  createBoard();