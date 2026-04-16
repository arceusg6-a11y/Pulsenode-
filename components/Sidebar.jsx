'use client';

import { LayoutDashboard, Heart, Activity, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import UserCounter from './UserCounter';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Heart, label: 'Watchlist', id: 'watchlist' },
  { icon: Activity, label: 'Activity', id: 'activity' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/50 fixed left-0 top-0 z-50"
    >
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Pulse Node</h1>
            <p className="text-xs text-slate-400">NFT Tracker</p>
          </div>
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-white border border-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
        {/* User Counter */}
        <UserCounter />

        {/* Network Status */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-2">Network Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-white font-medium">Connected</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
