# ZAMAN 0.3 — Verification

## Passed

- JavaScript syntax validation: engine.js and game.js.
- Thirteen Node simulation tests: full door roundtrip; bread rewards and memory; complete linked mystery with night gating; year/age rollover preserving world state; JSON save roundtrip and malformed saves; collision bounds and stairwell; grid flood-fill reachability of every interactable from scene entry; friendship state persistence; rooftop adventure; tap-navigation collision routes; multi-scene quest guidance; original-save compatibility.
- Four Node mock Canvas/UI smoke tests execute each scene at night on a simulated narrow viewport. These test JavaScript execution, not browser appearance or actual device behavior.
- Dependency-free static package: relative local asset references; no remote scripts, fonts or images.

## Not verified

The browser QA action was blocked by the environment's browser URL security policy. No workaround was attempted. Consequently, visual layout, keyboard gameplay in a real browser, touch behavior on an actual phone, fullscreen, downloads and audio require manual acceptance testing. These are implemented, but not claimed as browser-tested.

## Suggested acceptance route

1. Start the game and walk to Mom; accept the bread errand.
2. Open the apartment door, walk the whole staircase, speak with Nawal, then exit the building.
3. Get bread from the baker, find the cat, and return upstairs.
4. Deliver bread to Mom, collect Nawal's key, and ask Hassan about the coin.
5. Return to the street, use the bench to wait until evening, and open the chest.
6. Reload the page and continue; confirm the inventory, scene and conversations remain.
7. Export a save, sleep four three-day holidays, and verify age/year change and persistent memories. Re-import the backup.
8. Repeat movement, scrolling panels, portrait/landscape resize and interactions in mobile Safari and Chrome.

## 0.3 checks

Home interaction tests added. All four scene smoke tests now use a mock AudioContext and verify playback scheduling and mute/unmute controls. Listening quality and iPhone audio output still require real-device testing. The earlier 0.2 deployment was verified in a live desktop browser, including movement guidance and Mom dialogue.
