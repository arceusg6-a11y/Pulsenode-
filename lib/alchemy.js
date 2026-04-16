import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const baseSettings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.BASE_MAINNET,
};

export const alchemyEth = new Alchemy(settings);
export const alchemyBase = new Alchemy(baseSettings);

export async function getNFTsForOwner(address, network = 'ethereum') {
  try {
    const alchemy = network === 'base' ? alchemyBase : alchemyEth;
    const nfts = await alchemy.nft.getNftsForOwner(address);
    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs from Alchemy:', error);
    throw error;
  }
}

export async function getNFTMetadata(contractAddress, tokenId, network = 'ethereum') {
  try {
    const alchemy = network === 'base' ? alchemyBase : alchemyEth;
    const metadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    return metadata;
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    throw error;
  }
}
