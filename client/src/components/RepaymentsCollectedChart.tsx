import { Bar } from 'react-chartjs-2';

const RepaymentsCollectedChart: React.FC = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Number of Repayments Collected',
        data: [3, 7, 5, 4, 6, 3, 5, 7, 4, 6, 3, 5],
        backgroundColor: 'rgba(239, 68, 68, 1)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-1 bg-red-500 rounded-t-lg"></div>
      <h2 className="text-lg font-semibold mb-4 mt-4">Number of Repayments Collected - Monthly</h2>
      <Bar data={data} />
    </div>
  );
};

export default RepaymentsCollectedChart;