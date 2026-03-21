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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewTaskModal({ isOpen, onClose, board, onSubmit }) {
  const [taskData, setTaskData] = useState({
    title: '',
    groupId: board?.groups?.[0]?.id || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim() || !taskData.groupId) return;

    setIsSubmitting(true);
    try {
      await onSubmit(taskData.groupId, taskData.title);
      setTaskData({ title: '', groupId: board?.groups?.[0]?.id || '' });
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground font-medium">
              Task Title *
            </Label>
            <Input
              id="title"
              value={taskData.title}
              onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter task title..."
              className="rounded-xl border-border h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Group</Label>
            <Select
              value={taskData.groupId}
              onValueChange={(value) => setTaskData(prev => ({ ...prev, groupId: value }))}
            >
              <SelectTrigger className="rounded-xl border-border h-12">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {board?.groups?.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: group.color }}
                      />
                      <span>{group.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              disabled={!taskData.title.trim() || !taskData.groupId || isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-6 font-medium"
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}