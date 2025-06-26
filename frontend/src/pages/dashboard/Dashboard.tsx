import { useQuery } from "@tanstack/react-query";
import { getMonthlyPaymentData, getTotalPaymentPercentage, getTotalAmountCoutaCurso } from "@/services/dashboardService";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AreaChart, BarChart3 } from "lucide-react";
import MonthlyPaymentChart from "@/components/dashboard/MonthlyPaymentChart";
import PaymentSummaryCard from "@/components/dashboard/PaymentSummaryCard";
import PaymentBarChart from "@/components/dashboard/PaymentBarChart";

const Dashboard = () => {
  const { data: monthlyData, isLoading: isMonthlyDataLoading, error: monthlyDataError } = useQuery({
    queryKey: ["monthlyPaymentData"],
    queryFn: getMonthlyPaymentData
  });

  const { data: totalPercentage, isLoading: isTotalLoading } = useQuery({
    queryKey: ["totalPaymentPercentage"],
    queryFn: getTotalPaymentPercentage
  });

  const { data: totalAmountCoutaCurso, isLoading: isTotalAmountLoading } = useQuery({
    queryKey: ["totalAmountCoutaCurso"],
    queryFn: getTotalAmountCoutaCurso
  });

  const amountInSpanish = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Calculate metrics
  const currentMonthPercentage = monthlyData?.[1]?.percentagePaid || 0;
  const previousMonthPercentage = monthlyData?.[0]?.percentagePaid || 0;
  const percentageChange = currentMonthPercentage - previousMonthPercentage;
  const trend = percentageChange > 0 ? "up" : percentageChange < 0 ? "down" : "neutral";

  const currentMonthSpanish = () => {    
    const formatted = new Date().toLocaleString('es-ES', {
      month: 'long',
      year: 'numeric'
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  if (isMonthlyDataLoading || isTotalLoading || isTotalAmountLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Estado de Pagos (Cuotas curso)</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[350px] w-full lg:col-span-3" />
          <Skeleton className="h-[350px] w-full lg:col-span-2" />
          <Skeleton className="h-[350px] w-full" />
        </div>
      </div>
    );
  }

  if (monthlyDataError) {
    return (
      <div className="container py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load dashboard data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Estado de Pagos (Cuotas curso)</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <PaymentSummaryCard
          title="Promedio de Pago"
          value={`${totalPercentage?.toFixed(2)}%`}
          description="Porcentaje total de pagos completados"
          icon={<AreaChart className="h-4 w-4" />}
        />

        <PaymentSummaryCard
          title="Total Recaudado"
          value={`$${amountInSpanish(totalAmountCoutaCurso ?? 0)}`}
          description={`Monto recaudado hasta ${currentMonthSpanish()}`}
          icon={<BarChart3 className="h-4 w-4" />}
        />

        <PaymentSummaryCard
          title="Mes Actual"
          value={`${currentMonthPercentage.toFixed(2)}%`}
          description={`Tasa de pago en ${currentMonthSpanish()}`}
          icon={<BarChart3 className="h-4 w-4" />}
          trend={trend}
          trendValue={`${Math.abs(percentageChange).toFixed(2)}% vs el mes anterior`}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-6">
        {monthlyData && <MonthlyPaymentChart data={monthlyData} />}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {monthlyData && <PaymentBarChart data={monthlyData} />}
      </div>
    </div>
  );
};

export default Dashboard;