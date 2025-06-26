import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { EventWithPaymentStats } from "@/lib/events";
import PaymentProgressBar from "@/components/PaymentProgressBar";
import { useNavigate } from "react-router-dom";
import { dateInSpanish } from "@/lib/utils";

interface EventCardProps {
  event: EventWithPaymentStats;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="text-xl">{event.name}</CardTitle>
          <CardDescription className="mt-1">Tipo: {event.type}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4" />
          <span>Vencimiento: {dateInSpanish(event.due_date)}</span>
        </div>
        
        <PaymentProgressBar
          paidPercentage={event.paidPercentage}
          unpaidPercentage={event.unpaidPercentage}
          totalStudents={event.totalStudents}
          paidCount={event.paidCount}
          unpaidCount={event.unpaidCount}
        />
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;