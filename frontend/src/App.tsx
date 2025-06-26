//import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from '@/components/Layout';
import DashboardPage from "@/pages/dashboard/Dashboard";
import Students from '@/pages/students/Students';
import AddStudent from '@/pages/students/AddStudent';
import EditStudent from '@/pages/students/EditStudent';
import Representatives from '@/pages/representatives/Representatives';
import Events from "./pages/events/Events";
import EventDetails from "./pages/events/EventDetails";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/edit/:id" element={<EditStudent />} />
              <Route path="/representatives" element={<Representatives />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App