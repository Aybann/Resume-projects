const nightMode = document.getElementById('themeMode');
var isOn;

if(localStorage.getItem('isToggle')){
  let temp = localStorage.getItem('isToggle');
  isOn = JSON.parse(temp) === true;
  
}else{
  localStorage.setItem('isToggle', false);
  isOn = false;
}

if(isOn){
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
  isOn = !isOn;
  localStorage.isToggle = isOn;
}

nightMode.addEventListener('click', switchMode);