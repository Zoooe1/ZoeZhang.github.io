(() => {
  const loading = new WeakMap();

  function loadFullImage(img) {
    const fullSrc = img.dataset.fullSrc;
    if (!fullSrc || loading.get(img) === fullSrc || img.dataset.loadedSrc === fullSrc) return;

    loading.set(img, fullSrc);
    const full = new Image();
    full.decoding = "async";

    full.onload = async () => {
      if (img.dataset.fullSrc !== fullSrc) return;
      try {
        await full.decode();
      } catch {
        /* The image is already loaded; older browsers can skip decode(). */
      }
      img.src = fullSrc;
      img.dataset.loadedSrc = fullSrc;
      img.classList.add("is-loaded");
    };

    full.src = fullSrc;
  }

  function initProgressiveImages() {
    const images = Array.from(document.querySelectorAll("img[data-full-src]"));
    const eager = images.filter((img) => img.loading !== "lazy");
    const lazy = images.filter((img) => img.loading === "lazy");

    window.setTimeout(() => eager.forEach(loadFullImage), 120);

    if (!("IntersectionObserver" in window)) {
      lazy.forEach(loadFullImage);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          loadFullImage(entry.target);
        });
      },
      { rootMargin: "700px 0px" }
    );

    lazy.forEach((img) => observer.observe(img));
  }

  function initProgressiveBackgrounds() {
    document.querySelectorAll("[data-full-bg]").forEach((element) => {
      const fullSrc = element.dataset.fullBg;
      if (!fullSrc) return;

      window.setTimeout(() => {
        const full = new Image();
        full.decoding = "async";
        full.onload = async () => {
          try {
            await full.decode();
          } catch {
            /* The image is already loaded; older browsers can skip decode(). */
          }
          element.style.backgroundImage = `url("${fullSrc}")`;
          element.classList.add("is-bg-loaded");
        };
        full.src = fullSrc;
      }, 160);
    });
  }

  window.loadProgressiveImage = loadFullImage;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        initProgressiveImages();
        initProgressiveBackgrounds();
      },
      { once: true }
    );
  } else {
    initProgressiveImages();
    initProgressiveBackgrounds();
  }
})();
