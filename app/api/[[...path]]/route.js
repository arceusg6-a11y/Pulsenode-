import { NextResponse } from 'next/server';
import { getNFTsForOwner } from '@/lib/alchemy';
import { getCollectionStats, getNFTByContract } from '@/lib/opensea';
import { getCollectionFloorPrice, getTokenDetails } from '@/lib/reservoir';
import { estimatePurchasePrice, calculatePNL } from '@/lib/utils/priceUtils';

// GET /api/
export async function GET(request) {
  const { pathname, searchParams } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  // Health check endpoint
  if (path === '/') {
    return NextResponse.json({ 
      message: 'Pulse Node API is running',
      status: 'ok'
    });
  }

  // GET /api/nfts/:address
  if (path.startsWith('/nfts/')) {
    const address = path.split('/nfts/')[1];
    const network = searchParams.get('network') || 'ethereum';

    try {
      const nftsData = await getNFTsForOwner(address, network);
      
      // Process NFTs and add floor prices
      const nftsWithPrices = await Promise.all(
        nftsData.ownedNfts.slice(0, 50).map(async (nft) => {
          let floorPrice = 0;
          let lastSale = 0;
          let purchasePrice = 0;
          let pnl = 0;

          try {
            // Try OpenSea API first (primary source)
            const openSeaNFT = await getNFTByContract(
              nft.contract.address,
              nft.tokenId
            );

            if (openSeaNFT?.nft) {
              // Extract floor price from OpenSea data
              floorPrice = openSeaNFT.nft.collection?.floor_price || 0;
              lastSale = openSeaNFT.nft.last_sale?.total_price || 0;
            }

            // If OpenSea fails or returns no data, try Reservoir as fallback
            if (floorPrice === 0) {
              const tokenDetails = await getTokenDetails(
                nft.contract.address,
                nft.tokenId
              );

              if (tokenDetails) {
                floorPrice = tokenDetails.floorPrice || 0;
                lastSale = tokenDetails.lastSale || 0;
              }
            }

            // If still no data, try collection floor price from Reservoir
            if (floorPrice === 0) {
              const collectionData = await getCollectionFloorPrice(
                nft.contract.address
              );
              if (collectionData) {
                floorPrice = collectionData.floorPrice;
              }
            }

            // Estimate purchase price for PNL calculation
            if (floorPrice > 0) {
              purchasePrice = estimatePurchasePrice(floorPrice);
              pnl = calculatePNL(floorPrice, purchasePrice);
            }
          } catch (error) {
            console.error(`Error fetching prices for ${nft.contract.address}:`, error.message);
          }

          return {
            tokenId: nft.tokenId,
            name: nft.name || nft.contract.name || 'Unnamed NFT',
            description: nft.description,
            image: nft.image?.cachedUrl || nft.image?.originalUrl || nft.image?.thumbnailUrl || '/placeholder.png',
            contractAddress: nft.contract.address,
            contractName: nft.contract.name,
            tokenType: nft.tokenType,
            floorPrice,
            lastSale,
            purchasePrice,
            pnl,
            attributes: nft.raw?.metadata?.attributes || [],
          };
        })
      );

      // Calculate total portfolio value
      const totalValue = nftsWithPrices.reduce((sum, nft) => sum + (nft.floorPrice || 0), 0);
      const totalPurchaseValue = nftsWithPrices.reduce((sum, nft) => sum + (nft.purchasePrice || 0), 0);
      const portfolioPNL = totalPurchaseValue > 0 ? calculatePNL(totalValue, totalPurchaseValue) : 0;

      return NextResponse.json({
        address,
        network,
        totalNFTs: nftsData.totalCount,
        displayedNFTs: nftsWithPrices.length,
        totalValue,
        portfolioPNL,
        nfts: nftsWithPrices,
      });
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch NFTs', details: error.message },
        { status: 500 }
      );
    }
  }

  // GET /api/activity
  if (path === '/activity') {
    // Mock activity data for now
    const mockActivity = [
      {
        id: '1',
        type: 'sale',
        nftName: 'Bored Ape #1234',
        price: 45.5,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '2',
        type: 'sale',
        nftName: 'CryptoPunk #5678',
        price: 78.2,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: '3',
        type: 'sale',
        nftName: 'Azuki #9012',
        price: 12.8,
        timestamp: new Date(Date.now() - 10800000).toISOString(),
      },
    ];

    return NextResponse.json({ activity: mockActivity });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
