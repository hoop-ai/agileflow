import React from 'react';
import { Folder, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsOverview({ boards, items, isLoading }) {
  const completedItems = items.filter(item => item.data?.status === 'done').length;
  const pendingItems = items.filter(item => !item.data?.status || item.data?.status !== 'done').length;
  const completionRate = items.length > 0 ? Math.round((completedItems / items.length) * 100) : 0;

  const stats = [
    {
      title: "Total Boards",
      value: boards.length,
      icon: Folder,
    },
    {
      title: "Completed Tasks",
      value: completedItems,
      icon: CheckCircle2,
    },
    {
      title: "Pending Tasks",
      value: pendingItems,
      icon: Clock,
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            {isLoading ? (
              <Skeleton className="mt-2 h-8 w-16" />
            ) : (
              <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
