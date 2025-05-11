import { Bar } from 'react-chartjs-2';

const TotalOutstandingLoansChart: React.FC = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Total Outstanding Loans',
        data: [300, 500, 700, 400, 600, 300, 500, 700, 400, 600, 300, 500],
        backgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-1 bg-blue-500 rounded-t-lg"></div>
      <h2 className="text-lg font-semibold mb-4 mt-4">Total Outstanding Open Loans - Monthly</h2>
      <Bar data={data} />
    </div>
  );
};

export default TotalOutstandingLoansChart;