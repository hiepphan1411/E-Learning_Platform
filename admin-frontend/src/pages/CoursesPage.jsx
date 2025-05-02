import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/commons/StatCard";
import CoursesTable from "../components/courses/CoursesTable";
import LineTrendSales from "../components/courses/LineTrendSales";
import PieCategoryCourse from "../components/courses/PieCategoryCourse";


const CoursesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Tổng số khóa học"
            icon={Package}
            value={1234}
            color="#6366F1"
          />
          <StatCard
            name="Số khóa học nổi bật"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Số khóa học vi phạm"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Tổng chi phí"
            icon={DollarSign}
            value={"543.210.000đ"}
            color="#EF4444"
          />
        </motion.div>

        <CoursesTable />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8 z-10">
          <LineTrendSales />
          <PieCategoryCourse />
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
