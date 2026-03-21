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
      className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-card border-l border-border shadow-sm z-50 overflow-y-auto"
    >
      <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Advanced Analytics</h2>
            <p className="text-muted-foreground mt-1 text-sm">{board.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              onClick={handleExport}
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
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
          <h3 className="text-lg font-semibold text-foreground">Performance Insights</h3>
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
            <Card className="bg-card border border-border rounded-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Cycle Time</p>
                    <p className="text-2xl font-bold text-foreground">
                      {metrics.cycleTime.average.toFixed(1)}d
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card border border-border rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Velocity</p>
                  <p className="text-2xl font-bold text-foreground">
                    {metrics.velocity[metrics.velocity.length - 1]?.completed || 0}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {metrics.priorityHealth && (
            <Card className="bg-card border border-border rounded-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Health Score</p>
                    <p className="text-2xl font-bold text-foreground">
                      {metrics.priorityHealth.healthScore}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card border border-border rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold text-foreground">
                    {metrics.teamMetrics.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
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
            <Card className="bg-card border border-border rounded-lg p-4">
              <CardHeader>
                <CardTitle className="text-foreground">Completion Rate Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={metrics.completionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="completionRate"
                      stroke="#8b5cf6"
                      fill="#ede9fe"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-lg p-4">
              <CardHeader>
                <CardTitle className="text-foreground">Team Velocity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.velocity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
                    <Bar dataKey="completed" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6 mt-6">
            <Card className="bg-card border border-border rounded-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.teamMetrics.map((member, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{member.owner}</h4>
                        <span className="text-sm text-muted-foreground">
                          {member.completionRate.toFixed(1)}% completion
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Assigned</p>
                          <p className="font-semibold text-foreground">{member.assigned}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Completed</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">{member.completed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">In Progress</p>
                          <p className="font-semibold text-blue-600 dark:text-blue-400">{member.inProgress}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Days</p>
                          <p className="font-semibold text-foreground">{member.avgCompletionTime.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="burndown" className="space-y-6 mt-6">
            <Card className="bg-card border border-border rounded-lg p-4">
              <CardHeader>
                <CardTitle className="text-foreground">Burndown Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={metrics.burndown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Tasks Remaining', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                      }}
                    />
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
              <Card className="bg-card border border-border rounded-lg p-4">
                <CardHeader>
                  <CardTitle className="text-foreground">Priority Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(metrics.priorityHealth.distribution).map(([priority, count]) => {
                      const overdue = metrics.priorityHealth.overdue[priority] || 0;
                      const percentage = (count / items.length) * 100;

                      return (
                        <div key={priority} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium capitalize text-foreground">{priority}</span>
                            <span className="text-muted-foreground">
                              {count} tasks ({overdue} overdue)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
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