interface PaymentProgressBarProps {
  paidPercentage: number;
  unpaidPercentage: number;
  totalStudents: number;
  paidCount: number;
  unpaidCount: number;
  showDetails?: boolean;
}

const PaymentProgressBar = ({
  paidPercentage,
  unpaidPercentage,
  totalStudents,
  paidCount,
  unpaidCount,
  showDetails = true,
}: PaymentProgressBarProps) => {
  if (totalStudents === 0) {
    return <div className="text-sm text-muted-foreground">No hay Estudiantes asignados</div>;
  }

  return (
    <div className="w-full space-y-2">
      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden flex">
        <div
          className="bg-paid h-full transition-all duration-500 ease-in-out"
          style={{ width: `${paidPercentage}%` }}
        />
        <div
          className="bg-unpaid h-full transition-all duration-500 ease-in-out"
          style={{ width: `${unpaidPercentage}%` }}
        />
      </div>
      
      {showDetails && (
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-paid"></div>
            <span className="text-muted-foreground">
              Pagado: {paidCount} ({Math.round(paidPercentage)}%)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-unpaid"></div>
            <span className="text-muted-foreground">
              No pagado: {unpaidCount} ({Math.round(unpaidPercentage)}%)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProgressBar;