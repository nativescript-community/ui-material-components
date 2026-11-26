---
name: native-api-usage
description: Create or update the platforms/android and platforms/ios native-api-usage.json of a package. Use whenever native classes are added, removed or renamed in a package, or when a package has no native-api-usage.json.
---

Apps that enable `"whitelist-plugins-usages": true` in their own `App_Resources/<Platform>/native-api-usage.json` only get the native API the plugins declare. The rules (location, format, what to include) are in the repo's `.claude/CLAUDE.md` under **native-api-usage** — this skill is the method to find the entries.

Run it for one package at a time: `<package>` is the folder name under `src/` and `packages/`.

## 1. Find what the JS touches

Read the platform files and their shared code. Ignore `*.d.ts`, framework folders (`svelte/`, `vue/`, `angular/`, `react/`) and comments.

### Android

```sh
grep -rhoE '\b(android|androidx|com\.google\.android\.material|com\.nativescript|java\.[a-z]+|kotlin)(\.[a-z_][a-z0-9_]*)*\.[A-Z][A-Za-z0-9_]*[a-z][A-Za-z0-9_]*(\.[A-Z][A-Za-z0-9_]*[a-z][A-Za-z0-9_]*)*' src/<package> --include='*.ts' --exclude='*.d.ts' | sort -u
```

- Turn `a.b.c.Class.Nested` into `a.b.c:Class.Nested`.
- The regex skips all-caps tokens, so constants (`MaterialButton.ICON_GRAVITY_START`) do not become entries. Check no constant slipped through.
- A class reached through an alias (`const Foo = com.x.Foo`, a destructured namespace, a string passed to `Class.forName`) is still a class the JS uses: add it by hand.
- Add the plugin's own AAR classes the JS calls (`com.nativescript.*`).
- Classes only inflated from XML (layouts in `platforms/android/res`) are created by Android, not resolved by the NativeScript metadata — do not add them unless the JS also touches them.

### iOS

1. List the native symbols the `*.ios.ts` files use (`UIButton`, `NSAttributedString`, `CGRectMake`, `UIBlurEffect`...).
2. Find the module of each symbol in the typings:

    ```sh
    grep -l 'declare class UIBlurEffect ' node_modules/@nativescript/types-ios/lib/ios/objc-x86_64/*.d.ts
    ```

    The file name is the module (`objc!UIKit.d.ts` → `UIKit`). Use `declare function` / `declare var` for C functions and constants.
3. The entry is the module with a wildcard: `UIKit*`. Add the always-needed set for UIKit components: `CoreFoundation*`, `CoreGraphics*`, `Darwin*`, `Foundation*`, `ObjectiveC*`, `QuartzCore*`, `UIKit*`.
4. A Swift / Objective-C class compiled from `packages/<package>/platforms/ios/src/` is not in a system module: list it as `*:<ClassName>`.

## 2. Write the files

```json
{
    "uses": [
        "android.view:View",
        "com.google.android.material.button:MaterialButton"
    ]
}
```

- `packages/<package>/platforms/android/native-api-usage.json` and `packages/<package>/platforms/ios/native-api-usage.json`: both, always. Create the folders when they do not exist.
- 4 spaces indentation, trailing newline, sorted alphabetically, no duplicates.
- Only the `uses` key. Nothing proguard related.
- Keep an existing entry when you are not sure it is unused; remove an entry only when its class is gone from the sources.

## 3. Check

- Every native class referenced in the sources is covered, on both platforms.
- The JSON parses: `node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`.
- The package's `.npmignore` does not exclude `platforms/**/native-api-usage.json` (they must be published).
