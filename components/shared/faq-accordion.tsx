// components/FAQAccordion.tsx
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What is a music NFT?',
    answer:
      'A music NFT is a unique digital asset that represents ownership of a piece of music on the blockchain.',
  },
  {
    question: 'How does this platform work?',
    answer:
      'Our platform allows artists to create NFTs for their music, which fans can purchase, trade, and collect.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Connect a compatible Solana wallet, browse available NFTs, and start purchasing or selling NFTs.',
  },
  {
    question: 'Do I need cryptocurrency to buy an NFT?',
    answer:
      'Yes, you need SOL (Solana’s cryptocurrency) to buy NFTs on our platform.',
  },
  {
    question: 'Which wallets are supported?',
    answer:
      'We currently support Phantom and Sollet wallets for secure transactions.',
  },
  {
    question: 'Is my personal data secure?',
    answer:
      'Yes, only your wallet address is used for transactions, ensuring privacy and security.',
  },
  {
    question: 'Can I sell NFTs I’ve purchased?',
    answer:
      'Yes, you can resell NFTs by listing them on our platform or any compatible Solana marketplace.',
  },
  {
    question: 'What happens if I lose my wallet?',
    answer:
      'Losing access to your wallet means losing access to your NFTs. Keep your private key safe and never share it.',
  },
  {
    question: 'What types of files can I upload as NFTs?',
    answer:
      'You can upload MP3, WAV, or FLAC files. For exact formats, refer to our NFT creation page.',
  },
  {
    question: 'Can I get a refund after purchasing an NFT?',
    answer:
      'No, NFT transactions are typically final. Be sure to check the details before confirming a purchase.',
  },
];

const FAQAccordion: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <p className="text-2xl font-bold">Frequently Asked Questions</p>
      <Accordion type="single" collapsible>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
