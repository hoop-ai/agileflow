import React, { useState, useEffect } from "react";
import { CalendarEvent } from "@/api/entities/CalendarEvent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Users,
  MapPin,
  Clock
} from "lucide-react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  isToday 
} from 'date-fns';
import { motion } from "framer-motion";

import CreateEventModal from "../components/calendar/CreateEventModal";

const eventTypeColors = {
  meeting: '#0073EA',
  milestone: '#00C875',
  deadline: '#E2445C',
  review: '#A25DDC',
  retrospective: '#FFCB00',
  planning: '#579BFC',
  holiday: '#FF6900',
  other: '#787D80',
};

export default function CalendarPage() {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const eventsData = await CalendarEvent.list('-start_date');
      setEvents(eventsData);
    } catch (error) {
      console.error("Error loading events:", error);
      toast({
        title: "Error",
        description: "Failed to load calendar events. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleCreateEvent = async (eventData) => {
    try {
      await CalendarEvent.create(eventData);
      await loadEvents();
      setShowCreateModal(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Creation failed",
        description: "Could not create the event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await CalendarEvent.delete(eventId);
      await loadEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete the event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-2xl font-bold text-[#323338] dark:text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentMonth(new Date())}
            className="rounded-lg"
          >
            Today
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-lg"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            onClick={() => {
              setSelectedDate(new Date());
              setShowCreateModal(true);
            }}
            className="bg-[#0073EA] hover:bg-[#0056B3] text-white rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
      <div className="grid grid-cols-7 text-center text-sm font-medium text-[#676879] dark:text-gray-400 mb-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const dayEvents = events.filter(event => 
            isSameDay(new Date(event.start_date), day)
          );

          return (
            <motion.div
              key={day.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              className={`min-h-[120px] p-3 rounded-xl border-2 transition-all cursor-pointer
                ${!isSameMonth(day, currentMonth) ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-[#E1E5F3] dark:border-gray-700'}
                ${isToday(day) ? 'ring-2 ring-[#0073EA] border-[#0073EA]' : ''}
                hover:shadow-lg
              `}
              onClick={() => {
                setSelectedDate(day);
                setShowCreateModal(true);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-semibold ${
                  isToday(day) ? 'text-[#0073EA]' :
                  !isSameMonth(day, currentMonth) ? 'text-gray-400 dark:text-gray-600' :
                  'text-[#323338] dark:text-gray-200'
                }`}>
                  {format(day, 'd')}
                </span>
                {dayEvents.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {dayEvents.length}
                  </Badge>
                )}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1.5 rounded-md cursor-pointer hover:shadow-md transition-all"
                    style={{ 
                      backgroundColor: event.color + '20',
                      borderLeft: `3px solid ${event.color}`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    <div className="font-medium truncate" style={{ color: event.color }}>
                      {event.title}
                    </div>
                    {!event.all_day && (
                      <div className="text-gray-600 dark:text-gray-400 text-[10px]">
                        {format(new Date(event.start_date), 'h:mm a')}
                      </div>
                    )}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 bg-[#F5F6F8] dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#323338] dark:text-white flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-[#0073EA]" />
            Team Calendar
          </h1>
          <p className="text-[#676879] dark:text-gray-400 mt-2">Manage meetings, milestones, and important dates</p>
        </div>

        {/* Event Type Legend */}
        <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              {Object.entries(eventTypeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm capitalize dark:text-gray-300">{type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </CardContent>
        </Card>

        {/* Upcoming Events Sidebar */}
        <Card className="mt-6 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-[#323338] dark:text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events
                .filter(e => new Date(e.start_date) >= new Date())
                .slice(0, 5)
                .map(event => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border border-[#E1E5F3] dark:border-gray-700 hover:shadow-md transition-all cursor-pointer dark:bg-gray-800"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-1 h-full rounded"
                        style={{ backgroundColor: event.color }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-[#323338] dark:text-white">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {format(new Date(event.start_date), 'MMM d, yyyy')}
                          </span>
                          {!event.all_day && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(new Date(event.start_date), 'h:mm a')}
                            </span>
                          )}
                          {event.attendees?.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.attendees.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedDate(null);
          }}
          onSubmit={handleCreateEvent}
          preselectedDate={selectedDate}
        />

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: selectedEvent.color }}
                      />
                      <h2 className="text-2xl font-bold text-[#323338] dark:text-white">{selectedEvent.title}</h2>
                    </div>
                    <Badge className="mt-2" style={{ backgroundColor: selectedEvent.color + '20', color: selectedEvent.color }}>
                      {selectedEvent.event_type}
                    </Badge>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)} 
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#323338] dark:text-white">
                      {format(new Date(selectedEvent.start_date), 'EEEE, MMMM d, yyyy')}
                    </p>
                    {!selectedEvent.all_day && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {format(new Date(selectedEvent.start_date), 'h:mm a')} - {format(new Date(selectedEvent.end_date), 'h:mm a')}
                      </p>
                    )}
                  </div>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#323338] dark:text-white mb-1">Location</p>
                      <a 
                        href={selectedEvent.location.startsWith('http') ? selectedEvent.location : `https://${selectedEvent.location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0073EA] hover:underline break-all"
                      >
                        {selectedEvent.location}
                      </a>
                    </div>
                  </div>
                )}

                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="flex items-start gap-3 text-sm">
                    <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-[#323338] dark:text-white mb-2">
                        Attendees ({selectedEvent.attendees.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.attendees.map((email, index) => (
                          <Badge key={index} variant="secondary">
                            {email}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedEvent.description && (
                  <div className="space-y-2">
                    <p className="font-medium text-[#323338] dark:text-white">Description / Agenda</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      {selectedEvent.description}
                    </p>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t dark:border-gray-700">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (window.confirm('Delete this event?')) {
                        handleDeleteEvent(selectedEvent.id);
                      }
                    }}
                  >
                    Delete Event
                  </Button>
                  <Button onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}