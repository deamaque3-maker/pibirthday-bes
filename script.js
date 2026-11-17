/* ═══════════════════════════════════════════════
   BIRTHDAY WEBSITE — script.js
═══════════════════════════════════════════════ */

const BIRTHDAY_NAME = "BABYY KOO!! ♡";

let envelopeOpened    = false;
let greetingRevealed  = false;
let galleryObserver   = null;
let gallery2Observer  = null;
let notesObserver     = null;
let polaroidsVisible  = 0;
let polaroids2Visible = 0;

/* ── Hide a section ── */
function hideSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transition = "opacity 0.5s ease";
  el.style.opacity = "0";
  setTimeout(() => { el.style.display = "none"; }, 500);
}

/* ── Show a section ── */
function showSection(id, cb) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = "";
  el.classList.remove("hidden-section");
  el.classList.add("visible");
  el.style.opacity = "1";
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => { if (cb) cb(); }, 300);
}

/* ════════════ INIT ════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("birthdayName");
  if (nameEl) nameEl.textContent = BIRTHDAY_NAME;
  spawnFooterHearts();
});

/* ════════════ STEP 1 — OPEN ENVELOPE ════════════ */
function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const wrapper = document.getElementById("envelopeWrapper");
  const btn     = document.getElementById("openBtn");

  wrapper.classList.add("shaking");
  setTimeout(() => {
    wrapper.classList.remove("shaking");
    wrapper.classList.add("opened");
  }, 650);

  btn.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  btn.style.opacity = "0";
  btn.style.transform = "scale(0.8)";
  btn.disabled = true;

  setTimeout(() => transitionToGreeting(), 1400);
}

/* ════════════ STEP 2 — GREETING ════════════ */
function transitionToGreeting() {
  if (greetingRevealed) return;
  greetingRevealed = true;

  const openingScreen   = document.getElementById("opening-screen");
  const greetingSection = document.getElementById("greeting-section");

  openingScreen.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  openingScreen.style.opacity    = "0";
  openingScreen.style.transform  = "scale(1.03)";

  setTimeout(() => {
    openingScreen.style.display = "none";
    greetingSection.classList.remove("hidden-section");
    greetingSection.classList.add("visible");
    greetingSection.style.opacity = "1";
    window.scrollTo({ top: 0, behavior: "smooth" });

    const titleLines = greetingSection.querySelectorAll(".title-line");
    titleLines.forEach((line, i) => {
      setTimeout(() => line.classList.add("animate"), i * 200);
    });
    setTimeout(() => spawnConfetti(), 300);
  }, 700);
}

/* ════════════ STEP 3 — GALLERY 1 ════════════ */
function revealGallery1() {
  spawnOverlayHearts(14);
  hideSection("greeting-section");
  setTimeout(() => showSection("gallery-section", initPolaroidObserver), 500);
}

function initPolaroidObserver() {
  const polaroids   = document.querySelectorAll(".polaroid:not(.polaroid2):not(.polaroid-secret)");
  const proceedWrap = document.getElementById("proceedWrap");
  polaroidsVisible  = 0;

  galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index, 10);
        setTimeout(() => {
          entry.target.classList.add("in-view");
          polaroidsVisible++;
          if (polaroidsVisible >= polaroids.length) {
            setTimeout(() => proceedWrap.classList.add("visible"), 400);
          }
        }, idx * 150);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  polaroids.forEach(p => galleryObserver.observe(p));
}

/* ════════════ STEP 4 — GALLERY 2 ════════════ */
function revealGallery2() {
  const proceedBtn = document.getElementById("proceedBtn");
  proceedBtn.disabled = true;
  spawnOverlayHearts(16);
  hideSection("gallery-section");
  setTimeout(() => showSection("gallery2-section", initPolaroid2Observer), 500);
}

