(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "theme-preference";

  // ---------- Theme toggle ----------
  var themeToggle = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeToggle) {
      var isDark = theme === "dark" ||
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  var stored = null;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* localStorage unavailable (private mode, etc.) - fall back to system preference */
  }
  applyTheme(stored);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var currentlyDark = current === "dark" || (!current && systemPrefersDark);
      var next = currentlyDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  // ---------- Mobile nav ----------
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("is-open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") closeMobileNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMobileNav();
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Hero terminal typing ----------
  var terminalCode = document.getElementById("terminal-code");
  if (terminalCode && !reduceMotion) {
    var terminalScript = [
      [{ t: "$ ", c: "t-muted" }, { t: "whoami", c: "" }],
      [{ t: "sahar-zada", c: "" }],
      [{ t: "$ ", c: "t-muted" }, { t: "cat focus.txt", c: "" }],
      [{ t: "full-stack dev, systems, ml", c: "" }],
      [{ t: "$ ", c: "t-muted" }, { t: "status", c: "" }],
      [{ t: "open to internships", c: "t-accent" }]
    ];

    terminalCode.textContent = "";
    var cursor = document.createElement("span");
    cursor.className = "terminal-cursor";
    cursor.textContent = "▋";
    terminalCode.appendChild(cursor);

    var lineIndex = 0;
    var segIndex = 0;
    var charIndex = 0;
    var currentSpan = null;

    function typeNext() {
      if (lineIndex >= terminalScript.length) return;

      var seg = terminalScript[lineIndex][segIndex];

      if (charIndex === 0) {
        currentSpan = seg.c ? document.createElement("span") : null;
        if (currentSpan) {
          currentSpan.className = seg.c;
          terminalCode.insertBefore(currentSpan, cursor);
        }
      }

      var char = seg.t[charIndex];
      if (currentSpan) {
        currentSpan.textContent += char;
      } else {
        terminalCode.insertBefore(document.createTextNode(char), cursor);
      }

      charIndex++;
      var delay = 28 + Math.random() * 34;

      if (charIndex >= seg.t.length) {
        charIndex = 0;
        segIndex++;
        if (segIndex >= terminalScript[lineIndex].length) {
          segIndex = 0;
          lineIndex++;
          terminalCode.insertBefore(document.createElement("br"), cursor);
          delay = 260;
        }
      }

      setTimeout(typeNext, delay);
    }

    setTimeout(typeNext, 450);
  }

  // ---------- Scroll reveal ----------
  var revealTargets = document.querySelectorAll(
    ".about-grid, .project-card, .skill-group, .contact-inner"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
