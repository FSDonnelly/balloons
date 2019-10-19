let colors = ['yellow', 'blue', 'red', 'violet', 'green'];

createBalloon = () => {
  let div = document.createElement('div');
  let randColor = Math.floor(Math.random() * colors.length);
  div.className = `balloon balloon-${colors[randColor]}`;
  document.body.appendChild(div);
};
