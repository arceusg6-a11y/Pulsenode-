'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye } from 'lucide-react';

export default function UserCounter() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats({
        totalUsers: data.totalUsers || 0,
        activeUsers: data.activeUsers || 0,
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="bg-gradient-to-br from-violet-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-violet-500/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Collectors</p>
            {loading ? (
              <div className="w-16 h-5 bg-slate-700/50 rounded animate-pulse" />
            ) : (
              <motion.p
                key={stats.totalUsers}
                initial={{ scale: 1.2, color: '#a78bfa' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="text-lg font-bold text-white"
              >
                {formatNumber(stats.totalUsers)}+
              </motion.p>
            )}
          </div>
        </div>
        <p className="text-xs text-violet-400/70">
          Joined by {formatNumber(stats.totalUsers)}+ collectors
        </p>
      </div>

      {stats.activeUsers > 0 && (
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Active Now</p>
              {loading ? (
                <div className="w-12 h-5 bg-slate-700/50 rounded animate-pulse" />
              ) : (
                <motion.p
                  key={stats.activeUsers}
                  initial={{ scale: 1.2, color: '#4ade80' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-lg font-bold text-white"
                >
                  {stats.activeUsers}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
