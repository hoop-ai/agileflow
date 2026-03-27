import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, differenceInDays, isWithinInterval, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import InfoTooltip from "../../common/InfoTooltip";
import ModuleHelp from "../../common/ModuleHelp";

const TIMELINE_ITEM_HEIGHT = 32; // px
const DAY_CELL_WIDTH = 40; // px

const TimelineItemBar = ({ item, board, timelineStartDate, timelineEndDate, zoomLevel, startDateColId, endDateColId, timelineColId }) => {
  // If using a single timeline column with {from, to} object
  let itemStartDateStr, itemEndDateStr;
  if (timelineColId) {
    const timelineVal = item.data?.[timelineColId];
    if (timelineVal && typeof timelineVal === 'object') {
      itemStartDateStr = timelineVal.from;
      itemEndDateStr = timelineVal.to;
    } else if (typeof timelineVal === 'string') {
      try {
        const parsed = JSON.parse(timelineVal);
        itemStartDateStr = parsed.from;
        itemEndDateStr = parsed.to;
      } catch { /* not JSON */ }
    }
  } else {
    // Using separate start/end date columns
    itemStartDateStr = item.data?.[startDateColId];
    itemEndDateStr = item.data?.[endDateColId];
  }

  if (!itemStartDateStr || !itemEndDateStr) return null;

  const itemStart = new Date(itemStartDateStr);
  const itemEnd = new Date(itemEndDateStr);

  // Ensure dates are valid
  if (isNaN(itemStart.getTime()) || isNaN(itemEnd.getTime())) return null;
  
  // Ensure itemStart is before or same as itemEnd
  const displayStart = itemStart > itemEnd ? itemEnd : itemStart;
  const displayEnd = itemStart > itemEnd ? itemStart : itemEnd;

  // Check if the item falls within the current timeline view
  if (!isWithinInterval(displayStart, { start: timelineStartDate, end: timelineEndDate }) && 
      !isWithinInterval(displayEnd, { start: timelineStartDate, end: timelineEndDate }) &&
      !(displayStart < timelineStartDate && displayEnd > timelineEndDate)) {
    return null;
  }

  const offsetDays = Math.max(0, differenceInDays(displayStart, timelineStartDate));
  let durationDays = differenceInDays(displayEnd, displayStart) + 1;
  
  // Adjust duration if item extends beyond timeline view
  if (displayStart < timelineStartDate) {
    durationDays = differenceInDays(displayEnd, timelineStartDate) + 1;
  }
  if (displayEnd > timelineEndDate) {
    durationDays = differenceInDays(timelineEndDate, displayStart < timelineStartDate ? timelineStartDate : displayStart) + 1;
  }
  durationDays = Math.max(1, durationDays); // Minimum 1 day width


  const left = offsetDays * DAY_CELL_WIDTH * (zoomLevel === 'week' ? 1 : (zoomLevel === 'month' ? (30/7) : (1/7) )); // Adjust width based on zoom
  const width = durationDays * DAY_CELL_WIDTH * (zoomLevel === 'week' ? 1 : (zoomLevel === 'month' ? (30/7) : (1/7) )) - 4; // -4 for padding/margin

  const priorityColumn = board?.columns?.find(col => col.type === 'priority');
  const priorityValue = item.data?.[priorityColumn?.id];
  const priorityOption = priorityColumn?.options?.choices?.find(c => c.value === priorityValue);
  const barColor = priorityOption?.color || board?.color || '#0073EA';

  return (
    <div
      className="absolute h-[28px] rounded flex items-center px-2 text-white text-xs font-medium truncate shadow-sm"
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: '2px', // Small offset from top of row
        backgroundColor: barColor,
        opacity: 0.9
      }}
      title={`${item.title} (${format(displayStart, 'MMM d')} - ${format(displayEnd, 'MMM d')})`}
    >
      {item.title}
    </div>
  );
};


