const projectData = {
  "smart-home": {
    title: "Smart Home Dashboard",
    description:
      "An accessibility-first smart home dashboard that connects a responsive browser interface with Arduino hardware and Firebase Realtime Database for live device interaction.",
    highlights: [
      "Designed accessible controls with high contrast, large text support, keyboard-friendly interaction, and live status announcements.",
      "Integrated lighting, temperature, humidity, and security monitoring into one cohesive dashboard experience.",
      "Connected voice interaction and hardware data flow to create a more complete real-time IoT prototype."
    ],
    stack: ["HTML", "CSS", "JavaScript", "Arduino", "Firebase Realtime Database", "Accessibility Design"]
  },
  "expense-tracker": {
    title: "Expense Tracker",
    description:
      "A responsive personal finance web application built for managing transactions, visualizing budget trends, and exporting clean summary reports.",
    highlights: [
      "Implemented dashboard summaries, category charts, monthly breakdowns, and budget planning workflows.",
      "Built a user-focused transaction system with persistent data handling and practical reporting tools.",
      "Enhanced the product with PDF export, dark mode, and a more complete application-style user experience."
    ],
    stack: ["HTML", "CSS", "JavaScript", "Chart.js", "jsPDF", "Client-Side Data Management"],
    link: "https://expense-tracker-final-kappa.vercel.app/"
  },
  "family-vault": {
    title: "FamilyVault",
    description:
      "A full-stack family archive application focused on secure information management, structured memory preservation, and user-specific data access.",
    highlights: [
      "Built authentication and per-user data separation using Firebase Authentication and Cloud Firestore.",
      "Designed modules for family members, media, memories, recipes, finances, timelines, and time capsules.",
      "Created a polished interface that balances storytelling, organization, and practical long-term use."
    ],
    stack: ["HTML", "CSS", "JavaScript", "Firebase Authentication", "Cloud Firestore", "Responsive UI"],
    link: "https://familyvaultmain.web.app"
  }
};

const roles = [
  "\"Full-Stack Web Developer\"",
  "\"Computing Science Student\"",
  "\"Accessibility-Focused Builder\""
];

const typedRole = document.getElementById("typed-role");
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const progressBar = document.getElementById("progress-bar");
const contactEmailButton = document.getElementById("contact-email");
const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const projectSlides = [...document.querySelectorAll(".project-slide")];
const prevButton = document.getElementById("project-prev");
const nextButton = document.getElementById("project-next");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let activeSlide = 0;

function typeRole() {
  const currentRole = roles[roleIndex];
  typedRole.textContent = currentRole.slice(0, charIndex);

  if (!deleting && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeRole, 90);
    return;
  }

  if (!deleting && charIndex === currentRole.length) {
    deleting = true;
    setTimeout(typeRole, 1400);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, 50);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(typeRole, 280);
}

function setActiveSlide(index) {
  activeSlide = (index + projectSlides.length) % projectSlides.length;
  projectSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });
}

function openModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  const highlights = project.highlights.map((item) => `<li>${item}</li>`).join("");
  const stack = project.stack.map((item) => `<span>${item}</span>`).join("");
  const linkMarkup = project.link
    ? `<div class="modal-actions"><a class="modal-button" href="${project.link}" target="_blank" rel="noopener">Visit Website</a></div>`
    : "";

  modalContent.innerHTML = `
    <h3 id="modal-title">${project.title}</h3>
    <p>${project.description}</p>
    <ul>${highlights}</ul>
    <div class="modal-stack">${stack}</div>
    ${linkMarkup}
  `;

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateProgressBar() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${percent}%`;
}

function setTheme(mode) {
  document.body.classList.toggle("light-theme", mode === "light");
  themeIcon.textContent = mode === "light" ? "☀" : "☾";
  localStorage.setItem("portfolioTheme", mode);
}

typeRole();
setActiveSlide(0);
updateProgressBar();

document.querySelectorAll(".project-link").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.project));
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navList.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
  setTheme(nextTheme);
});

window.addEventListener("scroll", updateProgressBar);

const storedTheme = localStorage.getItem("portfolioTheme");
if (storedTheme === "light") {
  setTheme("light");
}

function copyEmail() {
  const email = "ujwalkumar2003@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    contactEmailButton.querySelector("small").textContent = "Email copied to clipboard";
    window.setTimeout(() => {
      contactEmailButton.querySelector("small").textContent = "Click to copy my email";
    }, 1500);
  }).catch(() => {
    contactEmailButton.querySelector("small").textContent = "Copy unavailable right now";
  });
}

contactEmailButton.addEventListener("click", copyEmail);

prevButton.addEventListener("click", () => setActiveSlide(activeSlide - 1));
nextButton.addEventListener("click", () => setActiveSlide(activeSlide + 1));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});
