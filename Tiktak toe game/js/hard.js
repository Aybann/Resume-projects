const tiles = document.getElementById('container');
const playerDisplay = document.getElementById('displayPlayer');
const announcer = document.querySelector('.announcer');
const display = document.querySelector('.display');
const resetButton = document.getElementsByClassName('reset');
const nightMode = document.getElementById('themeMode');

const theTiles = document.querySelectorAll('.tile');

var board = ['','','','','','','','',''];
var tempBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var currentPlayer = 'X';
var isGameActive = true;

const PLAYERX_WON ='PLAYERX_WON';
const PLAYERO_WON ='PLAYERO_WON';
const TIE = 'TIE';

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

function getTarget(e)
{
  if (!e) {
    e = window.event;
  }
  return e.target || e.srcElement;
}

function isValidation(target) {
  if(target.innerText ==='X' || target.innerText === 'O'){
    return false;
  }
  return true;
}

function changePlayer () {
  playerDisplay.classList.remove('player' + currentPlayer);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add('player' + currentPlayer); 
}

function updateBoard(){
  var theTiles = document.querySelectorAll('.tile');
  for(var i = 0; i < theTiles.length; i++){
    if(theTiles[i].classList.contains('playerX') ){
      board[i] = 'X';
      tempBoard[i] = '';
    }
    else if(theTiles[i].classList.contains('playerO') ){
      board[i] = 'O';
      tempBoard[i] = '';
    }
    else{
      continue;
    }
  }
}

function announce(type){
  switch(type){
    case PLAYERO_WON:
      announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
      break;
    case PLAYERX_WON:
      announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
      break;
    case TIE:
      announcer.innerHTML = 'Tie!';
      break;
  }
  announcer.classList.remove('hide');
  display.classList.add('hide');
}

function highlightWinningCondition(arr) {
  theTiles[arr[0]].classList.add('winningAxis');
  theTiles[arr[1]].classList.add('winningAxis');
  theTiles[arr[2]].classList.add('winningAxis');
}

function handleResultValidation() {
  let roundWon = false;
  for(var i = 0; i < winningConditions.length; i++){
    var arr = winningConditions[i];
    var a = board[arr[0]];
    var b = board[arr[1]];
    var c = board[arr[2]];
    if(a == '' || b == '' || c == ''){
      continue;
    } 
    if(a === b && b === c){
      roundWon = true;
      highlightWinningCondition(arr);
      break;
    }
  }

  if(roundWon){
    announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
    isGameActive = false;
    return ;
  }

  if(!board.includes('')){
    announce(TIE);
  }
}

function resetBoard (){
  board = ['','','','','','','','',''];
  tempBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  isGameActive = true;
  if(currentPlayer = 'O'){
    changePlayer();
  }
  announcer.classList.add('hide');
  display.classList.remove('hide');

  for(var i = 0; i < theTiles.length; i++){
    theTiles[i].innerText = '';
    theTiles[i].classList.remove('winningAxis');
    if(theTiles[i].classList.contains('playerX')) {
      theTiles[i].classList.remove('playerX');
    }
    else if(theTiles[i].classList.contains('playerO')){
      theTiles[i].classList.remove('playerO');
    }
    else{
      continue;
    }
  }
}

function userAction(e){
  var target = getTarget(e);

  if(isValidation(target) && isGameActive){
    target.innerText = currentPlayer;
    target.classList.add('player' + currentPlayer);
    updateBoard();
    handleResultValidation();
    changePlayer();
    computerMove();
    // minimax();
  }
}


tiles.addEventListener('click', function(e){
  userAction(e)
}, false);

resetButton[0].addEventListener('click', resetBoard);


function switchMode(e){
  e = e || window.event;

  if( document.documentElement.classList.toggle('dark-mode')){
    themeMode.innerHTML = ' <img src="/img/solid-black-sun-symbol.png" alt=""> Light ';
  }
  else{
    themeMode.innerHTML = ' <img src="/img/night-mode.png" alt=""> Dark ';
  }

  document.querySelectorAll('.inverted').forEach( (result) => {
    result.classList.toggle('invert');
  })
}

nightMode.addEventListener('click', switchMode);

function checkEmpty(square){
  return square === ''; 
}

function computerMove(){
  var temp =  tempBoard.filter(checkEmpty);
  
  if(isGameActive){
      var ComMove =  temp[0];
      theTiles[ComMove].innerText = currentPlayer;
      theTiles[ComMove].classList.add('player' + currentPlayer);
      updateBoard();
      handleResultValidation();
      changePlayer();
    }
}

function emptySquare(square){
  return square === ''; 
}

var huPlayer = currentPlayer;
function minimax(){
  var availSpots = board.filter(emptySquare);

  if(checkWin(theBoard, thePlayer)){
    return score -10;
  }

}
