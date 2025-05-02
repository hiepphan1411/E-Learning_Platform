import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import UsersTable from "../components/users/UsersTable";
import LineUserGrowth from "../components/users/LineUserGrowth";
import PieUsersAge from "../components/users/PieUsersAge";
import StatCard from "../components/commons/StatCard";

const userStats = {
  totalUsers: 152845,
  newUsersMonth: 243,
  activeUsers: 98520,
  churnRate: 200,
};

export default function UsersPage() {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      {/* STATS */}
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Tổng người dùng"
          icon={UsersIcon}
          value={userStats.totalUsers.toLocaleString()}
          color="#6366F1"
        />
        <StatCard
          name="Người dùng mới tháng này"
          icon={UserPlus}
          value={userStats.newUsersMonth}
          color="#10B981"
        />
        <StatCard
          name="Tài khoản Active"
          icon={UserCheck}
          value={userStats.activeUsers.toLocaleString()}
          color="#F59E0B"
        />
        <StatCard
          name="Tài khoản bị khóa"
          icon={UserX}
          value={userStats.churnRate}
          color="#EF4444"
        />
      </motion.div>

      <UsersTable />

      {/* USER CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <LineUserGrowth />
        <PieUsersAge />
      </div>
    </main>
  );
}
