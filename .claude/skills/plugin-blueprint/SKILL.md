---
name: plugin-blueprint
description: Write or update the blueprint.md of a package (the source of its README.md), including usage per framework, API tables and iOS/Android screenshots. Use when adding or changing a component, a property, an event, or when a package has no blueprint.
---

`packages/<package>/blueprint.md` is the **source** of the package documentation. `README.md` next to it is generated with `readme generate -c ../../tools/readme/blueprint.json` (`npm run readme` in the package folder) — never edit it. Commit both in the same change.

A blueprint is a Markdown file with `{{ ... }}` placeholders processed by `@appnest/readme`:

| Placeholder | Result |
| --- | --- |
| `{{ load:../../tools/readme/edit-warning.md }}` | the "do not edit README.md" banner (HTML comment) |
| `{{ template:title }}` `{{ template:badges }}` `{{ template:description }}` | from the package's `package.json` (`name`, `description`) |
| `{{ template:toc }}` | table of contents of the headings below |
| `{{ pkg.name }}` | any `package.json` field |
| `{{ load:../../tools/readme/demos-and-development.md }}` | the shared "Demos and Development" section |
| `{{ load:../../tools/readme/questions.md }}` | the shared "Questions" section |

Learn the house style from a finished blueprint before writing: `ui-canvas/packages/ui-canvas/blueprint.md`, or any `packages/*/blueprint.md` of the repo you are in.

## Structure (in this order)

1. `{{ load:../../tools/readme/edit-warning.md }}` on the first line, then `title`, `badges`, `description` templates.
2. **Screenshots** table (see below), right after the description.
3. `{{ template:toc }}`
4. `## Installation` — `ns plugin add {{ pkg.name }}`, then anything extra the plugin needs (theme, Gradle/Pod setup, minimum OS versions).
5. `## Usage` — the smallest working example, then one subsection per framework **the package really supports** (only the ones with a `vue/`, `svelte/`, `angular/` or `react/` folder in `src/<package>`, plus Plain NativeScript XML). Each shows the registration and a template. Take the registration code from the package source, never from memory.
6. `## API` — tables for **Properties**, **Events**, **Methods** (omit empty ones). Columns: name, type, default, platform, description. Platform is `All`, `Android` or `iOS`: a feature of one design system is marked there, never hidden. Derive the rows from `src/<package>/index.d.ts` — the typings and the blueprint must not disagree. Document values of enums/unions (`variant`: `contained`, `outline`...) inline.
7. `## Examples` — link the demo pages that show the component, relative to the repo root (`demo-snippets/<flavor>/<Page>.<ext>`), one line of description each.
8. `{{ load:../../tools/readme/demos-and-development.md }}` then `{{ load:../../tools/readme/questions.md }}`.

Rules:

- English, concise. Tables and code, not prose. No marketing text.
- No claim the code does not back: check each property/event against the source before listing it.
- Code samples must run: use real property names and valid values.
- A user-visible change (new/renamed/removed property, new platform behavior, new minimum OS) updates the blueprint **in the same change**, then regenerate the README.
- No absolute local paths. Images and links point to the repo, not to a machine.

## Screenshots

Every package whose component draws UI has **a screenshot on iOS and on Android** in its blueprint. Packages without visible UI (utilities, core helpers) say so in one line instead.

### Files

- Stored in `images/` at the repo root, committed with the change.
- Names: `<package>-ios.png` and `<package>-android.png` (several states: `<package>-<state>-ios.png`). Motion that matters (scroll behavior, animation) is a `.gif` named `<package>-<state>-<platform>.gif`.
- Same content and state on both platforms, **light theme**, portrait. Keep each file under ~300 KB (resize to a 540 px width; optimize PNGs).
- Taken from the demo page of the component in `demo-snippets/<flavor>/`. When one demo page shows several packages, each package gets its own copy under its own name (crop to the relevant part when the page is long). If the demo does not show the component well, improve the demo first.

### Capturing

Clean the status bar first, so screenshots do not carry the clock and battery of the day:

```sh
# iOS simulator
xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4
xcrun simctl io booted screenshot images/<package>-ios.png
xcrun simctl status_bar booted clear

# Android emulator / device (demo mode)
adb shell settings put global sysui_demo_allowed 1
adb shell am broadcast -a com.android.systemui.demo -e command enter
adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 0941
adb shell am broadcast -a com.android.systemui.demo -e command battery -e level 100 -e plugged false
adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false
adb exec-out screencap -p > images/<package>-android.png
adb shell am broadcast -a com.android.systemui.demo -e command exit
```

With several devices attached pass `-s <serial>` (adb) or the simulator UDID instead of `booted`.

### Referencing

Use the raw GitHub URL of the default branch so the image renders on npm and GitHub (take `<repo>` from `repository.url` of the root `package.json`):

```markdown
| iOS | Android |
| --- | --- |
| <img src="https://github.com/nativescript-community/<repo>/raw/<base>/images/<package>-ios.png" height="500" /> | <img src="https://github.com/nativescript-community/<repo>/raw/<base>/images/<package>-android.png" height="500" /> |
```

`<base>` is the derived default branch.

## Generate and check

```sh
cd packages/<package> && npm run readme
```

- `README.md` was regenerated and contains no leftover `{{` placeholder.
- Every image URL points to a file that exists in `images/`.
- The API tables match `index.d.ts`.
