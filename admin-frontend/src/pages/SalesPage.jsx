import { motion } from "framer-motion";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import StatCard from "../components/commons/StatCard";
import LineSalesOverview from "../components/sales/LineSalesOverview";
import PieSaleCategory from "../components/sales/PieSaleCategory";
import ColTrendSales from "../components/sales/ColTrendSales";

const salesStats = {
  totalRevenue: "1,234,567",
  conversionRate: "2,000,000",
  salesGrowth: "12.3%",
};

export default function SalesPage() {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      {/* SALES STATS */}
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Tổng doanh thu"
          icon={DollarSign}
          value={salesStats.totalRevenue}
          color="#6366F1"
        />
        <StatCard
          name="Thuế trừ"
          icon={CreditCard}
          value={salesStats.conversionRate}
          color="#F59E0B"
        />
        <StatCard
          name="Tỷ lệ doanh thu tăng"
          icon={TrendingUp}
          value={salesStats.salesGrowth}
          color="#EF4444"
        />
      </motion.div>
      <LineSalesOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <PieSaleCategory />
        <ColTrendSales />
      </div>
    </main>
  );
}
