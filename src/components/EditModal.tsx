import { useState } from "react";
import { X, Plus, Trash2, Save } from "lucide-react";
import { TeamData, Salesperson } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TeamData;
  onSave: (data: TeamData) => void;
}

export function EditModal({ isOpen, onClose, data, onSave }: EditModalProps) {
  const [editData, setEditData] = useState<TeamData>(data);

  if (!isOpen) return null;

  const handleSalespersonChange = (id: string, field: keyof Salesperson, value: string | number) => {
    setEditData({
      ...editData,
      salespeople: editData.salespeople.map((sp) =>
        sp.id === id ? { ...sp, [field]: value } : sp
      ),
    });
  };

  const addSalesperson = () => {
    const newId = Date.now().toString();
    setEditData({
      ...editData,
      salespeople: [
        ...editData.salespeople,
        {
          id: newId,
          name: "Novo Vendedor",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newId}`,
          individualGoal: 10000,
          currentSales: 0,
        },
      ],
    });
  };

  const removeSalesperson = (id: string) => {
    setEditData({
      ...editData,
      salespeople: editData.salespeople.filter((sp) => sp.id !== id),
    });
  };

  const handleSave = () => {
    const currentTotal = editData.salespeople.reduce((sum, sp) => sum + sp.currentSales, 0);
    onSave({ ...editData, currentTotal });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto gradient-card rounded-2xl border border-border shadow-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gradient">Editar Dados</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Meta da Equipe (R$)
            </label>
            <Input
              type="number"
              value={editData.teamGoal}
              onChange={(e) => setEditData({ ...editData, teamGoal: Number(e.target.value) })}
              className="bg-secondary border-border"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Vendedores</h3>
              <Button onClick={addSalesperson} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-4">
              {editData.salespeople.map((sp) => (
                <div key={sp.id} className="p-4 bg-secondary rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                      <img src={sp.avatar} alt={sp.name} className="w-full h-full object-cover" />
                    </div>
                    <Input
                      value={sp.name}
                      onChange={(e) => handleSalespersonChange(sp.id, "name", e.target.value)}
                      className="flex-1 bg-muted border-border"
                      placeholder="Nome"
                    />
                    <button
                      onClick={() => removeSalesperson(sp.id)}
                      className="p-2 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Meta Individual (R$)</label>
                      <Input
                        type="number"
                        value={sp.individualGoal}
                        onChange={(e) => handleSalespersonChange(sp.id, "individualGoal", Number(e.target.value))}
                        className="bg-muted border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Vendas Atuais (R$)</label>
                      <Input
                        type="number"
                        value={sp.currentSales}
                        onChange={(e) => handleSalespersonChange(sp.id, "currentSales", Number(e.target.value))}
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
