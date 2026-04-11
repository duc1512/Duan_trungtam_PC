"use client";

import { useState, useEffect, useCallback } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

export function useCountdown(targetDate: Date | string): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: true,
    totalSeconds: 0,
  });

  const calculateTimeLeft = useCallback(() => {
    const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        totalSeconds: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      totalSeconds,
    };
  }, [targetDate]);

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
}

// Helper to format with leading zero
export function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, "0");
}