export default function TimelineView({ board, items }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [zoomLevel, setZoomLevel] = useState('week');
  const [startDateColId, setStartDateColId] = useState(null);
  const [endDateColId, setEndDateColId] = useState(null);
  const [timelineColId, setTimelineColId] = useState(null);

  useEffect(() => {
    // First, check for a timeline type column (stores {from, to} as a single value)
    const timelineCol = board?.columns?.find(col => col.type === 'timeline');
    if (timelineCol) {
      setTimelineColId(timelineCol.id);
      setStartDateColId(null);
      setEndDateColId(null);
      return;
    }

    // Otherwise, look for separate date columns
    setTimelineColId(null);
    const dateCols = board?.columns?.filter(col => col.type === 'date');
    if (dateCols?.length >= 2) {
      setStartDateColId(dateCols[0].id);
      setEndDateColId(dateCols[1].id);
    } else if (dateCols?.length === 1) {
      setStartDateColId(dateCols[0].id);
      setEndDateColId(dateCols[0].id);
    } else {
      const sDate = board?.columns?.find(c => c.id === 'startDate' || c.title?.toLowerCase().includes('start'))?.id;
      const eDate = board?.columns?.find(c => c.id === 'endDate' || c.id === 'due_date' || c.title?.toLowerCase().includes('end') || c.title?.toLowerCase().includes('due'))?.id;
      if (sDate) setStartDateColId(sDate);
      if (eDate) setEndDateColId(eDate);
    }
  }, [board]);

  const { timelineStartDate, timelineEndDate, daysHeader } = useMemo(() => {
    let start, end;
    if (zoomLevel === 'day') {
      start = currentDate;
      end = addDays(currentDate, 6); // Show 7 days
    } else if (zoomLevel === 'week') {
      start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
      end = endOfWeek(currentDate, { weekStartsOn: 1 });
    } else { // month
      start = startOfMonth(currentDate);
      end = endOfMonth(currentDate);
    }
    const days = eachDayOfInterval({ start, end });
    return { timelineStartDate: start, timelineEndDate: end, daysHeader: days };
  }, [currentDate, zoomLevel]);

  const handlePrev = () => {
    if (zoomLevel === 'day') setCurrentDate(subDays(currentDate, 7));
    else if (zoomLevel === 'week') setCurrentDate(subDays(currentDate, 7));
    else setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    if (zoomLevel === 'day') setCurrentDate(addDays(currentDate, 7));
    else if (zoomLevel === 'week') setCurrentDate(addDays(currentDate, 7));
    else setCurrentDate(addMonths(currentDate, 1));
  };
  
  const getHeaderLabel = () => {
    if (zoomLevel === 'day') return `${format(timelineStartDate, 'MMM d')} - ${format(timelineEndDate, 'MMM d, yyyy')}`;
    if (zoomLevel === 'week') return `Week of ${format(timelineStartDate, 'MMM d, yyyy')}`;
    return format(currentDate, 'MMMM yyyy');
  };

  if (!board) return <div className="p-4 text-center text-muted-foreground">Board data not available.</div>;

  const hasTimelineSource = timelineColId || (startDateColId && endDateColId);

  if (!hasTimelineSource) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarDays className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-1">Date columns required</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Add a Timeline column or two Date columns to your board to use the timeline view.
        </p>
      </div>
    );
  }

  // Filter items that have valid date data
  const displayItems = items.filter(item => {
    if (timelineColId) {
      const val = item.data?.[timelineColId];
      if (val && typeof val === 'object') return val.from && val.to;
      if (typeof val === 'string') {
        try { const p = JSON.parse(val); return p.from && p.to; } catch { return false; }
      }
      return false;
    }
    return item.data?.[startDateColId] && item.data?.[endDateColId];
  });


  return (
    <Card className="shadow-sm border-border overflow-hidden">
      <CardHeader className="p-3 border-b flex flex-row items-center justify-between sticky top-0 bg-card z-10">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold text-foreground">{getHeaderLabel()}</CardTitle>
          <InfoTooltip text="Tasks are shown as horizontal bars spanning their start and end dates. Only tasks with both a start and end date appear here. Add dates in the table view to see more tasks." side="bottom" />
          <ModuleHelp moduleKey="timeline" />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrev} title="Navigate to the previous time period"><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="outline" size="sm" className="h-8" onClick={() => setCurrentDate(new Date())} title="Jump to today's date on the timeline">Today</Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNext} title="Navigate to the next time period"><ChevronRight className="w-4 h-4" /></Button>
          <InfoTooltip text="Day view shows each day individually. Week view shows weekly columns. Month view shows the broadest overview for long-term planning." side="bottom" />
          <select value={zoomLevel} onChange={(e) => setZoomLevel(e.target.value)} className="h-8 border border-border rounded-md px-2 text-sm bg-card text-foreground" title="Choose the zoom level for the timeline">
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          {/* <Button variant="outline" size="icon" className="h-8 w-8"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="h-8 w-8"><ZoomOut className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="h-8 w-8"><Settings className="w-4 h-4" /></Button> */}
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <div className="min-w-max"> {/* Ensures horizontal scrolling for timeline content */}
          {/* Timeline Header (Days) */}
          <div className="flex sticky top-[53px] bg-muted/50 z-[5] border-b border-border">
            <div className="w-[200px] flex-shrink-0 p-2 border-r border-border font-medium text-xs text-muted-foreground">Task</div>
            {daysHeader.map(day => (
              <div
                key={day.toString()}
                className="flex-shrink-0 text-center p-1 border-r border-border"
                style={{ width: `${DAY_CELL_WIDTH * (zoomLevel === 'week' ? 1 : (zoomLevel === 'month' ? (30/7) : (1/7) ) )}px` }}
              >
                <div className="text-xs text-muted-foreground">{format(day, 'EEE')}</div>
                <div className="text-sm font-medium text-foreground">{format(day, 'd')}</div>
              </div>
            ))}
          </div>

          {/* Timeline Rows (Items) */}
          <div className="relative"> {/* Container for absolute positioned item bars */}
            {displayItems.map((item, index) => (
              <div key={item.id} className="flex border-b border-border" style={{ height: `${TIMELINE_ITEM_HEIGHT}px` }}>
                <div className="w-[200px] flex-shrink-0 p-2 border-r border-border text-xs text-foreground truncate" title={item.title}>
                  {item.title}
                </div>
                <div className="flex-grow relative h-full"> {/* This part will contain the bar */}
                  <TimelineItemBar
                    item={item}
                    board={board}
                    timelineColId={timelineColId}
                    startDateColId={startDateColId}
                    endDateColId={endDateColId}
                    timelineStartDate={timelineStartDate}
                    timelineEndDate={timelineEndDate}
                    zoomLevel={zoomLevel}
                  />
                </div>
              </div>
            ))}
            {displayItems.length === 0 && items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">No items to display on the timeline</h3>
                <p className="text-sm text-muted-foreground max-w-sm">Add items to your board to see them here.</p>
              </div>
            )}
            {displayItems.length === 0 && items.length > 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">No items have dates set</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Items need both a start and end date to appear on the timeline. Switch to the table view and fill in the date columns for the tasks you want to visualize here.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}