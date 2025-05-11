import {
    FaBell,
    FaCommentDots,
    FaUser,
    FaChevronDown,
    FaHome,
    FaCreditCard,
    FaWallet,
    FaChartPie,
    FaSignOutAlt,
} from 'react-icons/fa';
import Cookies from 'js-cookie';

const UserHeader: React.FC = () => (
    <header className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
            <span className="text-green-600 text-lg font-bold">CREDIT APP</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-4">
                <a href="#" className="flex items-center px-3 py-1 bg-green-600 text-white rounded-full">
                    <FaHome className="mr-1" /> Home
                </a>
                <a href="#" className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800">
                    <FaCreditCard className="mr-1" /> Payments
                </a>
                <a href="#" className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800">
                    <FaChartPie className="mr-1" /> Budget
                </a>
                <a href="#" className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800">
                    <FaWallet className="mr-1" /> Card
                </a>
                <div onClick={() => {
                    Cookies.remove('token');
                    window.location.href = '/login';
                }}
                    className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                    <FaSignOutAlt />
                    Sign Out
                </div>
            </nav>
        </div>

        <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800 relative">
                <FaBell className="text-lg" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">4</span>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
                <FaCommentDots className="text-lg" />
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-800">
                <FaUser className="mr-1" />
                <span className="mr-1">User</span>
                <FaChevronDown className="text-sm" />
            </button>
        </div>
    </header>
);

export default UserHeader;