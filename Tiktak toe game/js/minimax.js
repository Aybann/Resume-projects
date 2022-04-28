const resetButton = document.getElementsByClassName('reset');
const announcer = document.querySelector('.announcer');
const playerDisplay = document.getElementById('displayPlayer');
const display = document.querySelector('.display');

var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.tile');
startGame();

resetButton[0].addEventListener('click', startGame);

function startGame(){
  origBoard = Array.from(Array(9).keys());
  for(var i = 0; i < cells.length; i++){
    cells[i].innerText = '';
    cells[i].addEventListener('click', turnClick, false);
    cells[i].classList.remove('winningAxis');
    
    if(cells[i].classList.contains('playerX')) {
      cells[i].classList.remove('playerX');
    }
    else if(cells[i].classList.contains('playerO')){
      cells[i].classList.remove('playerO');
    }

    announcer.classList.add('hide');
    display.classList.remove('hide');
  }
}

function turnClick(square){
  if(typeof origBoard[square.target.id] == 'number'){
    turn(square.target.id, huPlayer);
    if(!checkTie()) turn(bestSpot() , aiPlayer);
  }
}

function turn(squareID, player){
  origBoard[squareID] = player;
  document.getElementById(squareID).innerText = player;
  if(document.getElementById(squareID).innerText === 'O'){
    document.getElementById(squareID).classList.add('playerO');
  }else{
    document.getElementById(squareID).classList.add('playerX');
  }
  
  let gameWon = checkWin(origBoard, player);
  if(gameWon) gameOver(gameWon);
}

function checkWin(board, player){
  let plays = board.reduce((a,e,i) =>
   (e === player) ? a.concat(i) : a, []);
  let gameWon = null;

  for(let [index, win] of winningConditions.entries()){
    if(win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for(let index of winningConditions[gameWon.index]){
    document.getElementById(index).classList.add('winningAxis');
  }

  for(var i = 0; i < cells.length; i++){
    cells[i].removeEventListener('click', turnClick, false);
  }

  declareWinner(gameWon.player == huPlayer ? 'You Win' : 'You Lose');
}

function declareWinner(person){
  announcer.innerText = person;
  announcer.classList.remove('hide');
  display.classList.add('hide');
}

function emptySquare(){
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
  return minimax(origBoard, aiPlayer).index;
}

function checkTie(){
  if(emptySquare().length == 0){
    for(var i = 0; i < cells.length; i++){
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner('Tie Game!');
    return true;
  }
  return false;
}

function minimax(newBoard, player){
  var availSpots = emptySquare(newBoard);

  if(checkWin(newBoard, player)){
    return {score: -10};
  }
  else if(checkWin(newBoard, aiPlayer)){
    return {score: 10};
  }
  else if(availSpots.length === 0){
    return {score: 0};
  }

  var moves = [];
  for(var i = 0; i < availSpots.length; i++){
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if(player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  else{
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}