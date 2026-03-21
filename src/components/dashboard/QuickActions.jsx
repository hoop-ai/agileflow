import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import CreateBoardModal from "../boards/CreateBoardModal";
import InviteTeamModal from "./InviteTeamModal";
import CalendarModal from "./CalendarModal";

export default function QuickActions({ onCreateBoard }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleCreateBoard = async (boardData) => {
    if (onCreateBoard) {
      await onCreateBoard(boardData);
    }
    setShowCreateModal(false);
  };

  const actions = [
    {
      title: "Create Board",
      description: "Start new project",
      icon: Plus,
      onClick: () => setShowCreateModal(true)
    },
    {
      title: "Invite Team",
      description: "Add collaborators",
      icon: Users,
      onClick: () => setShowInviteModal(true)
    },
    {
      title: "Calendar",
      description: "View deadlines",
      icon: Calendar,
      onClick: () => setShowCalendarModal(true)
    },
    {
      title: "Analytics",
      description: "View insights",
      icon: BarChart3,
      link: createPageUrl("Analytics")
    }
  ];

  return (
    <>
      <Card className="border border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <div>
              <CardTitle className="text-base font-semibold text-foreground">
                Quick Actions
              </CardTitle>
              <p className="text-sm text-muted-foreground">Get things done faster</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          {actions.map((action) => {
            const inner = (
              <div className="flex items-center gap-3 w-full">
                <action.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
            );

            return action.link ? (
              <Link key={action.title} to={action.link} className="block">
                <Button
                  variant="outline"
                  className="w-full h-auto py-3 px-4 justify-start"
                >
                  {inner}
                </Button>
              </Link>
            ) : (
              <Button
                key={action.title}
                variant="outline"
                className="w-full h-auto py-3 px-4 justify-start"
                onClick={action.onClick}
              >
                {inner}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      <CreateBoardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateBoard}
      />

      <InviteTeamModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />

      <CalendarModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      />
    </>
  );
}
