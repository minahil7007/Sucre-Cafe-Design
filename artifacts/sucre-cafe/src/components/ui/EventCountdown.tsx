import { useEffect, useState } from 'react';
import { format, differenceInSeconds } from 'date-fns';
import { motion } from 'framer-motion';

interface EventCountdownProps {
  targetDate: string; // ISO string
}

export function EventCountdown({ targetDate }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const diffInSecs = differenceInSeconds(target, now);
      
      if (diffInSecs <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setIsExpired(false);
      setTimeLeft({
        days: Math.floor(diffInSecs / (3600 * 24)),
        hours: Math.floor((diffInSecs % (3600 * 24)) / 3600),
        minutes: Math.floor((diffInSecs % 3600) / 60),
        seconds: diffInSecs % 60
      });
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return <div className="text-primary font-serif italic">This event has already started.</div>;
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-4 items-center">
      {timeBlocks.map((block, i) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="bg-background border border-border w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-md shadow-sm">
            <span className="font-serif text-2xl md:text-3xl text-foreground">
              {block.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
