import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, AlertTriangle } from "lucide-react";
import { Sprint } from "@/api/entities/Sprint";
import { UserStory } from "@/api/entities/UserStory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function SprintPlanningModal({ isOpen, onClose, stories, boards }) {
  const queryClient = useQueryClient();
  const [selectedStories, setSelectedStories] = useState(new Set());
  const [capacityOverridden, setCapacityOverridden] = useState(false);
  const [sprintData, setSprintData] = useState({
    board_id: boards[0]?.id || '',
    name: '',
    goal: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    capacity: 40,
    status: 'planning'
  });

  const createSprintMutation = useMutation({
    mutationFn: async (data) => {
      const sprint = await Sprint.create(data);

      const updatePromises = Array.from(selectedStories).map(storyId => {
        const story = stories.find(s => s.id === storyId);
        return UserStory.update(storyId, {
          ...story,
          sprint_id: sprint.id,
          status: 'ready'
        });
      });

      await Promise.all(updatePromises);
      return sprint;
    },
    onSuccess: (sprint) => {
      queryClient.invalidateQueries({ queryKey: ['sprints'] });
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
      toast.success(`Sprint "${sprint.name}" created with ${selectedStories.size} stories`);
      resetAndClose();
    },
    onError: (error) => {
      toast.error(`Failed to create sprint: ${error.message}`);
    },
  });

  const toggleStory = (storyId) => {
    const newSelected = new Set(selectedStories);
    if (newSelected.has(storyId)) {
      newSelected.delete(storyId);
    } else {
      newSelected.add(storyId);
    }
    setSelectedStories(newSelected);
    setCapacityOverridden(false);
  };

  const totalPoints = Array.from(selectedStories).reduce((sum, id) => {
    const story = stories.find(s => s.id === id);
    return sum + (story?.story_points || 0);
  }, 0);

  const isOverCapacity = totalPoints > sprintData.capacity;
  const capacityPercent = sprintData.capacity > 0 ? Math.round((totalPoints / sprintData.capacity) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Business rule: warn on overcapacity
    if (isOverCapacity && !capacityOverridden) {
      toast.warning(
        `Sprint is overcommitted by ${totalPoints - sprintData.capacity} points. Click "Create Sprint" again to override.`,
        { duration: 5000 }
      );
      setCapacityOverridden(true);
      return;
    }

    createSprintMutation.mutate({
      ...sprintData,
      committed_points: totalPoints,
      completed_points: 0,
      velocity: 0
    });
  };

  const resetAndClose = () => {
    setSelectedStories(new Set());
    setCapacityOverridden(false);
    setSprintData(prev => ({ ...prev, name: '', goal: '' }));
    onClose();
  };

  // Filter out stories already assigned to an active/completed sprint
  const availableStories = stories.filter(s => !s.sprint_id || s.status === 'backlog');

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 dark:text-white">
            <Calendar className="w-6 h-6 text-blue-600" />
            Plan New Sprint
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="dark:text-gray-200">Board *</Label>
              <Select
                value={sprintData.board_id}
                onValueChange={(value) => setSprintData(prev => ({ ...prev, board_id: value }))}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {boards.map(board => (
                    <SelectItem key={board.id} value={board.id}>{board.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="dark:text-gray-200">Sprint Name *</Label>
              <Input
                value={sprintData.name}
                onChange={(e) => setSprintData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Sprint 1"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-200">Sprint Goal</Label>
            <Textarea
              value={sprintData.goal}
              onChange={(e) => setSprintData(prev => ({ ...prev, goal: e.target.value }))}
              placeholder="What do you want to achieve in this sprint?"
              rows={3}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="dark:text-gray-200">Start Date *</Label>
              <Input
                type="date"
                value={sprintData.start_date}
                onChange={(e) => setSprintData(prev => ({ ...prev, start_date: e.target.value }))}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">End Date *</Label>
              <Input
                type="date"
                value={sprintData.end_date}
                onChange={(e) => setSprintData(prev => ({ ...prev, end_date: e.target.value }))}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-gray-200">Team Capacity (SP)</Label>
              <Input
                type="number"
                value={sprintData.capacity}
                onChange={(e) => {
                  setSprintData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }));
                  setCapacityOverridden(false);
                }}
                min="0"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Sprint Capacity Indicator */}
          <Card className={`border-2 ${
            isOverCapacity
              ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
              : 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isOverCapacity ? (
                    <AlertTriangle className="text-red-600 dark:text-red-400 w-5 h-5" />
                  ) : (
                    <Target className="text-green-600 dark:text-green-400 w-5 h-5" />
                  )}
                  <div>
                    <p className="font-semibold dark:text-white">
                      {totalPoints} / {sprintData.capacity} Story Points
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isOverCapacity
                        ? `Overcommitted by ${totalPoints - sprintData.capacity} points — team may not deliver`
                        : `${sprintData.capacity - totalPoints} points remaining`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${isOverCapacity ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {capacityPercent}%
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">capacity</p>
                </div>
              </div>
              {/* Visual capacity bar */}
              <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${isOverCapacity ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(100, capacityPercent)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Overcapacity warning */}
          {isOverCapacity && capacityOverridden && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg text-sm text-yellow-800 dark:text-yellow-300">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Capacity override active. Sprint will be created overcommitted.
            </div>
          )}

          {/* Story Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold dark:text-white">Select Stories for Sprint</Label>
              <Badge variant="secondary">{selectedStories.size} selected</Badge>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2 border dark:border-gray-600 rounded-lg p-4">
              {availableStories.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No stories available in backlog
                </p>
              ) : (
                availableStories.map(story => (
                  <div
                    key={story.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                      selectedStories.has(story.id)
                        ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-600'
                        : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => toggleStory(story.id)}
                  >
                    <Checkbox
                      checked={selectedStories.has(story.id)}
                      onCheckedChange={() => toggleStory(story.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium dark:text-white">{story.title}</span>
                        {story.story_points > 0 && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            {story.story_points} SP
                          </Badge>
                        )}
                        <Badge variant="outline" className={`capitalize ${
                          story.priority === 'critical' ? 'border-red-300 text-red-700 dark:text-red-400' :
                          story.priority === 'high' ? 'border-orange-300 text-orange-700 dark:text-orange-400' :
                          'border-gray-300 text-gray-700 dark:text-gray-400'
                        }`}>
                          {story.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                        {story.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetAndClose} className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${isOverCapacity && !capacityOverridden ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              disabled={selectedStories.size === 0 || !sprintData.name || createSprintMutation.isPending}
            >
              {createSprintMutation.isPending ? 'Creating...' :
               isOverCapacity && !capacityOverridden ? `Override & Create (${selectedStories.size} stories)` :
               `Create Sprint (${selectedStories.size} stories)`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
