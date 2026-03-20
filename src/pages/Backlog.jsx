import React, { useState } from "react";
import { Board } from "@/api/entities/Board";
import { UserStory } from "@/api/entities/UserStory";
import { Sprint } from "@/api/entities/Sprint";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search,
  ListOrdered,
  Target,
  ChevronRight,
  CalendarPlus,
  TrendingUp,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import CreateStoryModal from "../components/backlog/CreateStoryModal";
import StoryDetailModal from "../components/backlog/StoryDetailModal";
import SprintPlanningModal from "../components/backlog/SprintPlanningModal";

export default function BacklogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPlanningModal, setShowPlanningModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [filterPriority, setFilterPriority] = useState("all");
  
  const queryClient = useQueryClient();

  const { data: boards = [], isLoading: loadingBoards } = useQuery({
    queryKey: ['boards'],
    queryFn: () => Board.list('-updated_date', 50),
  });

  const { data: stories = [], isLoading: loadingStories } = useQuery({
    queryKey: ['userStories'],
    queryFn: () => UserStory.list('-created_date', 100),
  });

  const { data: sprints = [] } = useQuery({
    queryKey: ['sprints'],
    queryFn: () => Sprint.list('-start_date', 20),
  });

  const createStoryMutation = useMutation({
    mutationFn: (data) => UserStory.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
      setShowCreateModal(false);
    },
  });

  const updateStoryMutation = useMutation({
    mutationFn: ({ id, data }) => UserStory.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
    },
  });

  const deleteStoryMutation = useMutation({
    mutationFn: (id) => UserStory.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userStories'] });
      setSelectedStory(null);
    },
  });

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || story.priority === filterPriority;
    const isBacklog = story.status === 'backlog' || !story.sprint_id;
    
    return matchesSearch && matchesPriority && isBacklog;
  });

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedStories = [...filteredStories].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const backlogStats = {
    total: sortedStories.length,
    totalPoints: sortedStories.reduce((sum, s) => sum + (s.story_points || 0), 0),
    critical: sortedStories.filter(s => s.priority === 'critical').length,
    ready: sortedStories.filter(s => s.status === 'ready').length
  };

  const activeSprints = sprints.filter(s => s.status === 'active');

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(sortedStories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update priorities based on new order
    items.forEach((story, index) => {
      if (story.id === reorderedItem.id) {
        updateStoryMutation.mutate({
          id: story.id,
          data: { ...story, priority: index < 5 ? 'critical' : index < 15 ? 'high' : 'medium' }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ListOrdered className="w-6 h-6 text-white" />
              </div>
              Product Backlog
            </h1>
            <p className="text-gray-600 mt-2">Prioritize and manage user stories</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setShowPlanningModal(true)}
              variant="outline"
              className="border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
            >
              <CalendarPlus className="w-4 h-4 mr-2" />
              Plan Sprint
            </Button>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New User Story
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Stories</p>
                  <p className="text-3xl font-bold">{backlogStats.total}</p>
                </div>
                <Target className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Story Points</p>
                  <p className="text-3xl font-bold">{backlogStats.totalPoints}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm mb-1">Critical Priority</p>
                  <p className="text-3xl font-bold">{backlogStats.critical}</p>
                </div>
                <Target className="w-10 h-10 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Ready for Sprint</p>
                  <p className="text-3xl font-bold">{backlogStats.ready}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Sprints Alert */}
        {activeSprints.length > 0 && (
          <Card className="mb-6 border-l-4 border-l-blue-500 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">
                    {activeSprints.length} Active Sprint{activeSprints.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-blue-700">
                    {activeSprints.map(s => s.name).join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search user stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                {['all', 'critical', 'high', 'medium', 'low'].map(priority => (
                  <Button
                    key={priority}
                    variant={filterPriority === priority ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterPriority(priority)}
                    className="capitalize"
                  >
                    {priority}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backlog List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5" />
              Prioritized Backlog
              <Badge variant="secondary" className="ml-2">
                {sortedStories.length} stories
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStories ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading backlog...</p>
              </div>
            ) : sortedStories.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories in backlog</h3>
                <p className="text-gray-600 mb-6">Start by creating your first user story</p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create User Story
                </Button>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="backlog">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {sortedStories.map((story, index) => (
                        <Draggable key={story.id} draggableId={story.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <StoryCard
                                story={story}
                                onClick={() => setSelectedStory(story)}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>

        {/* Modals */}
        <CreateStoryModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={(data) => createStoryMutation.mutate(data)}
          boards={boards}
        />

        {selectedStory && (
          <StoryDetailModal
            isOpen={!!selectedStory}
            onClose={() => setSelectedStory(null)}
            story={selectedStory}
            onUpdate={(data) => updateStoryMutation.mutate({ id: selectedStory.id, data })}
            onDelete={() => deleteStoryMutation.mutate(selectedStory.id)}
          />
        )}

        <SprintPlanningModal
          isOpen={showPlanningModal}
          onClose={() => setShowPlanningModal(false)}
          stories={sortedStories}
          boards={boards}
        />
      </div>
    </div>
  );
}

const StoryCard = ({ story, onClick, isDragging }) => {
  const priorityColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-gray-100 text-gray-800 border-gray-300'
  };

  const statusColors = {
    backlog: 'bg-gray-100 text-gray-700',
    ready: 'bg-green-100 text-green-700',
    in_progress: 'bg-blue-100 text-blue-700'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-4 bg-white rounded-lg border-2 cursor-pointer transition-all ${
        isDragging ? 'shadow-2xl border-blue-500' : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={priorityColors[story.priority]} variant="outline">
              {story.priority}
            </Badge>
            {story.story_points && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {story.story_points} SP
              </Badge>
            )}
            {story.status !== 'backlog' && (
              <Badge className={statusColors[story.status]}>
                {story.status.replace('_', ' ')}
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1">{story.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{story.description}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            {story.acceptance_criteria && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {story.acceptance_criteria.filter(c => c.completed).length}/{story.acceptance_criteria.length} criteria
              </span>
            )}
            {story.assigned_to && (
              <span className="flex items-center gap-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  {story.assigned_to.charAt(0).toUpperCase()}
                </div>
                {story.assigned_to.split('@')[0]}
              </span>
            )}
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </motion.div>
  );
};