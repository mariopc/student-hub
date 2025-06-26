import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ChevronLeft, DollarSign, Users, Search, Copy } from "lucide-react";

import { getEventWithStats, getStudentsForEvent } from "@/services/eventService";
import PaymentProgressBar from "@/components/PaymentProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import AssignStudentsForm from "@/components/AssignStudentsForm";
import { MarkAsPaidDialog } from "@/components/MarkAsPaidDialog";
import { dateInSpanish } from "@/lib/utils";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [isAssignStudentsOpen, setIsAssignStudentsOpen] = useState(false);
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState<string | ''>('');
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: event,
    isLoading: isEventLoading,
    error: eventError,
    refetch: refetchEvent
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventWithStats(parseInt(eventId || "0")),
    enabled: !!eventId,
  });

  const {
    data: students,
    isLoading: isStudentsLoading,
    refetch: refetchStudents
  } = useQuery({
    queryKey: ["eventStudents", eventId],
    queryFn: () => getStudentsForEvent(parseInt(eventId || "0")),
    enabled: !!eventId,
  });

  const handleAssignStudentsSuccess = () => {
    refetchEvent();
    refetchStudents();
  };

  const amountInSpanish = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const filteredStudents = students?.filter(student => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return student.student_name.toLowerCase().includes(query);
  });

  const totalPossibleAmount = event ? event.amount * event.totalStudents : 0;
  const totalCollectedAmount = students ? students.reduce((total, student) => total + (student.is_paid ? (student.payment_amount || 0) : 0), 0) : 0;

  const copyPaidStudents = (isPaid: boolean) => {
    const icon = isPaid ? '✅' : '⚠️';
    const mensaje = students?.filter(student => student.is_paid === isPaid)
      .map(student => `${icon} ${student.student_name}`)
      .join("\n") || "";
    navigator.clipboard.writeText(mensaje)
      .then(() => {
        toast("Texto copiado");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  }

  if (isEventLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/events">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver a Eventos
            </Link>
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="container py-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/events">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a Eventos
          </Link>
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se pudieron cargar los detalles del evento. Es posible que el evento no exista o que haya ocurrido un problema con el servidor.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleMarkAsPaid = (studentId: number, student_name: string) => {
    setSelectedStudentId(studentId);
    setSelectedStudentName(student_name);
    setIsMarkAsPaidOpen(true);
  };

  const handlePaymentSuccess = () => {
    refetchEvent();
    refetchStudents();
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/events">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver a Eventos
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{event.name}</h1>
          <Badge className="ml-4" variant="outline">{event.type}</Badge>
        </div>
        <Button onClick={() => setIsAssignStudentsOpen(true)}>
          <Users className="mr-2 h-4 w-4" />
          Asignar Estudiantes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fecha de vencimiento</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dateInSpanish(event.due_date)}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(event.due_date) < new Date()
                ? "Este evento ya ha vencido"
                : `Vencimiento en: ${Math.ceil((new Date(event.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monto</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${amountInSpanish(event.amount)}</div>
            <p className="text-xs text-muted-foreground">
              Por estudiante
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total a reunir:</span>
                <span className="font-medium">${amountInSpanish(totalPossibleAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recaudado:</span>
                <span className="font-medium">${amountInSpanish(totalCollectedAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Faltante:</span>
                <span className="font-medium">${amountInSpanish(totalPossibleAmount - totalCollectedAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{event.totalStudents}</div>
            <div className="mt-2">
              <PaymentProgressBar
                paidPercentage={event.paidPercentage}
                unpaidPercentage={event.unpaidPercentage}
                totalStudents={event.totalStudents}
                paidCount={event.paidCount}
                unpaidCount={event.unpaidCount}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-start items-center mb-4 space-x-2">
        <h2 className="text-xl font-bold mr-4">Pagos</h2>
        <Button variant="success" onClick={() => copyPaidStudents(true)}><Copy />Pagados</Button>
        <Button variant="destructive" onClick={() => copyPaidStudents(false)}><Copy />No pagados</Button>
        {students && students.length > 0 && (
          <div className="relative w-full max-w-sm ml-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar nombre..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {isStudentsLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : students && students.length > 0 ? (
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
            <div>Nombre</div>
            <div>Estado de pago</div>
            <div>Monto</div>
            <div>Fecha de pago</div>
            <div>Acciones</div>
          </div>
          <div className="divide-y">
            {filteredStudents && filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div key={student.id} className="grid grid-cols-5 gap-4 p-4">
                  <div>{student.student_name}</div>
                  <div>
                    <Popover>
                      <PopoverTrigger>
                        <Badge variant={student.is_paid ? "success" : "destructive"}>
                          {student.is_paid ? "Pagado" : "No pagado"}
                        </Badge>
                      </PopoverTrigger>
                      <PopoverContent>
                        {JSON.parse(student.payment_receipts).length > 0 ? (
                          <Carousel>
                            <CarouselContent>                              
                                {JSON.parse(student.payment_receipts).map((receipt: string, index: number) => (
                                  <CarouselItem><img
                                    key={index}
                                    src={"/receipts/" + receipt}
                                    alt={receipt}
                                    width={1000}
                                  />
                                  </CarouselItem>
                                ))}                              
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        ) : (
                          "No hay recibos"
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>{student.payment_amount ? `$ ${amountInSpanish(student.payment_amount)}` : "—"}</div>
                  <div>{student.payment_date ? dateInSpanish(student.payment_date, "short") : "—"}</div>
                  <div>
                    {!student.is_paid && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsPaid(student.student_id, student.student_name)}
                      >
                        Marcar pago
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No hay estudiantes que coincidan con la búsqueda.
              </div>
            )}
          </div>
        </div>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No hay estudiante asignados</AlertTitle>
          <AlertDescription>
            Actualmente no hay estudiantes asignados a este evento.
          </AlertDescription>
        </Alert>
      )}

      <AssignStudentsForm
        eventId={parseInt(eventId || "0")}
        eventName={event.name}
        open={isAssignStudentsOpen}
        onOpenChange={setIsAssignStudentsOpen}
        onSuccess={handleAssignStudentsSuccess}
        studentsAsigned={students ? students.map(student => student.student_id) : []}
      />

      {selectedStudentId && (
        <MarkAsPaidDialog
          open={isMarkAsPaidOpen}
          onOpenChange={setIsMarkAsPaidOpen}
          studentId={selectedStudentId}
          studentName={selectedStudentName}
          eventAmount={event?.amount || 0}
          eventID={event?.id || 0}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default EventDetails;