---
name: bible-verse-card
description: >-
  Builds a modern, accessible verse card for the Stones & Anchors site when the
  user supplies a Bible reference (e.g. Psalm 118:22, John 3:16) to add to a
  page. Produces HTML/CSS using project theme tokens, verse title, full verse
  text in the English Standard Version (ESV) only, per-word or per-phrase
  etymology (original languages), cultural or historical significance of key
  images, plus outbound links to Blue Letter Bible and Bible Hub for that
  passage. Use when the user mentions adding a verse, scripture card, or
  etymology/cultural notes to HTML.
---

# Bible verse card

## When to apply

The user gives a **verse reference** and wants it **on a page** (usually `index.html` or another file they name). Apply this skill for that workflow—not for general theology chat without a page edit.

## Translation rule (verse text)

- **English Standard Version (ESV) only** for quoted verse text on the card.
- Cite as **English Standard Version** in `<cite class="verse-card__cite">` (or the equivalent pattern on the page).
- **Exception:** If the user **explicitly** asks for another translation (e.g. “use KJV”), follow their instruction for that edit only.

## Output shape

Deliver a **single cohesive card** in the page’s flow:

1. **Title** — The human-readable reference exactly as a heading (e.g. `Psalm 118:22`). Use the translation-appropriate book name the user implies; default to common English names (Psalms not Tehillim unless they ask).
2. **Verse text** — The full verse (or passage) **in the ESV**, quoted faithfully. Do not show a second translation on the same card unless the user explicitly asked for a comparison.
3. **Study links** — Immediately after the verse text (or its translation cite), add a compact row of **two** outbound links, clearly labeled:
   - **[Blue Letter Bible](https://www.blueletterbible.org/)** — deep link to the same passage with **`esv`** as the version segment (see **Building study-link URLs**).
   - **[Bible Hub](https://biblehub.com/)** — deep link to the **ESV** page for that passage when available: use the `/esv/` path segment (e.g. `https://biblehub.com/esv/psalms/118-22.htm`).
   Use `target="_blank"` and `rel="noopener noreferrer"` on both. Style them as a subtle, scannable pair (e.g. shared row with a middle dot or en dash) using existing theme tokens; do not let them overpower the verse. Link text should name the destination (“Blue Letter Bible”, “Bible Hub”) or include the reference for screen readers (e.g. `aria-label="Psalm 118:22 on Bible Hub"`).
4. **Descriptor blocks** (modern UI “rows” or sections, not walls of prose):
   - **Etymology** — For **meaningful** words or short phrases (not every “and” or “the”). For OT prefer Hebrew (transliteration + brief gloss); for NT Greek. One tight line per item: *word* → root/language note → gloss. If the verse is English-only in the UI, still give original-language insight where it clarifies the text.
   - **Cultural & historical significance** — 1–3 focused paragraphs or bullet groups on **images and practices** readers might miss (e.g. cornerstone: first stone laid, alignment of the building, symbolic rejection in Psalm 118). Tie each point to **this verse**, not a generic essay.

### Building study-link URLs

Construct URLs from the reference; **open the site in a browser to confirm** if the book name or a verse range is unusual.

**Blue Letter Bible** — pattern:

`https://www.blueletterbible.org/esv/{book}/{chapter}/{verse}/`

- Use **`esv`** as the version segment for Stones & Anchors verse cards unless the user requested another translation.
- `{book}` — BLB book abbreviation (lowercase): e.g. `psa` Psalms, `isa` Isaiah, `1pe` 1 Peter, `mat` Matthew, `jhn` John.
- `{chapter}` and `{verse}` — integers. For a **verse range**, link the **first verse** in the range (or the chapter tools page if that fits the card better).

**Bible Hub (ESV)** — pattern:

`https://biblehub.com/esv/{book_slug}/{chapter}-{verse}.htm`

- `{book_slug}` — lowercase English name with underscores for numbered books: e.g. `psalms`, `isaiah`, `1_peter`, `matthew`, `john`.
- For a **range** (e.g. 1 Peter 2:6–8), use the **first verse** in the filename (`1_peter/2-6.htm`) or the chapter overview (`1_peter/2.htm`) when a single-verse URL would mislead.

## Visual design (Stones & Anchors)

- Reuse existing layout patterns: `site-main`, headings, and `detail-row`-style blocks where they already exist in the target file.
- Colors and type must align with `assets/css/theme.css`: `--stone`, `--cream`, `--sand`, `--rope`, `--accent`, `--slate`, `--light-stone`.
- Prefer extending `assets/css/components.css` with **scoped class names** for the card (e.g. `.verse-card`, `.verse-card__ref`, `.verse-card__body`, `.verse-card__block`, `.verse-card__label`, `.verse-card__study-links`) rather than inline styles.
- **Modern UI**: clear hierarchy, comfortable spacing, subtle border or shadow using existing palette, readable line length, responsive stacking on small screens.
- **Accessibility**: semantic heading level that fits the page outline; sufficient contrast; don’t rely on color alone for meaning.

## Workflow

1. Open the **target HTML** the user indicated (or ask once if unclear).
2. Read **theme** and **components** CSS so new classes match naming and feel.
3. Insert the card in the **place** the user asked for (section, column, after a specific element).
4. Add **Blue Letter Bible** (`esv`) and **Bible Hub** (`/esv/`) links after the verse block (see **Building study-link URLs**).
5. Add minimal CSS for the card if no suitable block exists yet (include `.verse-card__study-links` if not already in `components.css`).
6. Summarize what was added and where.

## Quality bar

- **Verse text:** ESV wording; cite “English Standard Version” unless the user chose another translation.
- Etymology: accurate; flag uncertainty briefly if a term is disputed.
- Cultural notes: specific to the ancient Near East / Second Temple / Greco-Roman world as appropriate—**one verse, one card**, not a commentary on the whole chapter unless the user asks.
- Study links: **both** Blue Letter Bible and Bible Hub are present; URLs match the passage; BLB uses **`esv`** and Bible Hub uses the **`/esv/`** path for ESV pages.

## Example structure (HTML outline)

Use this structure; adapt classes to match what is already on the page.

```html
<section class="verse-card" aria-labelledby="verse-ps118-22-title">
  <h2 id="verse-ps118-22-title" class="verse-card__title">Psalm 118:22</h2>
  <blockquote class="verse-card__text">
    <p>…ESV verse…</p>
    <cite class="verse-card__cite">English Standard Version</cite>
  </blockquote>
  <p class="verse-card__study-links">
    <a href="https://www.blueletterbible.org/esv/psa/118/22/" target="_blank" rel="noopener noreferrer">Blue Letter Bible</a>
    <span class="verse-card__study-sep" aria-hidden="true"> · </span>
    <a href="https://biblehub.com/esv/psalms/118-22.htm" target="_blank" rel="noopener noreferrer" aria-label="Psalm 118:22 on Bible Hub">Bible Hub</a>
  </p>
  <div class="verse-card__block">
    <h3 class="verse-card__label">Etymology &amp; key words</h3>
    <ul class="verse-card__list">…</ul>
  </div>
  <div class="verse-card__block">
    <h3 class="verse-card__label">Cultural &amp; historical significance</h3>
    <p>…</p>
  </div>
</section>
```

Id and heading text must change per verse. Do not duplicate the section symbol character in user-visible strings.
