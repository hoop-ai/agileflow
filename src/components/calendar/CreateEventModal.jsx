import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users, X, Video } from "lucide-react";
import { format } from "date-fns";

const eventTypes = [
  { value: 'meeting', label: 'Team Meeting', color: '#0073EA' },
  { value: 'milestone', label: 'Milestone', color: '#00C875' },
  { value: 'deadline', label: 'Deadline', color: '#E2445C' },
  { value: 'review', label: 'Sprint Review', color: '#A25DDC' },
  { value: 'retrospective', label: 'Retrospective', color: '#FFCB00' },
  { value: 'planning', label: 'Sprint Planning', color: '#579BFC' },
  { value: 'holiday', label: 'Holiday', color: '#FF6900' },
  { value: 'other', label: 'Other', color: '#787D80' },
];

export default function CreateEventModal({ isOpen, onClose, onSubmit, preselectedDate }) {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_type: 'meeting',
    start_date: preselectedDate || new Date(),
    end_date: preselectedDate || new Date(),
    all_day: false,
    location: '',
    attendees: [],
    color: '#0073EA',
    reminder_minutes: 15
  });
  const [newAttendee, setNewAttendee] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleAddAttendee = () => {
    if (newAttendee.trim() && !eventData.attendees.includes(newAttendee.trim())) {
      setEventData(prev => ({
        ...prev,
        attendees: [...prev.attendees, newAttendee.trim()]
      }));
      setNewAttendee('');
    }
  };

  const handleRemoveAttendee = (email) => {
    setEventData(prev => ({
      ...prev,
      attendees: prev.attendees.filter(e => e !== email)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combine date and time
    const startDateTime = new Date(eventData.start_date);
    const endDateTime = new Date(eventData.end_date);
    
    if (!eventData.all_day) {
      const [startHour, startMin] = startTime.split(':');
      const [endHour, endMin] = endTime.split(':');
      
      startDateTime.setHours(parseInt(startHour), parseInt(startMin));
      endDateTime.setHours(parseInt(endHour), parseInt(endMin));
    }
    
    await onSubmit({
      ...eventData,
      start_date: startDateTime.toISOString(),
      end_date: endDateTime.toISOString()
    });
    
    // Reset form
    setEventData({
      title: '',
      description: '',
      event_type: 'meeting',
      start_date: new Date(),
      end_date: new Date(),
      all_day: false,
      location: '',
      attendees: [],
      color: '#0073EA',
      reminder_minutes: 15
    });
    setStartTime('09:00');
    setEndTime('10:00');
  };

  const selectedEventType = eventTypes.find(t => t.value === eventData.event_type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#323338] flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#0073EA]" />
            Create Calendar Event
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Event Type */}
          <div className="space-y-2">
            <Label className="text-[#323338] font-medium">Event Type *</Label>
            <Select
              value={eventData.event_type}
              onValueChange={(value) => {
                const type = eventTypes.find(t => t.value === value);
                setEventData(prev => ({ 
                  ...prev, 
                  event_type: value,
                  color: type?.color || '#0073EA'
                }));
              }}
            >
              <SelectTrigger className="rounded-xl border-[#E1E5F3] h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-[#323338] font-medium">Event Title *</Label>
            <Input
              value={eventData.title}
              onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Daily Standup, Sprint Planning..."
              className="rounded-xl border-[#E1E5F3] h-12"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-[#323338] font-medium">Description / Agenda</Label>
            <Textarea
              value={eventData.description}
              onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add meeting agenda or event details..."
              className="rounded-xl border-[#E1E5F3] min-h-[100px]"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#323338] font-medium">Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal h-12 rounded-xl"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(eventData.start_date), 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(eventData.start_date)}
                    onSelect={(date) => setEventData(prev => ({ ...prev, start_date: date }))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-[#323338] font-medium">End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal h-12 rounded-xl"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(eventData.end_date), 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(eventData.end_date)}
                    onSelect={(date) => setEventData(prev => ({ ...prev, end_date: date }))}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-day"
              checked={eventData.all_day}
              onCheckedChange={(checked) => setEventData(prev => ({ ...prev, all_day: checked }))}
            />
            <label
              htmlFor="all-day"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              All day event
            </label>
          </div>

          {/* Time Pickers */}
          {!eventData.all_day && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#323338] font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="rounded-xl border-[#E1E5F3] h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#323338] font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="rounded-xl border-[#E1E5F3] h-12"
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-[#323338] font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location / Meeting Link
            </Label>
            <div className="flex gap-2">
              <Input
                value={eventData.location}
                onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Meeting room or video call link..."
                className="rounded-xl border-[#E1E5F3] h-12"
              />
              <Button
                type="button"
                variant="outline"
                className="h-12 px-4"
                onClick={() => setEventData(prev => ({ 
                  ...prev, 
                  location: 'https://meet.google.com/new' 
                }))}
              >
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Attendees */}
          <div className="space-y-2">
            <Label className="text-[#323338] font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Attendees
            </Label>
            
            {/* Attendee List */}
            {eventData.attendees.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                {eventData.attendees.map((email) => (
                  <Badge key={email} variant="secondary" className="flex items-center gap-1">
                    {email}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(email)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add Attendee */}
            <div className="flex gap-2">
              <Input
                value={newAttendee}
                onChange={(e) => setNewAttendee(e.target.value)}
                placeholder="Enter email address..."
                className="rounded-xl border-[#E1E5F3] h-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAttendee();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddAttendee}
                variant="outline"
                className="h-10 px-4"
              >
                Add
              </Button>
            </div>
          </div>

          {/* Reminder */}
          <div className="space-y-2">
            <Label className="text-[#323338] font-medium">Reminder</Label>
            <Select
              value={eventData.reminder_minutes?.toString()}
              onValueChange={(value) => setEventData(prev => ({ 
                ...prev, 
                reminder_minutes: parseInt(value) 
              }))}
            >
              <SelectTrigger className="rounded-xl border-[#E1E5F3] h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No reminder</SelectItem>
                <SelectItem value="5">5 minutes before</SelectItem>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="1440">1 day before</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-12 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!eventData.title}
              className="rounded-xl h-12 px-6"
              style={{ 
                backgroundColor: selectedEventType?.color || '#0073EA',
                color: 'white'
              }}
            >
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}