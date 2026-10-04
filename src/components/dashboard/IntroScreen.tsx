import { useEffect, useRef, useState, useCallback } from "react";
import { LoginScreen } from "@/components/dashboard/LoginScreen";

// Centralised animation timings (in milliseconds)
export const TIMINGS = {
  BOARD_IN_MS: 500,
  SCANLINE_START_MS: 200,
  SCANLINE_END_MS: 900,
  KNIGHT_APPEAR_START_MS: 500,
  KNIGHT_APPEAR_DURATION_MS: 700,
  KNIGHT_MOVE_START_MS: 1200,
  KNIGHT_MOVE_DURATION_MS: 1400,
  KNIGHT_LANDING_MS: 2600,
  TYPEWRITER_1_START_MS: 2600,
  TYPEWRITER_1_DURATION_MS: 450,
  TYPEWRITER_2_START_MS: 3080,
  TYPEWRITER_2_DURATION_MS: 400,
  TERMINAL_HOLD_END_MS: 3600,
  BOARD_FADE_START_MS: 3600,
  REVEAL_START_MS: 3600,
  REVEAL_HERO_MS: 3600,
  REVEAL_LOGO_MS: 3750,
  REVEAL_EYEBROW_MS: 3850,
  REVEAL_TAGLINE_MS: 3950,
  REVEAL_DESC_MS: 4050,
  REVEAL_CHIPS_MS: 4150,
  LOGIN_BTN_APPEAR_MS: 4200,
  EXIT_DURATION_MS: 500,
} as const;

type IntroScreenMode = "play" | "hero" | "login";

