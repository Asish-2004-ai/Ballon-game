const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let balloon = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  radius: 20,
  isFlying: false,
  isBurst: false,
};

let balloonColor = '#FF0000'; 
const pumpButton = document.getElementById('pumpButton');
let pumpCount = 0;  

pumpButton.addEventListener('click', () => {
  if (!balloon.isFlying && !balloon.isBurst) {
    pumpCount++;
    balloon.radius += 5; 
    if (pumpCount >= 5) {  
      balloon.isFlying = true;
      pumpCount = 0;
      startFlying();
    }
  }
  drawBalloon();
});

function startFlying() {
  let dx = (Math.random() * 2 - 1) * 2;
  let dy = -2;

  function animate() {
    if (!balloon.isBurst) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balloon.x += dx;
      balloon.y += dy;

      if (balloon.x - balloon.radius < 0 || balloon.x + balloon.radius > canvas.width) {
        dx *= -1;
      }
      if (balloon.y - balloon.radius < 0 || balloon.y + balloon.radius > canvas.height) {
        dy *= -1;
      }

      drawBalloon();
      requestAnimationFrame(animate);
    }
  }
  animate();
}

function drawBalloon() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!balloon.isBurst) {
    ctx.beginPath();
    ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
    ctx.fillStyle = balloonColor;
    ctx.fill();
    ctx.closePath();
  }
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const distance = Math.sqrt((mouseX - balloon.x) ** 2 + (mouseY - balloon.y) ** 2);

  if (distance < balloon.radius && !balloon.isBurst && balloon.isFlying) {
    balloon.isBurst = true;
    balloonColor = '#FFFFFF'; 
    drawBalloon();
    setTimeout(() => resetGame(), 1000);
  }
});

function resetGame() {
  balloon = { x: canvas.width / 2, y: canvas.height - 50, radius: 20, isFlying: false, isBurst: false };
  balloonColor = '#FF0000';
  drawBalloon();
}

drawBalloon(); 
