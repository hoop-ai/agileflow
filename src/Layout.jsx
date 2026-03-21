import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities/User";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { Notification } from "@/api/entities/Notification";
import { supabase } from "@/api/supabaseClient";
import { ThemeProvider, useTheme } from "@/components/utils/ThemeProvider";
import AIAssistant from "@/components/utils/AIAssistant";
import {
  LayoutGrid,
  Search,
  Bell,
  Settings,
  HelpCircle,
  Folder,
  Menu as MenuIcon,
  X,
  TrendingUp,
  ListOrdered,
  Calendar as CalendarIconMenu,
  Shield,
  CheckCheck,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  Keyboard,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  'bg-blue-600 text-white',
  'bg-emerald-600 text-white',
  'bg-violet-600 text-white',
  'bg-amber-600 text-white',
  'bg-rose-600 text-white',
  'bg-cyan-600 text-white',
  'bg-indigo-600 text-white',
  'bg-pink-600 text-white',
  'bg-teal-600 text-white',
  'bg-orange-600 text-white',
];

function getAvatarColor(name) {
  if (!name) return 'bg-muted text-muted-foreground';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: LayoutGrid },
  { title: "Boards", url: createPageUrl("Boards"), icon: Folder },
  { title: "Backlog", url: createPageUrl("Backlog"), icon: ListOrdered },
  { title: "Calendar", url: createPageUrl("Calendar"), icon: CalendarIconMenu },
  { title: "Analytics", url: createPageUrl("Analytics"), icon: TrendingUp },
];

