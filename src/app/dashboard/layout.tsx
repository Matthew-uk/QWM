'use client';
import { BottomNav } from '@/components/custom/BottomNav';
import Loader from '@/components/custom/Loader';
import { UserInterface } from '@/constants/types';
import { useUserStore } from '@/store/store';
import axios from 'axios';
import { useEffect, useState, type ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('');
  const {
    loading,
    setEmail,
    setId,
    setLoading,
    setName,
    setPhoneNumber,
    setReferralCode,
    updateBalance,
  } = useUserStore();

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
        setId(userData.userId);
        setName(`${userData.firstName} ${userData.lastName}`);
        setPhoneNumber(userData.phoneNumber);
        setReferralCode(userData.referralCode);
        updateBalance(userData.balance);
      } catch (error) {
        console.error('User fetch error:', error);
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