function initPolaroid2Observer() {
  const polaroids2   = document.querySelectorAll(".polaroid2");
  const proceedWrap2 = document.getElementById("proceedWrap2");
  polaroids2Visible  = 0;

  gallery2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index, 10);
        setTimeout(() => {
          entry.target.classList.add("in-view");
          polaroids2Visible++;
          if (polaroids2Visible >= polaroids2.length) {
            setTimeout(() => proceedWrap2.classList.add("visible"), 400);
          }
        }, idx * 150);
        gallery2Observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  polaroids2.forEach(p => gallery2Observer.observe(p));
}

/* ════════════ STEP 5 — NOTES ════════════ */
function revealNotes() {
  const proceedBtn2 = document.getElementById("proceedBtn2");
  proceedBtn2.disabled = true;
  spawnOverlayHearts(20);
  hideSection("gallery2-section");
  setTimeout(() => {
    showSection("notes-section", () => {
      initNoteCardsObserver();
    });
  }, 500);
}

function initNoteCardsObserver() {
  const cards = document.querySelectorAll(".note-card");
  notesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0, 10) * 150;
        setTimeout(() => entry.target.classList.add("in-view"), delay);
        notesObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => notesObserver.observe(card));
}

/* ════════════ STEP 6 — ASKING PAGE ════════════ */
function revealAskingPage() {
  hideSection("notes-section");
  setTimeout(() => showSection("passcode-section"), 500);
}

/* ════════════ STEP 8 — SECRET MESSAGE → SECRET GALLERY ════════════ */
function revealSecret() {
  const allSections = document.querySelectorAll("section");
  allSections.forEach(s => {
    if (s.id !== "secret-message-section") {
      s.style.transition = "opacity 0.5s ease";
      s.style.opacity = "0";
      setTimeout(() => s.style.display = "none", 500);
    }
  });

  spawnOverlayHearts(22);

  setTimeout(() => {
    const msgSection = document.getElementById("secret-message-section");
    msgSection.style.display = "";
    msgSection.classList.remove("hidden-section");
    msgSection.classList.add("visible");
    msgSection.style.opacity = "1";
    // Add dark background
    msgSection.style.background = "linear-gradient(160deg, var(--purple-dark) 0%, #3d1a6e 100%)";
    window.scrollTo({ top: 0, behavior: "smooth" });
    spawnSecretMsgHearts();
  }, 500);
}

function revealSecretGallery() {
  hideSection("secret-message-section");
  setTimeout(() => {
    const secretSection = document.getElementById("secret-gallery-section");
    secretSection.style.display = "";
    secretSection.classList.remove("hidden-section");
    secretSection.classList.add("visible");
    secretSection.style.opacity = "1";
    window.scrollTo({ top: 0, behavior: "smooth" });
    initSecretGalleryObserver();
  }, 500);
}

function spawnSecretMsgHearts() {
  const container = document.getElementById("secretMsgHearts");
  if (!container) return;
  const heartChars = ["♡","♥","✦","✿","·"];
  for (let i = 0; i < 18; i++) {
    const h    = document.createElement("span");
    h.className = "footer-float-heart";
    const size  = Math.random() * 22 + 10;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 8 + 7;
    const delay = Math.random() * 10;
    const icon  = heartChars[Math.floor(Math.random() * heartChars.length)];
    h.textContent = icon;
    h.style.cssText = `--s:${size}px;--l:${left}%;--dur:${dur}s;--del:${delay}s;font-size:${size}px;`;
    container.appendChild(h);
  }
}

/* ════════════ STEP 9 — FINAL FOOTER ════════════ */
function revealFinalFooter() {
  hideSection("secret-gallery-section");
  setTimeout(() => {
    showSection("footer-section", () => {
      startFooterHeartAnimation();
    });
  }, 500);
}

/* ════════════ STEP 10 — SCRAPBOOK ════════════ */
function revealScrapbook() {
  hideSection("footer-section");
  setTimeout(() => {
    showSection("scrapbook-section");
  }, 500);
}

