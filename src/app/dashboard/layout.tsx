'use client';
import { BottomNav } from '@/components/custom/BottomNav';
import Loader from '@/components/custom/Loader';
import { UserInterface } from '@/constants/types';
import { useUserStore } from '@/store/store';
import axios from 'axios';
import { useEffect, useState, type ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  //   const [user, setUser] = useState<any>(null);
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
      const response = await axios.get('/api/getUser');
      const data: UserInterface = await response.data.documents[0];

      if (data) {
        console.log(data);
        setEmail(data.email);
        setId(data.userId);
        setName(`${data.firstName} ${data.lastName}`);
        setPhoneNumber(data.phoneNumber);
        setReferralCode(data.referralCode);
        updateBalance(data.balance);
        setLoading(false); // console.log(data);
      } else {
        setError('Failed to get User Data!');
      }
    };

    fetchUser();
  }, []);
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <main className="container mx-auto px-4 py-8">{children}</main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
