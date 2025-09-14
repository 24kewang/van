import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const YesPage = () => {
  useEffect(() => {
    // Create a confetti burst when the component mounts
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#EC4899', '#F472B6', '#FBCFE8'] // Pink shades from Tailwind
    };

    const interval: number = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start from the top
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="bg-black text-pink-500 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center">I knew you loved me all along :3 :3</h1>
      <p className="text-xl md:text-3xl mt-8 text-center">Tonight 6pm Sakanaya, don't be late</p>
    </div>
  );
};

export default YesPage;
