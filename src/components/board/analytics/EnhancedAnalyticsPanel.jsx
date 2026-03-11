import React, { useState, useMemo } from 'react';
import { X, TrendingUp, Download, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  calculateCompletionTrend, 
  calculateVelocity, 
  calculateBurndown,
  calculateTeamMetrics,
  calculatePriorityHealth,
  calculateCycleTime,
  exportToCSV
} from '@/components/utils/analytics';

export default function EnhancedAnalyticsPanel({ board, items, onClose }) {
  const [timeRange, setTimeRange] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate all metrics
  const metrics = useMemo(() => {
    const completionTrend = calculateCompletionTrend(items);
    const velocity = calculateVelocity(items, 7);
    const teamMetrics = calculateTeamMetrics(items, board);
    const priorityHealth = calculatePriorityHealth(items, board);
    const cycleTime = calculateCycleTime(items);
    
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = new Date();
    const burndown = calculateBurndown(items, startDate, endDate);

    return {
      completionTrend,
      velocity,
      teamMetrics,
      priorityHealth,
      cycleTime,
      burndown
    };
  }, [items, board]);

  const handleExport = () => {
    const exportData = items.map(item => ({
      title: item.title,
      status: item.data?.status || '',
      priority: item.data?.priority || '',
      created: item.created_date,
      updated: item.updated_date,
      owner: item.data?.owner || ''
    }));
    exportToCSV(exportData, `${board.title}-analytics.csv`);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Advanced Analytics</h2>
            <p className="text-purple-100 mt-1">{board.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={handleExport}
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Performance Insights</h3>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.cycleTime && (
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Cycle Time</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.cycleTime.average.toFixed(1)}d
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Team Velocity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.velocity[metrics.velocity.length - 1]?.completed || 0}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          {metrics.priorityHealth && (
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Health Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.priorityHealth.healthScore}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.teamMetrics.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different analytics views */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="burndown">Burndown</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metrics.completionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="completionRate" 
                      stroke="#8b5cf6" 
                      fill="#c4b5fd" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.velocity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.teamMetrics.map((member, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{member.owner}</h4>
                        <span className="text-sm text-gray-600">
                          {member.completionRate.toFixed(1)}% completion
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Assigned</p>
                          <p className="font-semibold">{member.assigned}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Completed</p>
                          <p className="font-semibold text-green-600">{member.completed}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">In Progress</p>
                          <p className="font-semibold text-blue-600">{member.inProgress}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Avg Days</p>
                          <p className="font-semibold">{member.avgCompletionTime.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="burndown" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Burndown Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={metrics.burndown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Tasks Remaining', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="ideal" 
                      stroke="#94a3b8" 
                      strokeDasharray="5 5" 
                      name="Ideal"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="remaining" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Actual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 mt-6">
            {metrics.priorityHealth && (
              <Card>
                <CardHeader>
                  <CardTitle>Priority Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(metrics.priorityHealth.distribution).map(([priority, count]) => {
                      const overdue = metrics.priorityHealth.overdue[priority] || 0;
                      const percentage = (count / items.length) * 100;
                      
                      return (
                        <div key={priority} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium capitalize">{priority}</span>
                            <span className="text-gray-600">
                              {count} tasks ({overdue} overdue)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}