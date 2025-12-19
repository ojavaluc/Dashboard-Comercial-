import { useState } from "react";
import { Target, TrendingUp, Users, Trophy, Settings } from "lucide-react";
import { TeamData } from "@/types/dashboard";
import { MetricCard } from "@/components/MetricCard";
import { ProgressBar } from "@/components/ProgressBar";
import { RankingCard } from "@/components/RankingCard";
import { EditModal } from "@/components/EditModal";
import { Button } from "@/components/ui/button";

const initialData: TeamData = {
  teamGoal: 150000,
  currentTotal: 0,
  salespeople: [
    {
      id: "1",
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
      individualGoal: 30000,
      currentSales: 28500,
    },
    {
      id: "2",
      name: "Ana Rodrigues",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
      individualGoal: 30000,
      currentSales: 32100,
    },
    {
      id: "3",
      name: "Pedro Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro",
      individualGoal: 25000,
      currentSales: 21000,
    },
    {
      id: "4",
      name: "Maria Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      individualGoal: 25000,
      currentSales: 19500,
    },
    {
      id: "5",
      name: "João Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
      individualGoal: 20000,
      currentSales: 15800,
    },
    {
      id: "6",
      name: "Fernanda Lima",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fernanda",
      individualGoal: 20000,
      currentSales: 12400,
    },
  ],
};

// Calculate initial total
initialData.currentTotal = initialData.salespeople.reduce((sum, sp) => sum + sp.currentSales, 0);

const Index = () => {
  const [data, setData] = useState<TeamData>(initialData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const teamProgress = (data.currentTotal / data.teamGoal) * 100;
  const remaining = Math.max(0, data.teamGoal - data.currentTotal);

  const rankedSalespeople = [...data.salespeople].sort(
    (a, b) => (b.currentSales / b.individualGoal) - (a.currentSales / a.individualGoal)
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Dashboard <span className="text-gradient">Comercial</span>
            </h1>
            <p className="text-muted-foreground mt-1">Acompanhe o desempenho da equipe em tempo real</p>
          </div>
          <Button onClick={() => setIsEditModalOpen(true)} variant="outline" size="lg">
            <Settings className="w-5 h-5 mr-2" />
            Editar Dados
          </Button>
        </header>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Meta da Equipe"
            value={`R$ ${data.teamGoal.toLocaleString('pt-BR')}`}
            icon={<Target className="w-5 h-5" />}
            delay={0}
          />
          <MetricCard
            title="Vendas Atuais"
            value={`R$ ${data.currentTotal.toLocaleString('pt-BR')}`}
            icon={<TrendingUp className="w-5 h-5" />}
            variant="primary"
            delay={100}
          />
          <MetricCard
            title="Falta para Meta"
            value={`R$ ${remaining.toLocaleString('pt-BR')}`}
            subtitle={remaining === 0 ? "Meta batida!" : undefined}
            icon={<Trophy className="w-5 h-5" />}
            variant={remaining === 0 ? "accent" : "default"}
            delay={200}
          />
          <MetricCard
            title="Vendedores"
            value={data.salespeople.length.toString()}
            subtitle="ativos na equipe"
            icon={<Users className="w-5 h-5" />}
            delay={300}
          />
        </div>

        {/* Team Progress */}
        <div className="gradient-card rounded-2xl border border-border p-6 shadow-card mb-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Progresso Geral da Equipe</h2>
            <span className={`text-3xl font-bold ${teamProgress >= 100 ? "text-gradient-gold" : "text-gradient"}`}>
              {teamProgress.toFixed(1)}%
            </span>
          </div>
          <ProgressBar progress={teamProgress} showLabel={false} size="lg" />
          <div className="flex justify-between mt-3 text-sm text-muted-foreground">
            <span>R$ 0</span>
            <span>R$ {data.teamGoal.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        {/* Ranking */}
        <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-gold" />
            <h2 className="text-2xl font-bold">Ranking de Vendedores</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rankedSalespeople.map((salesperson, index) => (
              <RankingCard
                key={salesperson.id}
                salesperson={salesperson}
                rank={index + 1}
                delay={600 + index * 100}
              />
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={data}
          onSave={setData}
        />
      </div>
    </div>
  );
};

export default Index;
