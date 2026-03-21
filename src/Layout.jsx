import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities/User";
import { Board } from "@/api/entities/Board";
import { Item } from "@/api/entities/Item";
import { Notification } from "@/api/entities/Notification";
import { supabase } from "@/api/supabaseClient";
import { ThemeProvider } from "@/components/utils/ThemeProvider";
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
  CheckCheck
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
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-3"
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
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors"
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
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md h-9 w-9 relative"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs h-7 text-muted-foreground">
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

function LayoutContent({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <div className="flex items-center">
              <Link to={createPageUrl("Dashboard")} className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold text-foreground">AgileFlow</span>
              </Link>

              {/* Desktop nav items */}
              <div className="hidden md:ml-8 md:flex md:items-center md:space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm transition-colors duration-150",
                        isActive
                          ? "bg-accent text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center w-full px-3 py-1.5 border border-border rounded-md bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-sm"
                >
                  <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Search everything...</span>
                  <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
                </button>
              </div>
            </div>

            {/* Right-side icons — desktop */}
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-1">
              <NotificationsDropdown />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md h-9 w-9"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
              <Link to={createPageUrl("Settings")}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md h-9 w-9"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>

              {/* User avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getAvatarColor(currentUser?.full_name))}>
                      <span className="font-semibold text-xs">{userInitials}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuLabel>
                    {currentUser?.full_name || 'My Account'}
                    {isAdmin && (
                      <Badge variant="secondary" className="ml-2 text-xs">Admin</Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("Settings")}>Settings</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Admin")}>Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md h-9 w-9"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base transition-colors duration-150",
                      isActive
                        ? "bg-accent text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 pb-3 border-t border-border">
              <div className="px-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                  className="flex items-center w-full px-3 py-2 border border-border rounded-md bg-background text-muted-foreground text-sm"
                >
                  <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                  Search everything...
                </button>
              </div>
            </div>

            <div className="pt-3 pb-3 border-t border-border">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", getAvatarColor(currentUser?.full_name))}>
                    <span className="font-semibold text-sm">{userInitials}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-foreground">{currentUser?.full_name || 'User Name'}</div>
                  <div className="text-sm text-muted-foreground">{currentUser?.email || 'user@example.com'}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to={createPageUrl("Settings")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
                >
                  Settings
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); supabase.auth.signOut(); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
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
