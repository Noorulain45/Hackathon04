import React from 'react';
import { Smartphone, MonitorPlay, Tv, Laptop, Gamepad2, Headphones } from 'lucide-react';

const devices = [
  { icon: <Smartphone size={32} />, title: 'Smartphones', desc: 'StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.' },
  { icon: <MonitorPlay size={32} />, title: 'Tablet', desc: 'StreamVibe is optimized for both Android and iOS tablets. Download our app from the Google Play Store or the Apple App Store.' },
  { icon: <Tv size={32} />, title: 'Smart TV', desc: 'StreamVibe is optimized for both Android and iOS smart TVs. Download our app from the Google Play Store or the Apple App Store.' },
  { icon: <Laptop size={32} />, title: 'Laptops', desc: 'StreamVibe is easily accessible on web. Watch across your favorite laptops and desktop devices without any limitations.' },
  { icon: <Gamepad2 size={32} />, title: 'Gaming Consoles', desc: 'StreamVibe is available on popular gaming consoles including PlayStation and Xbox, bringing movies to your living room.' },
  { icon: <Headphones size={32} />, title: 'VR Headsets', desc: 'Immerse yourself in our VR-optimized streaming platform. Accessible on Meta Quest and Apple Vision Pro.' },
];

const DeviceGrid = () => {
  return (
    <section className="py-16 px-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-3 text-white">We Provide you streaming experience across various devices.</h2>
        <p className="text-text-muted text-sm max-w-3xl">
          With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device, idx) => (
          <div key={idx} className="relative bg-[#0F0F0F] border border-border-card p-8 rounded-2xl overflow-hidden group hover:border-[#333] transition-colors">
             {/* Glow effect at the top */}
             <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-red/10 to-transparent pointer-events-none" />
             
             <div className="flex items-center gap-4 mb-6 relative z-10">
               <div className="bg-bg-card border border-border-card p-4 rounded-xl text-brand-red">
                 {device.icon}
               </div>
               <h3 className="text-xl font-semibold text-white">{device.title}</h3>
             </div>
             <p className="text-text-muted text-sm leading-relaxed relative z-10">
               {device.desc}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeviceGrid;
