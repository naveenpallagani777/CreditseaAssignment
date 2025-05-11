// Applied Loans Table Component
import { statusColor } from '../assets/colors';
import { apiPut } from '../utils/https';
interface LoanData {
	id: string;
	purpose: string;
	fullName: string;
	date: string;
	status: 'pending' | 'verified' | 'rejected' | 'approved';
	userId: string;
}
interface AppliedLoansTableProps {
	data: LoanData[];
	fetchLoans: () => void;
}
const AppliedLoansTable: React.FC<AppliedLoansTableProps> = ({ data, fetchLoans }) => {

	const statusChangeHandler = async (e: React.ChangeEvent<HTMLSelectElement>, id: string, userId: string) => {
		console.log('Status changed to:', e.target.value);
		console.log('loan id:', id);
		await apiPut(`/api/loans/${userId}/${id}`, {
			status: e.target.value,
		});
		fetchLoans();
	}

	return (
		<div className="bg-white p-4 rounded-lg shadow mt-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold">Applied Loans</h2>
				<div className="flex items-center space-x-2">
					<button className="text-gray-500 hover:text-gray-700">Sort</button>
					<button className="text-gray-500 hover:text-gray-700">Filter</button>
				</div>
			</div>

			{/* Scrollable Table Wrapper */}
			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead>
						<tr className="text-left text-gray-500 text-sm uppercase">
							<th className="py-2">User Recent Activity</th>
							<th>Customer name</th>
							<th>Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((row, index) => (
							<tr key={index} className="border-t">
								<td className="py-3 flex items-center gap-2 whitespace-nowrap">
									<span className='bg-green-200 text-green-600 text-base font-bold w-8 h-8 flex items-center justify-center rounded-full'>
										{row.fullName[0].toUpperCase()}
									</span>
									<span>{row.purpose}</span>
								</td>
								<td className="whitespace-nowrap">{row.fullName}</td>
								<td className="whitespace-nowrap">{row.date}</td>
								<td className="whitespace-nowrap">
									<div className={`py-2 px-4 inline rounded-lg  text-sm font-semibold ${statusColor[row.status]}`}>
										<select
											onChange={(e) => { statusChangeHandler(e, row.id, row.userId); }}
											value={row.status}
										>
											<option value="pending" className={statusColor?.pending}>Pending</option>
											<option value="verified" className={statusColor?.verified}>Verified</option>
											{localStorage.getItem('role') === 'admin' && (
												<option value="approved" className={statusColor?.approved}>Approved</option>
											)}
											<option value="rejected" className={statusColor?.rejected}>Rejected</option>
										</select>

									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-4 text-right text-gray-500 text-sm">
				Rows per page: 7 • 1-7 of 1,450
			</div>
		</div>
	);
};


export default AppliedLoansTable;