'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

type FAQ = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

export const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border"
        >
          <button
            type="button"
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="pr-4 text-lg font-semibold">{faq.question}</h3>
            <ChevronDownIcon
              className={`size-5 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
