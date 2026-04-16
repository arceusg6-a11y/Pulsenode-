'use client';

import NFTCard from './NFTCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function NFTGrid({ nfts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.contractName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search NFTs by name or collection..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </motion.div>

      {/* NFT Grid */}
      {filteredNFTs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No NFTs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <NFTCard key={`${nft.contractAddress}-${nft.tokenId}`} nft={nft} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
