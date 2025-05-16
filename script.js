const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  const x = Math.random() * canvas.width;
  const y = canvas.height + 20;
  const size = Math.random() * 15 + 10;
  const speed = Math.random() * 1 + 0.5;
  hearts.push({ x, y, size, speed });
}

function drawHeart(x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(size / 2, -size / 2, size, size / 3, 0, size);
  ctx.bezierCurveTo(-size, size / 3, -size / 2, -size / 2, 0, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, i) => {
    heart.y -= heart.speed;
    drawHeart(heart.x, heart.y, heart.size);
    if (heart.y + heart.size < 0) {
      hearts.splice(i, 1);
    }
  });
  if (Math.random() < 0.2) createHeart();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
