import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "liquid";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border transition-all duration-300",
          {
            "bg-card text-card-foreground shadow-card": variant === "default",
            "glass-card text-card-foreground": variant === "glass",
            "liquid-bg glass-card text-card-foreground animate-pulse-glow": variant === "liquid",
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