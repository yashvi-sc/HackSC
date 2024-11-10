'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface NFTFormData {
  title: string
  songUrl: string
  price: number
  listDate: Date
}

export function NFTContent() {
  const { connected } = useWallet()
  const [formData, setFormData] = useState<NFTFormData>({
    title: '',
    songUrl: '',
    price: 0,
    listDate: new Date()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected) return

    try {
      console.log('Minting NFT with data:', formData)
    } catch (error) {
      console.error('Error minting NFT:', error)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-3xl font-bold">Mint Your Song NFT</h1>

      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet & Create NFT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
          </div>

          {connected ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Song Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="songUrl">Song URL</Label>
                <Input
                  id="songUrl"
                  value={formData.songUrl}
                  onChange={(e) => setFormData({ ...formData, songUrl: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (SOL)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Mint NFT
              </Button>
            </form>
          ) : (
            <p className="text-center text-muted-foreground">
              Please connect your wallet to mint NFTs
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 