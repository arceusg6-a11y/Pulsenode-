import axios from 'axios';

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
const OPENSEA_BASE_URL = 'https://api.opensea.io/api/v2';

export async function getCollectionByContract(contractAddress, chain = 'ethereum') {
  try {
    const response = await axios.get(
      `${OPENSEA_BASE_URL}/chain/${chain}/contract/${contractAddress}`,
      {
        headers: {
          'X-API-KEY': OPENSEA_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenSea collection:', error.message);
    return null;
  }
}

export async function getNFTByContract(contractAddress, tokenId, chain = 'ethereum') {
  try {
    const response = await axios.get(
      `${OPENSEA_BASE_URL}/chain/${chain}/contract/${contractAddress}/nfts/${tokenId}`,
      {
        headers: {
          'X-API-KEY': OPENSEA_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching NFT from OpenSea:', error.message);
    return null;
  }
}

export async function getCollectionStats(collectionSlug) {
  try {
    const response = await axios.get(
      `${OPENSEA_BASE_URL}/collections/${collectionSlug}/stats`,
      {
        headers: {
          'X-API-KEY': OPENSEA_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenSea collection stats:', error.message);
    return null;
  }
}
