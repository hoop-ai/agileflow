import React, { useState, useEffect, useMemo } from "react";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { Sprint } from "@/api/entities/Sprint";
import { UserStory } from "@/api/entities/UserStory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart3, TrendingUp, Target, Clock, Activity,
  CheckCircle2, Download, Users, Zap, ArrowUpDown
} from "lucide-react";
import { subDays, isAfter, isBefore } from 'date-fns';
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  calculateSprintVelocity,
  calculateBurndown,
  calculateSprintBurndown,
  calculateTaskChurn,
  calculateTeamMetrics,
  calculateCycleTime,
  exportToCSV,
} from "@/components/utils/analytics";

const STATUS_COLORS = {
  done: '#00C875', completed: '#00C875',
  'working on it': '#FFCB00', 'in progress': '#FFCB00', working: '#FFCB00',
  stuck: '#E2445C',
  default: '#C4C4C4'
};

const PRIORITY_COLORS = {
  critical: '#E2445C', high: '#FDAB3D', medium: '#FFCB00', low: '#787D80', default: '#C4C4C4'
};

const PIE_COLORS = ['#0073EA', '#00C875', '#FFCB00', '#E2445C', '#A25DDC', '#FDAB3D', '#787D80'];

function getStatusColor(status) {
  return STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.default;
}
function getPriorityColor(priority) {
  return PRIORITY_COLORS[priority?.toLowerCase()] || PRIORITY_COLORS.default;
}

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [boards, setBoards] = useState([]);
  const [items, setItems] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [boardsData, itemsData, sprintsData, storiesData] = await Promise.all([
        Board.list("-updated_date"),
        Item.list("-updated_date"),
        Sprint.list("-start_date"),
        UserStory.list("-created_date"),
      ]);
      setBoards(boardsData);
      setItems(itemsData);
      setSprints(sprintsData);
      setStories(storiesData);
    } catch (error) {
      console.error("Error loading analytics data:", error);
      toast({
        title: "Error",
        description: "Failed to load analytics data. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  // ── Filtering ──
  const filteredItems = useMemo(() => items.filter(item => {
    if (selectedBoard !== 'all' && item.board_id !== selectedBoard) return false;
    const cutoff = subDays(new Date(), parseInt(selectedTimeRange));
    return isAfter(new Date(item.updated_date), cutoff);
  }), [items, selectedBoard, selectedTimeRange]);

  const filteredBoards = selectedBoard === 'all' ? boards : boards.filter(b => b.id === selectedBoard);

  // ── KPI Calculations ──
  const kpi = useMemo(() => {
    const totalTasks = filteredItems.length;
    const completedTasks = filteredItems.filter(item => {
      const board = boards.find(b => b.id === item.board_id);
      const statusCol = board?.columns?.find(col => col.type === 'status');
      const status = item.data?.[statusCol?.id] || item.data?.status || '';
      return status.toLowerCase() === 'done' || status.toLowerCase() === 'completed';
    }).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const overdueTasks = filteredItems.filter(item => {
      const board = boards.find(b => b.id === item.board_id);
      const dateCol = board?.columns?.find(col => col.type === 'date');
      const statusCol = board?.columns?.find(col => col.type === 'status');
      const dueDate = item.data?.[dateCol?.id];
      const status = item.data?.[statusCol?.id] || item.data?.status || '';
      if (!dueDate || status.toLowerCase() === 'done') return false;
      return isBefore(new Date(dueDate), new Date());
    }).length;

    return { totalTasks, completedTasks, completionRate, overdueTasks };
  }, [filteredItems, boards]);

  // ── Distributions ──
  const statusDistribution = useMemo(() => {
    const dist = {};
    filteredItems.forEach(item => {
      const board = boards.find(b => b.id === item.board_id);
      const statusCol = board?.columns?.find(col => col.type === 'status');
      const status = item.data?.[statusCol?.id] || item.data?.status || 'Not Started';
      dist[status] = (dist[status] || 0) + 1;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value, color: getStatusColor(name) }));
  }, [filteredItems, boards]);

  const priorityDistribution = useMemo(() => {
    const dist = {};
    filteredItems.forEach(item => {
      const board = boards.find(b => b.id === item.board_id);
      const priorityCol = board?.columns?.find(col => col.type === 'priority');
      const priority = item.data?.[priorityCol?.id] || item.data?.priority || 'Medium';
      dist[priority] = (dist[priority] || 0) + 1;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value, color: getPriorityColor(name) }));
  }, [filteredItems, boards]);

  // ── Board Performance ──
  const boardStats = useMemo(() => filteredBoards.map(board => {
    const boardItems = filteredItems.filter(item => item.board_id === board.id);
    const statusCol = board.columns?.find(col => col.type === 'status');
    const completed = boardItems.filter(item => {
      const s = item.data?.[statusCol?.id] || '';
      return s.toLowerCase() === 'done' || s.toLowerCase() === 'completed';
    }).length;
    const total = boardItems.length;
    return { ...board, totalTasks: total, completedTasks: completed, completionRate: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }), [filteredItems, filteredBoards]);

  // ── Sprint Velocity ──
  const sprintVelocityData = useMemo(() => calculateSprintVelocity(sprints), [sprints]);

  // ── Burndown ──
  const burndownData = useMemo(() => {
    const activeSprint = sprints.find(s => s.status === 'active');
    if (activeSprint?.start_date && activeSprint?.end_date) {
      const sprintStories = stories.filter(s => s.sprint_id === activeSprint.id);
      if (sprintStories.length > 0) return calculateSprintBurndown(sprintStories, activeSprint.start_date, activeSprint.end_date);
      return calculateBurndown(filteredItems, activeSprint.start_date, activeSprint.end_date);
    }
    return calculateBurndown(filteredItems, subDays(new Date(), 30), new Date());
  }, [filteredItems, sprints, stories]);

  // ── Task Churn ──
  const churnData = useMemo(() => calculateTaskChurn(filteredItems), [filteredItems]);

  // ── Team Performance ──
  const teamData = useMemo(() => {
    if (selectedBoard !== 'all') {
      const board = boards.find(b => b.id === selectedBoard);
      if (board) return calculateTeamMetrics(filteredItems, board);
    }
    return boards.flatMap(board => {
      const boardItems = filteredItems.filter(i => i.board_id === board.id);
      return calculateTeamMetrics(boardItems, board);
    }).reduce((acc, member) => {
      const existing = acc.find(m => m.owner === member.owner);
      if (existing) {
        existing.assigned += member.assigned;
        existing.completed += member.completed;
        existing.inProgress += member.inProgress;
        existing.completionRate = existing.assigned > 0 ? (existing.completed / existing.assigned) * 100 : 0;
      } else {
        acc.push({ ...member });
      }
      return acc;
    }, []);
  }, [filteredItems, boards, selectedBoard]);

  // ── Cycle Time ──
  const cycleTime = useMemo(() => calculateCycleTime(filteredItems), [filteredItems]);

  // ── Export ──
  const handleExport = () => {
    const exportData = filteredItems.map(item => {
      const board = boards.find(b => b.id === item.board_id);
      const statusCol = board?.columns?.find(c => c.type === 'status');
      const priorityCol = board?.columns?.find(c => c.type === 'priority');
      return {
        title: item.title,
        board: board?.title || '',
        status: item.data?.[statusCol?.id] || '',
        priority: item.data?.[priorityCol?.id] || '',
        created: item.created_date,
        updated: item.updated_date,
      };
    });
    exportToCSV(exportData, 'agileflow-analytics.csv');
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F5F6F8] dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F5F6F8] dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#323338] dark:text-white">Analytics Dashboard</h1>
            <p className="text-[#676879] dark:text-gray-400 mt-2">Insights and metrics across your boards and sprints</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedBoard} onValueChange={setSelectedBoard}>
              <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Boards</SelectItem>
                {boards.map(board => (
                  <SelectItem key={board.id} value={board.id}>{board.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-40 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport} className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Tasks", value: kpi.totalTasks, sub: "Active tasks tracked", icon: Target, gradient: "from-blue-500 to-blue-600", subColor: "text-blue-100" },
            { title: "Completion Rate", value: `${kpi.completionRate}%`, sub: null, icon: CheckCircle2, gradient: "from-green-500 to-green-600", subColor: "text-green-100", progress: kpi.completionRate },
            { title: "Overdue Tasks", value: kpi.overdueTasks, sub: "Need attention", icon: Clock, gradient: "from-red-500 to-red-600", subColor: "text-red-100" },
            { title: "Avg Cycle Time", value: `${cycleTime.average.toFixed(1)}d`, sub: "Creation to completion", icon: Zap, gradient: "from-purple-500 to-purple-600", subColor: "text-purple-100" },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={`bg-gradient-to-r ${card.gradient} text-white border-0`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <card.icon className="w-5 h-5" /> {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                  {card.progress != null && <Progress value={card.progress} className="mt-2 bg-white/30" />}
                  {card.sub && <p className={`${card.subColor} text-sm mt-1`}>{card.sub}</p>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 dark:bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="velocity">Velocity</TabsTrigger>
            <TabsTrigger value="burndown">Burndown</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="churn">Churn</TabsTrigger>
          </TabsList>

          {/* ── Overview Tab ── */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Status Distribution Pie */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Activity className="w-5 h-5 text-blue-500" /> Task Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statusDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={statusDistribution} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {statusDistribution.map((entry, i) => (
                            <Cell key={i} fill={entry.color || PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-12">No task data available</p>
                  )}
                </CardContent>
              </Card>

              {/* Priority Distribution Bar */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <TrendingUp className="w-5 h-5 text-orange-500" /> Priority Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {priorityDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={priorityDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" name="Tasks">
                          {priorityDistribution.map((entry, i) => (
                            <Cell key={i} fill={entry.color || PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-12">No priority data available</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Board Performance */}
            {selectedBoard === 'all' && boardStats.length > 0 && (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <BarChart3 className="w-5 h-5 text-green-500" /> Board Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {boardStats.map((board, index) => (
                      <motion.div
                        key={board.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-lg" style={{ backgroundColor: board.color || '#0073EA' }} />
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{board.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {board.completedTasks} of {board.totalTasks} tasks completed
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${board.completionRate}%` }} />
                          </div>
                          <Badge variant="outline" className="min-w-[3rem] justify-center dark:text-white dark:border-gray-600">
                            {board.completionRate}%
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ── Sprint Velocity Tab ── */}
          <TabsContent value="velocity" className="space-y-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <TrendingUp className="w-5 h-5 text-green-500" /> Sprint Velocity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sprintVelocityData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={sprintVelocityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="sprint" />
                      <YAxis allowDecimals={false} label={{ value: 'Story Points', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="committed" fill="#94a3b8" name="Committed" />
                      <Bar dataKey="completed" fill="#00C875" name="Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-16">
                    <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Sprint Data Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">Complete sprints to see velocity trends. Go to Backlog to plan and run sprints.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Average Velocity Card */}
            {sprintVelocityData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Velocity</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {Math.round(sprintVelocityData.reduce((s, d) => s + d.completed, 0) / sprintVelocityData.length)} SP
                    </p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Commitment Accuracy</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {Math.round(
                        (sprintVelocityData.reduce((s, d) => s + d.completed, 0) /
                          Math.max(1, sprintVelocityData.reduce((s, d) => s + d.committed, 0))) * 100
                      )}%
                    </p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700 border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sprints Completed</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{sprintVelocityData.length}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* ── Burndown Tab ── */}
          <TabsContent value="burndown" className="space-y-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Target className="w-5 h-5 text-blue-500" /> Burndown Chart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {burndownData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={burndownData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis allowDecimals={false} label={{ value: 'Remaining', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeDasharray="5 5" name="Ideal" strokeWidth={2} />
                      <Line type="monotone" dataKey="remaining" stroke="#3b82f6" name="Actual" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">No burndown data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Team Performance Tab ── */}
          <TabsContent value="team" className="space-y-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Users className="w-5 h-5 text-orange-500" /> Team Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teamData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={teamData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="owner" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#00C875" name="Completed" stackId="a" />
                        <Bar dataKey="inProgress" fill="#FFCB00" name="In Progress" stackId="a" />
                        <Bar dataKey="assigned" fill="#C4C4C4" name="Total Assigned" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 space-y-3">
                      {teamData.filter(m => m.owner !== 'Unassigned').map((member, i) => (
                        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {member.owner.charAt(0).toUpperCase()}
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{member.owner}</h4>
                            </div>
                            <Badge variant="outline" className="dark:text-white dark:border-gray-600">
                              {member.completionRate.toFixed(0)}% completion
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Assigned</p>
                              <p className="font-semibold dark:text-white">{member.assigned}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Completed</p>
                              <p className="font-semibold text-green-600">{member.completed}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">In Progress</p>
                              <p className="font-semibold text-yellow-600">{member.inProgress}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Avg Days</p>
                              <p className="font-semibold dark:text-white">{member.avgCompletionTime.toFixed(1)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Team Data Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">Assign tasks to team members to see performance distribution.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Task Churn Tab ── */}
          <TabsContent value="churn" className="space-y-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <ArrowUpDown className="w-5 h-5 text-purple-500" /> Task Churn (Scope Change)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={churnData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="added" fill="#3b82f6" name="Tasks Added" />
                    <Bar dataKey="completed" fill="#00C875" name="Tasks Completed" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {churnData.map((period, i) => (
                    <Card key={i} className={`border-l-4 ${period.churn > 0 ? 'border-l-red-400' : 'border-l-green-400'} dark:bg-gray-700 dark:border-gray-600`}>
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{period.period}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl font-bold dark:text-white">
                            {period.churn > 0 ? '+' : ''}{period.churn}
                          </span>
                          <span className={`text-sm ${period.churn > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {period.churn > 0 ? 'scope creep' : 'net progress'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          +{period.added} added / {period.completed} completed
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