function initSecretGalleryObserver() {
  const polaroids = document.querySelectorAll(".polaroid-secret");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.index, 10);
        setTimeout(() => entry.target.classList.add("in-view"), idx * 150);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  polaroids.forEach(p => obs.observe(p));
}

/* ════════════ CONFETTI ════════════ */
function spawnConfetti() {
  const container = document.getElementById("confettiBurst");
  if (!container) return;
  const colors = ["#c9a8e8","#b68fd4","#7c4fa0","#f5e6d8","#ffd6e7","#e8c4f0","#d4a8e8","#ffffff"];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size  = Math.random() * 10 + 5;
    const left  = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const dur   = Math.random() * 2 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.cssText = `left:${left}%;top:${Math.random()*30}%;width:${size}px;height:${size}px;background:${color};border-radius:${shape};--dur:${dur}s;--del:${delay}s;`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), (delay + dur + 0.5) * 1000);
  }
}

/* ════════════ OVERLAY HEARTS ════════════ */
function spawnOverlayHearts(count) {
  const overlay = document.getElementById("heartsOverlay");
  if (!overlay) return;
  const hearts = ["💜","🤍","♡","💗","✨","🌸","💕"];
  for (let i = 0; i < count; i++) {
    const h     = document.createElement("span");
    h.className = "fly-heart";
    const icon  = hearts[Math.floor(Math.random() * hearts.length)];
    const size  = Math.random() * 20 + 14;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 1.8 + 2;
    const delay = Math.random() * 1;
    h.textContent = icon;
    h.style.cssText = `--s:${size}px;--l:${left}%;--dur:${dur}s;--del:${delay}s;font-size:${size}px;`;
    overlay.appendChild(h);
    setTimeout(() => h.remove(), (delay + dur + 0.5) * 1000);
  }
}

/* ════════════ FOOTER HEARTS ════════════ */
function spawnFooterHearts() {
  const container = document.querySelector(".footer-hearts");
  if (!container) return;
  const heartChars = ["♡","♥","✦","✿","·"];
  for (let i = 0; i < 18; i++) {
    const h    = document.createElement("span");
    h.className = "footer-float-heart";
    const size  = Math.random() * 22 + 10;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 8 + 7;
    const delay = Math.random() * 10;
    const icon  = heartChars[Math.floor(Math.random() * heartChars.length)];
    h.textContent = icon;
    h.style.cssText = `--s:${size}px;--l:${left}%;--dur:${dur}s;--del:${delay}s;font-size:${size}px;`;
    container.appendChild(h);
  }
}

function startFooterHeartAnimation() {
  spawnOverlayHearts(14);
}

/* ════════════ KEYBOARD ════════════ */
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && !envelopeOpened) {
    const btn = document.getElementById("openBtn");
    if (btn && !btn.disabled) openEnvelope();
  }
});

/* ════════════ PARALLAX TILT ════════════ */
document.addEventListener("mousemove", (e) => {
  const wrapper = document.getElementById("envelopeWrapper");
  if (!wrapper || envelopeOpened) return;
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
  wrapper.style.transform = `perspective(600px) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg)`;
});

document.addEventListener("mouseleave", () => {
  const wrapper = document.getElementById("envelopeWrapper");
  if (!wrapper || envelopeOpened) return;
  wrapper.style.transform = "";
});

/* ════════════ TOUCH — tap envelope ════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const envWrapper = document.getElementById("envelopeWrapper");
  if (envWrapper) {
    envWrapper.addEventListener("click", () => {
      if (!envelopeOpened) openEnvelope();
    });
  }
});

/* ════════════ MUSIC ════════════ */
let musicPlaying = false;

