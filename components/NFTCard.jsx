'use client';

import { motion } from 'framer-motion';
import { formatETH, formatPercentage } from '@/lib/utils/priceUtils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function NFTCard({ nft, index }) {
  const isProfitable = nft.pnl >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 hover:border-violet-500/50 transition-all duration-300"
    >
      {/* Glassmorphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-blue-500/0 group-hover:from-violet-500/10 group-hover:to-blue-500/10 transition-all duration-300" />

      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400/1e293b/64748b?text=NFT';
          }}
        />
        
        {/* Hover overlay with floor price vs last sale */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Floor Price</span>
              <span className="text-sm font-bold text-white">
                {nft.floorPrice > 0 ? `${formatETH(nft.floorPrice)} ETH` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Est. Purchase</span>
              <span className="text-sm font-bold text-slate-400">
                {nft.purchasePrice > 0 ? `${formatETH(nft.purchasePrice)} ETH` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white font-bold text-lg truncate group-hover:text-violet-400 transition-colors">
            {nft.name}
          </h3>
          <p className="text-slate-400 text-sm truncate">{nft.contractName}</p>
        </div>

        {/* P&L Badge */}
        {nft.pnl !== 0 && (
          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg w-fit ${
              isProfitable
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            {isProfitable ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm font-bold ${
                isProfitable ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {formatPercentage(nft.pnl)}
            </span>
          </div>
        )}

        {/* Token ID */}
        <div className="text-xs text-slate-500">
          Token ID: #{nft.tokenId}
        </div>
      </div>
    </motion.div>
  );
}
