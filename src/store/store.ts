import { create } from 'zustand';
import { TransactionInterface, TransactionsInterface } from './transaction';

export interface UserInterface {
  name: string;
  id: string;
  email: string;
  balance: number;
  phoneNumber: string;
  referralCode: string;
  loading: boolean;
  dailyInvestment: number;
  investmentDuration: number;
  setName: (name: string) => void;
  setId: (id: string) => void;
  setEmail: (email: string) => void;
  updateBalance: (balance: number) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setReferralCode: (referralCode: string) => void;
  setDailyInvestment: (dailyInvestment: number) => void;
  setInvestmentDuration: (investmentDuration: number) => void;
  setLoading: (loading: boolean) => void;
  resetUser: () => void;
}

export interface AdminData {
  fullName: string;
  email: string;
  transactionsCount: number;
  balance: number;
  $id: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export interface AdminInterface {
  name: string;
  id: string;
  email: string;
  balance: number;
  phoneNumber: string;
  referralCode: string;
  dailyInvestment: number;
  investmentDuration: number;
}

type AdminStore = {
  admins: AdminInterface[] | [];
  transactions: TransactionInterface[] | [];
  setAdmins: (admins: AdminInterface[] | []) => void;
  setTransactions: (transactions: TransactionInterface[] | []) => void;
};

export const useAdminStore = create<AdminStore>((set) => ({
  admins: [],
  transactions: [],
  setAdmins: (admins) => set({ admins }),
  setTransactions: (transactions) => set({ transactions }),
}));

export const useUserStore = create<UserInterface>((set) => ({
  name: '',
  id: '',
  email: '',
  balance: 0,
  phoneNumber: '',
  referralCode: '',
  dailyInvestment: 0,
  investmentDuration: 0,
  loading: true,
  setName: (name) => set({ name }),
  setId: (id) => set({ id }),
  setEmail: (email) => set({ email }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  updateBalance: (balance) => set({ balance }),
  setReferralCode: (referralCode) => set({ referralCode }),
  setDailyInvestment: (dailyInvestment) => set({ dailyInvestment }),
  setInvestmentDuration: (investmentDuration) => set({ investmentDuration }),
  setLoading: (loading) => set({ loading }),
  resetUser: () =>
    set({
      name: '',
      id: '',
      email: '',
      balance: 0,
      phoneNumber: '',
      dailyInvestment: 0,
      investmentDuration: 0,
      loading: false,
    }),
}));