interface IntroScreenProps {
  onComplete: () => void;
  isSignedIn?: boolean;
  replay?: boolean;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"] as const;

export function IntroScreen({
  onComplete,
  isSignedIn = false,
  replay = false,
}: IntroScreenProps) {
  // Separate which screen is shown from whether the exit animation is running
  const [screen, setScreen] = useState<IntroScreenMode>("play");
  const [exiting, setExiting] = useState(false);
  const [staticHero, setStaticHero] = useState(false);
  const [isReduced, setIsReduced] = useState(false);
  const hasCompletedRef = useRef(false);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  // Keep latest props in a ref updated on every render
  const propsRef = useRef({ onComplete, isSignedIn, replay });
  useEffect(() => {
    propsRef.current = { onComplete, isSignedIn, replay };
  });

  // Jump straight to the hero screen (used by Skip, Esc, Space, Enter, or click during play)
  const jumpToHero = useCallback(() => {
    if (screen !== "play" || exiting || hasCompletedRef.current) return;
    setStaticHero(true);
    setScreen("hero");
  }, [screen, exiting]);

  // Curtain exit animation runner: sets sessionStorage, triggers CSS curtain, then onComplete() exactly once
  const playCurtainExit = useCallback(() => {
    if (hasCompletedRef.current || exiting) return;
    hasCompletedRef.current = true;
    setExiting(true);

    try {
      sessionStorage.setItem("movone_intro_seen", "1");
    } catch {
      // Ignore storage write errors
    }

    const exitDuration = isReduced ? 300 : TIMINGS.EXIT_DURATION_MS;
    setTimeout(() => {
      propsRef.current.onComplete();
    }, exitDuration);
  }, [isReduced, exiting]);

  // Initial-mode decision effect: runs ONCE on mount
  useEffect(() => {
    const { onComplete: cb, isSignedIn: signedIn, replay: isReplay } = propsRef.current;

    // 1. Signed in and not replaying: immediately complete with no animation
    if (signedIn && !isReplay) {
      hasCompletedRef.current = true;
      cb();
      return;
    }

    // 2. Check if intro was already seen in session
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("movone_intro_seen"));
    } catch {
      // Ignore sessionStorage read errors
    }

    // If not signed in and intro was already seen: go straight to login screen
    if (!signedIn && seen) {
      setStaticHero(true);
      setScreen("login");
      return;
    }

    // 3. Reduced motion check
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsReduced(true);
        setStaticHero(true);
        setScreen("hero");
        return;
      }
    }

    // 4. Normal timeline: auto-advance to hero screen at 4.20s without resetting on parent re-renders
    const heroTimer = setTimeout(() => {
      if (hasCompletedRef.current) return;
      setScreen((prev) => (prev === "play" ? "hero" : prev));
    }, TIMINGS.LOGIN_BTN_APPEAR_MS);

    return () => {
      clearTimeout(heroTimer);
    };
  }, []);

  // Focus the action button when entering the 'hero' screen
  useEffect(() => {
    if (screen === "hero" && !exiting && !hasCompletedRef.current) {
      const focusTimer = setTimeout(() => {
        loginButtonRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(focusTimer);
    }
  }, [screen, exiting]);

  // Keyboard shortcut listener: during 'play' screen only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        screen === "play" &&
        !exiting &&
        !hasCompletedRef.current &&
        (e.key === "Escape" || e.key === " " || e.key === "Enter")
      ) {
        e.preventDefault();
        jumpToHero();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [screen, exiting, jumpToHero]);

  // Transition to login screen on LOGIN button click
  const handleLoginClick = () => {
    if (screen !== "hero" || exiting || hasCompletedRef.current) return;
    setScreen("login");
  };

  // On successful login submission: wipe curtain while keeping the active screen mounted
  const handleLoginSuccess = useCallback(() => {
    playCurtainExit();
  }, [playCurtainExit]);

  // 64-square grid array (Rank 8 at row 0 down to Rank 1 at row 7)
  const squares = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isLight = (row + col) % 2 === 0;
    // g1 is col 6, row 7; f3 is col 5, row 5
    const isG1 = col === 6 && row === 7;
    const isF3 = col === 5 && row === 5;
    return { id: i, row, col, isLight, isG1, isF3 };
  });

  return (
    <div
      role="status"
      aria-label="MOVONE starting"
      onClick={screen === "play" && !exiting ? jumpToHero : undefined}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#06080E] select-none overflow-hidden ${
        screen === "play" && !exiting ? "cursor-pointer" : ""
      } ${
        exiting
          ? isReduced
            ? "transition-opacity duration-300 opacity-0 pointer-events-none"
            : "pcc-intro-curtain-anim pointer-events-none"
          : ""
      }`}
      style={{ "--sq": "min(11vw, 70px)" } as React.CSSProperties}
    >
      {/* Background layer */}
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none overflow-hidden bg-[#06080e] transition-opacity duration-300 ${
          staticHero || screen === "hero" || screen === "login"
            ? "opacity-100"
            : "opacity-0 pcc-intro-backdrop-fade"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,229,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_35%,rgba(14,165,233,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_85%_25%,rgba(212,175,55,0.09),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_100%,rgba(2,132,199,0.10),transparent_70%)]" />

        <div
          className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[240vw] h-[170vh] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(0, 229, 255, 0.10) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(0, 229, 255, 0.10) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(0, 229, 255, 0.10) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(0, 229, 255, 0.10) 75%),
              linear-gradient(to right, rgba(0, 229, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 229, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px, 64px 64px, 64px 64px, 64px 64px, 64px 64px, 64px 64px",
            backgroundPosition: "0 0, 0 32px, 32px -32px, -32px 0px, 0 0, 0 0",
            transform: "perspective(650px) rotateX(54deg) translateY(-8%) scale(1.15)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.2) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(0, 229, 255, 0.10) 90%, rgba(0, 229, 255, 0.20) 100%)`,
          }}
        />
      </div>

      {/* Top-right Action Button: Skip during animation (fades out at 4.2s), Login/Continue during hero screen */}
      {screen === "play" && !staticHero && !isReduced && !exiting && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            jumpToHero();
          }}
          className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 font-mono text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors uppercase px-2.5 py-1 rounded border border-white/10 hover:border-white/25 bg-black/40 backdrop-blur-sm cursor-pointer pcc-intro-phase1-exit"
        >
          Skip
        </button>
      )}

      {/* Prominent Square-cornered LOGIN/CONTINUE Button in top-right */}
      {screen === "hero" && !exiting && (
        <button
          ref={loginButtonRef}
          type="button"
          onClick={isSignedIn ? playCurtainExit : handleLoginClick}
          aria-label={isSignedIn ? "Continue to dashboard" : "Login to MOVONE"}
          className={`fixed top-4 right-4 sm:top-5 sm:right-5 z-50 pcc-login-btn text-[13px] sm:text-[14px] ${
            staticHero
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pcc-intro-login-btn-in pointer-events-auto"
          }`}
        >
          {isSignedIn ? "Continue" : "Login"}
        </button>
      )}

      {/* PHASE 1: Chessboard, Knight Move & Telemetry (0.00s - 4.50s) */}
      {screen === "play" && !staticHero && !isReduced && (
        <div className="relative flex flex-col items-center justify-center pcc-intro-phase1-exit">
          <div className="relative pcc-intro-board-anim">
            <div
              className="relative rounded-xl border-2 border-[#D4AF37] p-[calc(var(--sq)*0.45)] shadow-[0_0_60px_rgba(239,68,68,0.25)]"
              style={{
                background: "linear-gradient(135deg, #3B2417 0%, #2B1A10 100%)",
              }}
            >
              <div className="absolute left-0 top-[calc(var(--sq)*0.45)] bottom-[calc(var(--sq)*0.45)] w-[calc(var(--sq)*0.45)] flex flex-col justify-around items-center font-mono text-[11px] sm:text-[13px] font-medium text-[#D4AF37]/85 pointer-events-none">
                {RANKS.map((rank) => (
                  <span key={rank}>{rank}</span>
                ))}
              </div>

              <div className="relative w-[calc(var(--sq)*8)] h-[calc(var(--sq)*8)] border border-[#D4AF37]/60 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-x-0 h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444] pcc-intro-scanline-anim pointer-events-none z-30"
                />

                <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                  {squares.map((sq) => (
                    <div
                      key={sq.id}
                      className="relative w-[var(--sq)] h-[var(--sq)]"
                      style={{
                        backgroundColor: sq.isLight ? "#F0D9B5" : "#B58863",
                      }}
                    >
                      {(sq.isG1 || sq.isF3) && (
                        <div className="absolute inset-0 bg-[#FFD700]/40 pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>

                <div
                  aria-hidden
                  className="absolute left-[calc(var(--sq)*6.5-1.5px)] top-[calc(var(--sq)*5.5)] w-[3px] h-[calc(var(--sq)*2)] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.7)] pointer-events-none z-10 pcc-intro-trail-v-anim"
                />
                <div
                  aria-hidden
                  className="absolute left-[calc(var(--sq)*5.5)] top-[calc(var(--sq)*5.5-1.5px)] w-[var(--sq)] h-[3px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.7)] pointer-events-none z-10 pcc-intro-trail-h-anim"
                />

                <div
                  aria-hidden
                  className="absolute left-[calc(var(--sq)*5)] top-[calc(var(--sq)*5)] w-[var(--sq)] h-[var(--sq)] flex items-center justify-center pointer-events-none z-20"
                >
                  <div className="size-[calc(var(--sq)*0.85)] rounded-full border-2 border-red-500 shadow-[0_0_15px_#ef4444] opacity-0 pcc-intro-landing-pulse-anim" />
                </div>

                <div
                  aria-hidden
                  className="absolute left-[calc(var(--sq)*6)] top-[calc(var(--sq)*7)] w-[var(--sq)] h-[var(--sq)] flex items-center justify-center pointer-events-none z-20"
                >
                  <div className="size-[calc(var(--sq)*0.85)] rounded-full border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)] opacity-0 pcc-intro-gold-pulse-anim" />
                </div>

                <div
                  aria-hidden
                  className="absolute left-[calc(var(--sq)*6)] top-[calc(var(--sq)*7)] w-[var(--sq)] h-[var(--sq)] flex items-center justify-center z-25 pointer-events-none pcc-intro-knight-appear-anim"
                >
                  <div className="pcc-intro-knight-move-anim flex items-center justify-center">
                    <div
                      className="size-[calc(var(--sq)*0.9)] rounded-full border-2 border-[#8A6D1D] shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-center p-1"
                      style={{
                        background: "linear-gradient(135deg, #F5E296 0%, #D4AF37 100%)",
                      }}
                    >
                      <img
                        src="/favicon2.svg"
                        alt=""
                        aria-hidden
                        className="size-[75%] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-[calc(var(--sq)*0.45)] right-[calc(var(--sq)*0.45)] bottom-0 h-[calc(var(--sq)*0.45)] flex justify-around items-center font-mono text-[11px] sm:text-[13px] font-medium text-[#D4AF37]/85 pointer-events-none">
                {FILES.map((file) => (
                  <span key={file}>{file}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-1.5 font-mono text-[13px] sm:text-[16px] tracking-widest text-center select-none z-20">
            <div className="overflow-hidden whitespace-nowrap pcc-intro-type1-anim">
              <span className="text-red-500 font-medium">&gt; Nf3 // BREACH INITIATED</span>
            </div>
            <div className="overflow-hidden whitespace-nowrap pcc-intro-type2-anim">
              <span className="text-[#D4AF37] font-medium">&gt; MOVONE // ONLINE</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: HERO REVEAL */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
          screen === "login"
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <div className="w-full max-w-[1100px] flex flex-col min-[900px]:grid min-[900px]:grid-cols-2 items-center gap-4 sm:gap-6 min-[900px]:gap-12 pointer-events-auto">
          {/* LEFT: Hero Illustration Panel */}
          <div
            className={`relative rounded-2xl border border-white/10 bg-[#0F1523] p-3 sm:p-4 shadow-2xl flex items-center justify-center overflow-hidden w-full max-w-[340px] min-[900px]:max-w-none ${
              staticHero
                ? "opacity-100"
                : "opacity-0 pcc-intro-reveal-hero"
            }`}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.24),transparent_70%)] pcc-intro-glow-anim"
            />
            <img
              src="/movone-hero.svg"
              alt=""
              aria-hidden
              loading="eager"
              decoding="async"
              className="relative z-10 w-auto object-contain max-h-[min(24dvh,200px)] min-[900px]:max-h-[min(60dvh,480px)]"
            />
          </div>

          {/* RIGHT: Logo frame, Eyebrow, Tagline, Description, Chips */}
          <div className="flex flex-col items-center text-center w-full max-w-[52ch] mx-auto">
            {/* Logo frame with 4 gold corner brackets */}
            <div
              className={`relative rounded-xl border border-white/10 bg-[#0F1523] p-2 sm:p-2.5 shadow-xl w-full max-w-[420px] flex items-center justify-center overflow-hidden mx-auto ${
                staticHero
                  ? "opacity-100"
                  : "opacity-0 pcc-intro-reveal-logo"
              }`}
            >
              <span aria-hidden className="absolute top-1 left-1 size-2 border-t-2 border-l-2 border-[#D4AF37]" />
              <span aria-hidden className="absolute top-1 right-1 size-2 border-t-2 border-r-2 border-[#D4AF37]" />
              <span aria-hidden className="absolute bottom-1 left-1 size-2 border-b-2 border-l-2 border-[#D4AF37]" />
              <span aria-hidden className="absolute bottom-1 right-1 size-2 border-b-2 border-r-2 border-[#D4AF37]" />
              <img
                src="/movone-logo.svg"
                alt="MOVONE"
                loading="eager"
                decoding="async"
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>

            {/* Eyebrow */}
            <span
              className={`font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium mt-3 sm:mt-4 text-center ${
                staticHero
                  ? "opacity-100"
                  : "opacity-0 pcc-intro-reveal-eyebrow"
              }`}
            >
              Let's make a move
            </span>

            {/* Tagline */}
            <h1
              className={`font-display font-bold leading-[1.1] text-[clamp(1.75rem,1rem+3vw,3.5rem)] text-white mt-1.5 sm:mt-2 text-center ${
                staticHero
                  ? "opacity-100"
                  : "opacity-0 pcc-intro-reveal-tagline"
              }`}
            >
              One day or <span className="text-[#D4AF37] whitespace-nowrap">Day One</span>. <br /> You decide.
            </h1>
            
            {/* Description */}
            <p
              className={`font-sans font-normal leading-[1.6] text-[clamp(0.95rem,0.6rem+1vw,1.25rem)] text-white/70 max-w-[52ch] mt-2.5 sm:mt-3 text-center mx-auto ${
                staticHero
                  ? "opacity-100"
                  : "opacity-0 pcc-intro-reveal-desc"
              }`}
            >
              Your personal space to plan the day and stay consistent. Track Cybersecurity, Academics and AIML goals with roadmaps, stats and streaks, one move at a time.
            </p>

            {/* Pillar chips */}
            <div
              className={`flex flex-wrap gap-2 mt-3 sm:mt-4 justify-center ${
                staticHero
                  ? "opacity-100"
                  : "opacity-0 pcc-intro-reveal-chips"
              }`}
            >
              <span className="font-mono text-[11px] sm:text-[12px] uppercase rounded-full border border-white/15 bg-white/5 text-white/80 px-3 py-1 font-medium">
                Cybersecurity Track
              </span>
              <span className="font-mono text-[11px] sm:text-[12px] uppercase rounded-full border border-white/15 bg-white/5 text-white/80 px-3 py-1 font-medium">
                Academics &amp; Labs
              </span>
              <span className="font-mono text-[11px] sm:text-[12px] uppercase rounded-full border border-white/15 bg-white/5 text-white/80 px-3 py-1 font-medium">
                AIML &amp; Extra
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 3: LOGIN SCREEN (Rendered when screen === 'login', stays mounted during exit) */}
      {screen === "login" && (
        <div className={`fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center ${exiting ? "pointer-events-none" : ""}`}>
          <LoginScreen
            onBack={() => {
              if (exiting || hasCompletedRef.current) return;
              setStaticHero(true);
              setScreen("hero");
            }}
            onSuccess={handleLoginSuccess}
          />
        </div>
      )}
    </div>
  );
}
