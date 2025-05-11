// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className="text-green-600 mr-4 text-2xl">{icon}</div>
    <div>
      <h3 className="text-gray-500 text-sm uppercase">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default StatsCard;