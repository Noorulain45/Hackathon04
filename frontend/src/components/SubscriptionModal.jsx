import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Check, X, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PLANS = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'A great way to start exploring StreamVibe.',
    features: ['720p Resolution', 'Ad-supported', '1 Device at a time'],
    type: 'basic'
  },
  {
    name: 'Standard',
    price: '$9.99/mo',
    description: 'Perfect for enjoying content in high definition.',
    features: ['1080p Resolution', 'Ad-free', '2 Devices at a time', 'Offline Downloads'],
    type: 'standard'
  },
  {
    name: 'Premium',
    price: '$14.99/mo',
    description: 'The ultimate immersive streaming experience.',
    features: ['4K+HDR Resolution', 'Ad-free', '4 Devices at a time', 'Offline Downloads', 'Dolby Atmos'],
    type: 'premium'
  }
];

const SubscriptionModal = () => {
  const { user, isSubModalOpen, setIsSubModalOpen, updateUser, addNotification } = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState('plans'); // 'plans' | 'payment'
  const [cardDetails, setCardDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  if (!isSubModalOpen) return null;

  const handleClose = () => {
    setIsSubModalOpen(false);
    // Reset state
    setTimeout(() => {
      setStep('plans');
      setSelectedPlan(null);
      setCardDetails('');
      setError('');
    }, 300);
  };

  const handlePlanSelect = (planObj) => {
    setSelectedPlan(planObj);
    if(planObj.type === 'basic') {
       processSubscription(planObj.type, '0000000000000000');
    } else {
       setStep('payment');
    }
  };

  const processSubscription = async (planType, cardString) => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5000"}`}/api/users/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ plan: planType, cardDetails: cardString })
      });

      const data = await res.json();
      if(res.ok) {
         // Update user locally
         updateUser({ subscription: data.subscription });
         // Throw a notification 
         addNotification(`You have successfully subscribed to the ${planType} plan!`);
         // Close and redirect immediately
         handleClose();
         navigate('/');
      } else {
         setError(data.message || 'Payment processing failed.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitPayment = (e) => {
    e.preventDefault();
    if(cardDetails.replace(/\s+/g, '').length < 16) {
       return setError('Please enter a valid 16 digit card number.');
    }
    processSubscription(selectedPlan.type, cardDetails.replace(/\s+/g, ''));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-body">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="bg-bg-card border border-border-card rounded-2xl w-full max-w-5xl relative z-10 shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-300 max-h-[90vh] overflow-y-auto">
         
         <button 
           onClick={handleClose} 
           className="absolute top-4 right-4 text-text-muted hover:text-white bg-[#1A1A1A] p-2 rounded-full border border-border-card transition-colors z-20"
         >
           <X size={20} />
         </button>

         {step === 'plans' ? (
           <div className="p-8 md:p-12">
             <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-white mb-3">Choose the right plan for you</h2>
               <p className="text-text-muted max-w-lg mx-auto">Access StreamVibe's massive library of movies and TV shows. Cancel anytime.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PLANS.map((plan) => (
                  <div key={plan.type} className="bg-[#141414] border border-[#222] rounded-2xl p-6 flex flex-col hover:border-brand-red/50 transition-colors group">
                     <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                     <p className="text-text-muted text-sm mb-6 flex-1">{plan.description}</p>
                     <div className="text-3xl font-bold text-white mb-6 border-b border-[#222] pb-6">{plan.price}</div>
                     <ul className="flex flex-col gap-3 mb-8">
                       {plan.features.map((feature, i) => (
                         <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                           <Check size={16} className="text-brand-red mt-0.5 shrink-0" />
                           {feature}
                         </li>
                       ))}
                     </ul>
                     <button
                       onClick={() => handlePlanSelect(plan)}
                       disabled={loading}
                       className="w-full py-4 mt-auto rounded-xl font-bold transition-all bg-[#1A1A1A] text-white border border-[#333] group-hover:bg-brand-red group-hover:border-brand-red disabled:opacity-50"
                     >
                       {loading && selectedPlan?.type === plan.type ? 'Processing...' : 'Select Plan'}
                     </button>
                  </div>
                ))}
             </div>
           </div>
         ) : (
           <div className="p-8 md:p-12 max-w-xl mx-auto w-full animate-in slide-in-from-right-8 duration-300">
              
              <button onClick={() => setStep('plans')} className="text-brand-red text-sm font-bold mb-6 hover:underline uppercase tracking-wide">
                 &larr; Back to Plans
              </button>

              <h2 className="text-3xl font-bold text-white mb-2">Complete Payment</h2>
              <p className="text-text-muted mb-8">You selected the <span className="text-white font-bold">{selectedPlan.name}</span> plan ({selectedPlan.price}). Enter mock card details to proceed.</p>

              {error && (
                <div className="bg-red-500/10 border border-brand-red text-red-500 p-4 rounded-xl mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={submitPayment} className="flex flex-col gap-6">
                 <div>
                    <label className="block text-text-muted text-sm font-medium mb-2">Card Number (16 Digits)</label>
                    <div className="relative">
                       <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                       <input 
                         type="text"
                         value={cardDetails}
                         onChange={(e) => setCardDetails(e.target.value)}
                         placeholder="1234 5678 9101 1121"
                         maxLength="19"
                         required
                         className="w-full bg-[#141414] border border-[#333] rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-red tracking-widest font-mono"
                       />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-text-muted text-sm font-medium mb-2">Expiry Date</label>
                       <input type="text" placeholder="MM/YY" required className="w-full bg-[#141414] border border-[#333] rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-red" />
                    </div>
                    <div>
                       <label className="block text-text-muted text-sm font-medium mb-2">CVC</label>
                       <input type="text" placeholder="123" required maxLength="4" className="w-full bg-[#141414] border border-[#333] rounded-xl py-4 px-4 text-white focus:outline-none focus:border-brand-red" />
                    </div>
                 </div>

                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full mt-4 bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50"
                 >
                   {loading ? 'Processing...' : `Pay ${selectedPlan.price}`}
                 </button>

                 <p className="text-xs text-text-muted text-center mt-2 flex items-center justify-center gap-1">
                   <ShieldCheck size={14} className="text-green-500" /> Payments are securely mocked for this hackathon
                 </p>
              </form>

           </div>
         )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
