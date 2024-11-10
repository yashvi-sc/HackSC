import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { WalletContextState } from '@solana/wallet-adapter-react'

export interface NFTMetadata {
  title: string
  songUrl: string
  price: number
  creator: string
  createdAt: Date
}

export async function mintNFT(
  wallet: WalletContextState,
  metadata: NFTMetadata
): Promise<string> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected')
  }

  const connection = new Connection('https://api.devnet.solana.com')
  
  // Create a new transaction
  const transaction = new Transaction()
  
  // Add mint instruction (simplified for example)
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey('YOUR_PROGRAM_ID'),
      lamports: metadata.price * 1000000000 // Convert SOL to lamports
    })
  )

  try {
    const signature = await wallet.sendTransaction(transaction, connection)
    await connection.confirmTransaction(signature)
    return signature
  } catch (error) {
    console.error('Error minting NFT:', error)
    throw error
  }
} 