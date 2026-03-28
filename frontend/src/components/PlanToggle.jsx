import React, { useState } from 'react';

const plans = [
  {
    name: 'Basic Plan',
    desc: 'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
    priceMonthly: 9.99,
    priceYearly: 99.99,
  },
  {
    name: 'Standard Plan',
    desc: 'Access to a wider selection of movies and shows, including most new releases and exclusive content.',
    priceMonthly: 12.99,
    priceYearly: 129.99,
  },
  {
    name: 'Premium Plan',
    desc: 'Access to a widest selection of movies and shows, including all new releases and Offline Viewing.',
    priceMonthly: 14.99,
    priceYearly: 149.99,
  },
];

const PlanToggle = () => {
  const [billing, setBilling] = useState('monthly');

  return (
    <section className="py-16 px-8 max-w-[1400px] mx-auto w-full mb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-white">Choose the plan that's right for you</h2>
          <p className="text-text-muted text-sm max-w-2xl">
            Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!
          </p>
        </div>

        {/* Toggle UI */}
        <div className="flex bg-[#0F0F0F] rounded-[10px] p-2 border border-border-card">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
              billing === 'monthly' ? 'bg-bg-card-hover text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
              billing === 'yearly' ? 'bg-bg-card-hover text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className="bg-bg-card border border-border-card p-8 rounded-2xl flex flex-col justify-between hover:border-[#333] transition-colors">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-8 h-20">
                {plan.desc}
              </p>
              <div className="flex items-end mb-8">
                <span className="text-4xl font-bold text-white mr-1">
                  ${billing === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                </span>
                <span className="text-text-muted text-sm mb-1">
                  /{billing === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <button className="flex-1 bg-transparent border border-border-card hover:bg-border-card text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                Start Free Trial
              </button>
              <button className="flex-1 bg-brand-red hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanToggle;
