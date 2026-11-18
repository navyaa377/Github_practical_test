// =========================================================
// 1. TIME-BASED GREETING
// =========================================================
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

let timeOfDay = "evening";
if (hour < 12) timeOfDay = "morning";
else if (hour < 18) timeOfDay = "afternoon";

greeting.textContent = `Good ${timeOfDay}! Welcome to my portfolio 👋`;

// =========================================================
// 2. TYPING EFFECT (cycles through phrases)
// =========================================================
const tagline = document.querySelector(".tagline");
const phrases = [
  "Computer Science student (AI & ML)",
  "Hackathon participant",
  "Python & Java programmer",
  "Web development enthusiast",
  "Always learning, always building",
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

tagline.classList.add("typing");

function typeEffect() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    tagline.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500); // pause when the phrase is complete
      return;
    }
  } else {
    charIndex--;
    tagline.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 80);
}

typeEffect();

// =========================================================
// 3. DARK MODE TOGGLE (remembers your choice)
// =========================================================
const toggleButton = document.getElementById("theme-toggle");

function updateButtonText() {
  const isDark = document.body.classList.contains("dark-mode");
  toggleButton.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// load saved theme
try {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
} catch (e) {
  // localStorage may be blocked; the page still works
}
updateButtonText();

toggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  updateButtonText();
  try {
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}
});

// =========================================================
// 4. SCROLL PROGRESS BAR
// =========================================================
const progressBar = document.createElement("div");
progressBar.id = "progress-bar";
document.body.appendChild(progressBar);

// =========================================================
// 5. BACK-TO-TOP BUTTON
// =========================================================
const backToTop = document.createElement("button");
backToTop.id = "back-to-top";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.textContent = "↑";
document.body.appendChild(backToTop);

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = height > 0 ? (scrollTop / height) * 100 : 0;

  progressBar.style.width = percent + "%";
  backToTop.classList.toggle("show", scrollTop > 400);
});

// =========================================================
// 6. REVEAL SECTIONS
