// Applied Loans Table Component

interface LoanData {
  purpose: string;
  fullName: string;
  date: string;
  status: 'PENDING' | 'VERIFIED';
}
interface AppliedLoansTableProps {
    data: LoanData[];
}
const AppliedLoansTable: React.FC<AppliedLoansTableProps> = ({ data }) => {
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
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      row.status === 'VERIFIED'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {row.status}
                  </span>
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