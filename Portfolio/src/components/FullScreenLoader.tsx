import { useEffect, useState } from "react";

interface FullScreenLoaderProps {
  onComplete: () => void;
}

const FullScreenLoader = ({ onComplete }: FullScreenLoaderProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-all duration-500 ${
      stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}>
      <div className="text-center">
        {/* Main Portfolio Text */}
        <div className={`text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent transition-all duration-700 ${
          stage >= 1 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
        }`}>
          Portfolio
        </div>
        
        {/* Subtitle */}
        <div className={`text-xl text-muted-foreground mt-4 transition-all duration-700 delay-300 ${
          stage >= 2 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
        }`}>
          Welcome to my digital space
        </div>
        
        {/* Loading indicator */}
        <div className={`mt-8 transition-all duration-500 delay-700 ${
          stage >= 2 ? "opacity-100" : "opacity-0"
        }`}>
          <div className="w-24 h-1 bg-muted rounded-full mx-auto overflow-hidden">
            <div className={`h-full bg-gradient-primary rounded-full transition-all duration-1000 ${
              stage >= 2 ? "w-full" : "w-0"
            }`} />
          </div>
        </div>
      </div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/20 rounded-full transition-all duration-[2000ms] delay-[${i * 200}ms] ${
              stage >= 1 ? "opacity-100 animate-pulse" : "opacity-0"
            }`}
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenLoader;