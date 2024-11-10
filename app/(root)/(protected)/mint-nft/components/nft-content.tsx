'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { mintNFT } from '@/lib/solana/nft'
import { BiRepost } from 'react-icons/bi';

interface NFTFormData {
  title: string
  songUrl: string
  price: number
}

export function NFTContent() {
  const { connected, publicKey, ...wallet } = useWallet()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<NFTFormData>({
    title: '',
    songUrl: '',
    price: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected || !publicKey) return

    try {
      setIsLoading(true)
      const signature = await mintNFT({
        publicKey,
        connected,
        ...wallet
      }, {
        walletAddress: publicKey.toBase58(),
        title: formData.title,
        songUrl: formData.songUrl,
        price: formData.price,
        creator: publicKey.toBase58(),
        createdAt: new Date()
      })

      toast({
        variant: 'success',
        title: 'Success!',
        description: `NFT minted successfully.`,
        status: 'success'
      })

      // Reset form
      setFormData({
        title: '',
        songUrl: '',
        price: 0
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to mint NFT',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mint Your Song NFT</h1>
        <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl px-4 mt-2">NFT Details</CardTitle>
        </CardHeader>
        <CardContent>
          {connected ? (
            <form onSubmit={handleSubmit} className="space-y-4 mb-2">
              <div>
                <Label htmlFor="title">Song Title</Label>
                <Input
                  id="title"
                  placeholder="Enter song title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="songUrl">Song URL</Label>
                <Input
                  id="songUrl"
                  placeholder="Enter song URL (e.g., IPFS)"
                  value={formData.songUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, songUrl: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price (SOL)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter price in SOL"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                <BiRepost />
                {isLoading ? 'Minting...' : 'Mint NFT'}
              </Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">
                Please connect your wallet to mint NFTs
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 