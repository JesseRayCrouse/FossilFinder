const fossilButtons = document.querySelectorAll(".fossilbutton");
const infoContainer = document.getElementById("info-container");

// Read fossil from URL: fossilpedia.html?fossil=trex
const params = new URLSearchParams(window.location.search);
const autoSelect = params.get("fossil");

// Convert dig-site IDs -> FossilPedia names
const fossilMap = {
  trex: "T-Rex",
  triceratops: "Triceratops",
  ptero: "Pterodactyl",
  dodo: "Dodo Bird",
  smile: "Smilodon",
  elk: "Irish Elk",
  dunk: "Dunkleosteus",
  egg: "Dino Eggshells",
  mammoth: "Mammoth",
  sloth: "Giant Sloth",
  ammo: "Ammonite",
  cook: "Cooksonia",
  sigil: "Sigillaria",
  lepid: "Lepidodendron",
  amber: "Amber Deposits",
};

const fossilInfo = {
  "T-Rex": {
    description:
      "The T. rex was a massive carnivorous dinosaur with the strongest bite force of any known land animal.",
    lived: "Late Cretaceous (68–66 million years ago)",
    diet: "Carnivore",
    location: "Western North America",
    image: "sourceimages/trexfossilhover.png",
  },

  Triceratops: {
    description:
      "A large herbivorous dinosaur known for its three horns and massive protective frill.",
    lived: "Late Cretaceous (68–66 million years ago)",
    diet: "Herbivore",
    location: "Western North America",
    image: "sourceimages/triceratopshover.png",
  },

  Pterodactyl: {
    description:
      "A flying reptile with wings made of skin and muscle, capable of soaring over prehistoric coastlines.",
    lived: "Late Jurassic (150 million years ago)",
    diet: "Fish and small animals",
    location: "Europe and Africa",
    image: "sourceimages/pterodactylhover.png",
  },

  "Dodo Bird": {
    description:
      "A flightless bird from Mauritius that went extinct due to overhunting and invasive species.",
    lived: "Holocene (extinct by ~1680)",
    diet: "Fruits, nuts, seeds",
    location: "Mauritius (Indian Ocean)",
    image: "sourceimages/dodohover.png",
  },

  Smilodon: {
    description:
      "Famous saber-toothed cat known for its long canine teeth and powerful body.",
    lived: "Pleistocene (2.5 million–10,000 years ago)",
    diet: "Carnivore",
    location: "North & South America",
    image: "sourceimages/smilodonhover.png",
  },

  "Irish Elk": {
    description:
      "A giant species of deer known for its enormous antlers, which could reach 12 feet across.",
    lived: "Pleistocene (up to ~7,700 years ago)",
    diet: "Herbivore",
    location: "Europe and Central Asia",
    image: "sourceimages/IrishElkhover.png",
  },

  Dunkleosteus: {
    description:
      "A heavily armored prehistoric fish with a jaw capable of delivering devastating bites.",
    lived: "Late Devonian (358–382 million years ago)",
    diet: "Carnivore",
    location: "North America, Europe, Morocco",
    image: "sourceimages/dunkleosteushover.png",
  },

  "Dino Eggshells": {
    description:
      "Fossilized eggshells from various dinosaur species representing nesting behaviors and reproductive biology.",
    lived: "Mesozoic Era (varies)",
    diet: "Whatever the parent ate",
    location: "Worldwide",
    image: "sourceimages/dinoEgghover.png",
  },

  Mammoth: {
    description:
      "Large shaggy relatives of today's elephants, adapted for surviving Ice Age climates.",
    lived: "Pleistocene (300,000–4,000 years ago)",
    diet: "Herbivore",
    location: "North America, Europe, Siberia",
    image: "sourceimages/mammothhover.png",
  },

  "Giant Sloth": {
    description:
      "A massive ground-dwelling sloth capable of standing over 10 feet tall.",
    lived: "Pleistocene (up to 10,000 years ago)",
    diet: "Herbivore",
    location: "North and South America",
    image: "sourceimages/giantSlothhover.png",
  },

  Ammonite: {
    description:
      "Coiled marine mollusks related to squids and octopuses, extremely common as fossils.",
    lived: "Devonian–Cretaceous (400–66 M.Y.A)",
    diet: "Small marine animals",
    location: "Ancient Seabeds",
    image: "sourceimages/ammonitefossilhover.png",
  },

  Cooksonia: {
    description:
      "One of the earliest known land plants, marking the transition of life from water to land.",
    lived: "Silurian (425 M.Y.A)",
    diet: "Photosynthetic",
    location: "Wales, Czech Republic",
    image: "sourceimages/cooksoniahover.png",
  },

  Sigillaria: {
    description:
      "A tall extinct tree-like plant with distinctive scale-like bark patterns.",
    lived: "Carboniferous (323–299 million years ago)",
    diet: "Photosynthetic",
    location: "North America, Europe",
    image: "sourceimages/sigillariahover.png",
  },

  Lepidodendron: {
    description:
      "A giant tree-like plant from the Carboniferous swamps, sometimes called a 'scale tree.'",
    lived: "Carboniferous (359–299 million years ago)",
    diet: "Photosynthetic",
    location: "Worldwide in ancient coal swamps",
    image: "sourceimages/lepidhover.png",
  },

  "Amber Deposits": {
    description:
      "Fossilized tree resin that sometimes traps insects, plants, or feathers inside.",
    lived: "Varies (often 20–200 million years old)",
    diet: "N/A",
    location: "Baltic region, Dominican Republic",
    image: "sourceimages/amberhover.png",
  },
};

// --------------------------------------
// AUTO-SELECT fossil when arriving
// --------------------------------------
if (autoSelect && fossilMap[autoSelect]) {
  const targetName = fossilMap[autoSelect];

  const targetButton = [...fossilButtons].find(
    (btn) => btn.getAttribute("data-fossil") === targetName
  );

  if (targetButton) {
    targetButton.classList.add("selected");
    updateInfoPanel(targetName);
  }
}

// --------------------------------------
// UPDATE PANEL FUNCTION
// --------------------------------------
function updateInfoPanel(name) {
  const fossil = fossilInfo[name];

  infoContainer.innerHTML = `
    <h2 class="fossil-title">${name}</h2>

    <p class="fossil-info">${fossil.description}</p>

    <div class="fossil-details">
      <p><strong>Lived:</strong> ${fossil.lived}</p>
      <p><strong>Diet:</strong> ${fossil.diet}</p>
      <p><strong>Common Locations:</strong> ${fossil.location}</p>
    </div>
    <img src="${fossil.image}" alt="${name}" class="fossil-image">
  `;
}

// --------------------------------------
// ENABLE BUTTON CLICKS
// --------------------------------------
fossilButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    fossilButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    const fossilName = btn.getAttribute("data-fossil");
    updateInfoPanel(fossilName);
  });
});

// --------------------------------------
// ACCESSIBILITY: KEYBOARD SUPPORT
// --------------------------------------
fossilButtons.forEach((btn) => {
  // Mouse click support
  btn.addEventListener("click", () => {
    activateFossil(btn);
  });

  // Keyboard support
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent page from scrolling when pressing Space
      activateFossil(btn);
    }
  });
});

function activateFossil(btn) {
  fossilButtons.forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");

  const fossilName = btn.getAttribute("data-fossil");
  updateInfoPanel(fossilName);
}
