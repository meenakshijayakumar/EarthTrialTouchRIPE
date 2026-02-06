/* =========================
   COUNTER ANIMATION
   ========================= */

function animateCounter(element, target, duration, label) {
  let startTime = null;
  const startValue = 0;

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const currentValue = Math.min(
      startValue + (progress / duration) * target,
      target
    );

    element.textContent = Math.floor(currentValue) + label;

    if (progress < duration) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + label;
    }
  }

  requestAnimationFrame(updateCounter);
}

/* =========================
   DOM READY (SINGLE ENTRY)
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COUNTERS (SAFE)
     ========================= */

  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target || "0");
            const label = entry.target.dataset.label || "";
            animateCounter(entry.target, target, 2000, label);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /* =========================
     CUSTOM CURSOR
     ========================= */

  const customCursor = document.createElement("div");
  customCursor.className = "custom-cursor";
  customCursor.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
    </svg>
  `;
  document.body.appendChild(customCursor);

  document.addEventListener("mousemove", e => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll(".accordion-horizontal-scroll").forEach(el => {
    el.addEventListener("mouseenter", () => {
      customCursor.style.transform = "scale(1)";
    });
    el.addEventListener("mouseleave", () => {
      customCursor.style.transform = "scale(0)";
    });
  });

  /* =========================
     SECTION FADE-IN ANIMATION
     ========================= */

  const sections = document.querySelectorAll("section");

  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* =========================
     MEDIA MODAL (VIDEO + IMAGE)
     ========================= */

  const modal = document.querySelector(".media-modal");
  const modalContent = document.querySelector(".media-modal-content");
  const closeBtn = document.querySelector(".media-close");

  if (modal && modalContent) {

    document.querySelectorAll(".media-frame").forEach(frame => {
      frame.addEventListener("click", () => {
        const type = frame.dataset.type;
        const src = frame.dataset.src;

        if (!type || !src) return;

        modalContent.innerHTML = "";

        if (type === "video") {
          const video = document.createElement("video");
          video.src = src;
          video.controls = true;
          video.preload = "metadata";
          video.playsInline = true;
          video.style.maxWidth = "100%";
          video.style.maxHeight = "90vh";
          video.style.background = "black";

          modalContent.appendChild(video);

          setTimeout(() => {
            video.load();
            video.play().catch(() => {});
          }, 100);
        }

        if (type === "image") {
          const img = document.createElement("img");
          img.src = src;
          modalContent.appendChild(img);
        }

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    /* Close button */
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    /* Click outside */
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeModal();
      }
    });

    function closeModal() {
      const video = modalContent.querySelector("video");
      if (video) {
        video.pause();
        video.src = "";
      }

      modal.style.display = "none";
      modalContent.innerHTML = "";
      document.body.style.overflow = "";
    }
  }

});
