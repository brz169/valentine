const introCard = document.getElementById("introCard");
const card = document.getElementById("card");
const btnRow = document.getElementById("btnRow");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const img = document.getElementById("cuteImg");
const title = document.getElementById("title");

function rand(min, max) { return Math.random() * (max - min) + min; }

function teleportNo() {
  // move inside the button row area (looks like the video)
  const areaRect = btnRow.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 8;
  const minX = padding;
  const minY = padding;
  const maxX = areaRect.width - btnRect.width - padding;
  const maxY = areaRect.height - btnRect.height - padding;

  if (maxX <= minX || maxY <= minY) return;

  const x = rand(minX, maxX);
  const y = rand(minY, maxY);

  // instant teleport (not sliding)
  noBtn.style.transition = "none";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0,0)";
  void noBtn.offsetHeight; // reflow
}

function dodge() {
  teleportNo();
}

// No dodges on hover/touch
noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodge();
}, { passive: false });

// also dodge if cursor gets close (extra annoying like TikTok)
btnRow.addEventListener("mousemove", (e) => {
  const r = noBtn.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const d = Math.hypot(e.clientX - cx, e.clientY - cy);
  if (d < 90) dodge();
});

// confetti
function confettiBurst(amount = 50) {
  for (let i = 0; i < amount; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = `${Math.random() * 100}vw`;
    c.style.background = `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`;
    c.style.animationDuration = `${rand(0.9, 1.5)}s`;
    c.style.width = `${rand(6, 12)}px`;
    c.style.height = `${rand(8, 16)}px`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1600);
  }
}

// Yes reaction
yesBtn.addEventListener("click", () => {
  confettiBurst(60);
  img.src = "https://media.tenor.com/2roX3uxz_68AAAAC/cat-kiss.gif";
  title.innerHTML = "Yaaaay! 💖";
  noBtn.style.display = "none";
  yesBtn.textContent = "Hehe 😌";
});

// Intro -> show question after 2.2 seconds
window.addEventListener("load", () => {
  // place No once so it's visible
  teleportNo();

  setTimeout(() => {
    introCard.classList.add("hidden");
    card.classList.remove("hidden");
    teleportNo(); // place again after it becomes visible
  }, 2200);
});
