---
name: open-pr
description: MANDATORY skill for ALL pull requests. Must be used EVERY TIME before creating any pull request. No exceptions.
---

# Opening a Pull Request

## Derive first, never assume

```sh
# base branch
git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's|^origin/||'

# what CI will actually run (do not promise a gate that does not exist)
ls .github/workflows/ 2>/dev/null

# is there a PR template?
ls .github/PULL_REQUEST_TEMPLATE.md .github/pull_request_template.md 2>/dev/null

# which checks you can run locally
node -p "Object.keys(require('./package.json').scripts||{}).join(' ')"
```

If there is no lint/test workflow, **nothing verifies this PR but you** — do not tell the user CI will
catch anything, and weight the manual scenarios accordingly.

## Mandatory Process

**`--auto`** (caller runs autonomously): skip step 0 sign-off and any push/PR approval wait — proceed directly. Still fix push-hook errors, still `--draft`.

0. **ALWAYS** ensure the change was verified before opening the PR. Run whatever checks the repo actually has (types, lint, and tests **only if a runner exists**). For UI/behavioral changes, confirm by running the app, or — when a run isn't possible — flag explicitly that a visual check is still required. Propose the scenarios to verify.
1. **ALWAYS** run `git push` and check for errors returned by any git hooks / CI
2. **ALWAYS** fix any errors — autofixup into the relevant commits, or create a new commit if autofixup does not apply
3. **ALWAYS** create the PR as **draft**:
    1. Read `.github/PULL_REQUEST_TEMPLATE.md` **only if one exists** and mirror its structure; otherwise write a clean default body (see "Writing the description" + "Default body" below).
    2. **CRITICAL**: `--template` and `--body` are **mutually exclusive** in `gh pr create`. Always use `--body` with an inline multiline string, never `--template`:
        ```sh
        gh pr create --draft --title "fix(<scope>): ..." --body "$(cat <<'EOF'
        ## Summary
        ...
        EOF
        )"
        ```
    3. Title follows the same Conventional Commits format as the commits — derive type/scope vocabulary from the repo (see the `commit` skill).
4. **ALWAYS** report the PR URL back to the user.

## Writing the description

- Write in English.
- Summarize the **main changes only** — the meaningful, functional changes a reviewer must understand. Skip incidental churn.
- Explain **why**, not just what. Link the issue when one is in play (`Closes #123`).
- Call out anything that could not be verified, and how a reviewer should exercise it.
- Be concise. Sacrifice grammar for concision; keep technical explanations simple.

## Default body

```markdown
## Summary

<what changed and why, 1-3 sentences>

## Changes

- <meaningful change 1>
- <meaningful change 2>

## Verification

- <checks run, and their result>
- <manual scenarios for the reviewer>

## Notes

- <risks, follow-ups, anything deliberately left out>
```

## Submodules

If the branch includes a submodule pointer bump, the submodule's own PR must land **first** — otherwise
the superproject points at a commit nobody else can fetch. Say so in the PR body and link both.
