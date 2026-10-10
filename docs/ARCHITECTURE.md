# Technical Architecture

> Written for the March 2026 version. The October 2026 rebuild moved hosting to Railway, sessions to server-minted tokens (`src/app/api/session/route.ts`), the voice UI to `src/components/Session.tsx` and `Flame.tsx`, and the agents to Claude Sonnet 5.5 with `eleven_v3_conversational`. The README's "How it works" section is current.

## Core Design Principle

**Everything is LLM.** The AI voice agent IS the experience , not a helper or a chatbot layer on top of a hardcoded UI. The agent holds the full theology, guiding method, scriptures, fear-handling, and pastoral wisdom. The UI exists to frame, launch, and support the agent.

---

## Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 App Router | Performance, SEO, mobile-first, Vercel native |
| Language | TypeScript | Type safety for content/agent configs |
| Styling | Tailwind CSS | Apple design system implemented via utility classes |
| AI Voice | ElevenLabs Conversational AI | Real-time voice conversation, low latency, high quality |
| Deployment | Vercel | Zero-config, global CDN, environment variables |

---

## Agent Architecture

Two separate ElevenLabs Conversational AI agents:

### Agent 1: `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`
- **Name:** Holy Spirit Prayer Guide
- **Purpose:** Solo seeker journey
- **System prompt:** Full theological guide, 10-phase journey, all of Erik Fish's method
- **Voice:** Rachel (warm, calm, pastoral)
- **Session max:** 60 minutes

### Agent 2: `NEXT_PUBLIC_ELEVENLABS_GUIDE_AGENT_ID`
- **Name:** Holy Spirit Prayer Guide , Leader Mode
- **Purpose:** Coach for leaders walking others through the experience
- **System prompt:** 10-step facilitation guide with scripts, cautions, and coaching
- **Voice:** Rachel (same , consistent brand)

Both agents are created programmatically via `scripts/setup-elevenlabs-agent.ts`.

---

## Pages

| Route | Purpose | Agent Used |
|---|---|---|
| `/` | Landing page | None |
| `/journey` | Solo seeker voice experience | Agent 1 |
| `/guide` | Leader guide mode voice experience | Agent 2 |
| `/follow-up` | 3-day and 7-day plans (static content from `content.ts`) | None |

---

## Data Layer

All content is in `src/data/`:

- **`agentPrompts.ts`** , The full system prompts for both agents. This is the most important file. All theology, all of Erik's method, all guiding phrases live here.
- **`content.ts`** , Scriptures, prayers, fears, follow-up plans, testimonies. Used by static pages and as backup reference.

---

## Component Structure

```
ConversationAgent.tsx       ← Core ElevenLabs voice UI
├── Uses: @elevenlabs/react useConversation hook
├── States: not started / connected / speaking / listening
└── Controls: start, stop, mic permission

ScriptureCard.tsx           ← Scripture display (3 variants)
Nav.tsx                     ← Fixed top nav with active state
Footer.tsx                  ← Creator credits, legal notice
```

---

## ElevenLabs Integration

Using `@elevenlabs/react` for the React hook:

```tsx
const conversation = useConversation({
  onConnect: () => {},
  onDisconnect: () => {},
  onError: (error) => {},
  onMessage: (message) => {},
});

// Start
await conversation.startSession({ agentId });

// Stop
await conversation.endSession();

// State
conversation.status  // "connected" | "disconnected" | "connecting"
conversation.isSpeaking  // boolean
```

The widget shows:
- **Before start:** Flame icon, description, microphone permission request
- **During session:** Animated orb that pulses when agent speaks, live indicator
- **End session:** Simple button, returns to start screen

---

## Design System

Apple-inspired. Implemented via Tailwind utility classes.

| Token | Value | Usage |
|---|---|---|
| `apple-text` | `#1D1D1F` | Primary text |
| `apple-secondary` | `#6E6E73` | Secondary text, descriptions |
| `apple-tertiary` | `#AEAEB2` | Muted text, labels |
| `apple-bg` | `#F5F5F7` | Section backgrounds, cards |
| `apple-separator` | `#D2D2D7` | Borders, dividers |
| `ember` | `#B5621A` | Brand accent (spiritual warmth) |
| `ember-light` | `#E8924A` | Lighter accent |
| `ember-subtle` | `#FFF4EB` | Background tint for prayer blocks |

Typography: System font stack (`-apple-system, BlinkMacSystemFont, SF Pro Display`). Georgia serif for scripture and prayer text.

Spacing: Generous whitespace. Sections use `py-24`. Cards use `p-7` to `p-10`.

Radius: `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for sections, `rounded-full` for pills and buttons.

---

## Deployment

### Vercel (production)
1. Connect GitHub repo to Vercel
2. Add environment variables:
   - `ELEVENLABS_API_KEY` (server-side only, for agent management)
   - `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`
   - `NEXT_PUBLIC_ELEVENLABS_GUIDE_AGENT_ID`
3. Auto-deploy on push to `main`

### Local dev
```bash
npm install
cp .env.example .env.local
# Add your API keys
npm run setup:agent   # creates agents, outputs IDs
npm run dev
```

---

## Future Considerations (V2)

- Add ElevenLabs client tools so agent can trigger UI actions (show scripture card, start timer, etc.)
- Multi-language agent configurations (Spanish, Portuguese, French first)
- Session persistence via localStorage or optional account
- Audio-only / eyes-closed mode (hands-free)
- Offline audio packs for low-bandwidth regions
- Leader dashboard for tracking group sessions
