import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month: string;
}
const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const whereMonth = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...whereMonth, type: "INVESTMENT" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...whereMonth, type: "DEPOSIT" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...whereMonth, type: "EXPENSE" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investimento"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
