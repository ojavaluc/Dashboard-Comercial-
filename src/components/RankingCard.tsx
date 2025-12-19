import { Trophy, Medal, Award } from "lucide-react";
import { Salesperson } from "@/types/dashboard";
import { ProgressBar } from "./ProgressBar";

interface RankingCardProps {
  salesperson: Salesperson;
  rank: number;
  delay?: number;
}

export function RankingCard({ salesperson, rank, delay = 0 }: RankingCardProps) {
  const progress = (salesperson.currentSales / salesperson.individualGoal) * 100;
  
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-silver" />;
      case 3:
        return <Award className="w-6 h-6 text-bronze" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
    }
  };

  const getRankStyle = () => {
    switch (rank) {
      case 1:
        return "border-gold/40 shadow-gold";
      case 2:
        return "border-silver/30";
      case 3:
        return "border-bronze/30";
      default:
        return "border-border";
    }
  };

  return (
    <div
      className={`gradient-card rounded-xl border p-4 shadow-card transition-transform hover:scale-[1.02] animate-slide-up ${getRankStyle()}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
          {getRankIcon()}
        </div>
        
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
          <img
            src={salesperson.avatar}
            alt={salesperson.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{salesperson.name}</h3>
          <p className="text-sm text-muted-foreground">
            R$ {salesperson.currentSales.toLocaleString('pt-BR')} / R$ {salesperson.individualGoal.toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div className="text-right">
          <p className={`text-2xl font-bold ${progress >= 100 ? "text-accent" : "text-primary"}`}>
            {progress.toFixed(0)}%
          </p>
        </div>
      </div>
      
      <div className="mt-3">
        <ProgressBar progress={progress} showLabel={false} size="sm" />
      </div>
    </div>
  );
}
