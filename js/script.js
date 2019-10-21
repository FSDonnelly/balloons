let colors = ['yellow', 'blue', 'red', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let numPopped = 0;
let winTotal = 10;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');

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
  let interval = setInterval(frame, 10);

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

deleteBalloon = elem => {
  elem.remove();
  numPopped++;
  updateScore();
};

updateScore = () => {
  for (let i = 0; i < scores.length; i++) {
    const element = scores[i];
    element.textContent = numPopped;
  }
};

startGame = () => {
  restartGame();
  let loop = setInterval(() => {
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
  }, 800);
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

startGame();
