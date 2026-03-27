import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { TeamMember } from "@/api/entities/TeamMember";
import {
  ArrowLeft,
  Star,
  Table2,
  ChevronDown,
  TrendingUp,
  Edit3,
  Save,
  UserPlus,
  UserMinus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AVATAR_COLORS = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-violet-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-cyan-600 text-white',
  'bg-indigo-600 text-white',
  'bg-pink-600 text-white',
  'bg-teal-600 text-white',
  'bg-orange-600 text-white',
];

function getAvatarColor(name) {
  if (!name) return 'bg-muted text-muted-foreground';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function BoardHeader({
  board,
  items,
  itemsCount,
  selectedCount,
  currentView,
  onViewChange,
  onShowAnalytics,
  onUpdateBoard
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(board?.title || '');
  const [lastSaved, setLastSaved] = useState(new Date());
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    if (board?.id) {
      TeamMember.listByBoard(board.id)
        .then((members) => {
          setCollaborators(
            members.map((m) => ({
              id: m.id,
              name: m.profile?.full_name || m.profile?.email || 'Unknown',
              avatar: (m.profile?.full_name || '??')
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2),
              role: m.role || 'editor',
            }))
          );
        })
        .catch(() => {
          setCollaborators([]);
        });
    }
  }, [board?.id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (board?.title) {
      setEditedTitle(board.title);
    }
  }, [board?.title]);

  // board.color is data-driven and used only for the color indicator strip
  const boardColor = board?.color || null;

  const handleSaveTitle = async () => {
    setIsEditing(false);
    if (editedTitle.trim() && editedTitle !== board?.title && onUpdateBoard) {
      try {
        await onUpdateBoard({ title: editedTitle.trim() });
      } catch (error) {
        console.error('Error saving title:', error);
        setEditedTitle(board?.title || '');
      }
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <TooltipProvider>
      <div className="bg-card sticky top-16 z-40 shadow-sm border-b border-border">
        {/* Data-driven color strip — keep as inline style since it comes from user data */}
        {boardColor && isScrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: boardColor }}
          />
        )}

        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={createPageUrl("Boards")}>
                    <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9 transition-colors duration-150">
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Back to Boards</TooltipContent>
              </Tooltip>

              <div className="flex items-center gap-3">
                {/* Board icon — data-driven color kept as inline style */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted"
                  style={boardColor ? { backgroundColor: boardColor } : undefined}
                >
                  <Table2 className={`w-5 h-5 ${boardColor ? 'text-white' : 'text-muted-foreground'}`} />
                </div>

                <div className="space-y-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveTitle();
                          if (e.key === 'Escape') setIsEditing(false);
                        }}
                        className="text-xl font-bold h-8 w-64"
                        autoFocus
                      />
                      <Button size="sm" onClick={handleSaveTitle} className="h-8">
                        <Save className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <h1
                      className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary transition-colors flex items-center gap-2 group"
                      onClick={() => setIsEditing(true)}
                    >
                      {board?.title}
                      <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h1>
                  )}

                  <div className="flex items-center gap-3 text-xs">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:bg-muted rounded-md">
                          <Table2 className="w-3 h-3 mr-1" />
                          {currentView === 'table' ? 'Main table' :
                           currentView === 'kanban' ? 'Kanban' :
                           currentView === 'calendar' ? 'Calendar' :
                           currentView === 'timeline' ? 'Timeline' :
                           currentView === 'unassigned' ? 'Unassigned Tasks' : 'Main table'}
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onViewChange('table')}>
                          <Table2 className="w-4 h-4 mr-2" />
                          Main Table
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewChange('kanban')}>
                          <Table2 className="w-4 h-4 mr-2" />
                          Kanban Board
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewChange('calendar')}>
                          <Table2 className="w-4 h-4 mr-2" />
                          Calendar View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewChange('timeline')}>
                          <Table2 className="w-4 h-4 mr-2" />
                          Timeline
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewChange('unassigned')}>
                          <UserMinus className="w-4 h-4 mr-2" />
                          Unassigned Tasks
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <span className="text-muted-foreground">|</span>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-6 px-2 text-xs transition-colors duration-150 ${isFavorited ? 'text-yellow-500 hover:text-yellow-600' : 'text-muted-foreground hover:text-yellow-500'}`}
                          onClick={handleToggleFavorite}
                        >
                          <Star className={`w-3 h-3 mr-1 ${isFavorited ? 'fill-current' : ''}`} />
                          {isFavorited ? 'Favorited' : 'Add to favorites'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                      </TooltipContent>
                    </Tooltip>

                    <span className="text-muted-foreground">|</span>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{itemsCount} items</span>
                      <span>▪</span>
                      <span>
                        Saved {lastSaved.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={onShowAnalytics}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Analytics
              </Button>

              {collaborators.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center -space-x-2 cursor-pointer">
                      {collaborators.slice(0, 3).map((user) => (
                        <Tooltip key={user.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn("w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium", getAvatarColor(user.name))}
                            >
                              {user.avatar}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{user.name} ({user.role})</TooltipContent>
                        </Tooltip>
                      ))}
                      {collaborators.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-muted-foreground text-xs">
                          +{collaborators.length - 3}
                        </div>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">Team ({collaborators.length})</h4>
                        <Button size="sm" variant="outline">
                          <UserPlus className="w-3 h-3 mr-1" />
                          Invite
                        </Button>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {collaborators.map((user) => (
                          <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors duration-150">
                            <div className="flex items-center gap-3">
                              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium", getAvatarColor(user.name))}>
                                {user.avatar}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
