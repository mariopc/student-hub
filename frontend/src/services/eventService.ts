import { Event, EventStudent, EventWithPaymentStats } from "@/lib/events";

async function getEvents(): Promise<Event[]> {
  const response = await fetch("/api/v1/events", { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return await response.json();
}

async function getEventStudents(): Promise<EventStudent[]> {
  const response = await fetch(`/api/v1/events-students`, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch students-events`);
  }
  return await response.json();
}

async function getEventStudentsByEventID(eventID: number): Promise<EventStudent[]> {
  const response = await fetch(`/api/v1/events-students/${eventID}`, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch students-events`);
  }
  return await response.json();
}

// Function to get all events with payment statistics
export const getEventsWithStats = async (): Promise<EventWithPaymentStats[]> => {
  const events = await getEvents();
  const eventStudents = await getEventStudents();


  return events.map(event => {
    const studentsForEvent = eventStudents.filter(es => es.event_id === event.id);
    const totalStudents = studentsForEvent.length;
    const paidCount = studentsForEvent.filter(es => es.is_paid).length;
    const unpaidCount = totalStudents - paidCount;
    
    const paidPercentage = totalStudents > 0 ? (paidCount / totalStudents) * 100 : 0;
    const unpaidPercentage = totalStudents > 0 ? (unpaidCount / totalStudents) * 100 : 0;

    return {
      ...event,
      totalStudents,
      paidCount,
      unpaidCount,
      paidPercentage,
      unpaidPercentage
    };
  });
};

// Function to get a single event with its payment statistics
export const getEventWithStats = async (eventId: number): Promise<EventWithPaymentStats | null> => {
  const events = await getEventsWithStats();
  return events.find(event => event.id === eventId) || null;
};

// Function to get students for a specific event
export const getStudentsForEvent = async (eventId: number): Promise<EventStudent[]> => {
  const eventStudents = await getEventStudentsByEventID(eventId);  
  return eventStudents;
};