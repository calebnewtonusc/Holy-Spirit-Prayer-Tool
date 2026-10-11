"use client";
import Link from "next/link";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Flame, { type FlameLevels } from "./Flame";

type Mode = "journey" | "guide";
type Phase = "ready" | "connecting" | "live" | "ended";

interface SessionProps {
  mode: Mode;
}

const COPY: Record<
  Mode,
  { ready: string; sub: string; start: string; ended: string }
> = {
  journey: {
    ready: "Your guide is ready.",
    sub: "Find somewhere quiet. Headphones help. Plan on about twenty unhurried minutes.",
    start: "Begin with the guide",
    ended: "Keep asking. Keep praying.",
  },
  guide: {
    ready: "Your coach is ready.",
    sub: "Use it before you meet your friend, or put it on speaker and do it together.",
    start: "Start Leader Mode",
    ended: "Now go walk someone through it.",
  },
};

// Erik's first try on 2026-10-10 was Chrome on his iPhone. It refused the mic
// and the page said "allow it in your browser", which on iOS points nowhere:
// Chrome and Safari there take the switch from iOS Settings or the aA menu.
// Festival friends mostly open links inside Instagram, whose browser has no
// microphone at all, so that case gets named before they tap.
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Line\/|TikTok|musical_ly|Bytedance|LinkedInApp|Snapchat|Twitter/i;

function isIos(): boolean {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) || (ua.includes("Mac") && navigator.maxTouchPoints > 1);
}

function inAppBrowser(): boolean {
  return typeof navigator !== "undefined" && IN_APP.test(navigator.userAgent);
}

function micError(err: unknown): string {
  const name = err instanceof DOMException ? err.name : "";
  if (inAppBrowser() || !navigator.mediaDevices?.getUserMedia) {
    return "This app's browser can't use your microphone. Tap the menu and open this page in Safari or Chrome.";
  }
  if (name === "NotFoundError") return "No microphone found. Try your phone, or plug in headphones with a mic.";
  if (name === "NotReadableError") return "Another app is using your microphone. Close it, then tap Begin again.";
  if (isIos()) {
    return /CriOS/.test(navigator.userAgent)
      ? "Chrome can't hear you yet. Open iPhone Settings, tap Chrome, turn on Microphone, then come back and tap Begin."
      : "Safari can't hear you yet. Tap aA in the address bar, then Website Settings, set Microphone to Allow, and tap Begin.";
  }
  return "Your browser blocked the microphone. Click the icon at the left of the address bar, allow the microphone, and try again.";
}

export default function Session({ mode }: SessionProps) {
  return (
    <ConversationProvider>
      <SessionInner mode={mode} />
    </ConversationProvider>
  );
}

