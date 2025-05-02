import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
	{ name: "T1", sales: 4200 },
	{ name: "T2", sales: 3800 },
	{ name: "T3", sales: 5100 },
	{ name: "T4", sales: 4600 },
	{ name: "T5", sales: 5400 },
	{ name: "T6", sales: 7200 },
	{ name: "T7", sales: 6100 },
	{ name: "T8", sales: 5900 },
	{ name: "T9", sales: 6800 },
	{ name: "T10", sales: 6300 },
	{ name: "T11", sales: 7100 },
	{ name: "T12", sales: 7500 },
];

const LineVisitStatistic = () => {
    return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Thống kê lượt truy cập</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
}

export default LineVisitStatistic;