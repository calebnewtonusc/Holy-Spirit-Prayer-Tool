# Holy Spirit Guided Prayer Tool

**A scripture-rooted guided prayer experience for Christians who want calm, biblical help seeking the gifts of the Holy Spirit — including tongues.**

Created by **[Erik Fish](https://erikfish.com/)** and **[Caleb Newton](https://calebnewton.me/)**

> "If Jesus had gifts that will help you in your life experience, help you be a more powerful witness for Jesus, and help strengthen and edify you... if Jesus had gifts for you to help you, would you want them?"
> — Erik Fish

---

## What This Is

A focused, AI-voice-guided spiritual formation tool. Not a generic Christian app. Not a startup. A ministry tool designed to do one thing unusually well: guide Christians through seeking the gifts of the Holy Spirit — especially praying in tongues for the first time — the same way Erik Fish does it in person.

Built from:
1. A detailed product strategy document (see `docs/PRODUCT_STRATEGY.md`)
2. Erik Fish's *Pocket Disciple* — 7 Experiences with Jesus (Chapter 3: The Fire Experience)
3. A recorded conversation between Erik Fish and Caleb Newton where Erik's exact method, phrases, and guidance are captured
4. Scripture-first theology grounded in Luke 11:11–13, Acts 2:1–4, 1 Corinthians 14:1–15, Acts 1:8, and Romans 8:26

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (Apple design aesthetic) |
| AI Voice | ElevenLabs Conversational AI |
| Deployment | Vercel |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Add your ElevenLabs API key to `.env.local`.

### 3. Create ElevenLabs agents

```bash
npm run setup:agent
```

This creates two conversational AI agents:
- **Holy Spirit Prayer Guide** — for solo seekers
- **Holy Spirit Prayer Guide — Leader Mode** — for leaders walking others through

Copy the returned agent IDs into `.env.local`.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

```env
# ElevenLabs API key — elevenlabs.io
ELEVENLABS_API_KEY=

# Agent IDs returned from npm run setup:agent
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=
NEXT_PUBLIC_ELEVENLABS_GUIDE_AGENT_ID=
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── journey/page.tsx      # Solo seeker journey (voice AI)
│   ├── guide/page.tsx        # Leader guide mode (voice AI coach)
│   └── follow-up/page.tsx    # 3-day and 7-day plans
├── components/
│   ├── ConversationAgent.tsx # ElevenLabs voice UI
│   ├── ScriptureCard.tsx     # Scripture display component
│   ├── Nav.tsx               # Navigation
│   └── Footer.tsx            # Footer with creator links
├── data/
│   ├── agentPrompts.ts       # Full LLM system prompts for both agents
│   └── content.ts            # Scriptures, prayers, fears, follow-up plans
└── lib/
    └── utils.ts
scripts/
└── setup-elevenlabs-agent.ts # Agent creation script
docs/
├── PRODUCT_STRATEGY.md       # Full original product strategy
├── POCKET_DISCIPLE.md        # Pocket Disciple reference
├── ERIK_FISH_TRANSCRIPT.md   # Full recorded conversation
└── ARCHITECTURE.md           # Technical decisions
```

---

## The Two Agents

### Agent 1: Holy Spirit Prayer Guide (Solo Journey)

The primary experience. A voice-guided journey through:
1. Welcome & orientation
2. Foundation check (faith in Jesus)
3. Erik's hook question
4. Biblical grounding (Luke 11, Acts 2, 1 Cor 14)
5. Fear handling
6. Heart preparation
7. Empowerment prayer
8. First practice guidance (Erik's method)
9. Reflection & discernment
10. Next steps

### Agent 2: Guide Mode (Leader Coach)

Coaches a Christian leader through walking a friend through the same experience. Provides scripts, cautions, and step-by-step guidance — exactly as Erik Fish does it in person.

---

## Deploying to Vercel

1. Push to GitHub (see below)
2. Import repo in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The `vercel.json` and `next.config.ts` are already configured for Vercel deployment.

---

## Pushing to GitHub

```bash
cd projects/holy-spirit-prayer-tool
git init
git add .
git commit -m "Initial release: Holy Spirit Guided Prayer Tool"
gh repo create holy-spirit-prayer-tool --public --source=. --push
```

---

## Theological Posture

- Charismatic and expectancy-oriented — but always humble and never coercive
- All Christians who follow Jesus have the Holy Spirit. This is not elite Christianity.
- Asking specifically for gifts of the Spirit is obedient (1 Cor 14:1) and effective (Luke 11:13)
- The experience is different for everyone. Never shame. Never guarantee.
- The goal is surrender and seeking — not a manufactured outcome on demand.

---

## Safety

If a user expresses panic, severe spiritual confusion, or crisis, the AI agent is instructed to pause spiritual guidance and direct them to human help and/or 988 (mental health crisis line).

---

## Credits

- **Erik Fish** — Founder of Student Church Movement, author of *Pocket Disciple*, disciple-maker. The guiding method, theology, and voice behind this tool. [erikfish.com](https://erikfish.com/)
- **Caleb Newton** — Builder. [calebnewton.me](https://calebnewton.me/)

All glory to God! ✝️❤️
