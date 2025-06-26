import FeesSummaryEmail from "../../transactional/emails/cuotas";

import { useSearchParams } from 'next/navigation'

export default function Page() {

  const searchParams = useSearchParams()
 
  const parent = searchParams.get('parent')

  console.log('parent: ', parent);
  return <FeesSummaryEmail
    studentName={"Gabriel Burgos"}
    parentName={"Marcela Ramirez"}
    currentMonth={"Mayo"}
    schoolName={"Amancay 3ro Básico"}
    paidFees={[]}
      /*[{"date": "04-11-2025", "amount": 5000, "description": "Cuota curso Abril 2025"}, {"date": "04-11-2025", "amount": 5000, "description": "Cuota curso Marzo 2025"}]*/
    dueFees={[{"amount": 5000, "isLate": false, "dueDate": "06-15-2025", "description": "Cuota Junio 2025"}, {"amount": 5000, "isLate": false, "dueDate": "07-15-2025", "description": "Cuota Julio 2025"}, {"amount": 5000, "isLate": false, "dueDate": "08-15-2025", "description": "Cuota Agosto 2025"}, {"amount": 5000, "isLate": false, "dueDate": "09-15-2025", "description": "Cuota Septiembre 2025"}, {"amount": 5000, "isLate": false, "dueDate": "10-15-2025", "description": "Cuota Octubre 2025"}, {"amount": 5000, "isLate": false, "dueDate": "11-15-2025", "description": "Cuota Noviembre 2025"}, {"amount": 5000, "isLate": false, "dueDate": "12-15-2025", "description": "Cuota Diciembre 2025"}, {"amount": 5000, "isLate": true, "dueDate": "03-15-2025", "description": "Cuota Marzo 2025"}, {"amount": 5000, "isLate": true, "dueDate": "04-15-2025", "description": "Cuota Abril 2025"}, {"amount": 5000, "isLate": true, "dueDate": "05-15-2025", "description": "Cuota Mayo 2025"}]}
      /*[{"amount": 5000, "isLate": false, "dueDate": "06-15-2025", "description": "Cuota curso Junio 2025"}, {"amount": 5000, "isLate": false, "dueDate": "07-15-2025", "description": "Cuota curso Julio 2025"}, {"amount": 5000, "isLate": false, "dueDate": "08-15-2025", "description": "Cuota curso Agosto 2025"}, {"amount": 5000, "isLate": false, "dueDate": "09-15-2025", "description": "Cuota curso Septiembre 2025"}, {"amount": 5000, "isLate": false, "dueDate": "10-15-2025", "description": "Cuota curso Octubre 2025"}, {"amount": 5000, "isLate": false, "dueDate": "11-15-2025", "description": "Cuota curso Noviembre 2025"}, {"amount": 5000, "isLate": false, "dueDate": "12-15-2025", "description": "Cuota curso Diciembre 2025"}, {"amount": 5000, "isLate": true, "dueDate": "05-15-2025", "description": "Cuota curso Mayo 2025"}]*/
    contactName={"Mario Peña"}
    contactEmail={"mario.pc@protonmail.com"}
    contactPhone={"+569 5000 30 11"} />
}