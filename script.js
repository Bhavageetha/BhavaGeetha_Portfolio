// 🌍 Portfolio Script - Optimized & Modular

document.addEventListener("DOMContentLoaded", () => {
  initPage();
  initNavbar();
  initSectionLinks();
  initAboutTabs();
  initPortfolioPopup();
  initTypingAnimation();
  initBackgroundCircles();
  initSectionNavigation();
});

/*------------------- 1. Page Initialization -------------------*/
function initPage() {
  const main = document.querySelector(".main");
  const homeSection = document.querySelector(".home-section");
  if (main && homeSection) {
    main.classList.remove("hidden");
    homeSection.classList.add("active");
  }
}

/*------------------- 2. Navbar Toggle -------------------*/
function initNavbar() {
  const navToggler = document.querySelector(".nav-toggler");
  if (!navToggler) return;

  navToggler.addEventListener("click", () => {
    hideActiveSection();
    document.querySelector(".header")?.classList.toggle("active");
    document.body.classList.toggle("hide-scrolling");
  });
}

function hideActiveSection() {
  const activeSection = document.querySelector("section.active");
  activeSection?.classList.toggle("fade-out");
}

/*------------------- 3. Section Link Navigation -------------------*/
function initSectionLinks() {
  document.querySelectorAll(".link-item[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetSection = document.querySelector(link.getAttribute("href"));
      if (!targetSection) return;

      document.querySelector(".overlay")?.classList.add("active");
      document.querySelector(".nav-toggler")?.classList.add("hide");

      if (link.classList.contains("nav-item")) {
        document.querySelector(".header")?.classList.toggle("active");
      } else {
        hideActiveSection();
        document.body.classList.add("hide-scrolling");
      }

      setTimeout(() => {
        document.querySelector("section.active")?.classList.remove("active", "fade-out");
        targetSection.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.body.classList.remove("hide-scrolling");
        document.querySelector(".nav-toggler")?.classList.remove("hide");
        document.querySelector(".overlay")?.classList.remove("active");
      }, 500);
    });
  });
}

/*------------------- 4. About Tabs -------------------*/
function initAboutTabs() {
  const tabsContainer = document.querySelector(".about-tabs");
  const aboutSection = document.querySelector(".about-section");

  if (!tabsContainer || !aboutSection) return;

  tabsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("tab-items") && !e.target.classList.contains("active")) {
      tabsContainer.querySelector(".active")?.classList.remove("active");
      e.target.classList.add("active");

      const target = aboutSection.querySelector(e.target.dataset.target);
      aboutSection.querySelector(".tab-content.active")?.classList.remove("active");
      target?.classList.add("active");
    }
  });
}

/*------------------- 5. Portfolio Popup -------------------*/
function initPortfolioPopup() {
  document.addEventListener("click", e => {
    if (e.target.classList.contains("view-project-btn")) {
      togglePortfolioPopup();
      document.querySelector(".portfolio-popup")?.scrollTo(0, 0);
      loadPortfolioDetails(e.target.closest(".portfolio-item"));
    }

    if (e.target.classList.contains("pp-inner")) {
      togglePortfolioPopup();
    }
  });

  document.querySelector(".pp-close")?.addEventListener("click", togglePortfolioPopup);
}

function togglePortfolioPopup() {
  document.querySelector(".portfolio-popup")?.classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".main")?.classList.toggle("fade-out");
}

function loadPortfolioDetails(item) {
  if (!item) return;
  document.querySelector(".pp-thumbnail img").src =
    item.querySelector(".portfolio-item-thumbnail img")?.src || "";
  document.querySelector(".pp-header h3").textContent =
    item.querySelector(".portfolio-item-title")?.textContent || "";
  document.querySelector(".pp-body").innerHTML =
    item.querySelector(".portfolio-item-details")?.innerHTML || "";
}

/*------------------- 6. Typing Animation -------------------*/
function initTypingAnimation() {
  if (typeof Typed !== "undefined") {
    new Typed(".typing-text", {
      strings: ["Web Developer", "App Developer", "Designer"],
      loop: true,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 500,
    });
  }
}

/*------------------- 7. Background Circles -------------------*/
function initBackgroundCircles() {
  const circles = document.querySelectorAll(".bg-circles .circle");
  if (!circles.length) return;

  circles.forEach(circle => {
    circle.style.left = `${Math.random() * window.innerWidth}px`;
    circle.style.top = `${Math.random() * window.innerHeight}px`;
    circle.style.animationDelay = `${Math.random() * 3}s`;
  });

  document.addEventListener("mousemove", e => {
    const x = e.clientX;
    const y = e.clientY;
    circles.forEach((circle, i) => {
      const speed = (i + 1) * 0.01;
      circle.style.transform = `translate(${(window.innerWidth / 2 - x) * speed}px, ${(window.innerHeight / 2 - y) * speed}px)`;
    });
  });
}

/*------------------- 8. Section Navigation Arrows -------------------*/
function initSectionNavigation() {
  const sections = document.querySelectorAll("section");
  let activeIndex = [...sections].findIndex(sec => sec.classList.contains("active"));

  const goToSection = index => {
    if (index >= 0 && index < sections.length) {
      sections[activeIndex]?.classList.remove("active");
      sections[index]?.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      activeIndex = index;
    }
  };

  document.querySelector(".next-btn")?.addEventListener("click", () => goToSection(activeIndex + 1));
  document.querySelector(".prev-btn")?.addEventListener("click", () => goToSection(activeIndex - 1));
}
