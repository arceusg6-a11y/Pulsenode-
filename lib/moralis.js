import axios from 'axios';

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
const MORALIS_BASE_URL = 'https://deep-index.moralis.io/api/v2.2';

// Get NFT floor price by contract address
export async function getNFTContractFloorPrice(contractAddress, chain = 'eth') {
  try {
    const response = await axios.get(
      `${MORALIS_BASE_URL}/nft/${contractAddress}/lowestprice`,
      {
        params: { chain },
        headers: {
          'X-API-Key': MORALIS_API_KEY,
          'accept': 'application/json',
        },
      }
    );
    
    if (response.data?.price) {
      // Moralis returns price in Wei, convert to ETH
      const priceInEth = parseFloat(response.data.price) / 1e18;
      return {
        floorPrice: priceInEth,
        marketplace: response.data.marketplace || 'Unknown',
        tokenAddress: response.data.token_address,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching floor price from Moralis:', error.message);
    return null;
  }
}

// Get NFT metadata
export async function getNFTMetadataMoralis(contractAddress, tokenId, chain = 'eth') {
  try {
    const response = await axios.get(
      `${MORALIS_BASE_URL}/nft/${contractAddress}/${tokenId}`,
      {
        params: { 
          chain,
          format: 'decimal',
          normalizeMetadata: true,
        },
        headers: {
          'X-API-Key': MORALIS_API_KEY,
          'accept': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching NFT metadata from Moralis:', error.message);
    return null;
  }
}

// Get NFT collection floor price (aggregated)
export async function getCollectionFloorPriceMoralis(contractAddress, chain = 'eth') {
  try {
    // Map network names to Moralis chain format
    const chainMap = {
      'ethereum': 'eth',
      'base': 'base',
      'polygon': 'polygon',
      'solana': 'solana',
    };
    
    const moralisChain = chainMap[chain] || chain;
    
    const response = await axios.get(
      `${MORALIS_BASE_URL}/nft/${contractAddress}/floor-price`,
      {
        params: { chain: moralisChain },
        headers: {
          'X-API-Key': MORALIS_API_KEY,
          'accept': 'application/json',
        },
      }
    );
    
    if (response.data && response.data.floor_price) {
      return {
        floorPrice: parseFloat(response.data.floor_price) || 0,
        floorPriceUsd: parseFloat(response.data.floor_price_usd) || 0,
        marketplace: response.data.marketplace?.name || 'Unknown',
        lastUpdated: response.data.last_updated || new Date().toISOString(),
      };
    }
    return null;
  } catch (error) {
    // Don't log for 404s or chains that don't have data
    if (error.response?.status !== 404) {
      console.error(`Error fetching collection floor price from Moralis (${chain}):`, error.message);
    }
    return null;
  }
}
