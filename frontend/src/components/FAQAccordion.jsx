import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { id: '01', question: 'What is StreamVibe?', answer: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.' },
  { id: '02', question: 'How much does StreamVibe cost?', answer: 'Our platform offers various subscription plans to fit your budget, starting entirely free for the trial period.' },
  { id: '03', question: 'What content is available on StreamVibe?', answer: 'Everything from the latest Hollywood hits to indie documentaries.' },
  { id: '04', question: 'How can I watch StreamVibe?', answer: 'You can watch on your Smartphone, Tablet, Smart TV, Laptop, or Gaming Console.' },
  { id: '05', question: 'How do I sign up for StreamVibe?', answer: 'Click the Sign Up button at the top right of the page and create an account.' },
  { id: '06', question: 'What is the StreamVibe free trial?', answer: 'New users can enjoy 7 days of unlimited premium streaming for free.' },
  { id: '07', question: 'How do I contact StreamVibe customer support?', answer: 'Visit our Support page or email us at support@streamvibe.com.' },
  { id: '08', question: 'What are the StreamVibe payment methods?', answer: 'We accept all major credit cards and logic-based payments for this prototype.' },
];

const FAQItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className="border-b border-border-card py-6">
      <div 
        className="flex justify-between items-center cursor-pointer group"
        onClick={toggle}
      >
        <div className="flex items-center gap-6">
          <span className="bg-bg-card border border-border-card text-white text-xl font-bold p-4 py-3 rounded-lg w-14 flex justify-center">
            {faq.id}
          </span>
          <h3 className="text-xl font-semibold text-white group-hover:text-brand-red transition-colors">
            {faq.question}
          </h3>
        </div>
        <button className="text-white hover:text-brand-red transition-colors">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </button>
      </div>
      
      {/* Accordion body */}
      {isOpen && (
        <div className="mt-6 ml-20">
          <p className="text-text-muted text-base leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQAccordion = () => {
  const [openId, setOpenId] = useState('01');

  return (
    <section className="py-16 px-8 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-white">Frequently Asked Questions</h2>
          <p className="text-text-muted text-sm max-w-2xl">
            Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.
          </p>
        </div>
        <button className="bg-brand-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all whitespace-nowrap">
          Ask a Question
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        <div className="flex flex-col">
           {faqs.slice(0, 4).map((faq) => (
             <FAQItem 
               key={faq.id} 
               faq={faq} 
               isOpen={openId === faq.id} 
               toggle={() => setOpenId(openId === faq.id ? null : faq.id)} 
             />
           ))}
        </div>
        <div className="flex flex-col">
           {faqs.slice(4, 8).map((faq) => (
             <FAQItem 
               key={faq.id} 
               faq={faq} 
               isOpen={openId === faq.id} 
               toggle={() => setOpenId(openId === faq.id ? null : faq.id)} 
             />
           ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
