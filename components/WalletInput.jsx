'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Search, Loader2, RefreshCw } from 'lucide-react';

export default function WalletInput({ onSubmit, loading, onRefresh }) {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address.trim(), network);
    }
  };

  const handleRefresh = async () => {
    if (address.trim() && !loading && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh(address.trim(), network);
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/30 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-violet-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-white">Track Wallet</h2>
          <p className="text-sm text-slate-400">Multi-chain NFT portfolio tracking</p>
        </div>
        {address && !loading && (
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center hover:from-green-500/30 hover:to-emerald-500/30 transition-all disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 text-green-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x... or ENS name"
            className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/50 transition-colors"
            disabled={loading}
          />
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors min-w-[140px]"
            disabled={loading}
          >
            <option value="ethereum">Ethereum</option>
            <option value="base">Base</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading || !address.trim()}
            className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Track
              </>
            )}
          </motion.button>
        </div>
        {address && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span>Tracking on {network.charAt(0).toUpperCase() + network.slice(1)}</span>
          </div>
        )}
      </form>
    </motion.div>
  );
}
