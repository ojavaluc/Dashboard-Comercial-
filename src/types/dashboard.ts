export interface Salesperson {
  id: string;
  name: string;
  avatar: string;
  individualGoal: number;
  currentSales: number;
}

export interface TeamData {
  teamGoal: number;
  currentTotal: number;
  salespeople: Salesperson[];
}
