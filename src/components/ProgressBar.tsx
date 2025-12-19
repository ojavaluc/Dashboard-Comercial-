interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({ progress, showLabel = true, size = "md" }: ProgressBarProps) {
  const cappedProgress = Math.min(100, Math.max(0, progress));
  
  const sizeStyles = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-secondary rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className="h-full gradient-primary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${cappedProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      {showLabel && (
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className={`font-semibold ${cappedProgress >= 100 ? "text-accent" : "text-primary"}`}>
            {cappedProgress.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
