'use client';
import { BottomNav } from '@/components/custom/BottomNav';
import Loader from '@/components/custom/Loader';
import { UserInterface } from '@/constants/types';
import { getWithdrawals } from '@/lib/actions/user.actions';
import { useUserStore } from '@/store/store';
import {
  TransactionsInterface,
  useTransactionsStore,
} from '@/store/transaction';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'react-toastify';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    loading,
    setEmail,
    setId,
    setLoading,
    setName,
    setPhoneNumber,
    setReferralCode,
    updateBalance,
    setDailyInvestment,
    setInvestmentDuration,
  } = useUserStore();
  const { setTransactions } = useTransactionsStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          data: {
            documents: UserInterface[];
            userId: string;
          };
        }>('/api/getUser');

        if (!response.data.success) {
          throw new Error('Failed to fetch user data');
        }

        const userData = response.data.data.documents[0];

        if (!userData) {
          throw new Error('User data not found');
        }

        // Update store with user data
        setEmail(userData.email);
        setId(userData.accountId);
        setName(`${userData.firstName} ${userData.lastName}`);
        setPhoneNumber(userData.phoneNumber);
        setReferralCode(userData.referralCode);
        updateBalance(userData.balance);
        setDailyInvestment(userData.dailyInvestment);
        setInvestmentDuration(userData.investmentDuration);

        // Fetch withdrawals and map them correctly
        const withdrawals = await getWithdrawals(userData.accountId);
        console.log(withdrawals);

        if (Array.isArray(withdrawals)) {
          const mappedWithdrawals: TransactionsInterface[] | any[] =
            withdrawals.map((doc) => ({
              $collectionId: doc.$collectionId ?? '',
              $createdAt: doc.$createdAt ?? '',
              $databaseId: doc.$databaseId ?? '',
              $id: doc.$id ?? '',
              $permissions: doc.$permissions ?? [],
              $updatedAt: doc.$updatedAt ?? '',
              accountName: doc.accountName ?? '',
              accountNumber: doc.accountNumber ?? 0,
              amount: doc.amount ?? 0,
              bankName: doc.bankName ?? '',
              completed: doc.completed ?? false,
              userId: doc.userId ?? '',
            }));

          setTransactions(mappedWithdrawals);
        }
      } catch (error: any) {
        console.error('User fetch error:', error);
        toast.error('Session expired, login again');
        router.push('/login');
        setError(
          error instanceof Error ? error.message : 'Failed to get user data',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [
    setEmail,
    setId,
    setLoading,
    setName,
    setPhoneNumber,
    setReferralCode,
    updateBalance,
    setDailyInvestment,
    setInvestmentDuration,
    setTransactions,
  ]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <main className="container mx-auto px-4 py-8">{children}</main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
