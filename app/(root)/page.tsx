'use client';
// pages/index.tsx
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-purple-900 via-purple-600 to-indigo-800 text-white min-h-screen font-sans">
      {/* Header Section */}
      <header className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold">
          Discover the World of Music NFTs
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Where Music Meets Blockchain and Fans Connect with Artists
        </p>
        <div className="mt-8">
          <Link href="/signup">
            <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-medium">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-semibold text-center">Features</h2>
        <div className="flex flex-wrap justify-center mt-10 gap-8">
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-xs">
            <h3 className="text-xl font-bold">Emotion-Based Song Selection</h3>
            <p className="mt-2">
              Let music reflect your emotions and connect with what you feel
              most deeply.
            </p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-xs">
            <h3 className="text-xl font-bold">Community Connections</h3>
            <p className="mt-2">
              Find others who share your taste in music and build meaningful
              connections.
            </p>
          </div>
          <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-xs">
            <h3 className="text-xl font-bold">NFT Marketplace for Artists</h3>
            <p className="mt-2">
              Empower emerging artists to share and sell their music as NFTs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-20 bg-gray-900">
        <h2 className="text-3xl font-semibold text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" className="mt-10">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-lg font-medium">
              What is a music NFT?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              A music NFT is a unique digital asset that represents ownership of
              a piece of music on the blockchain.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-lg font-medium">
              How do I get started?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Connect a compatible Solana wallet, browse available NFTs, and
              start purchasing or selling NFTs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-lg font-medium">
              Can I sell NFTs I’ve purchased?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Yes, you can resell NFTs by listing them on our platform or any
              compatible Solana marketplace.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 text-center bg-purple-700">
        <h2 className="text-3xl font-semibold">
          Ready to Join the Future of Music?
        </h2>
        <p className="mt-4">
          Sign up now and become part of the NFT music revolution!
        </p>
        <Link href="/signup">
          <button className="mt-8 bg-indigo-500 hover:bg-indigo-600 px-8 py-4 rounded-lg font-semibold">
            Start Your Journey
          </button>
        </Link>
      </section>

    </div>
  );
}
