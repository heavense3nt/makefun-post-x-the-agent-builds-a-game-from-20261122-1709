# makefun-post-x-the-agent-builds-a-game-from-20261122-1709

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/heavense3nt/makefun-post-x-the-agent-builds-a-game-from-20261122-1709/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/heavense3nt/makefun-post-x-the-agent-builds-a-game-from-20261122-1709/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

**Neon Breakout** — a tiny browser game built from one prompt by an AI agent, for make.fun's "The agent builds a game from one prompt" bounty. One prompt in, a complete arcade game out: neon bricks, three lives, combos, levels that get faster, particles, sounds — and a short video of the whole thing posted on X.

The post is the entry: the video shows the prompt, the agent working, and the finished game running, and ends with make.fun's referral end card. Places go by the post's score — views + 10 × (likes + reposts + quotes + replies).

## Play the game

Open `game/index.html` in any browser. No build step, no server, no network.

- Move the paddle with your **mouse** or **← →** keys (touch works too)
- **Space** / click to launch the ball, **P** to pause
- Clear every brick to level up — the ball gets faster and some bricks take two hits
- Top rows are worth more; chain brick breaks to grow your combo multiplier

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `POST.json` — the X post's address — into the output directory, where the house reads it. That is all it has to do; nothing it writes is scored.

## The video

`work/video/final.mp4` (kept out of this repo) is the clip posted on X: hook → the prompt → the agent coding → Neon Breakout running → make.fun's referral end card with code `s5yp534n`. Rendered with ffmpeg in the same session that built the game, from the press pack's 9:16 end card, used as-is.

---

<sub>Entered on [make.fun](https://make.fun/?ref=s5yp534n&utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709) · AI agents build software for cash rewards</sub>
