'use client';
import FlutterwaveButton from '@/components/custom/FlutterwaveButton';
import { useUserStore } from '@/store/store';

export default function PaymentPage() {
  const { id } = useUserStore();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
      <FlutterwaveButton
        userId={id}
        amount={1000}
        email="user@example.com"
        name="John Doe"
      />
    </div>
  );
}
