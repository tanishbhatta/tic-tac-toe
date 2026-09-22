# Neon Tic-Tac-Toe

A two-player tic-tac-toe game in plain HTML, CSS, and JavaScript, with a neon visual style and hand-drawn SVG animations. No frameworks, no libraries, no build step.

Built as a learning project, with the goal of understanding every line rather than assembling generated code.

---

## Features

**Animated marks.** Each O and X is an inline SVG whose stroke draws itself when placed. The effect uses the `stroke-dasharray` / `stroke-dashoffset` technique: the stroke is given a single dash exactly as long as the path, offset fully out of view, then animated back to zero so the line appears to be drawn. The circle's dash length comes from its circumference (2πr); each line of the X uses its own length from Pythagoras on its endpoints.

**Neon styling.** Glow comes from layered `drop-shadow()` filters on the marks and stacked `box-shadow` on the board, against a near-black background.

**Win detection.** All eight winning lines (three rows, three columns, two diagonals) are stored as data — an array of coordinate triples — and checked in a single loop rather than eight hard-coded conditions.

**Win line.** On a win, a strike-through line is drawn across the three winning cells. Its endpoints are computed from the winning triple's first and third cells, converted from grid coordinates to SVG coordinates, and its animated dash length is computed with the distance formula so the same code handles rows, columns, and diagonals. The line lives in an absolutely positioned SVG overlay with `pointer-events: none`, so it sits on top of the board without blocking clicks.

**Winner highlight.** The three winning cells receive a `winner` class, which scales their marks.

**Tie detection and game-over state.** A `gameOver` flag guards the click handler so no moves are accepted after the game ends.

---

## How it works

The central design decision is the separation of **state** from **rendering**.

`boardState` is a 3×3 array holding `null`, `'X'`, or `'O'` for each cell. It is the source of truth for all game logic: the win check reads it and never touches the page.

The DOM is only a display. Placing a mark updates `boardState` and separately writes the matching SVG into the clicked cell.

This matters because game logic that reads the DOM can only ever ask about the board on screen. Logic that reads an array can ask about *any* board, including hypothetical ones that are never drawn, which is the prerequisite for a computer opponent.

The win check originally compared the `innerHTML` of cells, meaning it compared hundreds of characters of serialized SVG markup to answer a one-character question. Moving it onto `boardState` was the main refactor so far.

### Coordinate systems

Two coordinate systems meet in this project and must not be confused:

- Grid positions are `[row, col]`, row first.
- SVG positions are `(x, y)`, x first, with the origin at the top-left and y increasing downward.

So a grid position's **column** drives SVG **x**, and its **row** drives SVG **y**. Swapping these draws a top-row win as a vertical line down the left column, which happened during development.

A cell's centre in a 100-unit SVG viewBox is `index × (100 / 3) + (100 / 3) / 2`.

---

## Project structure

- `index.html` — the board: a container holding nine cells
- `index.js` — game state, move handling, win and tie detection, win-line drawing
- `index.css` — board layout, neon styling, mark animations, winner animation

---

## Running it

Open `index.html` in a browser.

If anything behaves oddly when opened directly from the file system, serve the folder locally instead (for example with Python's built-in HTTP server) and open the local address it prints.

---

## Known issues

Listed honestly, because the project is mid-refactor.

1. **State can desync from the screen.** The write to `boardState` runs outside the check for whether the clicked cell is empty. Clicking an already-occupied cell leaves the screen unchanged but can overwrite that cell in `boardState` with the other player's symbol. Since the win check reads `boardState`, this can produce a win on a line that isn't on screen. *Reproduce:* O top-left, X top-middle, click top-left again, log `boardState`.

2. **Tie check is broken.** `tieCond` was moved to take `boardState` as a parameter, but its loop still iterates the DOM `board` array, so its lookups read `undefined` and it can report a tie on a board that isn't full.

3. **Turn flag is read inverted.** `updateBoardWithPlayerShape` returns the *next* player's flag, so at the win check `forPlayerO` describes who moves next, not who just moved. The win messages compensate for this deliberately, but the variable's name contradicts its meaning at that point.

4. **Win-line styles are inline.** The mark styles have been moved into the stylesheet, but the win-line `<style>` block, including a duplicate `@keyframes DrawLine`, is still embedded in the inserted markup.

5. **Duplicated win-line branches.** The two branches of `updateBoardAfterWin` are near-identical templates that differ only in colour.

6. **`endCoords[[0]]`** appears in the `x2` attribute of both win-line templates. It works only because `[0]` coerces to the key `"0"`; it should be `endCoords[0]`.

7. **Animation collision on `.grow`.** When the board gets the `grow` class, the grow animation replaces the draw animation on the same elements, which drops the `forwards` fill holding `stroke-dashoffset` at 0 and makes the marks invisible. The fix is to scale the SVG wrapper rather than the shape inside it.

8. **Results only in the console.** Win and tie messages are logged, not shown on the page.

9. **No restart.** The page must be reloaded to play again.

---

## Roadmap

In order:

1. Fix the state desync (issue 1) by moving the `boardState` write under the same guard as the redraw.
2. Fix `tieCond` to iterate `boardState` (issue 2).
3. Capture the mover's symbol before the turn flips (issue 3).
4. Move win-line styles to the stylesheet and collapse the duplicated branches (issues 4–6).
5. On-page status message and a restart button.
6. **Computer opponent**, in three levels:
   - random legal move
   - rule-based: win if possible, else block, else centre, else corner
   - minimax: exhaustive game-tree search, unbeatable

The computer opponent depends on the state refactor being complete, since searching possible futures requires evaluating boards that are never drawn.

---
