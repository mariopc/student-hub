import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyPaymentData } from "@/services/dashboardService";
import { monthInSpanish } from "@/lib/utils";

interface MonthlyPaymentChartProps {
  data: MonthlyPaymentData[];
}

const MonthlyPaymentChart: React.FC<MonthlyPaymentChartProps> = ({ data }) => {
  // Format the data for the chart
  const formattedData = data.map((item) => ({
    ...item,
    formattedMonth: monthInSpanish(item.month),//format(parse(item.month, "yyyy-MM", new Date()), "MMM yyyy"),
  }));

  console.log("Formatted Data:", formattedData);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Tasa de Pago por Mes</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedMonth" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value) => [`${Number(value).toFixed(2)}%`, "Paid"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="percentagePaid"
              name="Payment Percentage"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyPaymentChart;