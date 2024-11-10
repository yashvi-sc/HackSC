'use client'

import dynamic from 'next/dynamic'
import { SolanaProvider } from '@/providers/solana-provider'

const NFTContent = dynamic(
  () => import('./components/nft-content').then(mod => mod.NFTContent),
  { ssr: false }
)

export default function MintNFTPage() {
  return (
    <SolanaProvider>
      <NFTContent />
    </SolanaProvider>
  )
}
