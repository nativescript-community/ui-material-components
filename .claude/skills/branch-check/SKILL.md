---
name: branch-check
description: Ensure you're on a correct working branch off the up-to-date default branch before planning or editing — starting from a GitHub issue when one is in play.
disable-model-invocation: true
---

Run before anything else, before planning or editing.

## Derive first, never assume

**Do not assume the default branch is `main`.** Repos differ, and guessing wrong makes every later
`git log <base>..HEAD` and `git diff <base>...HEAD` silently wrong. Resolve it once:

```sh
git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's|^origin/||'
```

Empty (the ref is not set locally)? Fall back to either of:

```sh
gh repo view --json defaultBranchRef -q .defaultBranchRef.name
git remote show origin | sed -n 's/.*HEAD branch: //p'
```

Call the result `<base>` below and use it everywhere instead of a literal branch name.

## Steps

1. Check the current branch (`git branch --show-current`).
2. If you are on `<base>`, you must branch — never edit directly on it.
3. Ensure `<base>` is current first: `git pull origin <base>` (rebase onto `upstream/<base>` if working from a fork).
4. If a GitHub issue is in play, fetch it with `gh` and derive the branch from it:
    - `gh issue view <number> --json number,title,labels` — read the title and labels
    - Pick the `<type>` from the labels/intent (`fix` for a bug, `feat` for an enhancement, etc.)
    - Build the name as `<type>/<number>-<slug>`, where `<slug>` is the issue title lowercased, non-alphanumerics → `-`, trimmed (e.g. issue #1234 "ScrollView insets wrong on iOS" → `fix/1234-scrollview-insets-wrong-on-ios`)
5. If no issue is in play, name the branch `<type>/<short-description>` from the change itself (e.g. `feat/date-picker-range`).
6. Resolve the branch:
    - If it already exists, check it out.
    - Otherwise create it from up-to-date `<base>`.
7. Check out the branch BEFORE planning. Interactive: confirm the branch name with the user first. **`--auto`** (caller runs autonomously): skip confirmation, just check out.

## Working inside a git submodule

If the files you are about to change live in a submodule (`git rev-parse --show-superproject-working-tree`
returns a path), that submodule is its own repo with its own default branch and its own commit. Run this
same check inside it, and remember a change there affects every superproject that consumes it.
