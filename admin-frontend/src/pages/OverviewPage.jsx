import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/commons/StatCard";
import PieUserStatistic from "../components/overview/PieUserStatistic";
import ColUserNewStatistic from "../components/overview/ColUserNewStatistic";
import LineVisitStatistic from "../components/overview/LineVisitStatistic";

const OverviewPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Tổng người dùng' icon={Zap} value='12,345' color='#6366F1' />
					<StatCard name='Đăng ký mới hôm nay' icon={Users} value='1,234' color='#8B5CF6' />
					<StatCard name='Đang online' icon={ShoppingBag} value='567' color='#EC4899' />
					<StatCard name='Tỷ lệ hoàn thành khóa học' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>
				{/* CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<LineVisitStatistic />
					<PieUserStatistic />
					<ColUserNewStatistic />
				</div>
			</main>
        </div>
    )
}
export default OverviewPage;