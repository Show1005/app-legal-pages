(function () {
  const STORAGE_KEY = "lillip-apps-language";

  function resolveTarget(select, language) {
    if (language === "en") return select.dataset.enUrl;
    if (language === "ja") return select.dataset.jaUrl;
    return "";
  }

  document.querySelectorAll(".lillip-language-select").forEach((select) => {
    const pageLanguage = document.documentElement.lang || "ja";
    select.value = pageLanguage.startsWith("en") ? "en" : "ja";

    select.addEventListener("change", () => {
      const language = select.value;
      const target = resolveTarget(select, language);
      try {
        window.localStorage.setItem(STORAGE_KEY, language);
      } catch (_) {
        // Language switching still works when localStorage is unavailable.
      }

      if (target && target !== window.location.pathname.split("/").pop()) {
        window.location.href = target;
      }
    });
  });
})();
