(function () {
  "use strict";

  var results = [];
  var resultsEl = document.getElementById("results");
  var summaryEl = document.getElementById("summary");
  var frame = document.getElementById("appFrame");

  function log(name, pass, message) {
    results.push({ name: name, pass: pass, message: message || "" });
    var line = document.createElement("div");
    line.className = pass ? "pass" : "fail";
    line.textContent = (pass ? "PASS  " : "FAIL  ") + name + (message ? " — " + message : "");
    resultsEl.appendChild(line);
  }

  function assert(name, condition, message) {
    log(name, !!condition, message);
  }

  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function waitFor(fn, timeoutMs) {
    var start = Date.now();
    return new Promise(function (resolve, reject) {
      (function poll() {
        var v;
        try {
          v = fn();
        } catch (e) {
          v = undefined;
        }
        if (v) return resolve(v);
        if (Date.now() - start > timeoutMs) return reject(new Error("timeout waiting for condition"));
        setTimeout(poll, 30);
      })();
    });
  }

  function waitForApp() {
    return waitFor(function () {
      return frame.contentWindow && frame.contentWindow.__aiioApp;
    }, 5000);
  }

  function dispatchKey(win, code, key) {
    var ev = new win.KeyboardEvent("keydown", { code: code, key: key, bubbles: true, cancelable: true });
    win.document.dispatchEvent(ev);
  }

  function reloadFrame() {
    return new Promise(function (resolve) {
      frame.addEventListener("load", function handler() {
        frame.removeEventListener("load", handler);
        resolve();
      });
      frame.contentWindow.location.reload();
    });
  }

  async function run() {
    await waitFor(function () {
      return frame.contentDocument && frame.contentDocument.readyState === "complete";
    }, 5000);

    var app = await waitForApp();
    var win = frame.contentWindow;
    var doc = frame.contentDocument;

    // clear bookmarks so the suite starts from a known state
    win.localStorage.removeItem("nca-aiio-flashcards:bookmarks:v1");
    app.bookmarks = new Set();
    app.applyFilter("all");

    var total = app.allCards.length;

    // ---------- Rendering ----------
    (function testRendering() {
      var categoryNames = app.categories.map(function (c) { return c.name; });
      var badCards = app.allCards.filter(function (c) {
        return (
          !c.title ||
          !c.title.trim() ||
          !c.bullets ||
          c.bullets.length === 0 ||
          c.bullets.some(function (b) { return !b || !b.trim(); }) ||
          categoryNames.indexOf(c.category) === -1
        );
      });
      assert(
        "Rendering: all cards have non-empty front/back and valid category",
        badCards.length === 0,
        badCards.length ? badCards.map(function (c) { return c.id; }).join(", ") : total + " cards OK"
      );

      var placeholderRe = /lorem ipsum|TODO|placeholder|TBD/i;
      var placeholderCards = app.allCards.filter(function (c) {
        return placeholderRe.test(c.title) || c.bullets.some(function (b) { return placeholderRe.test(b); });
      });
      assert("Rendering: no placeholder text", placeholderCards.length === 0);
    })();

    // ---------- Flip ----------
    app.applyFilter("all");
    assert("Flip: card starts unflipped", app.flipped === false);

    doc.getElementById("flashcard").click();
    assert("Flip: click flips card", app.flipped === true);
    doc.getElementById("flashcard").click();
    assert("Flip: click again flips back", app.flipped === false);

    dispatchKey(win, "Space", " ");
    assert("Flip: Space key flips", app.flipped === true);
    dispatchKey(win, "Space", " ");
    assert("Flip: Space key flips back", app.flipped === false);

    app.currentIndex = 0;
    app.flipped = false;
    app.render();
    doc.getElementById("flashcard").click();
    assert("Flip: works on first card", app.flipped === true);

    app.currentIndex = app.cards.length - 1;
    app.flipped = false;
    app.render();
    doc.getElementById("flashcard").click();
    assert("Flip: works on last card", app.flipped === true);
    app.flipped = false;
    app.currentIndex = 0;
    app.render();

    // ---------- Navigation ----------
    assert("Navigation: Prev disabled on card 1", doc.getElementById("prevBtn").disabled === true);

    app.currentIndex = app.cards.length - 1;
    app.render();
    assert("Navigation: Next disabled on last card", doc.getElementById("nextBtn").disabled === true);

    app.currentIndex = 0;
    app.render();
    dispatchKey(win, "ArrowRight", "ArrowRight");
    assert("Navigation: ArrowRight advances + counter updates", app.currentIndex === 1 && doc.getElementById("counter").textContent.indexOf("Card 2 of") === 0);
    dispatchKey(win, "ArrowLeft", "ArrowLeft");
    assert("Navigation: ArrowLeft goes back", app.currentIndex === 0);

    // ---------- Bookmarks ----------
    app.applyFilter("all");
    app.currentIndex = 0;
    app.render();
    var firstCardId = app.cards[0].id;

    doc.getElementById("frontStar").click();
    assert("Bookmarks: star click bookmarks card", app.bookmarks.has(firstCardId));
    assert(
      "Bookmarks: front and back star stay in sync",
      doc.getElementById("frontStar").classList.contains("bookmarked") &&
        doc.getElementById("backStar").classList.contains("bookmarked")
    );

    dispatchKey(win, "KeyB", "b");
    assert("Bookmarks: B key toggles off", !app.bookmarks.has(firstCardId));
    dispatchKey(win, "KeyB", "b");
    assert("Bookmarks: B key toggles on", app.bookmarks.has(firstCardId));

    assert(
      "Bookmarks: stat count updates",
      doc.getElementById("stats").textContent.indexOf("1 bookmarked") === 0
    );

    var storedRaw = win.localStorage.getItem("nca-aiio-flashcards:bookmarks:v1");
    assert(
      "localStorage: written on every toggle",
      !!storedRaw && JSON.parse(storedRaw).indexOf(firstCardId) !== -1
    );

    await reloadFrame();
    app = await waitForApp();
    win = frame.contentWindow;
    doc = frame.contentDocument;
    assert("Bookmarks: persists after page reload", app.bookmarks.has(firstCardId));
    assert("localStorage: bookmarks read and applied on page load", app.bookmarks.has(firstCardId));

    app.applyFilter("bookmarked");
    assert(
      "Bookmarks: bookmark filter shows only bookmarked cards",
      app.cards.length === 1 && app.cards[0].id === firstCardId
    );

    doc.getElementById("frontStar").click();
    assert(
      "Bookmarks: empty state shows when all bookmarks removed",
      app.cards.length === 0 && doc.getElementById("emptyState").hidden === false
    );

    // ---------- Filters ----------
    app.applyFilter("all");
    assert("Filters: All shows everything", app.cards.length === app.allCards.length);

    var sampleCategory = app.categories[0].name;
    app.applyFilter(sampleCategory);
    var expectedCount = app.allCards.filter(function (c) { return c.category === sampleCategory; }).length;
    assert(
      "Filters: category filter shows correct cards",
      app.cards.length === expectedCount && app.cards.every(function (c) { return c.category === sampleCategory; })
    );
    assert("Filters: switching filter resets to card 1", app.currentIndex === 0);

    var activeButtons = Array.prototype.slice
      .call(doc.querySelectorAll(".filter-btn"))
      .filter(function (b) { return b.classList.contains("active"); });
    assert(
      "Filters: active filter is visually distinct",
      activeButtons.length === 1 && activeButtons[0].dataset.filterKey === sampleCategory
    );

    // ---------- Progress ----------
    app.applyFilter("all");
    app.currentIndex = 0;
    app.render();
    assert(
      "Progress: 0% on first card",
      doc.getElementById("progressFill").style.width === "0%"
    );

    app.currentIndex = app.cards.length - 1;
    app.render();
    assert(
      "Progress: 100% on last card",
      doc.getElementById("progressFill").style.width === "100%"
    );

    app.currentIndex = 0;
    app.render();
    var widthBefore = doc.getElementById("progressFill").style.width;
    app.next();
    var widthAfter = doc.getElementById("progressFill").style.width;
    assert("Progress: updates on navigation", widthBefore !== widthAfter);

    // ---------- localStorage namespacing ----------
    var keys = Object.keys(win.localStorage);
    assert(
      "localStorage: key is namespaced",
      keys.indexOf("nca-aiio-flashcards:bookmarks:v1") !== -1 &&
        keys.indexOf("bookmarks") === -1
    );

    // ---------- summary ----------
    var passCount = results.filter(function (r) { return r.pass; }).length;
    var failCount = results.length - passCount;
    summaryEl.textContent = passCount + " passed, " + failCount + " failed, " + results.length + " total";
    summaryEl.className = failCount === 0 ? "pass" : "fail";
    window.__testResults = results;
  }

  run().catch(function (err) {
    summaryEl.textContent = "TEST RUNNER ERROR: " + err.message;
    summaryEl.className = "fail";
    window.__testResults = results;
    window.__testRunnerError = err.message;
  });
})();
