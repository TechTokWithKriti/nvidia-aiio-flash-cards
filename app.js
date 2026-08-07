(function () {
  "use strict";

  var STORAGE_KEY = "nca-aiio-flashcards:bookmarks:v1";

  function loadBookmarks() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveBookmarks(ids) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      /* localStorage unavailable (private mode / quota) — bookmarks won't persist this session */
    }
  }

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      el.isContentEditable
    );
  }

  function App(root, data) {
    this.categories = data.categories;
    this.allCards = data.cards;
    this.bookmarks = new Set(loadBookmarks());
    this.activeFilter = "all"; // "all" | "bookmarked" | category name
    this.cards = this.allCards.slice();
    this.currentIndex = 0;
    this.flipped = false;

    this.els = {
      filterBar: root.querySelector("#filterBar"),
      stats: root.querySelector("#stats"),
      progressFill: root.querySelector("#progressFill"),
      progressBar: root.querySelector("#progressBar"),
      counter: root.querySelector("#counter"),
      flashcard: root.querySelector("#flashcard"),
      cardInner: root.querySelector("#cardInner"),
      frontDot: root.querySelector("#frontDot"),
      backDot: root.querySelector("#backDot"),
      frontCategory: root.querySelector("#frontCategory"),
      backCategory: root.querySelector("#backCategory"),
      frontStar: root.querySelector("#frontStar"),
      backStar: root.querySelector("#backStar"),
      componentName: root.querySelector("#componentName"),
      tags: root.querySelector("#tags"),
      bullets: root.querySelector("#bullets"),
      emptyState: root.querySelector("#emptyState"),
      prevBtn: root.querySelector("#prevBtn"),
      nextBtn: root.querySelector("#nextBtn"),
      flipBtn: root.querySelector("#flipBtn"),
      sidebar: root.querySelector("#sidebar"),
      sidebarToggle: root.querySelector("#sidebarToggle"),
    };

    this.bindEvents();
    this.renderFilterBar();
    this.applyFilter("all");
  }

  App.prototype.categoryMeta = function (name) {
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === name) return this.categories[i];
    }
    return { name: name, icon: "", dotColor: "#94a3b8" };
  };

  App.prototype.renderFilterBar = function () {
    var self = this;
    var bar = this.els.filterBar;
    bar.innerHTML = "";

    function makeBtn(key, label, color) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn";
      btn.dataset.filterKey = key;
      if (color) {
        var dot = document.createElement("span");
        dot.className = "fdot";
        dot.style.background = color;
        btn.appendChild(dot);
      }
      var text = document.createElement("span");
      text.textContent = label;
      btn.appendChild(text);
      btn.addEventListener("click", function () {
        self.applyFilter(key);
        self.closeSidebar();
      });
      bar.appendChild(btn);
      return btn;
    }

    makeBtn("all", "All", null);
    this.categories.forEach(function (cat) {
      makeBtn(cat.name, (cat.icon ? cat.icon + " " : "") + cat.name, cat.dotColor);
    });
    makeBtn("bookmarked", "⭐ Bookmarked", null);
  };

  App.prototype.updateFilterActiveState = function () {
    var buttons = this.els.filterBar.querySelectorAll(".filter-btn");
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.dataset.filterKey === this.activeFilter) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  };

  App.prototype.applyFilter = function (key) {
    this.activeFilter = key;
    if (key === "all") {
      this.cards = this.allCards.slice();
    } else if (key === "bookmarked") {
      var bm = this.bookmarks;
      this.cards = this.allCards.filter(function (c) {
        return bm.has(c.id);
      });
    } else {
      this.cards = this.allCards.filter(function (c) {
        return c.category === key;
      });
    }
    this.currentIndex = 0;
    this.flipped = false;
    this.updateFilterActiveState();
    this.render();
  };

  App.prototype.updateStats = function () {
    this.els.stats.textContent =
      this.bookmarks.size + " bookmarked · " + this.allCards.length + " total";
  };

  App.prototype.render = function () {
    this.updateStats();
    var total = this.cards.length;

    if (total === 0) {
      this.els.flashcard.hidden = true;
      this.els.emptyState.hidden = false;
      this.els.prevBtn.disabled = true;
      this.els.nextBtn.disabled = true;
      this.els.flipBtn.disabled = true;
      this.els.counter.textContent = "Card 0 of 0";
      this.els.progressFill.style.width = "0%";
      this.els.progressBar.setAttribute("aria-valuenow", "0");
      return;
    }

    this.els.flashcard.hidden = false;
    this.els.emptyState.hidden = true;

    var card = this.cards[this.currentIndex];
    var meta = this.categoryMeta(card.category);
    var isBookmarked = this.bookmarks.has(card.id);

    [this.els.frontDot, this.els.backDot].forEach(function (dot) {
      dot.style.background = meta.dotColor;
    });
    this.els.frontCategory.textContent = (meta.icon ? meta.icon + " " : "") + meta.name;
    this.els.backCategory.textContent = (meta.icon ? meta.icon + " " : "") + meta.name;
    this.els.componentName.textContent = card.title;

    this.els.tags.innerHTML = "";
    (card.tags || []).slice(0, 2).forEach(function (tag) {
      var pill = document.createElement("span");
      pill.className = "tag-pill";
      pill.style.color = meta.dotColor;
      pill.textContent = tag;
      this.els.tags.appendChild(pill);
    }, this);

    this.els.bullets.innerHTML = "";
    card.bullets.forEach(function (bullet) {
      var li = document.createElement("li");
      li.style.borderLeft = "2px solid " + meta.dotColor;
      li.textContent = bullet;
      this.els.bullets.appendChild(li);
    }, this);

    [this.els.frontStar, this.els.backStar].forEach(function (star) {
      star.textContent = isBookmarked ? "★" : "☆";
      star.classList.toggle("bookmarked", isBookmarked);
      star.setAttribute("aria-pressed", String(isBookmarked));
    });

    this.els.flashcard.classList.toggle("flipped", this.flipped);
    this.els.flashcard.setAttribute("aria-pressed", String(this.flipped));

    this.els.counter.textContent = "Card " + (this.currentIndex + 1) + " of " + total;
    var pct = total > 1 ? Math.round((this.currentIndex / (total - 1)) * 100) : 100;
    this.els.progressFill.style.width = pct + "%";
    this.els.progressBar.setAttribute("aria-valuenow", String(pct));

    this.els.prevBtn.disabled = this.currentIndex === 0;
    this.els.nextBtn.disabled = this.currentIndex === total - 1;
    this.els.flipBtn.disabled = false;
  };

  App.prototype.flip = function () {
    if (this.cards.length === 0) return;
    this.flipped = !this.flipped;
    this.render();
  };

  App.prototype.next = function () {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.flipped = false;
      this.render();
    }
  };

  App.prototype.prev = function () {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.flipped = false;
      this.render();
    }
  };

  App.prototype.toggleBookmark = function () {
    if (this.cards.length === 0) return;
    var card = this.cards[this.currentIndex];
    if (this.bookmarks.has(card.id)) {
      this.bookmarks.delete(card.id);
    } else {
      this.bookmarks.add(card.id);
    }
    saveBookmarks(Array.from(this.bookmarks));

    if (this.activeFilter === "bookmarked" && !this.bookmarks.has(card.id)) {
      var newLen = this.cards.length - 1;
      this.applyFilter("bookmarked");
      if (newLen > 0) {
        this.currentIndex = Math.min(this.currentIndex, newLen - 1);
      }
      this.render();
    } else {
      this.render();
    }
  };

  App.prototype.closeSidebar = function () {
    this.els.sidebar.classList.remove("open");
    this.els.sidebarToggle.setAttribute("aria-expanded", "false");
  };

  App.prototype.bindEvents = function () {
    var self = this;

    this.els.sidebarToggle.addEventListener("click", function () {
      var isOpen = self.els.sidebar.classList.toggle("open");
      self.els.sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    });

    this.els.flashcard.addEventListener("click", function () {
      self.flip();
    });

    this.els.flipBtn.addEventListener("click", function () {
      self.flip();
    });
    this.els.nextBtn.addEventListener("click", function () {
      self.next();
    });
    this.els.prevBtn.addEventListener("click", function () {
      self.prev();
    });

    [this.els.frontStar, this.els.backStar].forEach(function (star) {
      star.addEventListener("click", function (e) {
        e.stopPropagation();
        self.toggleBookmark();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (isTypingTarget(e.target)) return;

      if (e.code === "Space") {
        e.preventDefault();
        self.flip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        self.next();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        self.prev();
      } else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        self.toggleBookmark();
      }
    });
  };

  function init() {
    fetch("cards.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load cards.json: " + res.status);
        return res.json();
      })
      .then(function (data) {
        window.__aiioApp = new App(document, data);
      })
      .catch(function (err) {
        var stage = document.querySelector(".card-stage");
        if (stage) {
          stage.innerHTML =
            '<p class="empty-state">Could not load flashcards (' +
            (err && err.message ? err.message : "unknown error") +
            ").</p>";
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.__aiioInternal = { App: App, isTypingTarget: isTypingTarget };
})();
