import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

export default function TimelineCell({ value, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  // Parse value — could be {from, to} object or JSON string
  let parsed = null;
  if (value && typeof value === 'object' && value.from) {
    parsed = value;
  } else if (typeof value === 'string') {
    try {
      const obj = JSON.parse(value);
      if (obj.from) parsed = obj;
    } catch {
      // not JSON
    }
  }

  const [fromDate, setFromDate] = useState(parsed?.from || '');
  const [toDate, setToDate] = useState(parsed?.to || '');

  const handleSave = () => {
    if (fromDate || toDate) {
      onUpdate({ from: fromDate, to: toDate });
    } else {
      onUpdate(null);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setFromDate(parsed?.from || '');
      setToDate(parsed?.to || '');
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1.5 w-full">
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-none bg-transparent p-0 h-auto focus:ring-0 text-foreground text-xs w-[110px]"
          autoFocus
        />
        <span className="text-muted-foreground text-xs">-</span>
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="border-none bg-transparent p-0 h-auto focus:ring-0 text-foreground text-xs w-[110px]"
        />
      </div>
    );
  }

  if (!parsed || (!parsed.from && !parsed.to)) {
    return (
      <div
        className="cursor-pointer text-muted-foreground hover:bg-accent hover:rounded px-2 py-1 -mx-2 -my-1 transition-colors flex items-center gap-2"
        onClick={() => setIsEditing(true)}
      >
        <Calendar className="w-4 h-4" />
        <span>Set timeline</span>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'MMM d');
    } catch {
      return dateStr;
    }
  };

  const fromStr = parsed.from ? formatDate(parsed.from) : '?';
  const toStr = parsed.to ? formatDate(parsed.to) : '?';

  // Check if end date is past
  const isOverdue = parsed.to && new Date(parsed.to) < new Date() &&
    new Date(parsed.to).toDateString() !== new Date().toDateString();

  return (
    <div
      className={`cursor-pointer hover:opacity-80 transition-opacity px-2 py-1 -mx-2 -my-1 rounded text-sm flex items-center gap-1 ${
        isOverdue ? 'bg-destructive/10 text-destructive' : 'text-foreground'
      }`}
      onClick={() => setIsEditing(true)}
    >
      <Calendar className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
      <span>{fromStr}</span>
      <span className="text-muted-foreground">-</span>
      <span>{toStr}</span>
    </div>
  );
}
