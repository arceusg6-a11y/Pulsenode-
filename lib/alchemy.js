import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const baseSettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.BASE_MAINNET,
};

const polygonSettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const solanaSettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.SOLANA_MAINNET,
};

export const alchemyEth = new Alchemy(settings);
export const alchemyBase = new Alchemy(baseSettings);
export const alchemyPolygon = new Alchemy(polygonSettings);
export const alchemySolana = new Alchemy(solanaSettings);

export async function getNFTsForOwner(address, network = 'ethereum') {
  try {
    let alchemy;
    switch (network) {
      case 'base':
        alchemy = alchemyBase;
        break;
      case 'polygon':
        alchemy = alchemyPolygon;
        break;
      case 'solana':
        alchemy = alchemySolana;
        break;
      default:
        alchemy = alchemyEth;
    }
    
    const nfts = await alchemy.nft.getNftsForOwner(address);
    return nfts;
  } catch (error) {
    console.error(`Error fetching NFTs from Alchemy (${network}):`, error.message);
    throw error;
  }
}

export async function getNFTMetadata(contractAddress, tokenId, network = 'ethereum') {
  try {
    let alchemy;
    switch (network) {
      case 'base':
        alchemy = alchemyBase;
        break;
      case 'polygon':
        alchemy = alchemyPolygon;
        break;
      case 'solana':
        alchemy = alchemySolana;
        break;
      default:
        alchemy = alchemyEth;
    }
    
    const metadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    return metadata;
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    throw error;
  }
}
