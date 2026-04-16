import axios from 'axios';

const RESERVOIR_BASE_URL = 'https://api.reservoir.tools';

export async function getCollectionFloorPrice(contractAddress) {
  try {
    const response = await axios.get(
      `${RESERVOIR_BASE_URL}/collections/v7`,
      {
        params: {
          id: contractAddress,
        },
      }
    );
    
    if (response.data?.collections?.[0]) {
      const collection = response.data.collections[0];
      return {
        floorPrice: collection.floorAsk?.price?.amount?.native || 0,
        floorPriceUsd: collection.floorAsk?.price?.amount?.usd || 0,
        volume24h: collection.volume?.['1day'] || 0,
        volumeChange24h: collection.volumeChange?.['1day'] || 0,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching from Reservoir:', error.message);
    return null;
  }
}

export async function getTokenDetails(contractAddress, tokenId) {
  try {
    const response = await axios.get(
      `${RESERVOIR_BASE_URL}/tokens/v7`,
      {
        params: {
          tokens: `${contractAddress}:${tokenId}`,
        },
      }
    );
    
    if (response.data?.tokens?.[0]) {
      const token = response.data.tokens[0];
      return {
        floorPrice: token.market?.floorAsk?.price?.amount?.native || 0,
        lastSale: token.lastSale?.price?.amount?.native || 0,
        lastSaleUsd: token.lastSale?.price?.amount?.usd || 0,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching token details from Reservoir:', error.message);
    return null;
  }
}
