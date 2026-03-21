import React, { useState, useEffect } from 'react';
import { User as UserService } from '@/api/entities/User';
import { Board } from '@/api/entities/Board';
import { useAuth } from '@/lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
      alert('Failed to update user role.');
    }
  };

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleColors = {
    admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    member: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    viewer: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <Card className="max-w-md w-full dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
            <p className="text-gray-600 dark:text-gray-400">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0073EA] mx-auto mb-4"></div>
          <p className="text-lg text-gray-900 dark:text-white">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage users, roles, and system settings</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'Total Boards', value: stats.totalBoards, icon: LayoutGrid, color: 'from-green-500 to-green-600' },
            { label: 'Admins', value: stats.admins, icon: Crown, color: 'from-red-500 to-red-600' },
            { label: 'Active Today', value: stats.activeToday, icon: Activity, color: 'from-purple-500 to-purple-600' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="dark:text-white flex items-center gap-2">
                  <UserCog className="w-5 h-5" />
                  User Management
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {filteredUsers.length} users found
                </CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="pl-9 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Boards</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Joined</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const userBoards = boards.filter(b => b.user_id === u.id).length;
                    const initials = u.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
                    return (
                      <tr key={u.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-r from-[#0073EA] to-[#00C875] rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">{initials}</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {u.full_name || 'Unnamed User'}
                              {u.id === currentUser?.id && (
                                <span className="text-xs text-gray-500 ml-1">(you)</span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{u.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className={roleColors[u.role] || roleColors.member}>
                            {u.role || 'member'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{userBoards}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setEditingUser(u); setEditRole(u.role || 'member'); }}
                            disabled={u.id === currentUser?.id}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  No users found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Role Dialog */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Edit User Role</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Change the role for {editingUser?.full_name || editingUser?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select value={editRole} onValueChange={setEditRole}>
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="admin" className="dark:text-white">Admin - Full access</SelectItem>
                  <SelectItem value="member" className="dark:text-white">Member - Can create and edit</SelectItem>
                  <SelectItem value="viewer" className="dark:text-white">Viewer - Read-only access</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                <p><strong>Admin:</strong> Full system access, manage users and settings</p>
                <p><strong>Member:</strong> Create boards, manage own content</p>
                <p><strong>Viewer:</strong> View shared boards only</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)} className="dark:border-gray-600 dark:text-gray-300">
                Cancel
              </Button>
              <Button onClick={handleUpdateRole} className="bg-[#0073EA] hover:bg-[#0056B3]">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
