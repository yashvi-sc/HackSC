import { Connection, clusterApiUrl } from '@solana/web3.js'

// Use devnet for testing
export const SOLANA_NETWORK = 'devnet'
export const SOLANA_RPC_URL = 'https://api.devnet.solana.com'
export const connection = new Connection(SOLANA_RPC_URL, 'confirmed')

export const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || ''