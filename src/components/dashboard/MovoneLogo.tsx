import { cn } from "@/lib/utils";

export interface MovoneLogoProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
  /**
   * "icon" for the standalone tactical Knight emblem (ideal for compact avatar/nav/header icon)
   * "full" for the full "MOV1ONE" logotype (ideal for hero / banner displays)
   */
  variant?: "icon" | "full";
}

export function MovoneLogo({
  className,
  size = 32,
  glow = true,
  variant = "icon",
}: MovoneLogoProps) {
  const pixelSize = typeof size === "number" ? `${size}px` : size;

  if (variant === "full") {
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 select-none",
          className,
        )}
        style={{
          width: typeof size === "number" ? `${size * 3.2}px` : size,
          height: pixelSize,
        }}
      >
        <img
          src="/movone-logo.svg"
          alt="MOVONE"
          className={cn(
            "w-full h-full object-contain transition-all duration-300",
            glow && "drop-shadow-[0_0_16px_rgba(212,175,55,0.45)]",
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 select-none",
        className,
      )}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-full h-full object-contain transition-all duration-300",
          glow && "drop-shadow-[0_0_12px_rgba(212,175,55,0.55)]",
        )}
      >
        <defs>
          <linearGradient id="movLogoGold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E296" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9C7A22" />
          </linearGradient>

          <linearGradient id="movLogoGold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C59E30" />
            <stop offset="100%" stopColor="#755610" />
          </linearGradient>

          <linearGradient id="movShieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#131B2A" />
            <stop offset="100%" stopColor="#0B0F17" />
          </linearGradient>
        </defs>

        {/* Outer Circular / Hexagonal Tactical Badge Ring */}
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="url(#movShieldBg)"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Inner subtle glow rim */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="url(#movLogoGold1)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
          strokeOpacity="0.6"
        />

        {/* Pedestal Base */}
        <rect
          x="30"
          y="78"
          width="40"
          height="6"
          rx="2"
          fill="url(#movLogoGold1)"
        />
        <path
          d="M 35 78 L 39 72 L 61 72 L 65 78 Z"
          fill="url(#movLogoGold2)"
        />
        <rect
          x="40"
          y="70"
          width="20"
          height="2.5"
          rx="1"
          fill="url(#movLogoGold1)"
        />

        {/* Tactical Knight Piece - Facing Right (from MOVONE official brand) */}
        {/* Main Body & Snout */}
        <path
          d="M 43 70 
             C 47 60, 46 44, 53 31 
             C 54 29, 56 26, 57 27 
             C 59 28, 61 31, 62 36 
             L 63 21 
             C 64 18, 66 17, 67 19 
             L 68 23 
             C 72 30, 75 35, 75 37
             C 78 39, 81 45, 83 49 
             C 84 51, 85 54, 84 56 
             L 79 58 
             C 78 59, 76 58, 74 56 
             C 70 54, 67 52, 66 53 
             C 64 54, 63 57, 67 65 
             L 64 70 
             Z"
          fill="url(#movLogoGold1)"
        />

        {/* Inner Mane & Shadow Facet */}
        <path
          d="M 58 31 
             C 52 36, 46 43, 44 51 
             L 48 51 
             C 43 57, 40 63, 39 71 
             L 44 71 
             C 46 63, 50 53, 60 33 
             Z"
          fill="url(#movLogoGold2)"
        />

        {/* Dark Tactical Slit Eye */}
        <path d="M 67 39 L 73 42 L 68 43 Z" fill="#0B0F17" />
      </svg>
    </div>
  );
}
