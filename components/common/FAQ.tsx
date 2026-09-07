"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx}>
            <button
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[var(--navy)]">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[var(--primary-blue)] shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 text-sm text-[var(--muted)] -mt-2">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
