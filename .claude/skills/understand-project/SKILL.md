---
name: understand-project
description: Ground a feature or fix in existing code before planning or building — find a similar pattern, identify reusable assets, map the touch surface. Internal helper invoked by feat / fix (both modes) — not meant to be run on its own.
disable-model-invocation: true
---

Ground every plan and implementation in code that already exists. A plan that says "follows the same
pattern as `<real/path/Thing.ts>`" beats one describing an abstraction in the abstract — the
executor gets low cognitive load and a working reference. This is the _method_; the calling skill says
what to build.

## Steps

1. **Learn the layout by reading it, not by recalling it.** Directory structures differ per app and
   change over time — a remembered layout is the single most common way an agent starts from a false
   map. Derive it:

    ```sh
    cat CLAUDE.md .claude/CLAUDE.md 2>/dev/null   # repo-specific facts and warnings live here
    ls src/ packages/ 2>/dev/null                  # plugin sources / published packages
    ls demo-* 2>/dev/null                          # demo apps
    node -p "require('./package.json').main"       # entry point
    ```

    Read the project's own docs **first**. If they contradict the tree, trust the tree and say so.

2. **Find a similar existing implementation.** Glob/Grep for a component, module or service that
   solves a comparable problem. Read 1-2 end-to-end so you can point at them by path.

3. **Identify reusable assets** — shared components, stores, singletons, models, utils. Reuse these by
   name rather than inventing new ones. Before adding anything to a shared location, check whether the
   same name already exists in more than one place: apps that vendor a shared library often end up with
   **drifted forks** of the same component, and adding to the wrong copy is silently ineffective.

4. **Map the touch surface** — every file, component, service, model, i18n key that needs to change.
   Trace data flow and callers (singletons are shared, so a change ripples) so nothing is missed. Where
   a shared context/interface object is involved, check the **implementation**, not just its declared
   type — hand-assembled context objects are frequently cast (`as any`) and their declared types drift
   from what is actually provided.

5. **Check third-party libraries** — when a library is involved, use Context7 for version-matched docs
   before assuming an API. When the project depends on a **fork** of a library (scoped names differing
   from upstream), prefer the local typings in `node_modules/` over published docs, which describe
   upstream and will mislead.

## Bias

Pick the simplest, cleanest solution: reuse existing patterns/components/hooks, fewest files touched,
smallest new surface. If a clever approach and a boring approach reach the same outcome, choose the
boring one.
