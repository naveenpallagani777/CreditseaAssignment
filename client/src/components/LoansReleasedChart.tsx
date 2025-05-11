import { Line } from 'react-chartjs-2';

const LoansReleasedChart: React.FC = () => {
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Loans Released',
        data: [500, 200, 600, 300, 400, 200, 300, 400, 600, 500, 700, 900],
        fill: true,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <div className="h-1 bg-green-500 rounded-t-lg"></div>
      <h2 className="text-lg font-semibold mb-4 mt-4">Loans Released Monthly</h2>
      <Line data={data} />
    </div>
  );
};

export default LoansReleasedChart;