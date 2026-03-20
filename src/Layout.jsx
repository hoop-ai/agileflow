import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities/User";
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
  Briefcase,
  X,
  TrendingUp,
  ListOrdered,
  Calendar as CalendarIconMenu
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

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutGrid,
  },
  {
    title: "Boards",
    url: createPageUrl("Boards"),
    icon: Folder,
  },
  {
    title: "Backlog",
    url: createPageUrl("Backlog"),
    icon: ListOrdered,
  },
  {
    title: "Calendar",
    url: createPageUrl("Calendar"),
    icon: CalendarIconMenu,
  },
  {
    title: "Analytics",
    url: createPageUrl("Analytics"),
    icon: TrendingUp,
  },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

function LayoutContent({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const userInitials = currentUser?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F8] dark:bg-gray-900 transition-colors duration-200">
      <style>{`
        body {
          transition: background-color 0.2s, color 0.2s;
        }
      `}</style>
      
      <nav className="bg-white dark:bg-gray-800 border-b border-[#E1E5F3] dark:border-gray-700 shadow-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={createPageUrl("Dashboard")} className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-[#323338] dark:text-white text-xl">AgileFlow</span>
              </Link>

              <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.url
                        ? 'bg-[#E1E5F3] dark:bg-gray-700 text-[#0073EA] dark:text-blue-400'
                        : 'text-[#323338] dark:text-gray-300 hover:bg-[#F5F6F8] dark:hover:bg-gray-700 hover:text-[#0073EA] dark:hover:text-blue-400'
                    }`}
                    aria-current={location.pathname === item.url ? 'page' : undefined}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0073EA] focus:border-[#0073EA] sm:text-sm"
                    placeholder="Search everything..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-2">
              <Button variant="ghost" size="icon" className="hover:bg-[#E1E5F3] dark:hover:bg-gray-700 rounded-lg h-10 w-10">
                <Bell className="w-5 h-5 text-[#676879] dark:text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-[#E1E5F3] dark:hover:bg-gray-700 rounded-lg h-10 w-10">
                <HelpCircle className="w-5 h-5 text-[#676879] dark:text-gray-400" />
              </Button>
              <Link to={createPageUrl("Settings")}>
                <Button variant="ghost" size="icon" className="hover:bg-[#E1E5F3] dark:hover:bg-gray-700 rounded-lg h-10 w-10">
                  <Settings className="w-5 h-5 text-[#676879] dark:text-gray-400" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                     <div className="w-8 h-8 bg-gradient-to-r from-[#0073EA] to-[#00C875] rounded-full flex items-center justify-center">
                       <span className="text-white font-bold text-xs">{userInitials}</span>
                     </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 dark:bg-gray-800 dark:border-gray-700" align="end">
                  <DropdownMenuLabel className="dark:text-white">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem asChild className="dark:hover:bg-gray-700 dark:text-gray-300">
                    <Link to={createPageUrl("Settings")}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => supabase.auth.signOut()} className="dark:hover:bg-gray-700 dark:text-gray-300"> 
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-[#E1E5F3] dark:hover:bg-gray-700 rounded-lg h-10 w-10"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6 dark:text-gray-300" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6 dark:text-gray-300" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E1E5F3] dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.url
                      ? 'bg-[#E1E5F3] dark:bg-gray-700 text-[#0073EA] dark:text-blue-400'
                      : 'text-[#323338] dark:text-gray-300 hover:bg-[#F5F6F8] dark:hover:bg-gray-700 hover:text-[#0073EA] dark:hover:text-blue-400'
                  }`}
                  aria-current={location.pathname === item.url ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
               <div className="px-2">
                <label htmlFor="search-mobile" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Input
                    id="search-mobile"
                    name="search-mobile"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0073EA] focus:border-[#0073EA] sm:text-sm"
                    placeholder="Search everything..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#0073EA] to-[#00C875] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{userInitials}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">{currentUser?.full_name || 'User Name'}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{currentUser?.email || 'user@example.com'}</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto hover:bg-[#E1E5F3] dark:hover:bg-gray-700 rounded-lg h-10 w-10">
                  <Bell className="w-5 h-5 text-[#676879] dark:text-gray-400" />
                </Button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                        setMobileMenuOpen(false);
                        if (item.name === 'Sign out') {
                            supabase.auth.signOut();
                        }
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>

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