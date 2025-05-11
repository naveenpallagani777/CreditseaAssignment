import React from 'react';

interface LoanFormProps {
    onClose: () => void;
    onSubmit: (formData: LoanFormData) => void;
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

const LoanForm: React.FC<LoanFormProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = React.useState<LoanFormData>({
        fullName: '',
        amount: '',
        tenure: 0,
        employmentStatus: '',
        reason: '',
        address: '',
        acceptedTerms: false,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center px-6 justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-7 text-gray-600 text-3xl font-bold hover:text-red-500 transition-colors duration-200"
                >
                    ×
                </button>
                <h3 className="text-xl font-bold mb-6 text-gray-800">Apply For a Loan</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-green-700 mb-1"
                            >
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Loan Amount */}
                        <div>
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-green-700 mb-1"
                            >
                                Loan Amount
                            </label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="Enter loan amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Tenure */}
                        <div>
                            <label
                                htmlFor="tenure"
                                className="block text-sm font-medium text-green-700 mb-1"
                            >
                                Tenure (months)
                            </label>
                            <input
                                id="tenure"
                                name="tenure"
                                type="number"
                                placeholder="Enter tenure in months"
                                value={formData.tenure}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Employment Status */}
                        <div className="relative">
                            <label
                                htmlFor="employmentStatus"
                                className="block text-sm font-medium text-green-700 mb-1"
                            >
                                Employment Status
                            </label>
                            <select
                                id="employmentStatus"
                                name="employmentStatus"
                                value={formData.employmentStatus}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 appearance-none bg-white"
                                required
                            >
                                <option value="" disabled>
                                    Select Employment Status
                                </option>
                                <option value="employed">Employed</option>
                                <option value="unemployed">Unemployed</option>
                                <option value="self-employed">Self-Employed</option>
                                <option value="student">Student</option>
                                <option value="retired">Retired</option>
                            </select>
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none top-7">
                                <svg
                                    className="w-4 h-4 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label
                            htmlFor="reason"
                            className="block text-sm font-medium text-green-700 mb-1"
                        >
                            Reason for Loan
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            placeholder="Enter the reason for the loan"
                            value={formData.reason}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full h-20 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                            required
                        ></textarea>
                    </div>

                    {/* Employment Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-green-700 mb-1"
                        >
                            Employment Address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Enter employment address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* Terms Checkbox */}
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            name="acceptedTerms"
                            type="checkbox"
                            checked={formData.acceptedTerms}
                            onChange={handleChange}
                            className="text-green-600 focus:ring-green-500 rounded"
                            required
                        />
                        I accept the terms and conditions
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition-all duration-200 font-medium"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoanForm;