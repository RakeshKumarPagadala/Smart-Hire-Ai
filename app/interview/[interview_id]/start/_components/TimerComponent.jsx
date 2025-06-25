import React, { useEffect, useRef, useState } from 'react';

function pad(num) {
  return num.toString().padStart(2, '0');
}

function TimerComponent({ start }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [start]);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <span>{pad(hrs)}:{pad(mins)}:{pad(secs)}</span>
  );
}

export default TimerComponent