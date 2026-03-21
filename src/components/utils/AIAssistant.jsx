import React, { useState, useRef, useEffect } from 'react';
import { invokeLLM } from "@/api/openrouter";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { Sprint } from "@/api/entities/Sprint";
import { UserStory } from "@/api/entities/UserStory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Send, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

async function gatherUserContext() {
  try {
    const [boards, items, sprints, stories] = await Promise.all([
      Board.list(null, 10),
      Item.list(null, 50),
      Sprint.list(null, 5),
      UserStory.list(null, 20),
    ]);

    const boardSummary = boards.map(b => `- "${b.title}" (${items.filter(i => i.board_id === b.id).length} tasks)`).join('\n');
    const activeSprints = sprints.filter(s => s.status === 'active');
    const sprintSummary = activeSprints.length > 0
      ? activeSprints.map(s => `- "${s.name}" (${s.committed_points} pts committed, ${s.completed_points} completed)`).join('\n')
      : 'No active sprints';

    const overdueItems = items.filter(i => {
      const due = i.data?.date;
      return due && new Date(due) < new Date() && i.data?.status !== 'Done';
    });

    const backlogCount = stories.filter(s => s.status === 'backlog').length;

    return `
Current User Data:
- ${boards.length} boards:
${boardSummary || '  None'}
- ${items.length} total tasks
- ${overdueItems.length} overdue tasks
- Active sprints:
${sprintSummary}
- ${backlogCount} stories in backlog`;
  } catch {
    return 'Unable to load user data context.';
  }
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AgileFlow AI assistant. I can help you with your boards, tasks, sprints, and project management questions. I have access to your data, so feel free to ask about your projects!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('right');
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const context = await gatherUserContext();
      const enhancedPrompt = `${context}\n\nUser question: ${userMessage}`;
      const response = await invokeLLM(enhancedPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! How can I help you?"
    }]);
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
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 whitespace-nowrap">
                AI Assistant
              </p>
            </motion.div>

            <div className="relative">
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 shadow-2xl transition-all flex items-center justify-center text-3xl cursor-pointer border-4 border-white dark:border-gray-800"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .99 4.31L2 22l5.69-.99C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.3"/>
                  <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>

              <AnimatePresence>
                {isHovered && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setPosition(position === 'right' ? 'left' : 'right')}
                    className={`absolute top-0 ${position === 'right' ? '-left-10' : '-right-10'} h-7 w-7 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center text-xs hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600`}
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
            className={`fixed bottom-6 z-50 w-96 max-w-[calc(100vw-3rem)] ${position === 'right' ? 'right-6' : 'left-6'}`}
          >
            <Card className="shadow-2xl border-0 overflow-hidden dark:bg-gray-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .99 4.31L2 22l5.69-.99C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.3"/>
                      <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Assistant</h3>
                    <p className="text-white/90 text-xs">Powered by AgileFlow</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearChat}
                    className="text-white hover:bg-white/20 h-8 w-8"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
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
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.role === 'user'
                          ? 'bg-[#0073EA] text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
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
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about your projects..."
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
