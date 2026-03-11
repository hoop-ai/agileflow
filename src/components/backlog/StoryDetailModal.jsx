import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit2, 
  Trash2, 
  Check, 
  X,
  Clock,
  Target,
  User,
  AlertCircle
} from "lucide-react";
import { format } from 'date-fns';

export default function StoryDetailModal({ isOpen, onClose, story, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState(story);

  const handleSave = () => {
    onUpdate(editedStory);
    setIsEditing(false);
  };

  const toggleCriteria = (criteriaId) => {
    const updated = {
      ...editedStory,
      acceptance_criteria: editedStory.acceptance_criteria.map(c =>
        c.id === criteriaId ? { ...c, completed: !c.completed } : c
      )
    };
    setEditedStory(updated);
    onUpdate(updated);
  };

  const completedCriteria = story.acceptance_criteria?.filter(c => c.completed).length || 0;
  const totalCriteria = story.acceptance_criteria?.length || 0;
  const completionPercentage = totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;

  const priorityColors = {
    critical: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-gray-500 text-white'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl">
                {isEditing ? (
                  <Input
                    value={editedStory.title}
                    onChange={(e) => setEditedStory({ ...editedStory, title: e.target.value })}
                    className="text-2xl font-bold"
                  />
                ) : (
                  story.title
                )}
              </DialogTitle>
              <Badge className={priorityColors[story.priority]}>
                {story.priority}
              </Badge>
              {story.story_points > 0 && (
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  {story.story_points} SP
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="icon" variant="ghost" onClick={handleSave}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => {
                      if (window.confirm('Delete this story?')) {
                        onDelete();
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="criteria">Acceptance Criteria</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Description
              </label>
              {isEditing ? (
                <Textarea
                  value={editedStory.description}
                  onChange={(e) => setEditedStory({ ...editedStory, description: e.target.value })}
                  rows={6}
                />
              ) : (
                <p className="text-gray-600 whitespace-pre-wrap">{story.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Assigned To
                  </label>
                  <p className="text-gray-600">{story.assigned_to || 'Unassigned'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4" />
                    Story Points
                  </label>
                  <p className="text-gray-600">{story.story_points || 'Not estimated'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    Status
                  </label>
                  <p className="text-gray-600 capitalize">{story.status.replace('_', ' ')}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Created
                  </label>
                  <p className="text-gray-600">
                    {format(new Date(story.created_date), 'PPP')}
                  </p>
                </div>
              </div>
            </div>

            {story.tags && story.tags.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tags
                </label>
                <div className="flex gap-2 flex-wrap">
                  {story.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="criteria" className="space-y-4 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Completion Progress
                </span>
                <span className="text-sm font-semibold text-blue-900">
                  {completedCriteria}/{totalCriteria} ({Math.round(completionPercentage)}%)
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {story.acceptance_criteria && story.acceptance_criteria.length > 0 ? (
                story.acceptance_criteria.map((criteria) => (
                  <div
                    key={criteria.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Checkbox
                      checked={criteria.completed}
                      onCheckedChange={() => toggleCriteria(criteria.id)}
                      className="mt-1"
                    />
                    <span className={`flex-1 ${criteria.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {criteria.description}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No acceptance criteria defined</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  {story.created_by?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{story.created_by} created this story</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(story.created_date), 'PPP p')}
                  </p>
                </div>
              </div>
              
              {story.updated_date !== story.created_date && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    {story.created_by?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Story updated</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(story.updated_date), 'PPP p')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}