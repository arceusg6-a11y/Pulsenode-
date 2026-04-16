'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import StatBar from '@/components/StatBar';
import NFTGrid from '@/components/NFTGrid';
import ActivityFeed from '@/components/ActivityFeed';
import WalletInput from '@/components/WalletInput';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchWalletNFTs = async (address, network, forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      // Add cache-busting parameter for refresh
      const cacheBuster = forceRefresh ? `&t=${Date.now()}` : '';
      const response = await fetch(`/api/nfts/${address}?network=${network}${cacheBuster}`);
      const data = await response.json();

      if (response.ok) {
        setPortfolioData(data);
        setLastFetch(new Date());
      } else {
        setError(data.error || 'Failed to fetch NFTs');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching wallet NFTs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (address, network) => {
    await fetchWalletNFTs(address, network, true);
  };

  // Calculate top gainer
  const topGainer = portfolioData?.nfts?.length > 0
    ? portfolioData.nfts.reduce((max, nft) => (nft.pnl > max.pnl ? nft : max), portfolioData.nfts[0])
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="ml-64 p-8">
        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Wallet Input */}
              <WalletInput onSubmit={fetchWalletNFTs} loading={loading} onRefresh={handleRefresh} />

              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-16 h-16 text-violet-500 animate-spin mb-4" />
                  <p className="text-white text-lg font-semibold">Fetching NFTs...</p>
                  <p className="text-slate-400 text-sm">This may take a moment</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center"
                >
                  <p className="text-red-500 font-semibold">{error}</p>
                </motion.div>
              )}

              {/* Portfolio Data */}
              {!loading && !error && portfolioData && (
                <>
                  {/* Stat Bar */}
                  <StatBar
                    totalValue={portfolioData.totalValue}
                    portfolioPNL={portfolioData.portfolioPNL}
                    topGainer={topGainer}
                  />

                  {/* NFT Grid */}
                  <NFTGrid nfts={portfolioData.nfts} />
                </>
              )}

              {/* Empty State */}
              {!loading && !error && !portfolioData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-10 h-10 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome to Pulse Node</h3>
                  <p className="text-slate-400">Enter a wallet address to start tracking NFTs</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Watchlist Tab */}
          {activeTab === 'watchlist' && (
            <motion.div
              key="watchlist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Watchlist</h2>
              <p className="text-slate-400">Coming soon - Save and track your favorite NFTs</p>
            </motion.div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Live Activity</h2>
              <ActivityFeed />
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center py-20"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Settings</h2>
              <p className="text-slate-400">Coming soon - Customize your experience</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
