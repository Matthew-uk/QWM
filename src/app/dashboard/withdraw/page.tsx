'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import Logo from '@/components/custom/Logo';
import { createWithdrawal } from '@/lib/actions/user.actions';
import { useUserStore } from '@/store/store';

type WithdrawalInputs = {
  accountName: string;
  bankName: string;
  amount: number;
  accountNumber: number;
};

const bankOptions = [
  'Access Bank',
  'Citibank Nigeria',
  'Ecobank Nigeria',
  'Fidelity Bank',
  'First Bank of Nigeria',
  'First City Monument Bank',
  'Globus Bank',
  'Guaranty Trust Bank',
  'Heritage Bank',
  'Keystone Bank',
  'Parallex Bank',
  'Polaris Bank',
  'Premium Trust Bank',
  'Providus Bank',
  'Stanbic IBTC Bank',
  'Standard Chartered Bank Nigeria',
  'Sterling Bank',
  'SunTrust Bank Nigeria',
  'Titan Trust Bank',
  'Union Bank of Nigeria',
  'United Bank for Africa',
  'Unity Bank',
  'Wema Bank',
  'Zenith Bank',
  'OPay',
  'PalmPay',
  'Paga',
  'Moniepoint',
  'Kuda',
];

export default function WithdrawPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<WithdrawalInputs | any>(null);
  const { id, email } = useUserStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<WithdrawalInputs>();

  // Instead of immediately calling the API, we store the form data and open the confirmation modal.
  const onSubmit: SubmitHandler<WithdrawalInputs> = async (data) => {
    setFormData(data);
    setIsDialogOpen(true);
  };

  const withdrawal = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      const response = await createWithdrawal({
        userId: id,
        accountName: formData?.accountName,
        bankName: formData?.bankName,
        amount: Number(formData?.amount),
        accountNumber: Number(formData?.accountNumber),
        email,
      });
      console.log(response);
      setIsLoading(false);
      setIsDialogOpen(false);
      toast.success(
        `Withdrawal of ₦${Number(formData?.amount).toLocaleString()} to ${
          formData?.accountName
        } at ${formData?.bankName} initiated!`,
        {
          className: 'font-montserrat font-medium',
        },
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // Optionally, display an error toast or message to the user
      toast.error('An error occurred while processing your withdrawal.', {
        className: 'font-montserrat font-medium',
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Withdraw Funds</h1>

      <Card>
        <CardHeader>
          <CardTitle>Make a Withdrawal</CardTitle>
          <CardDescription>
            Please enter your bank details and the amount you wish to withdraw.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Account Name */}
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  placeholder="Enter account name"
                  {...register('accountName', {
                    required: 'Account name is required',
                  })}
                />
                {errors.accountName && (
                  <p className="text-sm text-red-500">
                    {errors.accountName.message}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="number"
                  placeholder="Enter number"
                  {...register('accountNumber', {
                    required: 'Account number is required',
                    minLength: {
                      value: 10,
                      message: 'Account numbers are not more than 10 digits',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Account numbers are not more than 10 digits',
                    },
                  })}
                />
                {errors.accountNumber && (
                  <p className="text-sm text-red-500">
                    {errors.accountNumber.message}
                  </p>
                )}
              </div>

              {/* Bank Name */}
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Controller
                  name="bankName"
                  control={control}
                  rules={{ required: 'Bank name is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankOptions.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.bankName && (
                  <p className="text-sm text-red-500">
                    {errors.bankName.message}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  {...register('amount', {
                    required: 'Amount is required',
                    min: {
                      value: 10000,
                      message: 'Minimum withdrawal is ₦10,000',
                    },
                    max: {
                      value: 1000000,
                      message: 'Maximum withdrawal is ₦1,000,000',
                    },
                  })}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-end mt-4 px-0">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Withdraw Funds'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="font-montserrat">
          <DialogHeader className="flex items-center justify-center">
            <Logo />
            <DialogTitle>Confirm Withdrawal Details</DialogTitle>
            <DialogDescription>
              Please review your withdrawal details before confirming.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <strong>Account Name:</strong>{' '}
              {formData?.accountName.toLocaleUpperCase()}
            </p>
            <p>
              <strong>Account Number:</strong> {formData?.accountNumber}
            </p>
            <p>
              <strong>Bank Name:</strong>{' '}
              {formData?.bankName.toLocaleUpperCase()}
            </p>
            <p>
              <strong>Amount:</strong> ₦
              {formData?.amount && Number(formData.amount).toLocaleString()}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isLoading} onClick={withdrawal}>
              {isLoading ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Minimum withdrawal amount: ₦10,000</li>
            <li>Maximum withdrawal amount: ₦1,000,000</li>
            <li>Withdrawals are usually processed within 1-3 business days</li>
            <li>Ensure that the account name matches your registered name</li>
            <li>Double-check your bank details before submitting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
