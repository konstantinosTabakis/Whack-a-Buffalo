const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;
  const timerBoard = document.querySelector('.timer')
  const btn= document.querySelector('.btn')
  // let loop =false
   

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
       
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(200, 800);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    // if (loop){
    //   clearInterval(Timer)
    // }
    
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    
    // setTimeout(() => timeUp = true, 30000)
     
    let timeleft = 30
    timerBoard.innerHTML = timeleft  

    
    peep();

    let Timer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval( Timer);
        timerBoard.innerHTML = "Time is up";
        timeUp = true
        btn.classList.remove('hidden')
      } else {
        timerBoard.innerHTML = timeleft  
      }
      timeleft -= 1;
    }, 1000);
    
  }

  function bonk(e) {
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
 
   
  
  

  moles.forEach(mole => mole.addEventListener('click', bonk));
  btn.addEventListener('click',function(){
    btn.classList.add('hidden')
    startGame()
  } )