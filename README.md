# Holy Spirit Guided Prayer Tool

**A scripture-rooted guided prayer experience for Christians who want calm, biblical help seeking the gifts of the Holy Spirit, including tongues.**

Created by **[Erik Fish](https://erikfish.com/)** and **[Caleb Newton](https://calebnewton.me/)**

> "If Jesus had gifts that will help you in your life experience, help you be a more powerful witness for Jesus, and help strengthen and edify you... if Jesus had gifts for you to help you, would you want them?"
> Erik Fish

---

## What This Is

A focused, AI-voice-guided spiritual formation tool. Not a generic Christian app. Not a startup. A ministry tool designed to do one thing unusually well: guide Christians through seeking the gifts of the Holy Spirit, especially praying in tongues for the first time, the same way Erik Fish does it in person.

Built from:
1. A detailed product strategy document (see `docs/PRODUCT_STRATEGY.md`)
2. Erik Fish's *Pocket Disciple*: 7 Experiences with Jesus (Chapter 3: The Fire Experience)
3. A recorded conversation between Erik Fish and Caleb Newton where Erik's exact method, phrases, and guidance are captured
4. Scripture-first theology grounded in Luke 11:11-13, Acts 2:1-4, 1 Corinthians 14:1-15, Acts 1:8, and Romans 8:26

---

## How it works

- Next.js 15 App Router, TypeScript, Tailwind, deployed on Railway.
- Two ElevenLabs Conversational AI agents, running Claude Sonnet 5.5 for the thinking and `eleven_v3_conversational` for the voice.
- The browser never sees the API key. `/api/session` mints a short-lived WebRTC conversation token, and both agents have auth turned on, so the agent IDs alone can't start a session. It also rate-limits each visitor, and each agent has a daily cap, because the free credits running dry is what took the tool offline in March 2026.
- The flame on every page is a WebGL shader. During a session it reads the guide's output volume and your mic volume each frame, so it rises when the guide speaks and widens when you pray.
- Turn-taking is set to patient with a 30 second timeout, and the prompt tells the guide to stay quiet while someone prays in tongues.

## Running it

```bash
npm install
cp .env.example .env.local   # add ELEVENLABS_API_KEY
npm run dev
```

The prompts live in `src/data/agentPrompts.ts`. After editing them, push them to the live agents:

```bash
npm run agents:update
```

That script also sets the voice, model, turn-taking, auth, daily cap and privacy settings, so the repo is the source of truth for both agents.

## Erik's own voice

The guide currently speaks with the stock Brian voice. To make it Erik's voice, Erik records an instant voice clone on ElevenLabs (it needs his own consent on his account), then set `ELEVENLABS_VOICE_ID` to that voice and run `npm run agents:update`.

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

Coaches a Christian leader through walking a friend through the same experience. Provides scripts, cautions, and step-by-step guidance, exactly as Erik Fish does it in person.

---

## Deploying

Railway builds from `main`. Set `ELEVENLABS_API_KEY`, `ELEVENLABS_AGENT_ID` and `ELEVENLABS_GUIDE_AGENT_ID` on the service.

---

## Theological Posture

- Charismatic and expectancy-oriented, but always humble and never coercive
- All Christians who follow Jesus have the Holy Spirit. This is not elite Christianity.
- Asking specifically for gifts of the Spirit is obedient (1 Cor 14:1) and effective (Luke 11:13)
- The experience is different for everyone. Never shame. Never guarantee.
- The goal is surrender and seeking, not a manufactured outcome on demand.

---

## Safety

If a user expresses panic, severe spiritual confusion, or crisis, the AI agent is instructed to pause spiritual guidance and direct them to human help and/or 988 (mental health crisis line).

---

## Credits

- **Erik Fish**: Founder of Student Church Movement, author of *Pocket Disciple*, disciple-maker. The guiding method, theology, and voice behind this tool. [erikfish.com](https://erikfish.com/)
- **Caleb Newton**: Builder. [calebnewton.me](https://calebnewton.me/)

All glory to God! ✝️❤️
