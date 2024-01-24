document.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage =
    localStorage.getItem("languagePortfolioErika") || "pt";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(userPreferredLanguage, langData);

  setActiveLink();

  window.addEventListener("hashchange", setActiveLink);
});

function setActiveLink() {
  const currentSection = getCurrentSection();
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href").substring(1);
    if (href === currentSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function getCurrentSection() {
  const hash = window.location.hash;
  return hash ? hash.substring(1) : "home";
}

function toggleMenuHeader() {
  const menuButton = document.getElementById("mobile-menu-switch");
  var navLinks = document.getElementById("nav-menu-links");
  if (navLinks.style.display === "block") {
    navLinks.style.display = "none";
    menuButton.setAttribute("aria-expanded", "false");
  } else {
    navLinks.style.display = "block";
    menuButton.setAttribute("aria-expanded", "true");
  }
}

function toggleLangSwitchVisibility() {
  const languageButton = document.getElementById("switch-language");
  var languagesContent = document.getElementById("langs-content");
  if (languagesContent.style.display === "flex") {
    languagesContent.style.display = "none";
    languageButton.setAttribute("aria-expanded", "false");
  } else {
    languagesContent.style.display = "flex";
    languageButton.setAttribute("aria-expanded", "true");
  }
}

function updateContent(lang, langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const config = JSON.parse(element.getAttribute("data-i18n"));
    if (config.typeKey) {
      if (config.typeKey === "alt") {
        element.alt = langData[config.key];
      }
      if (config.typeKey === "aria-label") {
        element.ariaLabel = langData[config.key];
      }
      if (config.typeKey === "content") {
        element.content = langData[config.key];
      }
    } else {
      element.innerHTML = langData[config.key];
    }
  });

  document.querySelector("html").lang = lang;
}

function setLanguagePreference(lang) {
  localStorage.setItem("languagePortfolioErika", lang);
  location.reload();
}

async function fetchLanguageData(lang) {
  const response = await fetch(`resources/languages/${lang}.json`);
  return response.json();
}

async function changeLanguage(lang) {
  await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(lang, langData);
}
