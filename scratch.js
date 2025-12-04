const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let mode = "scratch"; // scratch | select

// --------------------------------------------------
// Resize & Paint Sand Texture
// --------------------------------------------------
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const img = new Image();
  img.src = "sourceimages/sandTexture.png";
  img.onload = () => {
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// --------------------------------------------------
// Utilities
// --------------------------------------------------
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX || e.touches?.[0].clientX) - rect.left,
    y: (e.clientY || e.touches?.[0].clientY) - rect.top,
  };
}

// --------------------------------------------------
// SCRATCHING
// --------------------------------------------------
function erase(e) {
  if (mode !== "scratch" || !drawing) return;

  const { x, y } = getPos(e);
  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();
}

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  if (mode !== "scratch") return;
  drawing = true;
  erase(e);
});
canvas.addEventListener("mousemove", erase);
document.addEventListener("mouseup", () => (drawing = false));

// Touch events
canvas.addEventListener("touchstart", (e) => {
  if (mode !== "scratch") return;
  drawing = true;
  erase(e);
});
canvas.addEventListener("touchmove", erase);
document.addEventListener("touchend", () => (drawing = false));

// --------------------------------------------------
// Prevent clicking fossils during scratch mode
// --------------------------------------------------
canvas.addEventListener("click", (e) => {
  if (mode === "scratch") e.preventDefault();
});

// --------------------------------------------------
// MODE BUTTONS (OPTION A CLEAN VERSION)
// --------------------------------------------------
const scratchBtn = document.getElementById("scratchModeBtn");
const selectBtn = document.getElementById("selectModeBtn");
const fossils = document.querySelectorAll(".fossil");

function setModeScratch() {
  mode = "scratch";

  scratchBtn.classList.add("active-tool");
  selectBtn.classList.remove("active-tool");

  canvas.style.pointerEvents = "auto";
  canvas.style.cursor = "crosshair";

  fossils.forEach((f) => {
    f.style.pointerEvents = "none";
    f.style.cursor = "default";
  });
}

function setModeSelect() {
  mode = "select";

  selectBtn.classList.add("active-tool");
  scratchBtn.classList.remove("active-tool");

  canvas.style.pointerEvents = "none";
  canvas.style.cursor = "default";

  fossils.forEach((f) => {
    f.style.pointerEvents = "auto";
    f.style.cursor = "pointer";

    f.onclick = (e) => {
      e.preventDefault();

      if (!isFullyUncovered(f)) {
        console.log("Fossil still covered!");
        return;
      }

      showPopup(f.dataset.fossil);
    };
  });
}

scratchBtn.addEventListener("click", setModeScratch);
selectBtn.addEventListener("click", setModeSelect);

// Start in scratch mode:
setModeScratch();

// --------------------------------------------------
// POPUP
// --------------------------------------------------
function showPopup(type) {
  const popup = document.getElementById("fossilPopup");
  const text = document.getElementById("popupText");

  const names = {
    trex: "T-Rex",
    triceratops: "Triceratops",
    ptero: "Pterodactyl",
    ammo: "Ammonite",
    smile: "Smilodon",
    amber: "Amber",
    egg: "Dinosaur Eggshell",
    lepid: "Lepidodendron",
    mammoth: "Mammoth",
    dodo: "Dodo Bird",
    elk: "Irish Elk",
    sloth: "Giant Sloth",
    cook: "Cooksonia",
    sigil: "Sigillaria",
    dunk: "Dunkleosteus",
  };

  text.innerText = "You found a " + (names[type] + " fossil") + "!";

  // Go to fossilpedia
  document.getElementById("goToFossilpedia").onclick = () => {
    window.location.href = `fossilpedia.html?fossil=${type}`;
  };

  popup.style.display = "flex";
}

document.getElementById("continueDigging").addEventListener("click", () => {
  document.getElementById("fossilPopup").style.display = "none";
  setModeScratch();
});

// --------------------------------------------------
// UNCOVER CHECK
// --------------------------------------------------
function isFullyUncovered(fossilElem) {
  const rect = fossilElem.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  const xStart = Math.floor(rect.left - canvasRect.left);
  const yStart = Math.floor(rect.top - canvasRect.top);
  const width = Math.floor(rect.width);
  const height = Math.floor(rect.height);

  const pixels = ctx.getImageData(xStart, yStart, width, height).data;

  let uncovered = 0;
  let total = pixels.length / 4;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) uncovered++;
  }

  const percent = uncovered / total;
  console.log("Uncovered:", Math.round(percent * 100) + "%");

  return percent >= 0.4; // clickable at 40% uncovered
}
