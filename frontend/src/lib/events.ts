export interface Event {
    id: number;
    name: string;
    type: string;
    amount: number;
    due_date: string;
  }
  
  export interface EventStudent {
    id: number;
    student_id: number;
    student_name: string;
    event_id: number;
    is_paid: boolean;
    payment_amount: number | null;
    payment_date: string | null;
    payment_receipts: any | null;
  }
  
  export interface EventWithPaymentStats extends Event {
    totalStudents: number;
    paidCount: number;
    unpaidCount: number;
    paidPercentage: number;
    unpaidPercentage: number;
  }
  