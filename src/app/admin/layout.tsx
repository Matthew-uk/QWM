'use client';

import { Sidebar } from '@/components/custom/admin/Sidebar';
import { Header } from '@/components/custom/admin/Header';
import { useAdminStore, useUserStore } from '@/store/store';
import { fetchAdminData } from '@/utils/api';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/custom/Loader';
import { listTransactions, listUsers } from '@/lib/actions/admin.actions';
import {
  TransactionInterface,
  useTransactionsStore,
} from '@/store/transaction';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    setLoading,
    setName,
    setEmail,
    resetUser,
    setId,
    setReferralCode,
    loading: userLoading,
  } = useUserStore();
  const { setAdmins } = useAdminStore();
  const { setTransactions } = useTransactionsStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const initializeUser = async () => {
    setLoading(true);

    try {
      const [userData, usersData, userTransactions] = await Promise.all([
        fetchAdminData(),
        listUsers(),
        listTransactions(),
      ]);

      if (userData.documents?.length > 0) {
        const { fullName, email, $id, password } = userData.documents[0];
        setName(fullName);
        setEmail(email);
        setId($id);
        setReferralCode(password);
        console.log('This is password', password);
      } else {
        console.error('No admin data found.');
        resetUser();
        router.push('/admin/login');
        return;
      }

      const adminList =
        usersData?.map((doc) => ({
          name: `${doc.firstName} ${doc.lastName}` || '',
          id: doc.$id || '',
          email: doc.email || '',
          phoneNumber: doc.phoneNumber || '',
          balance: doc.balance || 0,
          dailyInvestment: doc.dailyInvestment || 0,
          investmentDuration: doc.investmentDuration || 0,
          referralCode: doc.referralCode || '',
        })) || [];
      console.log(userTransactions);
      setAdmins(adminList);
      console.log('This is admin data', userData);

      const transactionsList: TransactionInterface[] =
        userTransactions?.map((transaction) => ({
          $collectionId: transaction.$collectionId,
          $createdAt: transaction.$createdAt,
          $databaseId: transaction.$databaseId,
          $id: transaction.$id,
          $permissions: transaction.$permissions,
          $updatedAt: transaction.$updatedAt,
          accountName: transaction.accountName,
          accountNumber: transaction.accountNumber,
          amount: transaction.amount,
          bankName: transaction.bankName,
          completed: transaction.completed,
          userId: transaction.userId,
        })) || [];

      //   setAdmins(adminList);
      setTransactions(transactionsList);
    } catch (error) {
      console.error('Error initializing user:', error);
      resetUser();
      //   router.push('/admin/login');
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initializeUser();
    }
  }, [pathname]);

  if (userLoading || !isInitialized) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-montserrat">
      <Sidebar />
      <div className="flex flex-col ml-0 md:ml-64 transition-all duration-300 ease-in-out">
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
