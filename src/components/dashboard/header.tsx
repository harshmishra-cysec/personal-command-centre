import { useEffect, useState } from "react";
import { Quote, Terminal } from "lucide-react";
import { QUOTES } from "@/lib/dash-data";

export function DashHeader({ onReplayIntro }: { onReplayIntro?: () => void }) {
  const [now, setNow] = useState<Date | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setNow(new Date());
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
    const tick = setInterval(() => setNow(new Date()), 30_000);
    const rotate = setInterval(() => setQuoteIndex((i) => (i + 1) % QUOTES.length), 12_000);
    return () => {
      clearInterval(tick);
      clearInterval(rotate);
    };
  }, []);

  const quote = QUOTES[quoteIndex] ?? QUOTES[0]!;
  const dateLabel = now
    ? now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";
  const timeLabel = now
    ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:grid-cols-3 lg:px-6">
        <div className="min-w-0 flex items-center gap-3">
          <button
            type="button"
            onClick={onReplayIntro}
            className="min-w-0 text-left group cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
            title="Replay System Intro"
          >
            <div className="flex items-center gap-2">
              <span className="lg:hidden grid size-6 shrink-0 place-items-center rounded border border-border bg-background text-primary group-hover:border-primary/80 group-hover:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all">
                <Terminal className="size-3.5" />
              </span>
              <h1 className="truncate font-display text-[13px] font-semibold tracking-[0.28em] text-foreground group-hover:text-primary transition-colors lg:text-sm">
                PERSONAL COMMAND CENTER
              </h1>
            </div>
            <p className="label-mono mt-0.5 truncate text-muted-foreground group-hover:text-foreground transition-colors">
              operator // harsh · status: engaged
            </p>
          </button>
        </div>

        <div className="hidden justify-self-center text-center lg:block">
          <p className="font-mono text-sm text-foreground">{dateLabel}</p>
          <p className="label-mono mt-1">local time {timeLabel}</p>
        </div>

        <div className="flex min-w-0 items-start justify-end gap-2 lg:max-w-sm lg:justify-self-end">
          <div className="flex min-w-0 items-start gap-2 rounded-md border border-border/60 bg-surface/60 py-2 pr-3 pl-3 backdrop-blur-sm">
            <div className="h-full w-px self-stretch bg-primary/40" aria-hidden="true" />
            <Quote className="mt-[3px] size-3 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="line-clamp-2 text-right text-[11px] leading-snug text-secondary-foreground italic">
                “{quote.text}”
              </p>
              <p className="label-mono mt-1 text-right">— {quote.author}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-2 flex items-center justify-between lg:hidden">
        <p className="font-mono text-xs text-foreground">
          {dateLabel} <span className="text-muted-foreground">· {timeLabel}</span>
        </p>
        <span className="font-mono text-[10px] text-primary/80 tracking-widest uppercase">
          OPERATOR // ENGAGED
        </span>
      </div>
    </header>
  );
}
