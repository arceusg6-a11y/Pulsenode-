'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatETH, formatUSD, formatPercentage } from '@/lib/utils/priceUtils';

export default function StatBar({ totalValue, portfolioPNL, topGainer, ethPrice = 3500 }) {
  const totalValueUSD = totalValue * ethPrice;
  const isProfitable = portfolioPNL >= 0;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Net Worth */}
        <div className="space-y-2">
          <p className="text-sm text-slate-400 font-medium">Total Net Worth</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{formatETH(totalValue)}</span>
            <span className="text-lg text-violet-400 font-semibold">ETH</span>
          </div>
          <p className="text-sm text-slate-400">{formatUSD(totalValueUSD)}</p>
        </div>

        {/* 24h Change */}
        <div className="space-y-2">
          <p className="text-sm text-slate-400 font-medium">Portfolio P&L</p>
          <div className="flex items-center gap-2">
            {isProfitable ? (
              <TrendingUp className="w-6 h-6 text-green-500" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-500" />
            )}
            <span
              className={`text-3xl font-bold ${
                isProfitable ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {formatPercentage(portfolioPNL)}
            </span>
          </div>
          <p className="text-sm text-slate-400">
            {isProfitable ? 'Profit' : 'Loss'} since estimated purchase
          </p>
        </div>

        {/* Top Gainer */}
        <div className="space-y-2">
          <p className="text-sm text-slate-400 font-medium">Top Gainer</p>
          <div className="flex items-center gap-3">
            {topGainer?.image && (
              <img
                src={topGainer.image}
                alt={topGainer.name}
                className="w-12 h-12 rounded-lg object-cover border border-violet-500/30"
              />
            )}
            <div>
              <p className="text-white font-semibold truncate max-w-[150px]">
                {topGainer?.name || 'N/A'}
              </p>
              <p className="text-green-500 font-bold">
                {topGainer?.pnl ? formatPercentage(topGainer.pnl) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