function SearchDialog({ open, onOpenChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ boards: [], items: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const doSearch = useCallback(async (q) => {
    if (!q.trim() || q.length < 2) {
      setResults({ boards: [], items: [] });
      return;
    }
    setIsSearching(true);
    try {
      const [boards, items] = await Promise.all([
        Board.list(),
        Item.list()
      ]);
      const lq = q.toLowerCase();
      setResults({
        boards: boards.filter(b => b.title?.toLowerCase().includes(lq) || b.description?.toLowerCase().includes(lq)).slice(0, 5),
        items: items.filter(i => i.title?.toLowerCase().includes(lq) || i.description?.toLowerCase().includes(lq)).slice(0, 10),
      });
    } catch (error) {
      console.error('Search failed:', error);
    }
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  useEffect(() => {
    if (!open) { setQuery(''); setResults({ boards: [], items: [] }); }
  }, [open]);

  const handleSelect = (type, item) => {
    onOpenChange(false);
    if (type === 'board') navigate(`/Board?id=${item.id}`);
    else if (type === 'item') navigate(`/Board?id=${item.board_id}`);
  };

  const hasResults = results.boards.length > 0 || results.items.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Search Everything</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search boards, tasks..."
            className="pl-9"
            autoFocus
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {isSearching && (
            <p className="text-sm text-muted-foreground p-4 text-center">Searching...</p>
          )}
          {!isSearching && query.length >= 2 && !hasResults && (
            <p className="text-sm text-muted-foreground p-4 text-center">No results found</p>
          )}
          {results.boards.length > 0 && (
            <div className="mb-2">
              <p className="text-xs font-medium text-muted-foreground px-2 py-1 uppercase">Boards</p>
              {results.boards.map(b => (
                <button
                  key={b.id}
                  onClick={() => handleSelect('board', b)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-lg">{b.icon || '📋'}</span>
                  <div>
                    <p className="font-medium text-foreground text-sm">{b.title}</p>
                    {b.description && (
                      <p className="text-xs text-muted-foreground truncate">{b.description}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          {results.items.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground px-2 py-1 uppercase">Tasks</p>
              {results.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect('item', item)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer"
                >
                  <p className="font-medium text-foreground text-sm">{item.title}</p>
                  {item.data?.status && (
                    <Badge variant="secondary" className="mt-1 text-xs">{item.data.status}</Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const [notifs, count] = await Promise.all([
        Notification.list(10),
        Notification.unreadCount()
      ]);
      setNotifications(notifs);
      setUnreadCount(count);
    } catch (error) {
      // Notifications table may not exist yet
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await Notification.markAsRead(id);
      await loadNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await Notification.markAllAsRead();
      await loadNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const typeIcons = {
    info: '💡', success: '✅', warning: '⚠️', error: '❌',
    task: '📋', mention: '💬', sprint: '🏃'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer relative"
        >
          <Bell className="w-4 h-4 flex-shrink-0" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="ml-auto w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" side="right" align="end">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs h-7 text-muted-foreground cursor-pointer">
              <CheckCheck className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className={cn(
                "flex items-start gap-3 p-3 cursor-pointer",
                !n.is_read && "bg-accent/50"
              )}
              onClick={() => !n.is_read && handleMarkAsRead(n.id)}
            >
              <span className="text-lg flex-shrink-0">{typeIcons[n.type] || '💡'}</span>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm",
                  !n.is_read ? "font-semibold text-foreground" : "text-muted-foreground"
                )}>
                  {n.title}
                </p>
                {n.message && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(n.created_date).toLocaleDateString()}
                </p>
              </div>
              {!n.is_read && <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
    >
      {isDark ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}

const helpSections = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { q: 'How do I create a board?', a: 'Go to the Boards page and click "Create Board." Choose a name, color, and optional description. Your board will appear in the listing and on the dashboard.' },
      { q: 'How do I add tasks?', a: 'Open a board, then click "+ Add Item" at the bottom of any status column. Type a title and press Enter. You can then click the task to add details, assignees, and due dates.' },
      { q: 'How do I invite team members?', a: 'Team collaboration is managed through your board settings. Open a board, click the team icon in the header, and add collaborators by email.' },
    ],
  },
  {
    title: 'Boards & Tasks',
    icon: Folder,
    items: [
      { q: 'How do I change task status?', a: 'Click the status cell on any task row to open the status picker. You can also drag and drop tasks between columns in Kanban view.' },
      { q: 'What views are available?', a: 'Each board supports Table view (default spreadsheet-style), Kanban view (drag-and-drop columns), and Timeline view. Switch views using the view selector in the board header.' },
      { q: 'How do I filter and sort?', a: 'Use the filter bar at the top of your board to filter by person, status, priority, or date. Click any column header to sort by that field.' },
    ],
  },
  {
    title: 'Sprints & Backlog',
    icon: ListOrdered,
    items: [
      { q: 'How do I create a sprint?', a: 'Go to the Backlog page, click "Create Sprint," set a name, start/end dates, and capacity. Then drag user stories from the backlog into the sprint.' },
      { q: 'What are user stories?', a: 'User stories represent features or requirements. Create them in the Backlog page with a title, description, priority, and story points estimate.' },
      { q: 'How does sprint planning work?', a: 'Open a sprint and click "Plan Sprint." You\'ll see available stories ranked by priority. Drag them into the sprint until you reach the capacity target.' },
    ],
  },
  {
    title: 'Keyboard Shortcuts',
    icon: Keyboard,
    items: [
      { q: 'Search', a: 'Press Ctrl+K (or ⌘K on Mac) to open the global search dialog from anywhere.' },
      { q: 'Navigation', a: 'Use the sidebar links to navigate between Dashboard, Boards, Backlog, Calendar, and Analytics.' },
      { q: 'Theme toggle', a: 'Click the moon/sun icon in the sidebar to switch between dark and light mode instantly.' },
    ],
  },
];

function HelpCenterDialog({ open, onOpenChange }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (!open) {
      setExpandedSection(null);
      setExpandedItem(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Help Center</DialogTitle>
          <DialogDescription>
            Browse topics below to learn how AgileFlow works.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 -mx-6 px-6 space-y-1">
          {helpSections.map((section, si) => {
            const isOpen = expandedSection === si;
            const SectionIcon = section.icon;
            return (
              <div key={section.title}>
                <button
                  onClick={() => {
                    setExpandedSection(isOpen ? null : si);
                    setExpandedItem(null);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
                >
                  <SectionIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="flex-1 text-left">{section.title}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-150",
                    isOpen && "rotate-90"
                  )} />
                </button>
                {isOpen && (
                  <div className="ml-4 pl-3 border-l border-border space-y-0.5 mb-2">
                    {section.items.map((item, ii) => {
                      const itemOpen = expandedItem === `${si}-${ii}`;
                      return (
                        <div key={ii}>
                          <button
                            onClick={() => setExpandedItem(itemOpen ? null : `${si}-${ii}`)}
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                          >
                            {item.q}
                          </button>
                          {itemOpen && (
                            <p className="px-3 py-2 text-sm text-muted-foreground leading-relaxed">
                              {item.a}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LayoutContent({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const isMac = typeof navigator !== 'undefined' &&
    (navigator.platform?.includes('Mac') || navigator.userAgent?.includes('Mac'));

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const loadUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const isAdmin = currentUser?.role === 'admin';
  const navItems = isAdmin
    ? [...navigationItems, { title: "Admin", url: createPageUrl("Admin"), icon: Shield }]
    : navigationItems;

  const userInitials = currentUser?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Top: Logo + Search */}
      <div className="p-4 space-y-3">
        <Link to={createPageUrl("Dashboard")} className="flex items-center cursor-pointer">
          <span className="text-lg font-semibold text-foreground">AgileFlow</span>
        </Link>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center w-full px-3 py-1.5 border border-border rounded-md bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-sm cursor-pointer"
        >
          <Search className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>Search...</span>
          <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">
            {isMac ? '⌘K' : 'Ctrl+K'}
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer",
                isActive
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border px-3 py-2 space-y-0.5">
        <button
          onClick={() => setHelpOpen(true)}
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 flex-shrink-0" />
          <span>Help Center</span>
        </button>

        <ThemeToggle />

        <NotificationsDropdown />

        <Link
          to={createPageUrl("Settings")}
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span>Settings</span>
        </Link>
      </div>

      {/* User profile */}
      <div className="border-t border-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-accent transition-colors cursor-pointer">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", getAvatarColor(currentUser?.full_name))}>
                <span className="font-semibold text-xs">{userInitials}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-foreground truncate">
                  {currentUser?.full_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser?.email || ''}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" side="right" align="end">
            <DropdownMenuLabel>
              {currentUser?.full_name || 'My Account'}
              {isAdmin && (
                <Badge variant="secondary" className="ml-2 text-xs">Admin</Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to={createPageUrl("Settings")}>Settings</Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={createPageUrl("Admin")}>Admin Panel</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => supabase ? supabase.auth.signOut() : (window.location.href = '/login')}
              className="cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-60 bg-card border-r border-border z-40">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-60 bg-card border-r border-border z-50 md:hidden transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Mobile header bar */}
      <div className="md:hidden sticky top-0 z-30 bg-background border-b border-border px-4 h-14 flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          <MenuIcon className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </button>
        <span className="ml-3 text-lg font-semibold text-foreground">AgileFlow</span>
      </div>

      {/* Main content */}
      <main className="md:ml-60 min-h-screen">
        {children}
      </main>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <HelpCenterDialog open={helpOpen} onOpenChange={setHelpOpen} />
      <AIAssistant />
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <ThemeProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </ThemeProvider>
  );
}
