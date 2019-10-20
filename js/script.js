let colors = ['yellow', 'blue', 'red', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let numPopped = 0;
let winTotal = 10;
let currentBalloon = 0;

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
    if (pos >= windowHeight + 200) {
      clearInterval(interval);
      deleteBalloon(elem);
    } else {
      pos++;
      elem.style.top = windowHeight - pos + 'px';
    }
  }
};

deleteBalloon = elem => {
  elem.remove();
};

updateScore = () => {
  for (let i = 0; i < scores.length; i++) {
    const element = scores[i];
    element.textContent = numPopped;
  }
};

document.addEventListener('click', e => {
  if (e.target.classList.contains('balloon')) {
    deleteBalloon(e.target);
    numPopped++;
    updateScore();
    console.log(numPopped);
  }
});
