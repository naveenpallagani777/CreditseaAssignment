import React, { useEffect, useState } from 'react';
import LoanForm from '../components/LoanForm'; // adjust path if needed
import { apiGet } from '../utils/https';
import {
    FaMoneyBillWave,
    FaSearch,
} from 'react-icons/fa';
import UserHeader from '../components/UserHeader';
import { apiPost } from '../utils/https';
import { statusColor } from '../assets/colors';
interface loanData {
    id: number;
    officerName: string;
    amount: string;
    date: string;
    status: 'pending' | 'verified' | 'rejected' | 'approved';
}
export interface LoanFormData {
    fullName: string;
    amount: string;
    tenure: number;
    employmentStatus: string;
    reason: string;
    address: string;
    acceptedTerms: boolean;
}
const UserPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('Borrow');
    const [loans, setLoans] = useState<loanData[]>([]);

    const handleLoanSubmit = async (data: LoanFormData) => {
        console.log('Loan Form Data Submitted:', data);
        await apiPost('/api/loans', {
            fullName: data.fullName,
            loanAmount: data.amount,
            loanTenure: data.tenure,
            employmentStatus: data.employmentStatus,
            purpose: data.reason,
        });
        setShowForm(false); // close modal
        fetchLoans();
    };

    // Fetch loans from API
    const fetchLoans = async () => {
        try {
            const response = await apiGet('/user/loans');
            console.log('Loans fetched:', response);
            // setLoans(response.data); // Uncomment this line to set the fetched loans
            let loanData = response.loans.map((loan: any) => ({
                id: loan.id,
                officerName: loan.fullName,
                amount: loan.loanAmount,
                date: new Date(loan.createdAt).toLocaleDateString(),
                status: loan.status,
                avatarUrl: '/user.png', // Placeholder, replace with actual URL if available
            }));
            setLoans(loanData);
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    }

    useEffect(() => {
        fetchLoans();
    },[]);


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <UserHeader />
            {/* Main Section */}
            <div className="px-[10%] pt-6">
                {/* Dashboard */}
                <div className="mb-4 md:px-[15%]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center bg-green-50 p-4 rounded-lg shadow-sm">
                            <FaMoneyBillWave className="text-green-600 text-3xl mr-3" />
                            <div>
                                <p className="text-gray-500 text-sm uppercase">Deficit</p>
                                <p className="text-green-800 font-bold text-xl">₦ 0.0</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-green-600 ml-auto text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-all duration-200"
                        >
                            Get A Loan
                        </button>
                    </div>
                    <div className="flex rounded-lg overflow-hidden w-full mb-6 shadow-sm">
                        {['Borrow', 'Transact', 'Deposit'].map((tab) => (
                            <button
                                key={tab}
                                className={`w-full py-4 text-sm font-medium transition-all duration-200 ${activeTab === tab ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab} Cash
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for loan"
                            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Loan Table with Horizontal Scroll */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Applied Loans</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left p-3 font-medium text-gray-600">Loan Officer</th>
                                    <th className="text-left p-3 font-medium text-gray-600">Amount</th>
                                    <th className="text-left p-3 font-medium text-gray-600">Date Applied</th>
                                    <th className="text-left p-3 font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-3 flex items-center gap-2">
                                            <span className='bg-green-200 text-green-600 text-base font-bold w-8 h-8 flex items-center justify-center rounded-full' >{loan.officerName[0].toUpperCase()}</span>
                                            <span className="text-gray-800">{loan.officerName}</span>
                                        </td>
                                        <td className="p-3 text-gray-800">$ {loan.amount}</td>
                                        <td className="p-3 text-gray-800">{loan.date}</td>
                                        <td className="p-3">
                                            <span
                                                className={` px-2 py-1 rounded text-xs font-medium ${statusColor[loan.status]}`}
                                            >
                                                {loan.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Loan Form Modal */}
                {showForm && (
                    <LoanForm onClose={() => setShowForm(false)} onSubmit={handleLoanSubmit} />
                )}
            </div>
        </div>
    );
};

export default UserPage;
