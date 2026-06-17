/* ============================================================
   Star Group Construction — "Quiet Vault" behavior
   Vanilla JS, no build. One motion vocabulary, all gated for
   reduced-motion and touch. Loaded with `defer`.
   ============================================================ */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer  = window.matchMedia("(pointer: fine)").matches;
  var still = /[?&]still\b/.test(location.search); // dev flag: freeze intro/reveals for screenshots
  if (still) document.documentElement.classList.add("still");

  /* Smooth tab-to-tab: on a cross-document View Transition, show content immediately
     during the crossfade (no entrance-animation replay), then restore scroll-reveals. */
  window.addEventListener("pagereveal", function (e) {
    if (!e || !e.viewTransition) return;
    var r = document.documentElement;
    r.classList.add("nav-instant");
    setTimeout(function () { r.classList.remove("nav-instant"); }, 480);
  });

  /* ---------- Intro curtain (once per session, timeout-protected) ---------- */
  (function curtain() {
    if (reduceMotion || still) return;
    try { if (sessionStorage.getItem("sgc_intro")) return; } catch (e) {}
    var c = document.createElement("div");
    c.className = "curtain";
    c.innerHTML = '<div style="text-align:center"><img class="c-mark" src="images/logo-mark.svg" alt="" width="70" height="70"><div class="c-rule" style="margin:22px auto 0"></div></div>';
    (document.body || document.documentElement).appendChild(c);
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(function () { c.classList.add("in"); });
    var done = false;
    function lift() {
      if (done) return; done = true;
      setTimeout(function () {
        c.classList.add("up");
        document.documentElement.style.overflow = "";
        try { sessionStorage.setItem("sgc_intro", "1"); } catch (e) {}
        setTimeout(function () { c.remove(); }, 1000);
      }, 650);
    }
    window.addEventListener("load", lift);
    setTimeout(lift, 1700);
  })();

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Footer year ---------- */
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    /* ---------- Sticky header + hide chrome on scroll-down, reveal on scroll-up ---------- */
    var header = document.querySelector(".site-header");
    var lastApplied = window.scrollY, chromeTicking = false;
    function applyChrome() {
      chromeTicking = false;
      var y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 12);
      if (document.body.classList.contains("nav-open")) { lastApplied = y; return; }
      if (y < 80) { document.body.classList.remove("chrome-hidden"); lastApplied = y; }              // always show near the top
      else if (y - lastApplied > 10) { document.body.classList.add("chrome-hidden"); lastApplied = y; }    // scrolling down -> hide
      else if (lastApplied - y > 10) { document.body.classList.remove("chrome-hidden"); lastApplied = y; } // scrolling up -> show
    }
    function onScroll() { if (!chromeTicking) { chromeTicking = true; requestAnimationFrame(applyChrome); } }
    applyChrome();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile drawer nav (scroll-locked) ---------- */
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    var backdrop = document.querySelector(".nav-backdrop");
    var navScrollY = 0;
    function setNav(open) {
      if (!toggle) return;
      if (open === document.body.classList.contains("nav-open")) return;  // no-op if already in that state — prevents stray scroll-to-top
      if (open) { navScrollY = window.scrollY || window.pageYOffset || 0; document.body.style.top = (-navScrollY) + "px"; }
      toggle.classList.toggle("open", open);
      if (links) links.classList.toggle("open", open);
      if (backdrop) backdrop.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (!open) { document.body.style.top = ""; window.scrollTo(0, navScrollY); }
    }
    function closeNav() { setNav(false); }
    if (toggle) toggle.addEventListener("click", function () { setNav(!toggle.classList.contains("open")); });
    if (backdrop) backdrop.addEventListener("click", closeNav);
    if (links) links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeNav(); });

    /* ---------- Headline line-splitting (for masked reveal) ---------- */
    function splitLines(el) {
      if (el.getAttribute("data-split-done")) return;
      var nodes = Array.prototype.slice.call(el.childNodes);
      var words = [];
      nodes.forEach(function (node) {
        if (node.nodeType === 3) {
          node.textContent.split(/\s+/).forEach(function (tok) {
            if (!tok) return;
            var s = document.createElement("span"); s.className = "w"; s.style.display = "inline-block"; s.textContent = tok; words.push(s);
          });
        } else if (node.nodeType === 1) {
          node.style.display = "inline-block"; words.push(node);
        }
      });
      el.innerHTML = "";
      words.forEach(function (w, i) { el.appendChild(w); if (i < words.length - 1) el.appendChild(document.createTextNode(" ")); });
      // group by vertical position
      var lines = [], cur = [], top = null;
      words.forEach(function (w) {
        var t = w.offsetTop;
        if (top === null) top = t;
        if (Math.abs(t - top) > 6) { lines.push(cur); cur = []; top = t; }
        cur.push(w);
      });
      if (cur.length) lines.push(cur);
      el.innerHTML = "";
      lines.forEach(function (line, i) {
        var outer = document.createElement("span"); outer.className = "split-line";
        var inner = document.createElement("span");
        inner.style.setProperty("--ld", (i * 90) + "ms");
        line.forEach(function (w, j) { inner.appendChild(w); if (j < line.length - 1) inner.appendChild(document.createTextNode(" ")); });
        outer.appendChild(inner); el.appendChild(outer);
      });
      el.setAttribute("data-split-done", "1");
    }

    function setupReveals() {
      if (!reduceMotion && !still) {
        document.querySelectorAll("[data-split]").forEach(splitLines);
      }
      var els = document.querySelectorAll("[data-reveal], [data-reveal-img], [data-split]");
      if (reduceMotion || still || !("IntersectionObserver" in window)) {
        els.forEach(function (el) { el.classList.add("in"); });
        return;
      }
      // stagger groups
      document.querySelectorAll("[data-reveal-group]").forEach(function (g) {
        g.querySelectorAll("[data-reveal]").forEach(function (el, i) { el.style.setProperty("--stagger", (Math.min(i, 8) * 80) + "ms"); });
      });
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      els.forEach(function (el) { io.observe(el); });
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setupReveals);
      setTimeout(function () { if (!document.querySelector("[data-split-done]")) setupReveals(); }, 1200);
    } else { setupReveals(); }

    /* ---------- Hero parallax (desktop, motion-safe) ---------- */
    var heroBg = document.querySelector(".hero .hero-bg");
    if (heroBg && !reduceMotion && window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          var o = Math.min(window.scrollY, window.innerHeight) * 0.16;
          heroBg.style.transform = "translate3d(0," + o + "px,0)";
          ticking = false;
        });
      }, { passive: true });
    }

    /* ---------- Count-up pull figures ---------- */
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion || !("IntersectionObserver" in window)) { el.textContent = target + suffix; return; }
      var seen = false;
      new IntersectionObserver(function (ents, obs) {
        ents.forEach(function (e) {
          if (!e.isIntersecting || seen) return; seen = true; obs.disconnect();
          var start = null, dur = 1400;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            el.textContent = Math.floor((0.5 - Math.cos(Math.PI * p) / 2) * target) + suffix;
            if (p < 1) requestAnimationFrame(step); else el.textContent = target + suffix;
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.6 }).observe(el);
    });

    /* ---------- Custom gold cursor (desktop fine-pointer; solid, no blend) ---------- */
    if (finePointer && !reduceMotion) {
      var cdot = document.createElement("div"); cdot.className = "cursor-dot";
      var cring = document.createElement("div"); cring.className = "cursor-ring";
      document.body.appendChild(cdot); document.body.appendChild(cring);
      document.body.classList.add("has-fine-pointer");
      var cmx = window.innerWidth / 2, cmy = window.innerHeight / 2, crx = cmx, cry = cmy, crs = 1, crsT = 1, cShown = false;
      function showCursor(v) { cdot.style.opacity = cring.style.opacity = v ? "1" : "0"; document.body.classList.toggle("cursor-on", v); }
      window.addEventListener("mousemove", function (e) {
        cmx = e.clientX; cmy = e.clientY;
        if (!cShown) { cShown = true; showCursor(true); }
        cdot.style.transform = "translate3d(" + cmx + "px," + cmy + "px,0) translate(-50%,-50%)";
      }, { passive: true });
      (function ringLoop() {
        crx += (cmx - crx) * 0.2; cry += (cmy - cry) * 0.2; crs += (crsT - crs) * 0.2;
        cring.style.transform = "translate3d(" + crx + "px," + cry + "px,0) translate(-50%,-50%) scale(" + crs.toFixed(3) + ")";
        requestAnimationFrame(ringLoop);
      })();
      var cHoverSel = "a,button,.gallery-item,input,textarea,select,[data-magnetic]";
      document.addEventListener("mouseover", function (e) { if (e.target.closest(cHoverSel)) { cring.classList.add("hover"); crsT = 1.55; } });
      document.addEventListener("mouseout", function (e) { if (e.target.closest(cHoverSel)) { cring.classList.remove("hover"); crsT = 1; } });
      document.addEventListener("mouseleave", function () { showCursor(false); });
      window.addEventListener("blur", function () { showCursor(false); });
    }

    /* ---------- Magnetic buttons ---------- */
    if (finePointer && !reduceMotion) {
      document.querySelectorAll(".btn, [data-magnetic]").forEach(function (b) {
        b.addEventListener("mousemove", function (e) {
          var r = b.getBoundingClientRect();
          var x = e.clientX - r.left - r.width / 2, yv = e.clientY - r.top - r.height / 2;
          b.style.transform = "translate(" + (x * 0.3) + "px," + (yv * 0.3) + "px)";
        });
        b.addEventListener("mouseleave", function () { b.style.transform = ""; });
      });
    }

    /* Native scrolling kept for true 120Hz smoothness (Lenis JS scroll removed). */

    /* ---------- Quote form -> Web3Forms (clean inline submit), with email-app fallback ---------- */
    var form = document.getElementById("quoteForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var get = function (n) { return form[n] ? form[n].value : ""; };
        var keyEl = form.querySelector('[name="access_key"]');
        var accessKey = keyEl ? keyEl.value : "";

        // Until a real Web3Forms key is set, fall back to the visitor's email app so the form still works.
        if (!accessKey || accessKey.indexOf("YOUR_") === 0) {
          var to = form.getAttribute("data-to") || "stargroupconstructionco@gmail.com";
          var subject = "Free estimate request — " + (get("name") || "Website");
          var body =
            "Name: " + get("name") + "\r\n" +
            "Phone: " + get("phone") + "\r\n" +
            "Email: " + get("email") + "\r\n" +
            "Service: " + get("service") + "\r\n\r\n" +
            "Project details:\r\n" + get("message");
          window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
          return;
        }

        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
        fetch("https://api.web3forms.com/submit", {
          method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form)
        }).then(function (r) { return r.json(); }).then(function (data) {
          if (data && data.success) {
            form.innerHTML = '<div style="text-align:center;padding:28px 0">' +
              '<h3 style="color:var(--gold);margin-bottom:10px">Thank you — request received.</h3>' +
              '<p>We’ll get back to you within one business day. Prefer to call? <a href="tel:+19548306335">954-830-6335</a></p></div>';
          } else { throw new Error("submit failed"); }
        }).catch(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = 'Request My Free Estimate <span class="arrow">&rarr;</span>'; }
          var note = form.querySelector(".form-note");
          if (note) note.textContent = "Sorry — something went wrong. Please call us at 954-830-6335.";
        });
      });
    }

    /* ---------- Gallery + lightbox ---------- */
    buildGallery();
  });

  /* ============================================================
     Gallery rendering, filtering, native <dialog> lightbox
     ============================================================ */
  function buildGallery() {
    var grid = document.getElementById("gallery");
    if (!grid || !window.SGC_GALLERY) return;
    var labels = window.SGC_TAG_LABEL || {};
    var data = window.SGC_GALLERY;
    var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    var items = limit > 0 ? data.slice(0, limit) : data;

    var html = "";
    items.forEach(function (item, i) {
      var src = "images/" + item.f;
      var label = labels[item.t] || item.t;
      html +=
        '<button class="gallery-item" data-tag="' + item.t + '" data-index="' + i + '" aria-label="' + esc(item.c) + '">' +
          '<img src="' + src + '" alt="' + esc(item.c) + '" loading="lazy" decoding="async">' +
          '<span class="cap"><strong>' + esc(item.c) + '</strong><span>' + esc(label) + '</span></span>' +
        '</button>';
    });
    grid.innerHTML = html;
    var tiles = Array.prototype.slice.call(grid.querySelectorAll(".gallery-item"));

    var filterBar = document.querySelector(".gallery-filters");
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-cat");
        tiles.forEach(function (t) { t.hidden = !(cat === "all" || t.getAttribute("data-tag") === cat); });
      });
    }

    var dlg = document.getElementById("lightbox");
    if (!dlg) return;
    var imgEl = dlg.querySelector(".lb-img");
    var capEl = dlg.querySelector(".lb-cap");
    var countEl = dlg.querySelector(".lb-count");
    var group = [], idx = 0, trigger = null;
    function visible() { return tiles.filter(function (t) { return !t.hidden; }); }
    function show(i) {
      idx = (i + group.length) % group.length;
      var t = group[idx];
      var item = items[parseInt(t.getAttribute("data-index"), 10)];
      imgEl.src = "images/" + item.f; imgEl.alt = item.c;
      capEl.innerHTML = esc(item.c) + "<span>" + esc((window.SGC_TAG_LABEL || {})[item.t] || item.t) + "</span>";
      if (countEl) countEl.textContent = (idx + 1) + " / " + group.length;
    }
    tiles.forEach(function (t) {
      t.addEventListener("click", function () {
        group = visible(); trigger = t; show(group.indexOf(t));
        if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      });
    });
    function nav(d) { show(idx + d); }
    dlg.querySelector(".lb-next").addEventListener("click", function () { nav(1); });
    dlg.querySelector(".lb-prev").addEventListener("click", function () { nav(-1); });
    dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") nav(1); else if (e.key === "ArrowLeft") nav(-1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { if (trigger) trigger.focus(); });
    var x0 = null;
    imgEl.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    imgEl.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) nav(dx < 0 ? 1 : -1); x0 = null; }, { passive: true });
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
})();
