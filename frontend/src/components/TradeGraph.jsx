import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from "recharts";

// eslint-disable-next-line react/prop-types
function TradingLineChart({ tradingLog }) {
  const prepareChartData = (log) => {
    const monthlyData = {};
    let cumulativeProfit = 0; 

    log.forEach((entry) => {
      const month = entry.openTime.substring(0, 7); 

      
      monthlyData[month] = (monthlyData[month] || 0) + entry.profit;
    });

    const sortedMonths = Object.keys(monthlyData).sort(); 
    return sortedMonths.map((month) => {
      cumulativeProfit += monthlyData[month];
      return {
        month,
        equity: cumulativeProfit, 
      };
    });
  };

  const chartData = prepareChartData(tradingLog);

  return (
    <ResponsiveContainer width="90%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="equity"
          stroke="#8884d8"
          fill="#8884d8" 
          fillOpacity={0.3} 
        />
        <Line
          type="monotone"
          dataKey="equity"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default TradingLineChart;
