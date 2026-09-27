/* Doc-mode helpers shared by lecture-idea decks. */
(function () {
  // Slides are built by inline JS after parse; browser hash-scroll runs too early
  // and misses #slide-N. Re-apply after the doc is rendered.
  function scrollToHash() {
    if (document.body.classList.contains("presenting")) return;
    const hash = location.hash;
    if (!hash || hash === "#present") return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: "start" });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(scrollToHash);
  });
  window.addEventListener("hashchange", scrollToHash);

  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const threshold = 320;
  const sync = () => {
    btn.classList.toggle("is-visible", window.scrollY > threshold);
  };
  window.addEventListener("scroll", sync, { passive: true });
  sync();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