function SessionInner({ mode }: SessionProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [error, setError] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [praying, setPraying] = useState(false);
  const [shared, setShared] = useState(false);
  const [inApp, setInApp] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const copy = COPY[mode];

  const conversation = useConversation({
    onConnect: () => {
      setError(null);
      setPhase("live");
    },
    onDisconnect: () => setPhase((p) => (p === "live" ? "ended" : p)),
    onMessage: ({ message, role }) => {
      if (role === "agent") setCaption(message);
    },
    onError: (message) => {
      setError(
        typeof message === "string" && message
          ? message
          : "The connection dropped. Try again.",
      );
    },
  });

  useEffect(() => setInApp(inAppBrowser()), []);

  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  const getLevels = useCallback((): FlameLevels => {
    const c = conversationRef.current;
    if (c.status !== "connected") return { agent: 0, user: 0 };
    return {
      agent: Math.min(c.getOutputVolume() * 2.2, 1),
      user: Math.min(c.getInputVolume() * 2.6, 1),
    };
  }, []);

  // Phones sleep mid-prayer otherwise, which ends the session on iOS.
  useEffect(() => {
    if (phase !== "live") return;
    navigator.wakeLock
      ?.request("screen")
      .then((lock) => (wakeLock.current = lock))
      .catch(() => undefined);
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(timer);
      wakeLock.current?.release().catch(() => undefined);
      wakeLock.current = null;
    };
  }, [phase]);

  // Someone praying out loud while the guide stays quiet: after about twenty
  // seconds of that, the screen says so, so the silence reads as company. At
  // four seconds a 2026-10-10 test tripped it on an ordinary spoken answer.
  useEffect(() => {
    if (phase !== "live") {
      setPraying(false);
      return;
    }
    let voiced = 0;
    const timer = setInterval(() => {
      const c = conversationRef.current;
      if (c.isSpeaking) {
        voiced = 0;
        setPraying(false);
        return;
      }
      voiced = c.getInputVolume() > 0.05 ? voiced + 1 : Math.max(0, voiced - 1);
      if (voiced >= 66) setPraying(true);
    }, 300);
    return () => clearInterval(timer);
  }, [phase]);

  const share = useCallback(async () => {
    const url = `${window.location.origin}/journey`;
    const text = "This walked me through asking Jesus for the Holy Spirit. Try it somewhere quiet.";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Ask for the Fire", text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
      }
      setShared(true);
    } catch {
      // Closing the share sheet is not an error worth showing.
    }
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setCaption("");
    setSeconds(0);
    setPhase("connecting");
    // The probe only raises the permission prompt. It is released at once:
    // on iOS a second capture mutes the first, and the SDK opens its own.
    try {
      const probe = await navigator.mediaDevices.getUserMedia({ audio: true });
      probe.getTracks().forEach((track) => track.stop());
    } catch (e) {
      setPhase("ready");
      setError(micError(e));
      return;
    }
    try {
      const res = await fetch(`/api/session?mode=${mode}`, {
        cache: "no-store",
      });
      const body: unknown = await res.json().catch(() => null);
      const record =
        typeof body === "object" && body !== null
          ? (body as Record<string, unknown>)
          : {};
      if (!res.ok || typeof record.token !== "string") {
        throw new Error(
          typeof record.error === "string"
            ? record.error
            : "The guide couldn't connect just now.",
        );
      }
      conversation.startSession({
        conversationToken: record.token,
        connectionType: "webrtc",
      });
    } catch (e) {
      setPhase("ready");
      setError(
        e instanceof Error ? e.message : "The guide couldn't connect just now.",
      );
    }
  }, [conversation, mode]);

  const end = useCallback(() => {
    conversation.endSession();
    setPhase("ended");
  }, [conversation]);

  const live = phase === "live" || phase === "connecting";
  const minutes = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  if (live) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-ink/80 animate-fade-in"
        role="dialog"
        aria-label="Prayer session"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[78dvh]">
          <Flame
            getLevels={getLevels}
            idle={phase === "connecting" ? 0.12 : 0.28}
          />
        </div>

        <header className="relative flex items-center justify-between px-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
          <span className="kicker">{mode === "guide" ? "Leader Mode" : "Guided prayer"}</span>
          <span className="flex items-center gap-2 text-xs tabular-nums text-ash">
            <span
              className={`h-1.5 w-1.5 rounded-full ${phase === "live" ? "bg-ember-light animate-pulse" : "bg-smoke"}`}
            />
            {phase === "live" ? minutes : "Connecting"}
          </span>
        </header>

        <main className="relative flex flex-1 items-start justify-center px-6 pt-[12dvh]">
          {phase === "connecting" ? (
            <div className="flex flex-col items-center gap-8 animate-fade-in">
              <span className="relative grid h-28 w-28 place-items-center">
                <span className="absolute inset-0 animate-breath rounded-full border border-ember-light/40 bg-ember/10" />
                <span className="h-2 w-2 rounded-full bg-ember-light" />
              </span>
              <p className="font-display text-2xl text-bone/90 sm:text-3xl">Breathe in. You are loved.</p>
            </div>
          ) : (
            <p
              key={praying ? "praying" : caption}
              aria-live="polite"
              className={`max-w-2xl text-balance text-center font-display leading-snug animate-fade-up ${
                praying ? "text-xl text-ash sm:text-2xl" : "text-2xl text-bone/90 sm:text-3xl"
              }`}
            >
              {praying
                ? "Keep going. The guide is waiting with you."
                : caption || (conversation.isSpeaking ? "" : "Speak whenever you're ready.")}
            </p>
          )}
        </main>

        <footer className="relative flex flex-col items-center gap-4 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <p className="text-sm text-ash">
            {phase !== "live"
              ? "Connecting to your guide"
              : conversation.isMuted
                ? "Your mic is off"
                : praying
                  ? "Praying"
                  : conversation.isSpeaking
                  ? "Listen and let it settle"
                  : "Listening. Take your time"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => conversation.setMuted(!conversation.isMuted)}
              disabled={phase !== "live"}
              className="rounded-full border border-bone/15 bg-ink/50 px-5 py-3 text-sm font-medium text-bone backdrop-blur-md transition hover:border-bone/35 hover:bg-ink/70 disabled:opacity-40"
            >
              {conversation.isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              type="button"
              onClick={end}
              className="rounded-full bg-bone px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white active:scale-95"
            >
              End session
            </button>
          </div>
          {error && (
            <p className="max-w-sm text-center text-sm text-ember-light">
              {error}
            </p>
          )}
        </footer>
      </div>
    );
  }

  if (phase === "ended") {
    return (
      <div className="text-center animate-fade-up">
        <p className="kicker">Session complete</p>
        <h3 className="mt-4 font-display text-3xl font-normal tracking-[-0.01em] text-bone sm:text-4xl">
          {copy.ended}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-ash">
          &ldquo;How much more will your Father in heaven give the Holy Spirit
          to those who ask him!&rdquo; Luke 11:13
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/follow-up"
            className="w-full rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-ember-light sm:w-auto"
          >
            Open the 7-day plan
          </Link>
          <Link
            href={mode === "guide" ? "/journey" : "/guide"}
            className="w-full rounded-full border border-bone/15 px-7 py-3.5 text-sm font-semibold text-bone transition hover:border-bone/40 hover:bg-bone/5 sm:w-auto"
          >
            {mode === "guide"
              ? "Do it yourself first"
              : "Walk a friend through it"}
          </Link>
          <button
            type="button"
            onClick={share}
            className="w-full rounded-full border border-bone/15 px-7 py-3.5 text-sm font-semibold text-bone transition hover:border-bone/40 hover:bg-bone/5 sm:w-auto"
          >
            {shared ? "Sent. Pray for them" : "Send it to a friend"}
          </button>
        </div>
        <button
          type="button"
          onClick={start}
          className="mt-4 min-h-11 rounded-full px-5 text-sm font-medium text-ash transition hover:text-bone"
        >
          Start again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="font-display text-3xl font-normal tracking-[-0.01em] text-bone">
        {copy.ready}
      </h3>
      <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ash">
        {copy.sub}
      </p>
      {error && (
        <p
          role="alert"
          className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-gold-light"
        >
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={start}
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-base font-semibold text-ink shadow-[0_0_60px_-10px_rgb(var(--ember)/0.7)] transition hover:bg-white hover:shadow-[0_0_80px_-6px_rgb(var(--ember)/0.9)] active:scale-[0.98]"
      >
        <span className="h-2 w-2 rounded-full bg-ember transition group-hover:scale-125" />
        {copy.start}
      </button>
      <p className="mt-4 text-xs text-smoke">
        {inApp
          ? "This app's browser can't use the microphone. Open this page in Safari or Chrome first."
          : "Uses your microphone. Works in Safari and Chrome."}
      </p>
    </div>
  );
}
