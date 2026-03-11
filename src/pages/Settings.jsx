import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useTheme } from "@/components/utils/ThemeProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Save,
  CheckCircle2,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { theme: currentTheme, setTheme: updateTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [settings, setSettings] = useState({
    full_name: '',
    email: '',
    job_title: '',
    department: '',
    email_notifications: true,
    task_assignments: true,
    mentions: true,
    due_date_reminders: true,
    sprint_updates: true,
    daily_digest: false,
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    date_format: 'MM/DD/YYYY',
    week_start: 'sunday',
    profile_visibility: 'team',
    show_email: true,
    activity_tracking: true
  });

  useEffect(() => {
    loadUserSettings();
  }, []);

  // Sync settings.theme with currentTheme from context
  useEffect(() => {
    if (currentTheme && settings.theme !== currentTheme) {
      setSettings(prev => ({ ...prev, theme: currentTheme }));
    }
  }, [currentTheme]);

  const loadUserSettings = async () => {
    setIsLoading(true);
    try {
      const userData = await base44.auth.me();
      setUser(userData);
      
      setSettings({
        full_name: userData.full_name || '',
        email: userData.email || '',
        job_title: userData.job_title || '',
        department: userData.department || '',
        email_notifications: userData.email_notifications !== false,
        task_assignments: userData.task_assignments !== false,
        mentions: userData.mentions !== false,
        due_date_reminders: userData.due_date_reminders !== false,
        sprint_updates: userData.sprint_updates !== false,
        daily_digest: userData.daily_digest || false,
        theme: userData.theme || currentTheme || 'light',
        language: userData.language || 'en',
        timezone: userData.timezone || 'UTC',
        date_format: userData.date_format || 'MM/DD/YYYY',
        week_start: userData.week_start || 'sunday',
        profile_visibility: userData.profile_visibility || 'team',
        show_email: userData.show_email !== false,
        activity_tracking: userData.activity_tracking !== false
      });
    } catch (error) {
      console.error('Error loading user settings:', error);
    }
    setIsLoading(false);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      await base44.auth.updateMe({
        full_name: settings.full_name,
        job_title: settings.job_title,
        department: settings.department,
        email_notifications: settings.email_notifications,
        task_assignments: settings.task_assignments,
        mentions: settings.mentions,
        due_date_reminders: settings.due_date_reminders,
        sprint_updates: settings.sprint_updates,
        daily_digest: settings.daily_digest,
        theme: settings.theme,
        language: settings.language,
        timezone: settings.timezone,
        date_format: settings.date_format,
        week_start: settings.week_start,
        profile_visibility: settings.profile_visibility,
        show_email: settings.show_email,
        activity_tracking: settings.activity_tracking
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      await loadUserSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
    
    setIsSaving(false);
  };

  const handleThemeChange = (value) => {
    console.log('Theme dropdown changed to:', value);
    setSettings(prev => ({ ...prev, theme: value }));
    updateTheme(value);
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0073EA] mx-auto mb-4"></div>
          <p className="text-lg text-gray-900 dark:text-white">Loading settings...</p>
        </div>
      </div>
    );
  }

  const userInitials = settings.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-white">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-white">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-white">
              <Palette className="w-4 h-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-white">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Profile Information</CardTitle>
                  <CardDescription className="dark:text-gray-400">Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24 bg-gradient-to-r from-[#0073EA] to-[#00C875]">
                      <AvatarFallback className="text-2xl font-bold text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{settings.full_name || 'User'}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{settings.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Role: <span className="font-medium capitalize">{user?.role || 'User'}</span>
                      </p>
                    </div>
                  </div>

                  <Separator className="dark:bg-gray-700" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="dark:text-white">Full Name</Label>
                      <Input
                        id="full_name"
                        value={settings.full_name}
                        onChange={(e) => setSettings(prev => ({ ...prev, full_name: e.target.value }))}
                        placeholder="Enter your full name"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-white">Email</Label>
                      <Input
                        id="email"
                        value={settings.email}
                        disabled
                        className="bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_title" className="dark:text-white">Job Title</Label>
                      <Input
                        id="job_title"
                        value={settings.job_title}
                        onChange={(e) => setSettings(prev => ({ ...prev, job_title: e.target.value }))}
                        placeholder="e.g., Product Manager"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department" className="dark:text-white">Department</Label>
                      <Input
                        id="department"
                        value={settings.department}
                        onChange={(e) => setSettings(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="e.g., Engineering"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Notification Preferences</CardTitle>
                  <CardDescription className="dark:text-gray-400">Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_notifications" className="text-base dark:text-white">Email Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive email notifications for updates</p>
                      </div>
                      <Switch
                        id="email_notifications"
                        checked={settings.email_notifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, email_notifications: checked }))}
                      />
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="task_assignments" className="text-base dark:text-white">Task Assignments</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when tasks are assigned to you</p>
                      </div>
                      <Switch
                        id="task_assignments"
                        checked={settings.task_assignments}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, task_assignments: checked }))}
                      />
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mentions" className="text-base dark:text-white">Mentions</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when someone mentions you</p>
                      </div>
                      <Switch
                        id="mentions"
                        checked={settings.mentions}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, mentions: checked }))}
                      />
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="due_date_reminders" className="text-base dark:text-white">Due Date Reminders</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive reminders for upcoming due dates</p>
                      </div>
                      <Switch
                        id="due_date_reminders"
                        checked={settings.due_date_reminders}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, due_date_reminders: checked }))}
                      />
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sprint_updates" className="text-base dark:text-white">Sprint Updates</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about sprint changes and updates</p>
                      </div>
                      <Switch
                        id="sprint_updates"
                        checked={settings.sprint_updates}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sprint_updates: checked }))}
                      />
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="daily_digest" className="text-base dark:text-white">Daily Digest</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive a daily summary of your tasks</p>
                      </div>
                      <Switch
                        id="daily_digest"
                        checked={settings.daily_digest}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, daily_digest: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Display Preferences</CardTitle>
                  <CardDescription className="dark:text-gray-400">Customize how the application looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme" className="dark:text-white">Theme</Label>
                      <Select
                        value={settings.theme}
                        onValueChange={handleThemeChange}
                      >
                        <SelectTrigger id="theme" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="light" className="dark:text-white dark:hover:bg-gray-700">Light</SelectItem>
                          <SelectItem value="dark" className="dark:text-white dark:hover:bg-gray-700">Dark</SelectItem>
                          <SelectItem value="auto" className="dark:text-white dark:hover:bg-gray-700">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Theme changes apply immediately</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language" className="dark:text-white">Language</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger id="language" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="en" className="dark:text-white dark:hover:bg-gray-700">English</SelectItem>
                          <SelectItem value="es" className="dark:text-white dark:hover:bg-gray-700">Spanish</SelectItem>
                          <SelectItem value="fr" className="dark:text-white dark:hover:bg-gray-700">French</SelectItem>
                          <SelectItem value="de" className="dark:text-white dark:hover:bg-gray-700">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="dark:text-white">Timezone</Label>
                      <Select
                        value={settings.timezone}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger id="timezone" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="UTC" className="dark:text-white dark:hover:bg-gray-700">UTC</SelectItem>
                          <SelectItem value="America/New_York" className="dark:text-white dark:hover:bg-gray-700">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago" className="dark:text-white dark:hover:bg-gray-700">Central Time</SelectItem>
                          <SelectItem value="America/Los_Angeles" className="dark:text-white dark:hover:bg-gray-700">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London" className="dark:text-white dark:hover:bg-gray-700">London</SelectItem>
                          <SelectItem value="Europe/Paris" className="dark:text-white dark:hover:bg-gray-700">Paris</SelectItem>
                          <SelectItem value="Asia/Tokyo" className="dark:text-white dark:hover:bg-gray-700">Tokyo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_format" className="dark:text-white">Date Format</Label>
                      <Select
                        value={settings.date_format}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, date_format: value }))}
                      >
                        <SelectTrigger id="date_format" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="MM/DD/YYYY" className="dark:text-white dark:hover:bg-gray-700">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY" className="dark:text-white dark:hover:bg-gray-700">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD" className="dark:text-white dark:hover:bg-gray-700">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="week_start" className="dark:text-white">Week Starts On</Label>
                      <Select
                        value={settings.week_start}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, week_start: value }))}
                      >
                        <SelectTrigger id="week_start" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="sunday" className="dark:text-white dark:hover:bg-gray-700">Sunday</SelectItem>
                          <SelectItem value="monday" className="dark:text-white dark:hover:bg-gray-700">Monday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Privacy & Security</CardTitle>
                  <CardDescription className="dark:text-gray-400">Manage your privacy and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile_visibility" className="dark:text-white">Profile Visibility</Label>
                      <Select
                        value={settings.profile_visibility}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, profile_visibility: value }))}
                      >
                        <SelectTrigger id="profile_visibility" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="public" className="dark:text-white dark:hover:bg-gray-700">Public - Anyone can see</SelectItem>
                          <SelectItem value="team" className="dark:text-white dark:hover:bg-gray-700">Team Only - Only team members</SelectItem>
                          <SelectItem value="private" className="dark:text-white dark:hover:bg-gray-700">Private - Only me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show_email" className="text-base dark:text-white">Show Email Address</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow others to see your email address</p>
                      </div>
                      <Switch
                        id="show_email"
                        checked={settings.show_email}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, show_email: checked }))}
                      />
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity_tracking" className="text-base dark:text-white">Activity Tracking</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow tracking of your activity for analytics</p>
                      </div>
                      <Switch
                        id="activity_tracking"
                        checked={settings.activity_tracking}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, activity_tracking: checked }))}
                      />
                    </div>
                  </div>

                  <Separator className="dark:bg-gray-700" />

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-950 dark:border-red-900">
                    <h3 className="text-red-900 font-semibold mb-2 dark:text-red-300">Danger Zone</h3>
                    <p className="text-sm text-red-700 mb-4 dark:text-red-400">These actions cannot be undone</p>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className={`rounded-full h-14 px-8 shadow-lg ${
                saveSuccess 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-[#0073EA] hover:bg-[#0056B3]'
              } text-white font-medium`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}