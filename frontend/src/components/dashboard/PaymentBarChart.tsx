import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyPaymentData } from "@/services/dashboardService";
import { onlyMonthInSpanish } from "@/lib/utils";

interface PaymentBarChartProps {
  data: MonthlyPaymentData[];
}

const PaymentBarChart: React.FC<PaymentBarChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    formattedMonth: onlyMonthInSpanish(item.month),
    remainingPercentage: 100 - item.percentagePaid,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Desglose de Pagos</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedMonth" />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(2)}%`, "Percentage"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar dataKey="percentagePaid" name="Paid" stackId="a" fill="#8884d8">
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.percentagePaid > 20 ? "#8884d8" : "#FF8042"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PaymentBarChart;