function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const btn   = document.getElementById("musicBtn");
  const icon  = document.getElementById("musicIcon");
  if (musicPlaying) {
    audio.pause(); musicPlaying = false;
    btn.classList.remove("playing"); btn.classList.add("paused");
    icon.textContent = "♪";
  } else {
    audio.play(); musicPlaying = true;
    btn.classList.add("playing"); btn.classList.remove("paused");
    icon.textContent = "♫";
  }
}

document.addEventListener("click", function startMusic() {
  const audio = document.getElementById("bgMusic");
  const btn   = document.getElementById("musicBtn");
  const icon  = document.getElementById("musicIcon");
  if (!musicPlaying) {
    audio.play().then(() => {
      musicPlaying = true;
      btn.classList.add("playing");
      icon.textContent = "♫";
    }).catch(() => {});
  }
  document.removeEventListener("click", startMusic);
}, { once: true });

/* ════════════ POLAROID FLIP ════════════ */
document.addEventListener("click", (e) => {
  const polaroid = e.target.closest(".polaroid");
  if (!polaroid) return;
  if (!polaroid.classList.contains("in-view")) return;
  polaroid.classList.toggle("flipped");
});

/* ════════════ ASKING PAGE ════════════ */
let noClickCount = 0;
const funnyMessages = [
  "Gusto mo ba makita ang aking malupitang sikrit?",
  "Sigurado ka ba? 👀",
  "go bhie 😢",
  "HAHAHAHAHAHHA 😂",
  "MWHWHWHWHHWHW 😈",
  "PLEASE NA 🙏",
  "ayun lang, lumbay 😔",
];

function runAwayNo() {
  const btn     = document.getElementById("noBtn");
  const section = document.getElementById("passcode-section");
  const rect    = section.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const maxX    = rect.width  - btnRect.width  - 20;
  const maxY    = rect.height - btnRect.height - 20;
  btn.style.position = "fixed";
  btn.style.left     = (rect.left + Math.random() * maxX) + "px";
  btn.style.top      = (rect.top  + Math.random() * maxY) + "px";
  btn.style.zIndex   = "999";
  noClickCount++;
  const q = document.getElementById("askQuestion");
  if (q && noClickCount < funnyMessages.length) {
    q.textContent = funnyMessages[noClickCount];
  }
}

/* ════════════════════════════════════════════
   BACK BUTTON
════════════════════════════════════════════ */
const sectionOrder = [
  "opening-screen",
  "greeting-section",
  "gallery-section",
  "gallery2-section",
  "notes-section",
  "passcode-section",
  "secret-message-section",
  "secret-gallery-section",
  "footer-section",
  "scrapbook-section"
];

let currentSectionIndex = 0;

function showBackBtn(index) {
  const btn = document.getElementById("backBtn");
  if (!btn) return;
  btn.style.display = index > 1 ? "block" : "none";
  currentSectionIndex = index;
}

function goBack() {
  if (currentSectionIndex <= 1) return;
  const prevId = sectionOrder[currentSectionIndex - 1];
  const currId = sectionOrder[currentSectionIndex];
  hideSection(currId);
  setTimeout(() => {
    const prev = document.getElementById(prevId);
    if (!prev) return;
    prev.style.display = "";
    prev.classList.remove("hidden-section");
    prev.classList.add("visible");
    prev.style.opacity = "1";
    window.scrollTo({ top: 0, behavior: "smooth" });
    showBackBtn(currentSectionIndex - 1);
  }, 500);
}

// Hook into each reveal function to track current section
const _revealGallery1 = revealGallery1;
revealGallery1 = function() { _revealGallery1(); showBackBtn(2); };

const _revealGallery2 = revealGallery2;
revealGallery2 = function() { _revealGallery2(); showBackBtn(3); };

const _revealNotes = revealNotes;
revealNotes = function() { _revealNotes(); showBackBtn(4); };

const _revealFooter = revealFooter;
revealFooter = function() { _revealFooter(); showBackBtn(5); };

const _revealAskingPage = revealAskingPage;
revealAskingPage = function() { _revealAskingPage(); showBackBtn(5); };

