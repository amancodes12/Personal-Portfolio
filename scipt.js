// ---------- Typing effect (kept from your original) ----------
const roles = ["Developer", "Programmer", "Problem Solver", "Tech Enthusiast"];
let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function type() {
  if (!typingElement) return;
  if (charIndex < roles[index].length) {
    typingElement.textContent += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 120);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (!typingElement) return;
  if (charIndex > 0) {
    typingElement.textContent = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 80);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(type, 500);
  }
}

// ---------- Sidebar & navigation behavior ----------
document.addEventListener("DOMContentLoaded", () => {
  // start typing
  setTimeout(type, 500);

  // elements
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const navItems = document.querySelectorAll(".sidebar nav ul li[data-target]");

  // mobile: toggle sidebar
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }

  // smooth scrolling on click
  navItems.forEach(item => {
    const targetId = item.getAttribute("data-target");
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // find target element by id
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // smooth scroll
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

      // close sidebar on mobile
      if (sidebar && sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
      }

      // update active class visually
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // highlight nav on scroll (optional but helpful)
  const sections = Array.from(document.querySelectorAll("main .intro, main .section")).map(s => s.id || s.getAttribute('id')).filter(Boolean);

  function onScroll() {
    const scrollPos = window.scrollY + window.innerHeight * 0.25; // a bit above center
    let currentId = sections[0];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.offsetTop <= scrollPos) currentId = id;
    }
    navItems.forEach(item => {
      if (item.getAttribute("data-target") === currentId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // run once to set initial active
  onScroll();
});
