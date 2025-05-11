import {
  FaUserCircle,
  FaUsers,
  FaPiggyBank,
  FaWallet,
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaShieldAlt,
  FaLock,
  FaCreditCard,
  FaCalculator,
  FaFileInvoiceDollar,
  FaUserShield,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import Cookies from 'js-cookie';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Borrowers', icon: <FaUsers /> },
    { name: 'Loans', icon: <FaMoneyCheckAlt /> },
    { name: 'Repayments', icon: <FaCreditCard /> },
    { name: 'Loan Parameters', icon: <FaCalculator /> },
    { name: 'Accounting', icon: <FaFileInvoiceDollar /> },
    { name: 'Reports', icon: <FaFileAlt /> },
    { name: 'Collateral', icon: <FaShieldAlt /> },
    { name: 'Access Configuration', icon: <FaLock /> },
    { name: 'Savings', icon: <FaPiggyBank /> },
    { name: 'Expenses', icon: <FaWallet /> },
    { name: 'E-Insurance', icon: <FaUserShield /> },
    { name: 'Investor Accounts', icon: <FaUsers /> },
    { name: 'Calendar', icon: <FaCalendarAlt /> },
    { name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="w-64 hidden min-h-screen bg-green-800 text-white md:flex flex-col">
      <div className="p-4 flex items-center bg-green-900">
        <FaUserCircle className="w-10 h-10 text-gray-300" />
        <p className="ml-3 text-lg">John Okoh</p>
      </div>
      <nav className="flex-1 static ">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center p-4 hover:bg-green-700 transition-colors duration-200"
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </a>
        ))}
        <div onClick={() => {
          Cookies.remove('token');
          window.location.href = '/login';
        }}
          className="flex items-center p-4 hover:bg-green-700 transition-colors duration-200"
        >
          <FaSignOutAlt />
          Sign Out
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;