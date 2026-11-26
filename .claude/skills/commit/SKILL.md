---
name: commit
description: MANDATORY skill for ALL commits. Must be used EVERY TIME before creating any git commit. No exceptions.
---

# Generating Commit Messages

## Derive the repo's conventions — never assume them

Commit conventions differ per repo and drift over time. **Read them out of the repo**, once, before
writing a message. Every command below is cheap.

```sh
# default branch (never assume `main`)
git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's|^origin/||'

# which types this repo actually uses, most-used first
git log --format='%s' -500 | grep -oE '^[a-z-]+' | sort | uniq -c | sort -rn

# which scopes this repo actually uses
git log --format='%s' -500 | grep -oE '^[a-z-]+\([^)]+\)' | sed 's/.*(//;s/)//' | sort | uniq -c | sort -rn

# what checks exist (do not invent a test command)
node -p "Object.keys(require('./package.json').scripts||{}).join(' ')"

# is the format actually enforced?
ls .github/workflows/ 2>/dev/null
grep -rl "commitlint" package.json .commitlintrc* commitlint.config.* .husky/ 2>/dev/null || echo "no commitlint"
```

Use what these return, not what you expect. Concretely:

- **Use the type histogram as the allowed vocabulary.** Many repos lean heavily on `chore` even though
  the commitlint default set omits it. If the histogram says `chore` dominates, `chore` is correct here.
- **Use the scope histogram.** Do not invent scopes, and do not carry scopes over from another project.
  Note the *shape* too — some repos use `fix(android):`, others `fix(android/camera):`. Match what exists.
- **If no commitlint config and no lint/test CI exist, nothing validates your message.** Say so rather
  than implying a safety net that is not there — and be correspondingly careful.

## Mandatory Process

**BEFORE ANY git commit COMMAND:**

1. **ALWAYS** run `git diff --staged` first to see changes
2. **ALWAYS** analyze the staged changes thoroughly
3. **ALWAYS** split the code changes into atomic commits, one per coherent / cohesive change. A single feature spanning multiple files (module + view + test) is ONE cohesive change — do not split it by file. Only split when changes are truly unrelated (e.g. a bug fix + a new feature + a docs update)
4. **ALWAYS** run the checks that this repo actually has, derived above. Typical shapes:
    - Tests **only if a test script/runner exists**. If there is none, do not invent one and do not claim the change is "tested".
    - Types: a `tsc --noEmit` / `check` / framework type-check script when typing is affected
    - Lint: prefer `./node_modules/.bin/<tool>` over `npx`. Under Yarn 4 (Berry), `npx` can trigger a
      dependency re-resolve and rewrite `yarn.lock` as a side effect; `yarn <tool>` fails outright for
      binaries that are not declared scripts.
    - **Never stage a lockfile** unless the dependency change is the point of the commit.
5. **ALWAYS** generate a commit message following the format below
6. **NEVER** commit automatically as a side effect of making code changes. Only commit when the user explicitly invokes the commit skill or says "commit".

## Confirmation Before Committing

**`--auto`** (caller runs autonomously): skip all approval/confirmation waits here (commit-plan gate below + fixup/rebase) — commit directly. Diff review, atomic splitting, checks, message format unchanged.

User trust requires seeing the plan before execution. Always present the full commit plan and wait for explicit approval before running any `git commit` command.

**For each commit (regular or fixup), present:**

- The commit message (header + body if applicable)
- The list of files included
- If splitting into multiple commits: the full split plan (which files go in which commit, in what order)
- If fixup: which commit SHA it targets and why

**Then ask the user to confirm.** Do not proceed until they approve. If they request changes to the message or grouping, adjust and re-present.

This applies equally to regular commits, fixups, and any commits triggered during the open-pr workflow.

## Auto-Fixup Detection

Before creating a new commit, check whether the staged changes should be fixup'd into a recent commit on the current branch. `<base>` is the derived default branch.

**Process:**

1. Run `git log <base>..HEAD --oneline` to list all commits on the branch since diverging
2. For each staged file, check `git log <base>..HEAD -- <file>` to see if it was modified in a recent branch commit
3. If a staged change clearly amends or extends code from a previous commit (same file, nearby lines, related logic — e.g. fixing a typo introduced in a prior commit, adding a missing import for a recently added module), suggest fixup'ing into that commit
4. Present the suggestion: "This change to `<file>` looks like it should be fixup'd into `<sha> <message>`. Want me to fixup instead of creating a new commit?"

**When fixup is confirmed:**

1. Run `git commit --fixup=<sha>` (with user confirmation)
2. Then run `GIT_SEQUENCE_EDITOR=true git rebase --interactive --autosquash <base>` to squash immediately (with user confirmation before the rebase)

If the change doesn't clearly relate to a previous commit, proceed with a normal new commit.

## Required Commit Message Format

Conventional Commits:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory; **scope**, **body**, and **footer** are optional.

### Header

**Shape:** `<type>(<scope>): <subject>`

- `<type>` — from the repo's histogram (see above). The conventional vocabulary is `build` `chore` `ci` `docs` `feat` `fix` `perf` `refactor` `style` `test`; the histogram tells you which of these this repo really uses.
- `<scope>` (optional) — from the repo's scope histogram, or the directory/feature the change lives in. Match the existing shape.
- `<subject>`: imperative present tense ("change" not "changed"), lowercase first letter, no trailing period
- **No line may exceed 100 characters**

**Examples** (shape, not vocabulary — take vocabulary from the repo):

```
docs(README): add build setup steps for submodules
fix(android): correct import of geojson/gpx files
refactor(map): extract the layer stack out of the map component
```

### Body

ONLY add a body when the header alone isn't enough for a reviewer:

1. Use the imperative present tense, same as the subject
2. Explain WHAT changed only if the commit touches more than 3 files
3. Explain WHY — the motivation, contrasted with previous behavior
4. Keep every line under 100 characters

### Footer

- Reference the issue this commit closes: `Fixes #<issue>` / `Closes #<issue>`
- Breaking changes start with `BREAKING CHANGE:` followed by a description and migration path

### Revert

A commit that reverts another begins with `revert: ` followed by the reverted header. The body states `This reverts commit <hash>.`

## Submodules

If staged changes live inside a submodule, it is a separate repo: commit there first (its conventions
and default branch may differ — re-derive them inside it), then commit the updated pointer in the
superproject. Flag that the submodule change affects every project consuming it.

## Co-Authored-By

Only add a `Co-Authored-By` trailer when Claude actually wrote the code being committed. If the user wrote the changes themselves (and Claude is just committing), do not add it.
