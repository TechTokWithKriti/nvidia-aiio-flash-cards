#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const OUT_FILE = path.join(__dirname, "..", "cards.json");

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error("Missing YAML front matter (expected --- ... ---)");
  }
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.+)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fields[kv[1]] = value;
  }
  const body = raw.slice(match[0].length);
  return { fields, body };
}

function parseCards(body, fileName) {
  const cardRegex = /<!--\s*CARD:\s*(.+?)\s*-->/g;
  const markers = [];
  let m;
  while ((m = cardRegex.exec(body)) !== null) {
    markers.push({ title: m[1].trim(), index: m.index, end: m.index + m[0].length });
  }

  const cards = [];
  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].end;
    const stop = i + 1 < markers.length ? markers[i + 1].index : body.length;
    const chunk = body.slice(start, stop);

    const tagsMatch = chunk.match(/^\s*<!--\s*TAGS:\s*(.+?)\s*-->/);
    let tags = [];
    let bulletsChunk = chunk;
    if (tagsMatch) {
      tags = tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      bulletsChunk = chunk.slice(tagsMatch[0].length);
    }

    const bullets = bulletsChunk
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.startsWith("- "))
      .map((l) => l.slice(2).trim());

    if (bullets.length === 0) {
      throw new Error(
        `Card "${markers[i].title}" in ${fileName} has no bullet points`
      );
    }
    if (bullets.length > 5) {
      throw new Error(
        `Card "${markers[i].title}" in ${fileName} has ${bullets.length} bullets — hard limit is 5. Split it into multiple cards.`
      );
    }

    cards.push({ title: markers[i].title, tags, bullets });
  }
  return cards;
}

function build() {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Data directory not found: ${DATA_DIR}`);
  }

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    throw new Error(`No .md files found in ${DATA_DIR}`);
  }

  const categories = [];
  const categoryByName = new Map();
  const allCards = [];
  const seenIds = new Set();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
    const { fields, body } = parseFrontMatter(raw);

    if (!fields.category) {
      throw new Error(`${file}: front matter is missing "category"`);
    }

    let category = categoryByName.get(fields.category);
    if (!category) {
      category = {
        id: slugify(fields.category),
        name: fields.category,
        icon: fields.icon || "",
        dotColor: fields.dotColor || "#94a3b8",
      };
      categoryByName.set(fields.category, category);
      categories.push(category);
    }

    const cards = parseCards(body, file);
    for (const card of cards) {
      const id = `${category.id}--${slugify(card.title)}`;
      if (seenIds.has(id)) {
        throw new Error(`Duplicate card id "${id}" (from "${card.title}" in ${file})`);
      }
      seenIds.add(id);
      allCards.push({
        id,
        category: category.name,
        title: card.title,
        tags: card.tags,
        bullets: card.bullets,
      });
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    categories,
    cards: allCards,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2) + "\n");
  console.log(
    `Built ${OUT_FILE}: ${allCards.length} cards across ${categories.length} categories (from ${files.length} file(s)).`
  );
}

build();
