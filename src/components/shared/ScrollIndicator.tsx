import { useEffect, useState } from 'react';

export const ScrollIndicator = () => {
  const [showIndicator, setShowIndicator] = useState(true);
  
  useEffect(() => {
    const hasSeenIndicator = sessionStorage.getItem('hasSeenScrollIndicator');
    
    if (hasSeenIndicator) {
      setShowIndicator(false);
      return;
    }
    
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
        setShowIndicator(false);
        sessionStorage.setItem('hasSeenScrollIndicator', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
    if (!isScrollable) {
      setShowIndicator(false);
      sessionStorage.setItem('hasSeenScrollIndicator', 'true');
      return;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showIndicator) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce hover:bg-emerald-700 transition-colors cursor-pointer" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })}>
        <span className="text-sm font-medium">Scroll for more fields</span>
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};
