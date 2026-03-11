/**
 * Advanced analytics utilities for performance tracking
 */

/**
 * Calculate completion trends over time
 */
export function calculateCompletionTrend(items, dateField = 'updated_date', days = 30) {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  const grouped = items
    .filter(item => new Date(item[dateField]) >= startDate)
    .reduce((acc, item) => {
      const date = new Date(item[dateField]).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, completed: 0 };
      }
      acc[date].total++;
      if (item.data?.status === 'Done' || item.status === 'done') {
        acc[date].completed++;
      }
      return acc;
    }, {});

  return Object.entries(grouped)
    .map(([date, data]) => ({
      date,
      completionRate: (data.completed / data.total) * 100,
      total: data.total,
      completed: data.completed
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Calculate velocity (tasks completed per period)
 */
export function calculateVelocity(items, periodDays = 7) {
  const now = new Date();
  const periods = [];
  
  for (let i = 0; i < 4; i++) {
    const periodEnd = new Date(now.getTime() - i * periodDays * 24 * 60 * 60 * 1000);
    const periodStart = new Date(periodEnd.getTime() - periodDays * 24 * 60 * 60 * 1000);
    
    const completed = items.filter(item => {
      const itemDate = new Date(item.updated_date);
      return (
        itemDate >= periodStart &&
        itemDate <= periodEnd &&
        (item.data?.status === 'Done' || item.status === 'done')
      );
    }).length;
    
    periods.unshift({
      start: periodStart,
      end: periodEnd,
      completed,
      label: `Week ${4 - i}`
    });
  }
  
  return periods;
}

/**
 * Calculate team workload distribution
 */
export function calculateWorkloadDistribution(items, peopleColumnId) {
  const workload = {};
  
  items.forEach(item => {
    const assignee = item.data?.[peopleColumnId] || 'Unassigned';
    if (!workload[assignee]) {
      workload[assignee] = {
        total: 0,
        completed: 0,
        inProgress: 0,
        todo: 0
      };
    }
    
    workload[assignee].total++;
    
    const status = item.data?.status || item.status || 'todo';
    if (status === 'Done' || status === 'done') {
      workload[assignee].completed++;
    } else if (status === 'In Progress' || status === 'in_progress') {
      workload[assignee].inProgress++;
    } else {
      workload[assignee].todo++;
    }
  });
  
  return workload;
}

/**
 * Calculate burndown data for sprints
 */
export function calculateBurndown(stories, sprintStartDate, sprintEndDate) {
  const totalPoints = stories.reduce((sum, s) => sum + (s.story_points || 0), 0);
  const start = new Date(sprintStartDate);
  const end = new Date(sprintEndDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  const idealBurndown = [];
  const actualBurndown = [];
  
  for (let i = 0; i <= days; i++) {
    const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    
    // Ideal burndown (linear)
    const idealRemaining = totalPoints - (totalPoints / days) * i;
    idealBurndown.push({
      date: currentDate,
      remaining: Math.max(0, idealRemaining)
    });
    
    // Actual burndown
    const completedByDate = stories
      .filter(s => s.updated_date && new Date(s.updated_date) <= currentDate)
      .filter(s => s.status === 'done')
      .reduce((sum, s) => sum + (s.story_points || 0), 0);
    
    actualBurndown.push({
      date: currentDate,
      remaining: Math.max(0, totalPoints - completedByDate)
    });
  }
  
  return { idealBurndown, actualBurndown, totalPoints };
}

/**
 * Calculate cycle time (time from start to completion)
 */
export function calculateCycleTime(items) {
  const cycleTimes = items
    .filter(item => item.data?.status === 'Done' && item.created_date)
    .map(item => {
      const created = new Date(item.created_date);
      const completed = new Date(item.updated_date);
      const days = (completed - created) / (1000 * 60 * 60 * 24);
      return {
        itemId: item.id,
        title: item.title,
        days: Math.ceil(days)
      };
    });
  
  const avgCycleTime = cycleTimes.length > 0
    ? cycleTimes.reduce((sum, ct) => sum + ct.days, 0) / cycleTimes.length
    : 0;
  
  return {
    average: avgCycleTime,
    items: cycleTimes
  };
}

/**
 * Performance metrics tracker
 */
export class PerformanceTracker {
  constructor() {
    this.metrics = new Map();
  }

  startTracking(metricName) {
    this.metrics.set(metricName, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  endTracking(metricName) {
    const metric = this.metrics.get(metricName);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      return metric.duration;
    }
    return null;
  }

  getMetric(metricName) {
    return this.metrics.get(metricName);
  }

  getAllMetrics() {
    const results = {};
    this.metrics.forEach((value, key) => {
      results[key] = value.duration;
    });
    return results;
  }

  clearMetrics() {
    this.metrics.clear();
  }
}

export const performanceTracker = new PerformanceTracker();