# ZAMAN — حكاية لسه بتتكتب

**IROVA · Islam Ramadan · version 0.3**

A playable, dependency-free Arabic isometric pixel-art life adventure set in an Egyptian neighborhood in 1998. All visuals are drawn in Canvas; no external assets, trackers, accounts, server, API keys or network calls are required.

## Play

Open `index.html` in a desktop browser, or serve this folder as a static website. `ZAMAN-Play.html` is a self-contained copy for easy transfer. On phones, open the hosted website in Safari or Chrome: some file preview apps do not execute JavaScript.

- Arrow keys / WASD: move in screen directions.
- E / Space: interact with the closest highlighted person or object.
- J: story journal, inventory and remembered encounters.
- Mobile: drag the joystick on the left and use the interaction button on the right.
- Escape: close dialogs. Enter: finish conversation.
- Use the bed to sleep or advance three days; use the bench to wait until evening.

## Included in this first playable chapter

- Furnished Egyptian apartment, a walkable stair flight with landings and neighbors, and a neighborhood street with a bakery, passers-by, a cat and a hidden chest.
- Free movement, collision checks, depth-sorted pixel sprites and a following isometric camera.
- Doors connect scenes; the staircase itself is traversed by walking, rather than a button that skips the descent.
- Bread delivery, finding the neighbor's cat, a hidden note, friendship and a linked night-time mystery.
- NPC memory: visit counts, last meeting, and dialogue reflecting completed favors. Memory is deterministic and saved; it is not generative AI.
- Day/night tint and local night lights. One real minute = two game hours. Time pauses in menus, conversations and hidden tabs.
- One year = 12 in-game days. Birthdays increase age; the player sprite grows up to a visual cap; some dialogue changes and a neighborhood bookshop appears after the first year. This is a compact age progression system, not a complete lifetime simulation.
- Automatic local browser saves every five active seconds, after interactions, and on page hide. JSON export/import for backups and transfer.
- Synthesized ambient music, footsteps, door effects, birds and radio melody. Starts on Play; a visible note button mutes sound.

## GitHub Pages

1. Create a repository (for example `zaman`).
2. Upload the contents of this folder so `index.html`, `style.css`, `engine.js` and `game.js` are at the repository root.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, `main`, and `/ (root)`, then save.
4. Open the URL shown by GitHub after deployment.

No build command or dependencies are needed. All asset paths are relative, so project subdirectory hosting works. `.nojekyll` is included. Live game: https://irovacompany-png.github.io/zaman/

## Source

- `engine.js`: simulation, movement/collision rules, quests, persistence validation.
- `game.js`: Canvas renderer, inputs, responsive camera, audio, UI and save handling.
- `style.css`: responsive Arabic interface and title presentation.
- `index.html`: application shell.
- `ZAMAN-Play.html`: standalone distribution, generated from these four files.
- `tests/engine.test.js`: dependency-free Node tests.
- `TEST-REPORT.md`: verification and limits.

Run tests with Node:

```sh
node --test tests/*.test.js
```

For local serving if Python is installed:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Save limitations

Saves belong to the current browser, device and website origin. Private browsing, clearing website data or changing the hosting URL may remove or separate saves. Export a backup in the game settings before moving. If local storage is unavailable, the UI shows a backup reminder. There is no cloud sync or multiplayer.

## Scope

This is a first playable chapter, not the finished commercial game. There is one apartment, one staircase, one street, a rooftop and a short set of authored adventures. Future expansion can add detailed schedules, more interiors, story branches, life stages and authored animation assets. Touch controls and responsive layout are implemented but real-device validation is still required.

© 2026 IROVA / Islam Ramadan. All rights reserved.

## New in 0.2

- A fourth playable area: the rooftop, reached through the door at the upper stair landing.
- Yusuf's kite adventure unlocks after the grandfather photograph mystery. Return the kite for a keepsake and a stronger friendship.
- Tap/click the ground to walk there. Tap a rendered person/object to approach it, then use Interact.
- A collision-aware pathfinder draws a dotted route and walks around furniture and the stairwell. Keyboard or joystick input cancels it immediately.
- The diamond button opens a quest checklist with guidance to the next person or connecting door. Door interactions remain manual.
- Original version-one save files remain compatible; the save key and JSON schema version are unchanged.
- Twelve simulation tests plus four mock Canvas/UI execution tests pass. Mock tests do not verify actual browser rendering or real touch behavior.

## 0.3 atmosphere preview

Curtains, sunbeams, wall photos and clock, rug details, steam, shaded character animation, breakfast and plant interactions, window and radio toggles. Audio is synthesized with Web Audio, not recorded neighborhood voices. This remains an incremental prototype; it is not a realistic full-world simulation.
