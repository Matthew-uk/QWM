'use client';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useRouter } from 'next/navigation';

interface FlutterWaveProps {
  amount: number;
  email: string;
  name: string;
}

export default function FlutterWavePayment({
  amount,
  email,
  name,
}: FlutterWaveProps) {
  const router = useRouter();
  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? '';

  const config = {
    public_key: publicKey,
    tx_ref: Date.now().toString(),
    amount,
    currency: 'NGN', // Change to your currency
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email,
      name,
    },
    customizations: {
      title: 'Your Company Name',
      description: 'Payment for services',
      logo: '/logo.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal();
            if (response.status === 'successful') {
              router.push('/payment-success');
            }
          },
          onClose: () => {
            console.log('Payment closed');
          },
        });
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Pay this instant
    </button>
  );
}
