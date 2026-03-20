import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, 
  Database, 
  Zap, 
  Shield,
  Activity,
  TrendingUp
} from "lucide-react";

import PerformanceMonitor from "../components/admin/PerformanceMonitor";

export default function PerformancePage() {
  return (
    <div className="p-6 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#323338] flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#0073EA]" />
            System Performance & Scalability
          </h1>
          <p className="text-[#676879] mt-2">Monitor system health and optimization metrics</p>
        </div>

        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="capacity">Capacity</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <PerformanceMonitor />
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Current System Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Expected Capacity (Supabase Platform)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Concurrent Users</span>
                        <span className="text-2xl font-bold text-blue-600">100-500</span>
                      </div>
                      <p className="text-xs text-gray-600">With current infrastructure</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Database Records</span>
                        <span className="text-2xl font-bold text-green-600">100K+</span>
                      </div>
                      <p className="text-xs text-gray-600">Boards, items, events</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">API Requests/Min</span>
                        <span className="text-2xl font-bold text-purple-600">1000+</span>
                      </div>
                      <p className="text-xs text-gray-600">With caching enabled</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Response Time</span>
                        <span className="text-2xl font-bold text-orange-600">{'<'}200ms</span>
                      </div>
                      <p className="text-xs text-gray-600">Average API response</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Scaling Strategy</h3>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">0-100 Users (Current)</h4>
                          <p className="text-sm text-gray-600">Standard Supabase infrastructure, client-side caching</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">100-500 Users</h4>
                          <p className="text-sm text-gray-600">Enable React Query caching, optimize database queries, implement pagination</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">500-2000 Users</h4>
                          <p className="text-sm text-gray-600">Add CDN, implement virtual scrolling, enable backend caching layer</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600 font-bold">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">2000+ Users (Enterprise)</h4>
                          <p className="text-sm text-gray-600">Dedicated infrastructure, load balancing, database replication, microservices</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Performance Optimizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">✅ Already Implemented</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>React Query for data fetching and caching</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Lazy loading with React.lazy() and Suspense</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Debounced search and input handlers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Optimistic UI updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Error boundaries for graceful failures</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">🔄 Recommended for High Load</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm p-3 bg-blue-50 rounded-lg">
                      <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Virtual Scrolling</p>
                        <p className="text-xs text-gray-600">Render only visible items in long lists (1000+ items)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm p-3 bg-green-50 rounded-lg">
                      <Database className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Database Indexing</p>
                        <p className="text-xs text-gray-600">Index frequently queried fields (board_id, status, created_by)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm p-3 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Pagination</p>
                        <p className="text-xs text-gray-600">Load 50 items per page instead of all data at once</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm p-3 bg-orange-50 rounded-lg">
                      <Server className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">CDN for Static Assets</p>
                        <p className="text-xs text-gray-600">Serve images and files from CDN (Cloudflare, AWS CloudFront)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">💡 Pro Tip</h4>
                  <p className="text-xs text-gray-700">
                    Monitor real user metrics (RUM) to identify actual bottlenecks. 
                    Optimize based on data, not assumptions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Measures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Row Level Security (RLS)
                    </h4>
                    <p className="text-sm text-green-700">
                      Users can only access their own data and shared boards
                    </p>
                  </div>
                  
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Input Sanitization
                    </h4>
                    <p className="text-sm text-blue-700">
                      All user inputs are sanitized to prevent XSS attacks
                    </p>
                  </div>
                  
                  <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">
                      Rate Limiting
                    </h4>
                    <p className="text-sm text-purple-700">
                      Prevents API abuse with request throttling
                    </p>
                  </div>
                  
                  <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">
                      Error Boundaries
                    </h4>
                    <p className="text-sm text-orange-700">
                      Graceful error handling prevents data exposure
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Security Checklist</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>HTTPS enabled for all connections</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>Authentication required for all routes</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>Role-based access control (Admin/User)</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>Activity logging for audit trails</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked readOnly className="rounded" />
                      <span>Regular security updates</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}