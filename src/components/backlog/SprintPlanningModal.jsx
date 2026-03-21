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
import { Calendar, Target } from "lucide-react";
import { Sprint } from "@/api/entities/Sprint";
import { UserStory } from "@/api/entities/UserStory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SprintPlanningModal({ isOpen, onClose, stories, boards }) {
  const queryClient = useQueryClient();
  const [selectedStories, setSelectedStories] = useState(new Set());
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
      
      // Update selected stories with sprint_id
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprints'] });
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
      onClose();
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
  };

  const totalPoints = Array.from(selectedStories).reduce((sum, id) => {
    const story = stories.find(s => s.id === id);
    return sum + (story?.story_points || 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    createSprintMutation.mutate({
      ...sprintData,
      committed_points: totalPoints,
      completed_points: 0,
      velocity: 0
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Plan New Sprint
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Board *</Label>
              <Select
                value={sprintData.board_id}
                onValueChange={(value) => setSprintData(prev => ({ ...prev, board_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {boards.map(board => (
                    <SelectItem key={board.id} value={board.id}>
                      {board.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sprint Name *</Label>
              <Input
                value={sprintData.name}
                onChange={(e) => setSprintData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Sprint 1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sprint Goal</Label>
            <Textarea
              value={sprintData.goal}
              onChange={(e) => setSprintData(prev => ({ ...prev, goal: e.target.value }))}
              placeholder="What do you want to achieve in this sprint?"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={sprintData.start_date}
                onChange={(e) => setSprintData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>End Date *</Label>
              <Input
                type="date"
                value={sprintData.end_date}
                onChange={(e) => setSprintData(prev => ({ ...prev, end_date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Team Capacity (SP)</Label>
              <Input
                type="number"
                value={sprintData.capacity}
                onChange={(e) => setSprintData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                min="0"
              />
            </div>
          </div>

          {/* Sprint Capacity Indicator */}
          <Card className={`border-2 ${totalPoints > sprintData.capacity ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className={totalPoints > sprintData.capacity ? 'text-red-600' : 'text-green-600'} />
                  <div>
                    <p className="font-semibold">
                      {totalPoints} / {sprintData.capacity} Story Points
                    </p>
                    <p className="text-sm text-gray-600">
                      {totalPoints > sprintData.capacity 
                        ? `Overcommitted by ${totalPoints - sprintData.capacity} points` 
                        : `${sprintData.capacity - totalPoints} points remaining`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {sprintData.capacity > 0 ? Math.round((totalPoints / sprintData.capacity) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-600">capacity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Select Stories for Sprint</Label>
            <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-4">
              {stories.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No stories available in backlog
                </p>
              ) : (
                stories.map(story => (
                  <div
                    key={story.id}
                    className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={selectedStories.has(story.id)}
                      onCheckedChange={() => toggleStory(story.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{story.title}</span>
                        {story.story_points > 0 && (
                          <span className="text-sm text-purple-600 font-semibold">
                            {story.story_points} SP
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {story.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={selectedStories.size === 0 || !sprintData.name}
            >
              Create Sprint ({selectedStories.size} stories)
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}