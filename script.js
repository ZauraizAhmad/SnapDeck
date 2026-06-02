/* GENERAL FUNCTIONS */
function toggleIcons() {
  document.getElementById("visible").classList.toggle("active");
  document.getElementById("visible").classList.toggle("hide");

  document.getElementById("hidden").classList.toggle("active");
  document.getElementById("hidden").classList.toggle("hide");
}

/* Load Certain Containers on Pages */

document.addEventListener("DOMContentLoaded", () => {
  const containers = ["navbar", "notification", "settings", "add"];

  containers.forEach((name) => loadContainer(name));
});

function loadContainer(containerName) {
  fetch(`${containerName}.html`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(`${containerName}-container`).innerHTML = data;
      setActiveIcon(); // if needed
    })
    .catch((error) => console.error("Error loading container:", error));
}

/* Set Active Icon in Navbar */

function setActiveIcon() {
  const currentPage = window.location.pathname.split("/").pop().split(".")[0];
  document.querySelectorAll(".menu-icon").forEach((icon) => {
    const iconName = icon.dataset.icon;

    if (iconName === currentPage) {
      icon.src = `/assets/icons/${iconName}-active.png`;
    } else {
      icon.src = `/assets/icons/${iconName}.png`;
    }
  });
}

/* Notification & Settings Panel */

let openPanel = null;

function toggleMenu(e, panelName) {
  e.preventDefault();

  if (panelName != "add") {
    const panel = document.getElementById(panelName);
    const icon = document.querySelector(`.${panelName}-icon`);
    if (!panel || !icon) return;

    const isMobile = window.innerWidth <= 520;
    const hidePos = isMobile ? "-100vw" : "-32rem";
    const showPos = isMobile ? "0" : "8rem";

    // If the same panel is open then close it
    if (openPanel === panelName) {
      panel.style.left = hidePos;
      icon.src = `/assets/icons/${panelName}.png`;
      openPanel = null;
      return;
    }

    // If another panel is open then close it first
    if (openPanel) {
      const oldPanel = document.getElementById(openPanel);
      const oldIcon = document.querySelector(`.${openPanel}-icon`);
      if (oldPanel && oldIcon) {
        oldPanel.style.left = hidePos;
        oldIcon.src = `/assets/icons/${openPanel}.png`;
      }
    }

    // Open the new panel
    panel.style.left = showPos;
    icon.src = `/assets/icons/${panelName}-active.png`;
    openPanel = panelName;
  } else {
    document.getElementById("add").style.display = "flex";
    document.querySelector(`.add-icon`).src = `/assets/icons/add-active.png`;
  }
}

/* LOGIN/SIGNUP PAGE */
function showlogin() {
  document.getElementById("login-Id").style.display = "flex";
  document.getElementById("signup-Id").style.display = "none";
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function showSignup() {
  document.getElementById("login-Id").style.display = "none";
  document.getElementById("signup-Id").style.display = "flex";
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "block";
}

function loginUser() {
  event.preventDefault();
  window.location.href = "home.html";
  return false;
}

/*  HOME PAGE */

/*Deck Slider*/
function initSlider(containerSelector) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const track = container.querySelector(".slider");
    const leftArrow = container.querySelector(".left-arrow");
    const rightArrow = container.querySelector(".right-arrow");

    if (leftArrow && rightArrow && track) {
      leftArrow.addEventListener("click", () => {
        track.scrollBy({ left: -230, behavior: "smooth" });
      });

      rightArrow.addEventListener("click", () => {
        track.scrollBy({ left: 230, behavior: "smooth" });
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initSlider(".daily-deck-container");
  initSlider(".suggestions-container");
});

/* Add a Post Panel */
function closePanel() {
  document.getElementById("add").style.display = "none";
  document.querySelector(`.add-icon`).src = `/assets/icons/add.png`;
}

/* Shutter Button Explore */
document.querySelectorAll(".shutterIcon").forEach((shutter) => {
  const animations = shutter.querySelectorAll("animate");
  shutter.addEventListener("click", () => {
    animations.forEach((anim) => anim.beginElement());
  });
});

const shutterI = document.querySelectorAll(".shutterIcon");
const shutterArea = document.querySelectorAll(".shutter-button");

shutterArea.addEventListener("click", () => {
  shutterI.classList.toggle("active-shutter");
});
