import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CalendarDays, MoreHorizontal, Users, List } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import TaskEditModal from "../TaskEditModal";
import InfoTooltip from "../../common/InfoTooltip";

// Helper functions
const getStatusColumns = (board) => {
  return board?.columns?.filter(col => col.type === 'status') || [];
};

const getPeopleColumns = (board) => {
  return board?.columns?.filter(col => col.type === 'people' || col.type === 'person') || [];
};

const getUniqueValues = (items, columnId) => {
  const values = items.map(item => item.data?.[columnId]).filter(Boolean);
  return [...new Set(values)];
};

// Status label -> Tailwind badge classes
const statusBadgeClasses = {
  'not started': 'bg-muted text-muted-foreground',
  'working on it': 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400',
  'done': 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400',
  'stuck': 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400',
};

const getStatusBadgeClass = (label) =>
  statusBadgeClasses[(label || '').toLowerCase()] || 'bg-muted text-muted-foreground';

// Priority label -> Tailwind badge classes
const priorityBadgeClasses = {
  critical: 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400',
  high: 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400',
  medium: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
  low: 'bg-muted text-muted-foreground',
};

const getPriorityBadgeClass = (value) =>
  priorityBadgeClasses[(value || '').toLowerCase()] || 'bg-muted text-muted-foreground';

// Avatar background colors (non-gradient palette)
const avatarColors = [
  'bg-violet-500', 'bg-pink-500', 'bg-sky-500', 'bg-emerald-500',
  'bg-orange-500', 'bg-indigo-500', 'bg-rose-500', 'bg-teal-500',
];

const getAvatarColor = (str) => {
  const code = (str || '').charCodeAt(0) || 0;
  return avatarColors[code % avatarColors.length];
};

