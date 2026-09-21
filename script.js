/**
 * Employia — Client Script
 * Exceptional people. High-impact roles.
 *
 * Modules:
 * 1. Initial Curtain Entrance
 * 2. Throttled Scroll Engine (Sticky Header, Top Progress Bar, Hero Parallax)
 * 3. Horizontal Pinned Roles Chapter (Desktop Rail & Mobile Snap Track)
 * 4. Mobile Navigation & Escape Dismissal
 * 5. Dynamic Role Inquiry Routing
 * 6. Clipboard Helper & Toast Notifications
 * 7. Accessible Legal Modal (GDPR & Impressum)
 * 8. Editorial Scroll Reveal Observer
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Check user motion preference
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // =========================================================================
  // 1. Initial Curtain Entrance
  // =========================================================================
  const introCurtain = document.getElementById("intro-curtain");

  if (introCurtain) {
    if (isReducedMotion) {
      introCurtain.style.display = "none";
    } else {
      setTimeout(() => {
        introCurtain.classList.add("is-loaded");
        setTimeout(() => {
          introCurtain.style.display = "none";
        }, 900);
      }, 750);
    }
  }

  // =========================================================================
  // 2. Throttled Scroll Engine (Header, Progress Bar, Hero Parallax)
  // =========================================================================
  const header = document.querySelector(".site-header");
  const progressBar = document.getElementById("scroll-progress-bar");
  const heroMediaImg = document.querySelector(".hero-media img");
  const heroOverlay = document.querySelector(".hero-overlay");

  // =========================================================================
  // 3. Horizontal Roles Chapter (Desktop Pinned Scroll + Mobile Track)
  // =========================================================================
  const rolesSection = document.querySelector(".roles-pinned-section");
  const rolesRail = document.getElementById("roles-rail");
  const rolesCounter = document.getElementById("roles-counter");
  const rolesPrevBtn = document.getElementById("roles-prev-btn");
  const rolesNextBtn = document.getElementById("roles-next-btn");
  const rolePanels = document.querySelectorAll(".role-panel");
  const totalRoles = rolePanels.length || 6;

  let currentRoleIndex = 0;

  const updateRolesRail = () => {
    if (!rolesSection || !rolesRail) return;

    const isDesktop = window.innerWidth >= 960 && !isReducedMotion;

    if (isDesktop) {
      const rect = rolesSection.getBoundingClientRect();
      const sectionHeight = rolesSection.offsetHeight;
      const maxScroll = sectionHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / maxScroll));

      // Calculate total horizontal travel distance with right margin
      const railScrollWidth = rolesRail.scrollWidth;
      const maxTravel = railScrollWidth - window.innerWidth + 80;

      if (maxTravel > 0) {
        const translateX = rawProgress * maxTravel;
        rolesRail.style.transform = `translate3d(-${translateX.toFixed(1)}px, 0, 0)`;
      }

      // Update active role index (1-based for display)
      const calculatedIndex = Math.min(
        totalRoles,
        Math.max(1, Math.floor(rawProgress * totalRoles) + 1)
      );

      if (calculatedIndex !== currentRoleIndex) {
        currentRoleIndex = calculatedIndex;
        if (rolesCounter) {
          rolesCounter.textContent = `0${currentRoleIndex} / 0${totalRoles}`;
        }
      }
    } else {
      // Clear desktop transform on mobile
      rolesRail.style.transform = "";
    }
  };

  // Previous / Next Buttons for Roles Navigation
  if (rolesPrevBtn && rolesNextBtn && rolesSection) {
    rolesPrevBtn.addEventListener("click", () => {
      if (window.innerWidth >= 960 && !isReducedMotion) {
        const sectionTop = rolesSection.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = rolesSection.offsetHeight;
        const maxScroll = sectionHeight - window.innerHeight;
        const step = maxScroll / (totalRoles - 1);
        const targetScroll = Math.max(sectionTop, window.scrollY - step);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      } else {
        const container = document.querySelector(".roles-rail-container");
        if (container) {
          container.scrollBy({ left: -320, behavior: "smooth" });
        }
      }
    });

    rolesNextBtn.addEventListener("click", () => {
      if (window.innerWidth >= 960 && !isReducedMotion) {
        const sectionTop = rolesSection.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = rolesSection.offsetHeight;
        const maxScroll = sectionHeight - window.innerHeight;
        const step = maxScroll / (totalRoles - 1);
        const targetScroll = Math.min(sectionTop + maxScroll, window.scrollY + step);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      } else {
        const container = document.querySelector(".roles-rail-container");
        if (container) {
          container.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    });
  }

  // Mobile horizontal scroll tracking for counter
  const rolesContainer = document.querySelector(".roles-rail-container");
  if (rolesContainer) {
    rolesContainer.addEventListener("scroll", () => {
      if (window.innerWidth < 960) {
        const scrollLeft = rolesContainer.scrollLeft;
        const itemWidth = 320;
        const index = Math.min(
          totalRoles,
          Math.max(1, Math.round(scrollLeft / itemWidth) + 1)
        );
        if (rolesCounter) {
          rolesCounter.textContent = `0${index} / 0${totalRoles}`;
        }
      }
    }, { passive: true });
  }

  // Master Scroll Dispatcher (Combined into single rAF for 60fps)
  let scrollTicking = false;

  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Header elevation on scroll
    if (header) {
      header.classList.toggle("scrolled", scrollY > 24);
    }

    // Scroll progress bar
    if (progressBar && docHeight > 0) {
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));
      progressBar.style.transform = `scaleX(${progress})`;
    }

    // Hero parallax & subtle fade
    if (!isReducedMotion && scrollY <= window.innerHeight) {
      if (heroMediaImg) {
        heroMediaImg.style.transform = `scale(1.04) translate3d(0, ${(scrollY * 0.22).toFixed(1)}px, 0)`;
      }
      if (heroOverlay) {
        const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.75));
        heroOverlay.style.opacity = opacity.toFixed(3);
        heroOverlay.style.transform = `translate3d(0, ${(scrollY * -0.12).toFixed(1)}px, 0)`;
      }
    }

    // Horizontal roles rail update
    updateRolesRail();

    scrollTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(onScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    updateRolesRail();
  }, { passive: true });

  // Initial trigger
  onScroll();

  // =========================================================================
  // 4. Mobile Navigation & Escape Dismissal
  // =========================================================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  const closeMobileMenu = () => {
    if (menuToggle && navLinks) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      navLinks.classList.remove("mobile-open");
    }
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      navLinks.classList.toggle("mobile-open", !isOpen);
    });

    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("mobile-open") &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("mobile-open")) {
        closeMobileMenu();
        menuToggle.focus();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // =========================================================================
  // 5. Dynamic Role Inquiry Routing
  // =========================================================================
  rolePanels.forEach((card) => {
    card.addEventListener("click", () => {
      const role = card.getAttribute("data-role");
      const founderMail = document.getElementById("founder-mail-link");
      if (role && founderMail) {
        const subject = encodeURIComponent(`Talent Inquiry: ${role} — Employia`);
        founderMail.href = `mailto:hello@employia.de?subject=${subject}`;
      }
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Support Enter or Space key navigation for accessibility
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // =========================================================================
  // 6. Clipboard Helper & Toast Notifications
  // =========================================================================
  const toast = document.getElementById("toast-notice");
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-active");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-active");
    }, 2500);
  };

  const copyToClipboard = async (text, successMsg) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast(successMsg);
    } catch (err) {
      showToast(`Please write to ${text}`);
    }
  };

  document.querySelectorAll(".copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      copyToClipboard("hello@employia.de", "Email copied: hello@employia.de");
    });
  });

  // =========================================================================
  // 7. Accessible Legal Modal (GDPR & Impressum)
  // =========================================================================
  const legalModal = document.getElementById("legal-modal");
  const modalContent = document.getElementById("modal-content");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const openPrivacyBtn = document.getElementById("open-privacy-btn");
  const openImpressumBtn = document.getElementById("open-impressum-btn");
  let lastFocusedElement = null;

  const legalContent = {
    privacy: `
      <h2 id="modal-title">Privacy Policy (Datenschutz)</h2>
      <p>
        <strong>1. General Overview</strong><br>
        Employia takes candidate and client confidentiality with utmost seriousness.
        We operate strictly under the EU General Data Protection Regulation (GDPR).
      </p>
      <p>
        <strong>2. Data Controller</strong><br>
        Employia Partnership · Contact: <a href="mailto:hello@employia.de">hello@employia.de</a>
      </p>
      <p>
        <strong>3. Processing of Candidate &amp; Founder Data</strong><br>
        Information submitted via email or direct inquiry is processed solely for evaluating
        relevant career opportunities or matching technical talent. Candidate profiles are
        never shared with prospective companies without explicit prior consent.
      </p>
      <p>
        <strong>4. Your Rights</strong><br>
        You retain full rights to access, rectification, or erasure of your submitted information
        at any time upon written request to <a href="mailto:hello@employia.de">hello@employia.de</a>.
      </p>
    `,
    impressum: `
      <h2 id="modal-title">Impressum (Legal Notice)</h2>
      <p>Information according to § 5 TMG (German Telemedia Act):</p>
      <p>
        <strong>Employia</strong><br>
        Represented by the leadership team.<br>
        Contact: <a href="mailto:hello@employia.de">hello@employia.de</a><br>
        Domain: employia.de
      </p>
      <p>
        <strong>Responsible for editorial content:</strong><br>
        Employia Editorial &amp; Talent Operations
      </p>
      <p>
        <strong>Dispute Resolution:</strong><br>
        The European Commission provides a platform for online dispute resolution (ODR):
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.
      </p>
    `,
  };

  const openModal = (type, triggerBtn) => {
    if (!legalModal || !modalContent) return;
    lastFocusedElement = triggerBtn;
    modalContent.innerHTML = legalContent[type] || "";
    legalModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modalCloseBtn?.focus();
  };

  const closeModal = () => {
    if (!legalModal) return;
    legalModal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener("click", () => openModal("privacy", openPrivacyBtn));
  }

  if (openImpressumBtn) {
    openImpressumBtn.addEventListener("click", () => openModal("impressum", openImpressumBtn));
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (legalModal) {
    legalModal.addEventListener("click", (e) => {
      if (e.target === legalModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && legalModal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // 8. Editorial Scroll Reveal Observer
  // =========================================================================
  const revealTargets = document.querySelectorAll(
    ".positioning, .door-panel, .process-editorial, .closing"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
});