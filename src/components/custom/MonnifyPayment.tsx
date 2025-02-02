'use client';
import { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MonnifyConfig, MonnifyResponse } from '@/types/monnify';

interface MonnifyPaymentProps {
  amount: number;
  email: string;
  onSuccess: (response: MonnifyResponse) => void;
  onClose: () => void;
}

const MonnifyPayment = ({
  amount,
  email,
  onSuccess,
  onClose,
}: MonnifyPaymentProps) => {
  const initializePayment = useCallback(() => {
    const transactionReference = uuidv4();

    const config: MonnifyConfig = {
      amount,
      currency: 'NGN',
      reference: transactionReference,
      customerFullName: 'John Doe',
      customerEmail: email,
      customerMobileNumber: '08123456789',
      apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY!,
      contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE!,
      paymentDescription: 'Product Purchase',
      isTestMode: process.env.NODE_ENV === 'development',
      metadata: {},
      paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
      onComplete: (response) => onSuccess(response),
      onClose: () => onClose(),
    };

    window.MonnifySDK.initialize(config);
  }, [amount, email, onSuccess, onClose]);

  useEffect(() => {
    const loadMonnifyScript = () => {
      const script = document.createElement('script');
      script.src = 'https://sdk.monnify.com/plugin/monnify.js';
      script.onload = initializePayment;
      document.body.appendChild(script);
    };

    if (!window.MonnifySDK) {
      loadMonnifyScript();
    } else {
      initializePayment();
    }

    return () => {
      const script = document.querySelector(
        'script[src="https://sdk.monnify.com/plugin/monnify.js"]',
      );
      if (script) document.body.removeChild(script);
    };
  }, [initializePayment]);

  return <div id="monnify-container" />;
};

export default MonnifyPayment;
