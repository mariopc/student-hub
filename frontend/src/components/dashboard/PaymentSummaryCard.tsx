import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface PaymentSummaryCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  title,
  value,
  description,
  icon = <CircleDollarSign className="h-4 w-4" />,
  trend = "neutral",
  trendValue,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trendValue && (
          <div className="mt-2 flex items-center text-xs">
            {trend === "up" ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : trend === "down" ? (
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
            ) : null}
            <span
              className={
                trend === "up"
                  ? "text-green-500"
                  : trend === "down"
                  ? "text-red-500"
                  : ""
              }
            >
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSummaryCard;