import React, { useState, useEffect } from 'react';
import { User as UserService } from '@/api/entities/User';
import { Board } from '@/api/entities/Board';
import { useAuth } from '@/lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  Shield,
  Users,
  Search,
  UserCog,
  LayoutGrid,
  Activity,
  Crown,
  Edit2,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [stats, setStats] = useState({ totalUsers: 0, totalBoards: 0, admins: 0, activeToday: 0 });

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [usersData, boardsData] = await Promise.all([
        UserService.listAll(),
        Board.list()
      ]);
      setUsers(usersData);
      setBoards(boardsData);
      setStats({
        totalUsers: usersData.length,
        totalBoards: boardsData.length,
        admins: usersData.filter(u => u.role === 'admin').length,
        activeToday: usersData.filter(u => {
          const updated = new Date(u.updated_at);
          const today = new Date();
          return updated.toDateString() === today.toDateString();
        }).length
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleUpdateRole = async () => {
    if (!editingUser || !editRole) return;
    try {
      await UserService.updateUser(editingUser.id, { role: editRole });
      setEditingUser(null);
      setEditRole('');
      await loadData();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Update failed",
        description: "Could not update the user role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleColors = {
    admin:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    member: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    viewer: 'bg-muted text-muted-foreground'
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full border border-border bg-card">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You need administrator privileges to access this page.
              Contact your admin to request access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users',   value: stats.totalUsers,  icon: Users    },
    { label: 'Total Boards',  value: stats.totalBoards, icon: LayoutGrid },
    { label: 'Admins',        value: stats.admins,      icon: Crown    },
    { label: 'Active Today',  value: stats.activeToday, icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background p-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Manage users, roles, and system settings</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <UserCog className="w-5 h-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  {filteredUsers.length} users found
                </CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground border-b border-border">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground border-b border-border">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground border-b border-border">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground border-b border-border">Boards</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground border-b border-border">Joined</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground border-b border-border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const userBoards = boards.filter(b => b.user_id === u.id).length;
                    const initials = u.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
                    return (
                      <tr key={u.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-foreground font-bold text-xs">{initials}</span>
                            </div>
                            <span className="font-medium text-foreground">
                              {u.full_name || 'Unnamed User'}
                              {u.id === currentUser?.id && (
                                <span className="text-xs text-muted-foreground ml-1">(you)</span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{u.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className={cn(roleColors[u.role] || roleColors.member)}>
                            {u.role || 'member'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{userBoards}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingUser(u); setEditRole(u.role || 'member'); }}
                            disabled={u.id === currentUser?.id}
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit Role
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No users found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Role Dialog */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User Role</DialogTitle>
              <DialogDescription>
                Change the role for {editingUser?.full_name || editingUser?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select value={editRole} onValueChange={setEditRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                  <SelectItem value="member">Member - Can create and edit</SelectItem>
                  <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-3 text-sm text-muted-foreground space-y-1">
                <p><strong>Admin:</strong> Full system access, manage users and settings</p>
                <p><strong>Member:</strong> Create boards, manage own content</p>
                <p><strong>Viewer:</strong> View shared boards only</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRole}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
