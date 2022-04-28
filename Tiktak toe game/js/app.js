const tiles = document.getElementById('container');
const playerDisplay = document.getElementById('displayPlayer');
const resetButton = document.getElementsByClassName('reset');
const announcer = document.querySelector('.announcer');
const display = document.querySelector('.display');

var board = ['','','','','','','','',''];
var isGameActive = true;
var currentPlayer ='X';


const PLAYERX_WON ='PLAYERX_WON';
const PLAYERO_WON ='PLAYERO_WON';
const TIE = 'TIE';

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
    }
    else if(theTiles[i].classList.contains('playerO') ){
      board[i] = 'O';
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
  var thetiles = document.querySelectorAll('.tile');

  thetiles[arr[0]].classList.add('winningAxis');
  thetiles[arr[1]].classList.add('winningAxis');
  thetiles[arr[2]].classList.add('winningAxis');
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
  isGameActive = true;
  if(currentPlayer = 'O'){
    changePlayer();
  }
  announcer.classList.add('hide');
  display.classList.remove('hide');
 
  var theTiles = document.querySelectorAll('.tile');
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
  var target= getTarget(e);

  if(isValidation(target) && isGameActive){
    target.innerText = currentPlayer;
    target.classList.add('player' + currentPlayer);
    updateBoard();
    handleResultValidation();
    changePlayer();
  }
}

tiles.addEventListener('click', function(e){
  userAction(e)
}, false);

resetButton[0].addEventListener('click', resetBoard);


