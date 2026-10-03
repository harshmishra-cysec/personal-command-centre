import { cn } from "@/lib/utils";

interface QuickLinkItem {
  id: string;
  name: string;
  tag: string;
  url: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    tag: "NET // OPS",
    url: "https://www.linkedin.com/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "tryhackme",
    name: "TryHackMe",
    tag: "RED // LABS",
    url: "https://tryhackme.com/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0a2.3 2.3 0 0 0-1.64.7L3.08 8.01a2.32 2.32 0 0 0 0 3.27l7.28 7.31a2.32 2.32 0 0 0 3.28 0l7.28-7.31a2.32 2.32 0 0 0 0-3.27L13.64.7A2.3 2.3 0 0 0 12 0zm0 4.2 5.57 5.59-5.57 5.59-5.57-5.59L12 4.2z" />
      </svg>
    ),
  },
  {
    id: "linuxjourney",
    name: "Linux Journey",
    tag: "SYS // CORE",
    url: "https://linuxjourney.com/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.5 2 8 3.8 8 6.5c0 1.2.3 2.5.8 3.5C7.2 11.2 6 13 6 16c0 3.3 2.7 6 6 6s6-2.7 6-6c0-3-1.2-4.8-2.8-6 .5-1 .8-2.3.8-3.5C16 3.8 14.5 2 12 2zm-1.8 6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3.6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1.8 1.5c1.2 0 1.8.8 1.8 1.2 0 .5-.8 1-1.8 1s-1.8-.5-1.8-1c0-.4.6-1.2 1.8-1.2zM8.5 17c.8-.8 2-1 3.5-1s2.7.2 3.5 1c.5.5.5 1.2 0 1.7-.8.8-2 1.3-3.5 1.3s-2.7-.5-3.5-1.3c-.5-.5-.5-1.2 0-1.7z" />
      </svg>
    ),
  },
  {
    id: "overthewire",
    name: "OverTheWire Bandit",
    tag: "WAR // GAMES",
    url: "https://overthewire.org/wargames/bandit/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.1a3.4 3.4 0 0 1 3.4 3.4c0 1.34-.78 2.5-1.9 3.03V13a1.5 1.5 0 0 1-3 0v-1.47A3.41 3.41 0 0 1 8.6 8.5c0-1.88 1.52-3.4 3.4-3.4zm0 13.9c-3.1-1.1-5.7-4.3-6.6-8 1.9.9 4.1 1.4 6.6 1.4s4.7-.5 6.6-1.4c-.9 3.7-3.5 6.9-6.6 8z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    tag: "MEDIA // STREAM",
    url: "https://www.youtube.com/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "claude",
    name: "Claude",
    tag: "AI // ANTHROPIC",
    url: "https://claude.ai/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 0 1 .75.75v3.19l2.25-2.25a.75.75 0 1 1 1.06 1.06l-2.25 2.25h3.19a.75.75 0 0 1 0 1.5h-3.19l2.25 2.25a.75.75 0 1 1-1.06 1.06L12.75 9.81v3.19a.75.75 0 0 1-1.5 0V9.81l-2.25 2.25a.75.75 0 1 1-1.06-1.06l2.25-2.25H7a.75.75 0 0 1 0-1.5h3.19L7.94 4.06a.75.75 0 0 1 1.06-1.06l2.25 2.25V3a.75.75 0 0 1 .75-.75z" transform="scale(1.2) translate(-2, 1)" />
      </svg>
    ),
  },
  {
    id: "gemini",
    name: "Gemini",
    tag: "AI // GOOGLE",
    url: "https://gemini.google.com/",
    icon: ({ className }) => (
      <svg className={cn("size-4.5 sm:size-5", className)} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
      </svg>
    ),
  },
];

export function TacticalQuickDock() {
  return (
    <aside
      aria-label="Tactical Quick Links Dock"
      className={cn(
        "fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center",
        "bg-[#0c121e]/85 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.6)] rounded-2xl py-3 px-1.5 sm:px-2",
        "transition-all duration-300 hover:border-cyan-400/40 select-none",
      )}
    >
      {/* Top Cyber Tick */}
      <div className="w-3 h-[2px] rounded-full bg-cyan-400/50 mb-2" />

      {/* Vertical Link Items */}
      <div className="flex flex-col items-center gap-2">
        {QUICK_LINKS.map((link, index) => {
          const Icon = link.icon;
          const isLast = index === QUICK_LINKS.length - 1;

          return (
            <div key={link.id} className="relative group flex flex-col items-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className={cn(
                  "p-2 rounded-xl text-slate-400 transition-all duration-200",
                  "hover:text-cyan-400 hover:scale-110 hover:bg-white/[0.06]",
                  "hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400",
                )}
              >
                <Icon />
              </a>

              {/* Tactical Tooltip on Hover */}
              <div
                role="tooltip"
                className={cn(
                  "absolute right-full mr-3.5 top-1/2 -translate-y-1/2 pointer-events-none",
                  "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                  "transition-all duration-150 ease-out z-50 flex items-center",
                )}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-cyan-500/30 bg-[#0c1320]/95 backdrop-blur-md shadow-xl shadow-black/80 whitespace-nowrap">
                  <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]" />
                  <span className="font-mono text-[11px] font-semibold text-cyan-200 tracking-wider">
                    {link.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#D4AF37] tracking-wider ml-1 uppercase">
                    {link.tag}
                  </span>
                </div>
                {/* Micro Arrow Indicator */}
                <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[6px] border-l-[#0c1320] -ml-[1px]" />
              </div>

              {/* Subtle Micro-divider between groups */}
              {(index === 1 || index === 3 || index === 4) && !isLast && (
                <div className="w-3.5 h-[1px] bg-white/[0.08] my-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Cyber Tick */}
      <div className="w-3 h-[2px] rounded-full bg-amber-400/50 mt-2" />
    </aside>
  );
}
