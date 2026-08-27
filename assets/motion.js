(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar
  var bar = document.getElementById("scrollProgressBar");
  if (bar) {
    var ticking = false;
    var updateBar = function () {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var height = doc.scrollHeight - doc.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + "%";
      ticking = false;
    };
    document.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(updateBar);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateBar();
  }

  // Animated stat counter
  var counters = document.querySelectorAll(".stat-count");
  if (counters.length) {
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute("data-target"), 10) || 0;
      if (reduceMotion) {
        el.textContent = target;
        return;
      }
      var duration = 900;
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.round(progress * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      var countIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      });
      counters.forEach(function (el) {
        countIo.observe(el);
      });
    } else {
      counters.forEach(animateCount);
    }
  }

  // Scroll-triggered reveal
  var revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var revealIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealTargets.forEach(function (el) {
        revealIo.observe(el);
      });
    } else {
      revealTargets.forEach(function (el) {
        el.classList.add("is-in");
      });
    }
  }

  // Pointer-driven spotlight + tilt on app cards
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".app-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty("--mx", (x / rect.width) * 100 + "%");
        card.style.setProperty("--my", (y / rect.height) * 100 + "%");
        var rx = (y / rect.height - 0.5) * -6;
        var ry = (x / rect.width - 0.5) * 6;
        card.style.transform =
          "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }
})();
