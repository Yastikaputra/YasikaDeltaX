import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Mail, 
  Percent, 
  Activity, 
  Calendar, 
  RefreshCw,
  Filter,
  ArrowUpRight,
  Clock,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Event {
  id: string;
  type: string;
  page: string;
  metadata: any;
  created_at: string;
}

const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const metrics = useMemo(() => {
    const totalVisitors = events.filter(e => e.type === 'page_view').length;
    const totalEmails = events.filter(e => e.type === 'email_submit').length;
    const conversionRate = totalVisitors > 0 ? ((totalEmails / totalVisitors) * 100).toFixed(1) : '0';
    
    const today = new Date().toISOString().split('T')[0];
    const todayVisitors = events.filter(e => 
      e.type === 'page_view' && e.created_at.startsWith(today)
    ).length;

    return {
      totalVisitors,
      totalEmails,
      conversionRate,
      totalEvents: events.length,
      todayVisitors
    };
  }, [events]);

  const chartData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayEvents = events.filter(e => e.created_at.startsWith(date));
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        visitors: dayEvents.filter(e => e.type === 'page_view').length,
        conversions: dayEvents.filter(e => e.type === 'email_submit').length,
      };
    });
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (filter === 'All') return events.slice(0, 10);
    return events.filter(e => e.type === filter).slice(0, 10);
  }, [events, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-10 h-10 text-primary-pulse-end animate-spin" />
          <p className="text-gray-400 font-headline tracking-widest uppercase text-sm">Synchronizing Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tighter text-white mb-2">Command Center</h1>
            <p className="text-gray-500">Real-time intelligence and performance metrics.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-low px-4 py-2 rounded-lg border border-white/5">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-sm text-gray-300 border-none focus:ring-0 cursor-pointer"
              >
                <option value="All">All Events</option>
                <option value="page_view">Page Views</option>
                <option value="email_submit">Email Submits</option>
              </select>
            </div>
            <button 
              onClick={fetchData}
              disabled={refreshing}
              className="flex items-center gap-2 bg-primary-pulse-end text-black px-6 py-2 rounded-lg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard 
            title="Total Visitors" 
            value={metrics.totalVisitors} 
            icon={<Users className="w-5 h-5" />} 
            trend="+12.5%"
          />
          <MetricCard 
            title="Email Submissions" 
            value={metrics.totalEmails} 
            icon={<Mail className="w-5 h-5" />} 
            trend="+8.2%"
          />
          <MetricCard 
            title="Conversion Rate" 
            value={`${metrics.conversionRate}%`} 
            icon={<Percent className="w-5 h-5" />} 
            trend="+2.4%"
          />
          <MetricCard 
            title="Today's Traffic" 
            value={metrics.todayVisitors} 
            icon={<Calendar className="w-5 h-5" />} 
            trend="Live"
            isLive
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-8 glass-card p-8 rounded-xl border-t border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold font-headline tracking-tight">Traffic Overview</h3>
              <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest">
                <span className="flex items-center gap-2 text-primary-pulse-end">
                  <div className="w-2 h-2 rounded-full bg-primary-pulse-end" /> Visitors
                </span>
                <span className="flex items-center gap-2 text-white">
                  <div className="w-2 h-2 rounded-full bg-white" /> Conversions
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#4b5563" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#4b5563" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="visitors" fill="#007aff" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="conversions" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-4 glass-card p-8 rounded-xl border-t border-white/5">
            <h3 className="text-xl font-bold font-headline tracking-tight mb-8">Recent Activity</h3>
            <div className="space-y-6">
              {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4 group">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    event.type === 'email_submit' ? "bg-primary-pulse-end/10 text-primary-pulse-end" : "bg-white/5 text-gray-400"
                  )}>
                    {event.type === 'email_submit' ? <Mail className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{event.type === 'email_submit' ? 'New Submission' : 'Page View'}</p>
                    <p className="text-xs text-gray-500 truncate">{event.page}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">
                      {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12">
                  <Database className="w-8 h-8 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No recent activity found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="mt-12 glass-card rounded-xl border-t border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold font-headline tracking-tight">Event Log</h3>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Showing Last 10 Entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/2">
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Event ID</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Page Path</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-8 py-4 font-mono text-[10px] text-gray-500">{event.id}</td>
                    <td className="px-8 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter",
                        event.type === 'email_submit' ? "bg-primary-pulse-end/20 text-primary-pulse-end" : "bg-white/10 text-gray-400"
                      )}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-300">{event.page}</td>
                    <td className="px-8 py-4 text-sm text-gray-500">
                      {new Date(event.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend, isLive }: { title: string, value: any, icon: React.ReactNode, trend: string, isLive?: boolean }) => (
  <div className="glass-card p-6 rounded-xl border-t border-white/5 group hover:border-primary-pulse-end/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="bg-white/5 p-2 rounded-lg text-gray-400 group-hover:text-primary-pulse-end transition-colors">
        {icon}
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
        isLive ? "text-primary-pulse-end" : "text-emerald-500"
      )}>
        {isLive && <div className="w-1.5 h-1.5 rounded-full bg-primary-pulse-end animate-pulse" />}
        {trend}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{title}</p>
      <p className="text-3xl font-bold font-headline tracking-tighter text-white">{value}</p>
    </div>
  </div>
);

export default AdminPage;
