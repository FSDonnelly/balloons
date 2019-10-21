let colors = ['yellow', 'blue', 'red', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let numPopped = 0;
let winTotal = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');

createBalloon = () => {
  let div = document.createElement('div');
  let randColor = Math.floor(Math.random() * colors.length);
  div.className = `balloon balloon-${colors[randColor]}`;

  let randNum = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = `${randNum}px`;
  div.dataset.number = currentBalloon;
  currentBalloon++;

  body.appendChild(div);
  animateBalloon(div);
};

animateBalloon = elem => {
  let pos = 0;
  let randSpeed = Math.floor(Math.random() * 6 - 3);
  let interval = setInterval(
    frame,
    12 - Math.floor(numPopped / 10) + randSpeed
  );

  function frame() {
    if (
      pos >= windowHeight + 200 &&
      document.querySelector('[data-number="' + elem.dataset.number + '"]') !==
        null
    ) {
      clearInterval(interval);
      gameOver = true;
    } else {
      pos++;
      elem.style.top = windowHeight - pos + 'px';
    }
  }
};

playBallSound = () => {
  let audio = document.createElement('audio');
  audio.src = 'sounds/pop.mp3';
  audio.play();
};

deleteBalloon = elem => {
  elem.remove();
  numPopped++;
  updateScore();
  playBallSound();
};

updateScore = () => {
  for (let i = 0; i < scores.length; i++) {
    const element = scores[i];
    element.textContent = numPopped;
  }
};

startGame = () => {
  restartGame();
  let timeout = 0;

  let loop = setInterval(() => {
    timeout = Math.floor(Math.random() * 600 - 100);
    if (!gameOver && numPopped !== winTotal) {
      createBalloon();
    } else if (numPopped !== winTotal) {
      clearInterval(loop);
      totalShadow.style.display = 'flex';
      totalShadow.querySelector('.lose').style.display = 'block';
    } else {
      clearInterval(loop);
      totalShadow.style.display = 'flex';
      totalShadow.querySelector('.win').style.display = 'block';
    }
  }, 800 + timeout);
};

restartGame = () => {
  let removeBalloons = document.querySelectorAll('.balloon');
  for (let i = 0; i < removeBalloons.length; i++) {
    const element = removeBalloons[i];
    element.remove();
  }
  gameOver = false;
  numPopped = 0;
  updateScore();
};

document.addEventListener('click', e => {
  if (e.target.classList.contains('balloon')) {
    deleteBalloon(e.target);
  }
});

document.querySelector('.restart-win').addEventListener('click', () => {
  totalShadow.style.display = 'none';
  totalShadow.querySelector('.win').style.display = 'none';
  totalShadow.querySelector('.lose').style.display = 'none';
  startGame();
});

document.querySelector('.restart').addEventListener('click', () => {
  totalShadow.style.display = 'none';
  totalShadow.querySelector('.win').style.display = 'none';
  totalShadow.querySelector('.lose').style.display = 'none';
  startGame();
});

document.querySelector('.cancel').addEventListener('click', () => {
  totalShadow.style.display = 'none';
});

startBtn.addEventListener('click', () => {
  startGame();
  document.querySelector('.bg-music').play();
  document.querySelector('.start-game-window').style.display = 'none';
});