const _revealSecret = revealSecret;
revealSecret = function() { _revealSecret(); showBackBtn(6); };

const _revealSecretGallery = revealSecretGallery;
revealSecretGallery = function() { _revealSecretGallery(); showBackBtn(7); };

const _revealFinalFooter = revealFinalFooter;
revealFinalFooter = function() { _revealFinalFooter(); showBackBtn(8); };

const _revealScrapbook = revealScrapbook;
revealScrapbook = function() { _revealScrapbook(); showBackBtn(9); };

/* ════════════════════════════════════════════
   THANK U GAME
════════════════════════════════════════════ */
const thankUMessages = [
  "thank u for staying 💜",
  "thank u for understanding me 💜",
  "thank u for being patient 💜",
  "thank u for choosing me 💜",
  "thank u for being you 💜",
  "thank u for everything 💜",
];

let thankuCollected = 0;
let thankuHeartsSpawned = 0;
let thankuInterval = null;

function revealThankUGame() {
  hideSection("scrapbook-section");
  setTimeout(() => {
    const gameSection = document.getElementById("thanku-game-section");
    gameSection.style.display = "flex";
    gameSection.classList.remove("hidden-section");
    gameSection.classList.add("visible");
    gameSection.style.opacity = "1";
    gameSection.style.pointerEvents = "all";
    window.scrollTo({ top: 0, behavior: "smooth" });
    showBackBtn(10);
    startThankUGame();
  }, 500);
}

function startThankUGame() {
  thankuCollected = 0;
  thankuHeartsSpawned = 0;
  document.getElementById("thankuFinal").style.display = "none";
  document.getElementById("thankuCounter").textContent = "0 / 6 collected";

  // Spawn first heart immediately
  spawnThankUHeart();

  // Spawn hearts every 1.2 seconds
  thankuInterval = setInterval(() => {
    if (thankuHeartsSpawned >= 20 || thankuCollected >= 6) {
      clearInterval(thankuInterval);
      return;
    }
    spawnThankUHeart();
  }, 1200);
}

function spawnThankUHeart() {
  const area = document.getElementById("thankuGameArea");
  if (!area) return;

  const heart = document.createElement("div");
  heart.className = "thanku-heart";
  heart.textContent = "💜";

  const left = Math.random() * 85 + 5;
  const dur = Math.random() * 3 + 5;
  const sway = (Math.random() - 0.5) * 60;

  heart.style.cssText = `left:${left}%;--dur:${dur}s;--sway:${sway}px;`;

  heart.addEventListener("click", () => {
    if (thankuCollected >= 6) return;

    // Show pop message
    const msgIdx = thankuCollected;
    const popMsg = document.createElement("div");
    popMsg.className = "thanku-pop-msg";
    popMsg.textContent = thankUMessages[msgIdx];
    area.appendChild(popMsg);
    setTimeout(() => popMsg.classList.add("show"), 50);
    setTimeout(() => {
      popMsg.classList.remove("show");
      setTimeout(() => popMsg.remove(), 400);
    }, 1500);

    // Remove heart with pop animation
    heart.style.transform = "scale(1.8)";
    heart.style.opacity = "0";
    heart.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    setTimeout(() => heart.remove(), 300);

    thankuCollected++;
    document.getElementById("thankuCounter").textContent = `${thankuCollected} / 6 collected`;

    // Show final when all collected
    if (thankuCollected >= 6) {
      clearInterval(thankuInterval);
      setTimeout(() => {
        document.getElementById("thankuFinal").style.display = "block";
        // Clear remaining hearts
        const remaining = document.querySelectorAll(".thanku-heart");
        remaining.forEach(h => {
          h.style.opacity = "0";
          setTimeout(() => h.remove(), 300);
        });
      }, 800);
    }
  });

  area.appendChild(heart);
  thankuHeartsSpawned++;
}
