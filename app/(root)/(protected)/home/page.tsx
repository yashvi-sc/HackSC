import Link from 'next/link';
import {Card, CardContent} from '@/components/ui/card';
import {ArrowRight, Music, Palette, Users} from "lucide-react";

export default function Home() {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/generate-songs" className="block">
                    <Card
                        className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Music className="w-6 h-6 text-primary"/>
                                </div>
                                <h2 className="text-xl font-semibold">Generate Song</h2>
                            </div>
                            <p className="text-muted-foreground flex-grow">
                                Search for songs that match your mood.
                            </p>
                            <div className="mt-4 flex items-center text-primary hover:gap-2 transition-all">
                                <span className="text-sm font-medium">Get Started</span>
                                <ArrowRight className="w-4 h-4 ml-1"/>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/matching" className="block">
                    <Card
                        className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Users className="w-6 h-6 text-primary"/>
                                </div>
                                <h2 className="text-xl font-semibold">Matching</h2>
                            </div>
                            <p className="text-muted-foreground flex-grow">
                                Connect with like-minded musicians and collaborators in your area.
                            </p>
                            <div className="mt-4 flex items-center text-primary hover:gap-2 transition-all">
                                <span className="text-sm font-medium">Find Matches</span>
                                <ArrowRight className="w-4 h-4 ml-1"/>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/mint-nft" className="block">
                    <Card
                        className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50">
                        <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Palette className="w-6 h-6 text-primary"/>
                                </div>
                                <h2 className="text-xl font-semibold">Mint NFT</h2>
                            </div>
                            <p className="text-muted-foreground flex-grow">
                                Transform your musical creations into unique digital collectibles on the blockchain.
                            </p>
                            <div className="mt-4 flex items-center text-primary hover:gap-2 transition-all">
                                <span className="text-sm font-medium">Start Minting</span>
                                <ArrowRight className="w-4 h-4 ml-1"/>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