const KanbanCard = ({ item, index, board, groupingType, onEdit }) => {
  const priorityColumn = board?.columns?.find(col => col.type === 'priority');
  const priorityValue = item.data?.[priorityColumn?.id];
  const priorityOption = priorityColumn?.options?.choices?.find(c => c.value === priorityValue);

  const ownerColumn = board?.columns?.find(col => col.type === 'people' || col.type === 'person');
  const ownerValue = item.data?.[ownerColumn?.id];

  const statusColumn = board?.columns?.find(col => col.type === 'status');
  const statusValue = item.data?.[statusColumn?.id];
  const statusOption = statusColumn?.options?.choices?.find(c => c.label === statusValue);

  const dueDateColumn = board?.columns?.find(
    col => col.type === 'date' && (col.id.toLowerCase().includes('due') || col.title.toLowerCase().includes('due'))
  );
  const dueDateValue = item.data?.[dueDateColumn?.id];

  return (
    <Draggable
      draggableId={`item-${item.id}`}
      index={index}
      key={`item-${item.id}`}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'relative p-3 mb-3 bg-card border border-border rounded-md cursor-pointer transition-colors duration-150',
            snapshot.isDragging ? 'shadow-sm bg-accent' : 'hover:bg-accent/50'
          )}
          style={provided.draggableProps.style}
          onClick={(e) => {
            if (snapshot.isDragging) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            onEdit(item);
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-sm text-foreground leading-tight pr-2">{item.title}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground rounded"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {groupingType === 'people' && statusOption && (
              <span className={cn('px-2 py-0.5 text-xs font-medium rounded-md', getStatusBadgeClass(statusOption.label))}>
                {statusOption.label}
              </span>
            )}
            {groupingType === 'status' && priorityOption && (
              <span className={cn('px-2 py-0.5 text-xs font-medium rounded-md', getPriorityBadgeClass(priorityOption.value))}>
                {priorityOption.label}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              {dueDateValue && (
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  <span>{format(new Date(dueDateValue), 'MMM d')}</span>
                </div>
              )}
            </div>

            {ownerValue && (
              <div
                className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full text-white font-medium text-xs',
                  getAvatarColor(ownerValue)
                )}
                title={ownerValue}
              >
                {ownerValue.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default function KanbanView({ board, items, isLoading, onUpdateItem, onDeleteItem, onReorderItems }) {
  const [groupBy, setGroupBy] = useState('status');
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  if (!board) return (
    <div className="p-8 text-center text-muted-foreground">
      Board data not available.
    </div>
  );

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
      <p className="text-sm text-muted-foreground">Loading kanban board...</p>
    </div>
  );

  const statusColumnsDef = getStatusColumns(board);
  const peopleColumnsDef = getPeopleColumns(board);

  const canGroupByStatus = statusColumnsDef.length > 0;
  const canGroupByPeople = peopleColumnsDef.length > 0;

  if (!canGroupByStatus && !canGroupByPeople) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Kanban view requires grouping columns</h3>
          <p>Please add either a Status or People type column to enable Kanban view.</p>
        </div>
      </div>
    );
  }

  if (groupBy === 'status' && !canGroupByStatus) {
    setGroupBy('people');
  } else if (groupBy === 'people' && !canGroupByPeople) {
    setGroupBy('status');
  }

  const activeColumnDefinition = groupBy === 'status'
    ? statusColumnsDef[0]
    : peopleColumnsDef[0];

  if (!activeColumnDefinition) {
    return <div className="p-4 text-center text-muted-foreground">No suitable column definition found for grouping.</div>;
  }

  let columnsData = [];

  if (groupBy === 'status') {
    // Use defined choices if available, otherwise derive from item data
    const choices = activeColumnDefinition.options?.choices;
    if (choices && choices.length > 0) {
      columnsData = choices.map((choice) => ({
        id: `status-${choice.label}`,
        title: choice.label,
        items: items
          .filter(item => item.data?.[activeColumnDefinition.id] === choice.label)
          .sort((a, b) => (a.order_index || 0) - (b.order_index || 0)),
      }));
    } else {
      // Derive unique status values from items
      const uniqueStatuses = getUniqueValues(items, activeColumnDefinition.id);
      columnsData = uniqueStatuses.map((status) => ({
        id: `status-${status}`,
        title: status,
        items: items
          .filter(item => item.data?.[activeColumnDefinition.id] === status)
          .sort((a, b) => (a.order_index || 0) - (b.order_index || 0)),
      }));
    }

    // Add unassigned/no-status items
    const noStatusItems = items
      .filter(item => !item.data?.[activeColumnDefinition.id] || item.data[activeColumnDefinition.id] === '')
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    if (noStatusItems.length > 0) {
      columnsData.push({
        id: 'status-unset',
        title: 'Not Started',
        items: noStatusItems,
      });
    }
  } else if (groupBy === 'people') {
    const uniquePeople = getUniqueValues(items, activeColumnDefinition.id);

    columnsData = uniquePeople.map((person) => ({
      id: `people-${person}`,
      title: person,
      items: items
        .filter(item => item.data?.[activeColumnDefinition.id] === person)
        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0)),
    }));

    const unassignedItems = items
      .filter(item =>
        !item.data?.[activeColumnDefinition.id] ||
        item.data[activeColumnDefinition.id] === '' ||
        item.data[activeColumnDefinition.id] === null
      )
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    if (unassignedItems.length > 0 || uniquePeople.length === 0) {
      columnsData.unshift({
        id: 'people-unassigned',
        title: 'Unassigned',
        items: unassignedItems,
      });
    }
  }

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const itemId = draggableId.replace('item-', '');
    const itemToMove = items.find(i => i.id.toString() === itemId);

    if (!itemToMove) {
      console.error("Item to move not found:", itemId);
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const column = columnsData.find(col => col.id === source.droppableId);
      if (!column) return;

      const currentItems = [...column.items];
      const [reorderedItem] = currentItems.splice(source.index, 1);
      currentItems.splice(destination.index, 0, reorderedItem);

      currentItems.forEach((item, index) =>
        onUpdateItem(item.id, { order_index: index })
      );
    } else {
      const updatedData = { ...itemToMove.data };

      let newValue;
      if (destination.droppableId.startsWith('status-')) {
        newValue = destination.droppableId.replace('status-', '');
      } else if (destination.droppableId === 'people-unassigned') {
        newValue = null;
      } else {
        newValue = destination.droppableId.replace('people-', '');
      }

      updatedData[activeColumnDefinition.id] = newValue;

      const destColumn = columnsData.find(col => col.id === destination.droppableId);
      if (!destColumn) return;

      const tempDestItems = [...destColumn.items];
      const existingItemIndex = tempDestItems.findIndex(i => i.id === itemToMove.id);
      if (existingItemIndex !== -1) tempDestItems.splice(existingItemIndex, 1);

      tempDestItems.splice(destination.index, 0, { ...itemToMove, data: updatedData });

      const newOrderIndex = tempDestItems.findIndex(i => i.id === itemToMove.id);

      onUpdateItem(itemToMove.id, {
        data: updatedData,
        order_index: newOrderIndex
      });

      const sourceColumn = columnsData.find(col => col.id === source.droppableId);
      if (sourceColumn) {
        const tempSourceItems = [...sourceColumn.items].filter(i => i.id !== itemToMove.id);
        tempSourceItems.forEach((item, index) => {
          if (item.order_index !== index) {
            onUpdateItem(item.id, { order_index: index });
          }
        });
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = (taskId, updates) => {
    onUpdateItem(taskId, updates);
    setShowEditModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    onDeleteItem(taskId);
    setShowEditModal(false);
    setEditingTask(null);
  };

  return (
    <div className="h-full">
      {/* Header with grouping selector */}
      <div className="flex items-center justify-between mb-6 p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Kanban Board</h2>
            <p className="text-xs text-muted-foreground">Drag and drop to manage your tasks</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Group by:</span>
          <InfoTooltip text="Choose how to organize your Kanban columns — by status, priority, or assignee" side="bottom" />
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-32 rounded-lg border border-border bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {canGroupByStatus && (
                <SelectItem value="status">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Status
                  </div>
                </SelectItem>
              )}
              {canGroupByPeople && (
                <SelectItem value="people">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    People
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Kanban Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6">
          {columnsData.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'w-72 flex-shrink-0 rounded-lg p-3 transition-colors duration-150',
                    snapshot.isDraggingOver ? 'bg-accent' : 'bg-muted/50'
                  )}
                >
                  {/* Column Header */}
                  <div className="px-1 py-2 mb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-foreground">
                          {column.title}
                          {column.id === 'people-unassigned' && (
                            <span className="text-xs font-normal text-muted-foreground ml-1">(Unassigned)</span>
                          )}
                        </h3>
                        <span className="px-1.5 py-0.5 text-xs rounded bg-background text-muted-foreground border border-border">
                          {column.items.length}
                        </span>
                        <InfoTooltip text="Number of tasks in this column" side="top" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Column Content */}
                  <div className="min-h-[200px] max-h-[calc(100vh-320px)] overflow-y-auto">
                    {column.items.length === 0 && !snapshot.isDraggingOver && (
                      <div className="text-center py-8 px-4">
                        <div className="border border-dashed border-border rounded-lg py-6 px-3">
                          <p className="text-xs text-muted-foreground">
                            {column.id === 'people-unassigned' ? 'Drag unassigned tasks here' : 'Drag tasks here'}
                          </p>
                        </div>
                      </div>
                    )}
                    {column.items.map((item, index) => (
                      <KanbanCard
                        key={`item-${item.id}`}
                        item={item}
                        index={index}
                        board={board}
                        groupingType={groupBy}
                        onEdit={handleEditTask}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Task Edit Modal */}
      <TaskEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingTask(null);
        }}
        task={editingTask}
        board={board}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
