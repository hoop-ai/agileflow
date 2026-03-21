import React, { useState, useRef, useEffect } from 'react';
import { invokeLLM } from "@/api/openrouter";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { Sprint } from "@/api/entities/Sprint";
import { UserStory } from "@/api/entities/UserStory";
import { getAssignmentSuggestions, formatAssignmentSummary, getSprintRecommendations } from "@/api/taskAssignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Send, Loader2, Sparkles, Users, Calendar, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const QUICK_ACTIONS = [
  { label: "Suggest Assignments", icon: Users, command: "/assign" },
  { label: "Sprint Recommendations", icon: Calendar, command: "/sprint" },
  { label: "Performance Summary", icon: BarChart3, command: "/performance" },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AgileFlow AI assistant. I can help with:\n\n- **Task assignments** — `/assign` to get AI-suggested assignments\n- **Sprint planning** — `/sprint` for capacity recommendations\n- **Performance insights** — `/performance` for a team summary\n- Or just ask me anything about project management!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('right');
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      const response = await processMessage(userMessage);
      addMessage('assistant', response);
    } catch (error) {
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    }
    setIsLoading(false);
  };

  const processMessage = async (message) => {
    const lower = message.toLowerCase();

    // Built-in commands that use local data + AI engine
    if (lower.startsWith('/assign') || lower.includes('assign') && lower.includes('suggest')) {
      return await handleAssignCommand(message);
    }
    if (lower.startsWith('/sprint') || (lower.includes('sprint') && lower.includes('recommend'))) {
      return await handleSprintCommand();
    }
    if (lower.startsWith('/performance') || lower.includes('performance summary')) {
      return await handlePerformanceCommand();
    }

    // For general questions, build context and send to LLM
    const context = await buildContext();
    const enrichedPrompt = `${context}\n\nUser question: ${message}`;
    return await invokeLLM(enrichedPrompt);
  };

  const handleAssignCommand = async (message) => {
    try {
      const [boards, items] = await Promise.all([
        Board.list('-updated_date', 10),
        Item.list('-updated_date'),
      ]);

      if (boards.length === 0) return "No boards found. Create a board and add tasks to get assignment suggestions.";

      const taskPriority = message.toLowerCase().includes('critical') ? 'critical' :
                           message.toLowerCase().includes('high') ? 'high' :
                           message.toLowerCase().includes('low') ? 'low' : 'medium';

      const allSuggestions = boards.map(board => {
        const boardItems = items.filter(i => i.board_id === board.id);
        const suggestions = getAssignmentSuggestions(boardItems, board, taskPriority);
        return { board: board.title, suggestions };
      }).filter(b => b.suggestions.length > 0);

      if (allSuggestions.length === 0) {
        return "No team members found with task history yet. Assign some tasks to team members first, then I can recommend optimal assignments based on competency, availability, and performance.";
      }

      let result = `**AI Task Assignment Suggestions** (${taskPriority} priority)\n\n`;
      result += `*Formula: Score = 40% Competency + 30% Availability + 30% Performance*\n\n`;

      allSuggestions.forEach(({ board, suggestions }) => {
        result += `### ${board}\n\n`;
        result += '| Member | Score | Comp. | Avail. | Perf. | Load |\n';
        result += '|--------|-------|-------|--------|-------|------|\n';
        suggestions.forEach(s => {
          result += `| ${s.name} | **${(s.score * 100).toFixed(0)}%** | ${(s.competency * 100).toFixed(0)}% | ${(s.availability * 100).toFixed(0)}% | ${(s.performance * 100).toFixed(0)}% | ${s.currentLoad} |\n`;
        });
        result += '\n';
      });

      return result;
    } catch (error) {
      return `Error loading assignment data: ${error.message}`;
    }
  };

  const handleSprintCommand = async () => {
    try {
      const [stories, sprints] = await Promise.all([
        UserStory.list('-created_date', 100),
        Sprint.list('-start_date', 20),
      ]);

      const recs = getSprintRecommendations(stories, sprints);

      let result = '**Sprint Planning Recommendations**\n\n';
      result += `- **Recommended Capacity:** ${recs.recommendedCapacity} story points`;
      if (recs.avgVelocity > 0) result += ` (based on avg velocity of ${recs.avgVelocity} SP)`;
      result += '\n';
      result += `- **Recommended Stories:** ${recs.recommendedStories.length} stories (${recs.totalPoints} SP)\n`;
      result += `- **Remaining Capacity:** ${recs.remainingCapacity} SP\n\n`;

      if (recs.recommendedStories.length > 0) {
        result += '**Suggested Sprint Backlog:**\n\n';
        result += '| Priority | Story | Points |\n';
        result += '|----------|-------|--------|\n';
        recs.recommendedStories.forEach(s => {
          result += `| ${s.priority} | ${s.title} | ${s.story_points || 0} SP |\n`;
        });
      } else {
        result += 'No backlog stories available. Create user stories in the Backlog page first.';
      }

      return result;
    } catch (error) {
      return `Error loading sprint data: ${error.message}`;
    }
  };

  const handlePerformanceCommand = async () => {
    try {
      const [boards, items, sprints] = await Promise.all([
        Board.list('-updated_date'),
        Item.list('-updated_date'),
        Sprint.list('-start_date', 10),
      ]);

      const totalTasks = items.length;
      const completedTasks = items.filter(item => {
        const board = boards.find(b => b.id === item.board_id);
        const statusCol = board?.columns?.find(c => c.type === 'status');
        const status = statusCol ? item.data?.[statusCol.id] : item.data?.status;
        return ['done', 'completed'].includes(status?.toLowerCase());
      }).length;

      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      const completedSprints = sprints.filter(s => s.status === 'completed');
      const avgVelocity = completedSprints.length > 0
        ? Math.round(completedSprints.reduce((s, sp) => s + (sp.completed_points || 0), 0) / completedSprints.length)
        : 0;

      let result = '**Performance Summary**\n\n';
      result += `| Metric | Value |\n`;
      result += `|--------|-------|\n`;
      result += `| Total Tasks | ${totalTasks} |\n`;
      result += `| Completed | ${completedTasks} |\n`;
      result += `| Completion Rate | ${completionRate}% |\n`;
      result += `| Active Boards | ${boards.length} |\n`;
      result += `| Sprints Completed | ${completedSprints.length} |\n`;
      result += `| Avg Sprint Velocity | ${avgVelocity} SP |\n`;

      // Use LLM for an insightful analysis
      const analysisPrompt = `Given these project metrics: ${totalTasks} total tasks, ${completedTasks} completed (${completionRate}%), ${boards.length} boards, ${completedSprints.length} sprints completed with avg velocity ${avgVelocity} SP. Give 2-3 brief, actionable insights about team health and what to focus on next.`;

      try {
        const analysis = await invokeLLM(analysisPrompt);
        result += `\n**AI Insights:**\n${analysis}`;
      } catch {
        // LLM call is optional enhancement
      }

      return result;
    } catch (error) {
      return `Error loading performance data: ${error.message}`;
    }
  };

  const buildContext = async () => {
    try {
      const [boards, items, sprints] = await Promise.all([
        Board.list('-updated_date', 5),
        Item.list('-updated_date', 20),
        Sprint.list('-start_date', 5),
      ]);

      const activeSprints = sprints.filter(s => s.status === 'active');
      return `Current project context: ${boards.length} boards, ${items.length} recent tasks, ${activeSprints.length} active sprints. Board names: ${boards.map(b => b.title).join(', ')}.`;
    } catch {
      return '';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (command) => {
    setInput(command);
    setTimeout(() => {
      setInput('');
      addMessage('user', command);
      setIsLoading(true);
      processMessage(command).then(response => {
        addMessage('assistant', response);
        setIsLoading(false);
      }).catch(() => {
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        setIsLoading(false);
      });
    }, 0);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`fixed bottom-6 z-50 flex flex-col items-center gap-2 ${position === 'right' ? 'right-6' : 'left-6'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-lg border-2 border-purple-200 dark:border-purple-700"
            >
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 whitespace-nowrap flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Assistant
              </p>
            </motion.div>

            <div className="relative">
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 shadow-2xl transition-all flex items-center justify-center text-5xl cursor-pointer border-4 border-white dark:border-gray-800"
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.button>

              <AnimatePresence>
                {isHovered && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setPosition(position === 'right' ? 'left' : 'right')}
                    className={`absolute top-0 ${position === 'right' ? '-left-12' : '-right-12'} h-8 w-8 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-2 border-purple-300 dark:border-purple-600`}
                    title={`Move to ${position === 'right' ? 'left' : 'right'}`}
                  >
                    {position === 'right' ? '←' : '→'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 z-50 w-[440px] max-w-[calc(100vw-3rem)] ${position === 'right' ? 'right-6' : 'left-6'}`}
          >
            <Card className="shadow-2xl border-0 overflow-hidden dark:bg-gray-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <p className="text-white/90 text-xs">Assignments, sprints, and insights</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 h-8 w-8">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex gap-2 overflow-x-auto">
                {QUICK_ACTIONS.map(action => (
                  <Button
                    key={action.command}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.command)}
                    disabled={isLoading}
                    className="flex-shrink-0 text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                ))}
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-[#0073EA] text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything or try /assign, /sprint..."
                    className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-[#0073EA] hover:bg-[#0056B3] text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
