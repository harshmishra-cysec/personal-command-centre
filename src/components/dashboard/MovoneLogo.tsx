import { cn } from "@/lib/utils";

export interface MovoneLogoProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
  /**
   * "icon": uses /favicon.svg (the tactical chess knight circular emblem)
   * "full": uses /movone-logo.svg (the official MOVONE logotype)
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
          height: pixelSize,
          width: "auto",
        }}
      >
        <img
          src="/movone-logo.svg"
          alt="MOVONE"
          className={cn(
            "h-full w-auto object-contain transition-all duration-300",
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
      <img
        src="/favicon2.svg"
        alt="MOVONE"
        className={cn(
          "w-full h-full object-contain transition-all duration-300",
          glow && "drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]",
        )}
      />
    </div>
  );
}
