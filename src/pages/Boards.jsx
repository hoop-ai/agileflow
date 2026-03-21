import React, { useState, useEffect } from "react";
import { Board } from "@/api/entities/Board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  LayoutList,
  Folder,
  BarChart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import CreateBoardModal from "../components/boards/CreateBoardModal";
import EditBoardModal from "../components/boards/EditBoardModal";
import BoardCard from "../components/boards/BoardCard";

export default function Boards() {
  const { toast } = useToast();
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBoard, setEditingBoard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    loadBoards();
  }, []);

  useEffect(() => {
    filterBoards();
  }, [searchQuery, boards]);

  const loadBoards = async () => {
    setIsLoading(true);
    try {
      const data = await Board.list("-updated_date");
      setBoards(data);
    } catch (error) {
      console.error("Error loading boards:", error);
      toast({
        title: "Error",
        description: "Failed to load boards. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const filterBoards = () => {
    if (!searchQuery) {
      setFilteredBoards(boards);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = boards.filter(board =>
      board.title.toLowerCase().includes(lowercasedQuery) ||
      board.description?.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredBoards(filtered);
  };

  const handleCreateBoard = async (boardData) => {
    try {
      const newBoard = await Board.create(boardData);
      setBoards(prev => [newBoard, ...prev].sort((a,b) => new Date(b.updated_date) - new Date(a.updated_date)));
      setShowCreateModal(false);
      toast({
        title: "Board created",
        description: `"${boardData.title}" has been created successfully.`,
      });
    } catch (error) {
      console.error("Error creating board:", error);
      toast({
        title: "Creation failed",
        description: "Could not create the board. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw so CreateBoardModal knows the operation failed
    }
  };

  const handleOpenEditModal = (board) => {
    setEditingBoard(board);
    setShowEditModal(true);
  };

  const handleUpdateBoard = async (boardId, updatedData) => {
    try {
      await Board.update(boardId, updatedData);
      setBoards(prevBoards => 
        prevBoards.map(b => 
          b.id === boardId ? { ...b, ...updatedData, updated_date: new Date().toISOString() } : b
        ).sort((a,b) => new Date(b.updated_date) - new Date(a.updated_date))
      );
      setShowEditModal(false);
      setEditingBoard(null);
    } catch (error) {
      console.error("Error updating board:", error);
      toast({
        title: "Update failed",
        description: "Could not update the board. Please try again.",
        variant: "destructive",
      });
      loadBoards();
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await Board.delete(boardId);
      setBoards(prev => prev.filter(board => board.id !== boardId));
    } catch (error) {
      console.error("Error deleting board:", error);
      toast({
        title: "Delete failed",
        description: "Could not delete the board. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              My Boards
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Manage your projects and workflows
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-[#0073EA] to-[#0056B3] hover:from-[#0056B3] hover:to-[#0073EA] text-white rounded-lg h-10 px-5 font-medium text-sm shadow-md transition-all hover:shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Board
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg h-10 focus:ring-2 focus:ring-[#0073EA]/20 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              className={`rounded-lg h-10 px-3 ${viewMode === "grid" ? "bg-[#0073EA] text-white hover:bg-[#0056B3]" : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className={`rounded-lg h-10 px-3 ${viewMode === "list" ? "bg-[#0073EA] text-white hover:bg-[#0056B3]" : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
            <Link to={createPageUrl("Analytics")}>
              <Button variant="outline" className="rounded-lg h-10 px-3 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                <BarChart className="w-4 h-4 mr-1.5" />
                Analytics
              </Button>
            </Link>
            <Button variant="outline" className="rounded-lg h-10 px-3 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4 mr-1.5" />
              Filter
            </Button>
          </div>
        </div>

        {/* Boards Display */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className={`gap-6 ${viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-3"}`}>
              {Array(viewMode === "grid" ? 8 : 5).fill(0).map((_, i) => (
                 viewMode === "grid" ? (
                    <Card key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-md h-[220px]">
                      <CardContent className="p-5 space-y-3 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                              <div className="w-14 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          </div>
                          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-3"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-1.5"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mt-1"></div>
                        </div>
                        <div className="flex justify-between items-center pt-2.5 border-t border-gray-200 dark:border-gray-700 mt-2.5">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                 ) : (
                    <Card key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-sm h-[60px]">
                        <CardContent className="p-3 flex items-center justify-between h-full">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-full bg-gray-200 dark:bg-gray-700 rounded-l-lg"></div>
                                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                                <div>
                                    <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-1"></div>
                                    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded-md hidden sm:block"></div>
                                <div className="h-7 w-7 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                            </div>
                        </CardContent>
                    </Card>
                 )
              ))}
            </div>
          ) : filteredBoards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Folder className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {searchQuery ? "No boards found" : "No boards yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery 
                  ? "Try adjusting your search query or filters." 
                  : "Get started by creating your first project board!"
                }
              </p>
              {!searchQuery && (
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-[#0073EA] to-[#0056B3] hover:from-[#0056B3] hover:to-[#0073EA] text-white rounded-xl h-12 px-6 font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Board
                </Button>
              )}
            </motion.div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-3"
            }>
              {filteredBoards.map((board, index) => (
                <BoardCard
                  key={board.id}
                  board={board}
                  viewMode={viewMode}
                  index={index}
                  onDelete={handleDeleteBoard}
                  onEdit={handleOpenEditModal}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <CreateBoardModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateBoard}
        />
        {editingBoard && (
          <EditBoardModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setEditingBoard(null);
            }}
            onSubmit={handleUpdateBoard}
            board={editingBoard}
          />
        )}
      </div>
    </div>
  );
}