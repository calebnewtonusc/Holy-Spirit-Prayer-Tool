/**
 * Push the prompts, voice, model and safety settings in this repo to the two
 * live ElevenLabs agents. Run after editing src/data/agentPrompts.ts:
 *   npm run agents:update
 */
import { config } from "dotenv";
import {
  GUIDE_MODE_FIRST_MESSAGE,
  GUIDE_MODE_SYSTEM_PROMPT,
  PRAYER_GUIDE_FIRST_MESSAGE,
  PRAYER_GUIDE_SYSTEM_PROMPT,
} from "../src/data/agentPrompts";

config({ path: ".env.local" });

const apiKey = process.env.ELEVENLABS_API_KEY;
const journeyId = process.env.ELEVENLABS_AGENT_ID ?? process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const guideId = process.env.ELEVENLABS_GUIDE_AGENT_ID ?? process.env.NEXT_PUBLIC_ELEVENLABS_GUIDE_AGENT_ID;
if (!apiKey || !journeyId || !guideId) {
  console.error("Missing ELEVENLABS_API_KEY or an agent id in .env.local");
  process.exit(1);
}

// Brian: deep, warm, unhurried. Stand-in until Erik records his own voice
// clone, which he has to do himself on his ElevenLabs account.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? "nPczCjzI2devNBz1zQrb";
const LLM = process.env.ELEVENLABS_LLM ?? "claude-sonnet-5-5";
const TTS_MODEL = process.env.ELEVENLABS_TTS_MODEL ?? "eleven_v3_conversational";

function settings(prompt: string, firstMessage: string) {
  return {
    conversation_config: {
      agent: {
        first_message: firstMessage,
        language: "en",
        disable_first_message_interruptions: false,
        prompt: { prompt, llm: LLM, temperature: 0.55 },
      },
      tts: { voice_id: VOICE_ID, model_id: TTS_MODEL, stability: 0.6, similarity_boost: 0.8, speed: 0.95 },
      // Patient turn-taking and a long silence timeout: the old agents jumped
      // back in while people were praying in tongues, which is the exact
      // moment the guide has to stay quiet.
      turn: { turn_timeout: 30, turn_eagerness: "patient", silence_end_call_timeout: -1 },
      conversation: { max_duration_seconds: 3600 },
    },
    platform_settings: {
      // Sessions start only through /api/session, which holds the key.
      auth: { enable_auth: true },
      // The plan ran dry in March 2026; a daily cap keeps one bad day from
      // taking the guide offline for the rest of the month.
      call_limits: { daily_limit: 150, agent_concurrency_limit: 10 },
      privacy: { record_voice: false },
    },
  };
}

async function update(id: string, name: string, prompt: string, firstMessage: string) {
  const res = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${id}`, {
    method: "PATCH",
    headers: { "xi-api-key": apiKey!, "Content-Type": "application/json" },
    body: JSON.stringify({ name, ...settings(prompt, firstMessage) }),
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} ${(await res.text()).slice(0, 400)}`);
  console.log(`updated ${name} (${id}) llm=${LLM} tts=${TTS_MODEL} prompt=${prompt.length} chars`);
}

async function main() {
  await update(journeyId!, "Holy Spirit Prayer Guide", PRAYER_GUIDE_SYSTEM_PROMPT, PRAYER_GUIDE_FIRST_MESSAGE);
  await update(guideId!, "Holy Spirit Prayer Guide: Leader Mode", GUIDE_MODE_SYSTEM_PROMPT, GUIDE_MODE_FIRST_MESSAGE);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
