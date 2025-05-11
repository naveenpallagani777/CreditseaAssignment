import React from 'react';
import { FaBell, FaCommentDots } from 'react-icons/fa';

// Header Component
interface AdminHeaderProps {
    role: string;
}
const AdminHeader: React.FC<AdminHeaderProps> = ({role}) => (
  <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0">
    {/* Logo */}
    <div className="flex items-center">
      <span className="text-lg font-bold text-green-900">CREDIT APP</span>
    </div>

    {/* Right-side Icons */}
    <div className="flex items-center space-x-4">
      <button className="text-gray-600 hover:text-gray-800">
        <FaBell className="text-lg text-green-900" />
      </button>
      <button className="text-gray-600 hover:text-gray-800">
        <FaCommentDots className="text-lg text-green-900" />
      </button>
      <button className="flex items-center text-gray-600 hover:text-gray-800">
        <span className="mr-1 text-green-900 font-medium">{role}</span>
      </button>
    </div>
  </header>
);

export default AdminHeader;