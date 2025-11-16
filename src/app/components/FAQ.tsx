'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer:
      'We provide a full suite of creative services, including website design, branding, motion design, content consulting, and product design.',
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer:
      'Our pricing is project-based and tailored to your specific needs. After a discovery call, we provide a detailed proposal with a transparent cost breakdown.',
  },
  {
    id: 3,
    question: 'Do you offer support after project completion?',
    answer:
      'Yes. We offer post-launch support and maintenance packages to ensure your project continues to run smoothly.',
  },
  {
    id: 4,
    question: 'Can you work with startups and small businesses?',
    answer:
      'Absolutely. We work with businesses of all sizes and create flexible solutions that align with diverse budgets and timelines.',
  },
  {
    id: 5,
    question: 'How do you price your services?',
    answer:
      'Project timelines vary based on scope. We provide a detailed timeline for your project in our proposal.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="question" className="pb-44">
      <div className="container mx-auto px-4 w-full md:px-12">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="text-brand-sage mb-4">FAQ</div>
              <h3 className="text-5xl md:text-6xl font-bold text-brand-ivory leading-tight mb-4">
                Questions
              </h3>
            </div>
          </div>

          <div className="mt-16 divide-y divide-white/10">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.id}
                className="px-6 py-12 text-brand-ivory md:px-12"
              >
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="flex w-full cursor-pointer flex-col gap-6 text-left md:flex-row md:items-center md:gap-0"
                >
                  <div className="flex w-full justify-start md:w-1/5">
                    <span className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-black shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                      {String(item.id).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex w-full md:w-7/12 md:justify-start">
                    <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] md:text-3xl">
                      {item.question}
                    </h3>
                  </div>
                  <div className="flex w-full justify-end md:w-1/5">
                    <svg
                      className={`h-6 w-6 transform text-brand-ivory transition-transform duration-300 ${
                        openId === item.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === item.id ? 'max-h-96 pt-6' : 'max-h-0'
                  }`}
                >
                  <div className="md:ml-auto md:w-7/12 md:text-right">
                    <p className="text-base text-brand-ivory/80 md:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
