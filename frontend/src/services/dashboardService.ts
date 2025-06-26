export type MonthlyPaymentData = {
    month: string;
    percentagePaid: number;
  };
  
  export const getMonthlyPaymentData = async (): Promise<MonthlyPaymentData[]> => {
    const res = await fetch("/api/v1/get-event-by-month/CUOTA CURSO");
    const jsonData = await res.json();
    return jsonData;   
  };

  export const getTotalAmountCoutaCurso = async (): Promise<number> => {
    const res = await fetch("/api/v1/get-total-amount/CUOTA CURSO");
    const jsonData = await res.json();
    return jsonData;   
  };
  
  export const getTotalPaymentPercentage = async (): Promise<number> => {
    const data = await getMonthlyPaymentData();
    const totalMonths = data.length;
    const sumPercentages = data.reduce((sum, item) => sum + item.percentagePaid, 0);
    return totalMonths > 0 ? sumPercentages / totalMonths : 0;
  };