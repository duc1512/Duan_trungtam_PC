'use client';

import { useState, useCallback } from 'react';
import { NewsApi } from '../services/api';

interface UseNewsletterReturn {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  subscribe: () => Promise<void>;
}

export function useNewsletter(): UseNewsletterReturn {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const subscribe = useCallback(async () => {
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const result = await NewsApi.subscribeNewsletter(email);
      if (result.success) {
        setIsSuccess(true);
        setEmail('');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);
  
  return {
    email,
    setEmail,
    isSubmitting,
    isSuccess,
    error,
    subscribe
  };
}
