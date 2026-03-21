
import React, { useState, useEffect } from "react";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { User } from "@/api/entities/User";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Folder, BarChart3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import StatsOverview from "../components/dashboard/StatsOverview";
import RecentBoards from "../components/dashboard/RecentBoards";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const { toast } = useToast();
  const [boards, setBoards] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [boardsData, itemsData, userData] = await Promise.all([
        Board.list("-updated_date", 10),
        Item.list("-updated_date", 20),
        User.me()
      ]);

      setBoards(boardsData);
      setItems(itemsData);
      setUser(userData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleCreateBoard = async (boardData) => {
    try {
      const newBoard = await Board.create(boardData);
      setBoards(prev => [newBoard, ...prev]);
    } catch (error) {
      console.error("Error creating board:", error);
      toast({
        title: "Creation failed",
        description: "Could not create the board. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const pendingTasks = items.filter(item => !item.data?.status || item.data?.status !== 'done').length;

  return (
    <div className="p-4 md:p-8 bg-background min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome/Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1 mb-8"
        >
          <h1 className="text-2xl font-semibold text-foreground">
            {getGreeting()}, {user?.full_name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {pendingTasks > 0
              ? `You have ${pendingTasks} task${pendingTasks === 1 ? '' : 's'} pending.`
              : "Everything is up to date."}
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link to={createPageUrl("Boards")}>
              <Button>
                <Folder className="w-4 h-4 mr-2" />
                View All Boards
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link to={createPageUrl("Analytics")}>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview
          boards={boards}
          items={items}
          isLoading={isLoading}
        />

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-3 space-y-8">
            <RecentBoards
              boards={boards}
              isLoading={isLoading}
              onCreateBoard={handleCreateBoard}
            />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <QuickActions onCreateBoard={handleCreateBoard} />
            <ActivityFeed
              items={items.slice(0, 5)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
