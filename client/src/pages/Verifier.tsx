import React, { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {
	FaChartLine,
	FaUsers,
	FaMoneyBillWave,
	FaPiggyBank,
	FaCheckCircle,
	FaWallet,
} from 'react-icons/fa';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import AppliedLoansTable from '../components/AppliedLoansTable';
import LoansReleasedChart from '../components/LoansReleasedChart';
import TotalOutstandingLoansChart from '../components/TotalOutstandingLoansChart';
import RepaymentsCollectedChart from '../components/RepaymentsCollectedChart';
import { apiGet } from '../utils/https';

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);
interface LoanData {
	purpose: string;
	fullName: string;
	date: string;
	status: 'PENDING' | 'VERIFIED';
}

const Dashboard: React.FC = () => {

	const [loans, setLoans] = useState<LoanData[]>([]);

	const fetchLoans = async () => {
		try {
			const data = await apiGet('/api/loans');
			console.log('Loans fetched:', data);
			let loanData = data.map((loan: any) => ({
				id: loan.id,
				fullName: loan.fullName,
				amount: loan.loanAmount,
				date: new Date(loan.createdAt).toLocaleDateString(),
				status: loan.status,
				purpose: loan.purpose,
			}));
			setLoans(loanData);
		} catch (error) {
			console.error('Error fetching loans:', error);
		}

	}
	useEffect(() => {
		fetchLoans();
	}, []);
	return (
		<>
			<Header role={"Verifier"} />
			<div className="flex min-h-screen bg-gray-200">
				<Sidebar />
				<div className="flex-1 p-6 overflow-auto">
					{/* Title and Buttons */}
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-xl font-semibold text-gray-800">Dashboard {'>'} Loans</h1>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
						<StatsCard title="LOANS" value="50" icon={<FaChartLine />} />
						<StatsCard title="BORROWERS" value="100" icon={<FaUsers />} />
						<StatsCard title="CASH DISBURSED" value="550,000" icon={<FaMoneyBillWave />} />
						<StatsCard title="SAVINGS" value="450,000" icon={<FaPiggyBank />} />
						<StatsCard title="REPAID LOANS" value="30" icon={<FaCheckCircle />} />
						<StatsCard title="CASH RECEIVED" value="1,000,000" icon={<FaWallet />} />
					</div>

					{/* Applied Loans Table */}
					<AppliedLoansTable data={loans} />

					{/* Loans Released Chart */}
					<div className="mt-6">
						<LoansReleasedChart />
					</div>
					<div className="mt-6">
						<TotalOutstandingLoansChart />
					</div>
					<div className="mt-6">
						<RepaymentsCollectedChart />
					</div>
				</div>
			</div>
		</>
	)
};

export default Dashboard;