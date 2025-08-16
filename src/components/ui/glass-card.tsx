import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "liquid" | "ultra" | "float";
  hover?: boolean;
  morph?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = false, morph = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border transition-all duration-300",
          {
            "bg-card text-card-foreground shadow-card": variant === "default",
            "glass-card text-card-foreground": variant === "glass",
            "liquid-bg glass-card text-card-foreground animate-pulse-glow": variant === "liquid",
            "glass-ultra text-card-foreground": variant === "ultra",
            "glass-card text-card-foreground float-animation": variant === "float",
          },
          {
            "glass-hover": hover,
            "morph-animation": morph,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };