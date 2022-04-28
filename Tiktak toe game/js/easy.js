const tiles = document.getElementById('container');
const resetButton = document.getElementsByClassName('reset');
const announcer = document.querySelector('.announcer');
const display = document.querySelector('.display');
const theTiles = document.querySelectorAll('.tile');
const human = document.querySelector('.huPlayer');

var board = ['','','','','','','','',''];
var tempBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var isGameActive = true;

var currentPlayer = Math.floor(Math.random() * 2) == 0 ? 'X': 'O';
human.innerHTML = " You're <span id='displayPlayer' class='player"+currentPlayer+"'>" + currentPlayer +"</span>'s Player " ;

var humanPlay = currentPlayer;

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
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
      announcer.innerHTML = humanPlay === 'O' ?  'You Win!' : 'You Lose!';
      break;
    case PLAYERX_WON:
      announcer.innerHTML = humanPlay === 'X' ? 'You Win!' : 'You Lose!';
      break;
    case TIE:
      announcer.innerHTML = 'Keep It Up!';
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
    isGameActive = false;
  }
}

function resetBoard (){
  board = ['','','','','','','','',''];
  tempBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  isGameActive = true;
  currentPlayer = Math.floor(Math.random() * 2) == 0 ? 'X': 'O';
  human.innerHTML = " You're <span id='displayPlayer' class='player"+currentPlayer+"'>" + currentPlayer +"</span>'s Player " ;
  humanPlay = currentPlayer;
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
  }
}


tiles.addEventListener('click', function(e){
  userAction(e)
}, false);

resetButton[0].addEventListener('click', resetBoard);

function checkEmpty(square){
  return square !== ''; 
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