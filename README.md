# rsi-button

A Claude Code mod that adds a **Suggest RSI** button above the prompt, and a `/rsi` command that does the same.

RSI stands for recursive self-improvement. Press the button at the end of a session and Claude reviews the session for corrections you made, repeated friction or workarounds that are likely to come up again. It then proposes **at most 3 rules**, each with its exact wording and the file it belongs in (a `CLAUDE.md` or a memory file). The prompt tells Claude to change nothing until you pick which rules to apply, and then to apply only those.

The button hides while Claude is working and while a survey holds the band, so a press never queues behind a running turn.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install rsi-button --marketplace PolymathMarsh/rsi-button
```

Answer `y` to add the marketplace, then pick a scope (user scope loads it in every session).

From a shell:

```
claude plugin install rsi-button --marketplace PolymathMarsh/rsi-button
```

In the Claude desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `PolymathMarsh/rsi-button`, then **Add plugin**.

## Use

- Press **Suggest RSI** above the prompt, or type `/rsi`.
- Claude replies with up to 3 proposed rules and asks which to apply.
- Pick the ones you want. Claude writes only those.

Works best with a short note in your global `~/.claude/CLAUDE.md` saying how you like rules written, for example:

```markdown
## Self-improvement (RSI)
- "Suggest an RSI": propose ≤3 rules from session friction (wording + file); apply only my picks.
- Before any CLAUDE.md write: fewest words that keep the point, merge into an existing bullet if one fits.
```

## What it does and does not do

- One hooks module, [`hooks/register.tsx`](hooks/register.tsx): a `ui.render` hook that draws the button, a `/rsi` slash command, and a fixed prompt submitted when either is used.
- It reads no files, runs no processes and makes no network calls. Any edit to a `CLAUDE.md` or memory file is made by Claude in the session, which the prompt limits to the rules you pick.
- `tsconfig.json` extends `.claude-plugin/types/`, which Claude Code generates once it loads the mod (git-ignored), so `tsc -p .` works after the first load.

## Licence

[MIT](LICENSE)
