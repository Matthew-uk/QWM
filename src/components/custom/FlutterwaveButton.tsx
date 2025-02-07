'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateUserBalance } from '@/lib/actions/user.actions';
import { useState } from 'react';
import { Button } from '../ui/button';

declare global {
  interface Window {
    FlutterwaveCheckout: (config: FlutterwaveConfig) => void;
  }
}

interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: {
    email: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  callback: (response: any) => void;
  onclose: () => void;
}

interface FlutterwaveButtonProps {
  amount: number;
  email: string;
  name: string;
  userId: string;
}

export default function FlutterwaveButton({
  amount,
  email,
  name,
  userId,
}: FlutterwaveButtonProps) {
  const router = useRouter();
  const [err, setErr] = useState<Error | null>(null);
  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!;

  const initializePayment = () => {
    const config: FlutterwaveConfig = {
      public_key: publicKey,
      tx_ref: Date.now().toString(),
      amount,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: { email, name },
      customizations: {
        title: 'Your Company',
        description: 'Payment for services',
        logo: '/logo.png',
      },
      callback: async (response) => {
        setErr(null);
        console.log('Payment successful:', response);
        if (response.status === 'completed') {
          try {
            const updatedUser = await updateUserBalance(userId, amount);
            toast.success(
              `₦${amount.toLocaleString()} deposited successfully! New balance: ₦${updatedUser.balance.toLocaleString()}`,
              { className: 'bg-green-500 text-white' },
            );
            toast.success('Refresh to see updated balance');
            router.refresh();
            await router.push('/dashboard');
          } catch (error) {
            setErr(error as Error);
            console.error('Payment processing failed:', error);
            toast.error('Deposit failed. Please contact support.');
          }
        } else {
          toast.error('Payment was not successful.');
        }
      },
      onclose: () => {
        console.log('Payment closed');
        if (err) {
          console.error('Error during payment:', err);
        }
      },
    };

    try {
      window.FlutterwaveCheckout(config);
    } catch (error) {
      setErr(error as Error);
      console.error('Flutterwave initialization error:', error);
      toast.error('Failed to initialize payment. Please try again.');
    }
  };

  return (
    <Button
      onClick={initializePayment}
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3"
    >
      Pay Now
    </Button>
  );
}
