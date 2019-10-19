let colors = ['yellow', 'blue', 'red', 'violet', 'green'];
let windowWidth = window.innerWidth;
let body = document.body;

createBalloon = () => {
  let div = document.createElement('div');
  let randColor = Math.floor(Math.random() * colors.length);
  div.className = `balloon balloon-${colors[randColor]}`;

  let randNum = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = `${randNum}px`;
  body.appendChild(div);
};
