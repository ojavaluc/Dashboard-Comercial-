import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  variant?: "default" | "primary" | "accent";
  delay?: number;
}

export function MetricCard({ title, value, subtitle, icon, variant = "default", delay = 0 }: MetricCardProps) {
  const variantStyles = {
    default: "gradient-card border-border",
    primary: "gradient-card border-primary/30 shadow-glow",
    accent: "gradient-card border-accent/30 shadow-gold",
  };

  return (
    <div
      className={`rounded-xl border p-6 shadow-card ${variantStyles[variant]} animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-lg ${variant === "accent" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}>
          {icon}
        </div>
      </div>
      <div className="animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
        <p className={`text-4xl font-bold ${variant === "accent" ? "text-gradient-gold" : "text-gradient"}`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
