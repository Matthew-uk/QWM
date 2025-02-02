'use client';
import { useState } from 'react';
import MonnifyPayment from '@/components/custom/MonnifyPayment';
import { MonnifyResponse } from '@/types/monnify';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/store';
import { updateUserBalance } from '@/lib/actions/user.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type DepositInputs = {
  amount: number;
};

export default function DepositPage() {
  const { email, id } = useUserStore();
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<DepositInputs>({
    mode: 'onChange',
  });

  const amount = watch('amount');
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<DepositInputs> = async (data) => {
    await trigger();
    if (isValid) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = async (response: MonnifyResponse) => {
    try {
      // Get actual user ID from your auth system
      const userId = id; // Replace with dynamic user ID

      // Convert amount from kobo to naira if needed
      const amountInNaira = response.amountPaid;

      // Update balance
      const updatedUser = await updateUserBalance(id, amount);

      console.log('Balance updated:', updatedUser.balance);
      setShowPayment(false);

      // Show success notification
      toast.success(
        `₦${amount.toLocaleString()} deposited successfully! New balance: ₦${updatedUser.balance.toLocaleString()}`,
        {
          className: 'bg-green-500 text-white',
        },
      );
      toast.success('Refresh to see update balance');
      router.refresh();
      router.push('/dashboard');
    } catch (error) {
      console.error('Payment processing failed:', error);
      toast.error('Deposit failed. Please contact support.');
    } finally {
      setIsProcessing(false);
    }

    // console.log('Payment successful:', response);
    // setShowPayment(false);
    // setIsProcessing(false);
    // Handle successful payment here (e.g., update balance)
  };

  const handlePaymentClose = () => {
    console.log('Payment closed');
    setShowPayment(false);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Fund Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Securely deposit funds using{' '}
          <span className="text-primary font-bold cursor-pointer">Monnify</span>{' '}
          payment gateway
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Deposit Amount</CardTitle>
          <CardDescription>
            Enter the amount you want to deposit (₦100 - ₦1,000,000)
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount (NGN)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="₦0.00"
                  className="h-12 text-lg"
                  {...register('amount', {
                    required: 'Amount is required',
                    min: { value: 100, message: 'Minimum deposit is ₦100' },
                    max: {
                      value: 1000000,
                      message: 'Maximum deposit is ₦1,000,000',
                    },
                    valueAsNumber: true,
                  })}
                />
                {errors.amount && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isProcessing || !isValid}
                onClick={() => setIsProcessing(true)}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isProcessing && (
        <MonnifyPayment
          amount={amount}
          email={email}
          onSuccess={handlePaymentSuccess}
          onClose={handlePaymentClose}
        />
      )}

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Secure transactions powered by{' '}
          <span className="text-primary font-bold cursor-pointer">Monnify</span>
        </p>
        <p className="mt-1">All transactions are encrypted and secure</p>
      </div>
    </div>
  );
}
