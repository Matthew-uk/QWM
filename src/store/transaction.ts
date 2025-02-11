import { create } from 'zustand';

export interface TransactionInterface {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  accountName: string;
  accountNumber: number;
  amount: number;
  bankName: string;
  completed: boolean;
  userId: string;
}

export interface TransactionsInterface {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  accountName: string;
  accountNumber: number;
  amount: number;
  bankName: string;
  completed: boolean;
  userId: string;
  setCollectionId: ($collectionId: string) => void;
  setCreatedAt: ($createdAt: string) => void;
  setDatabaseId: ($databaseId: string) => void;
  setId: ($id: string) => void;
  setPermissions: ($permissions: string[]) => void;
  setUpdatedAt: ($updatedAt: string) => void;
  setAccountName: (accountName: string) => void;
  setAccountNumber: (accountNumber: number) => void;
  setAmount: (amount: number) => void;
  setBankName: (bankName: string) => void;
  setCompleted: (completed: boolean) => void;
  setUserId: (userId: string) => void;
  resetUser: () => void;
}

export const useUserStore = create<TransactionsInterface>((set) => ({
  $collectionId: '',
  $createdAt: '',
  $databaseId: '',
  $id: '',
  $permissions: [],
  $updatedAt: '',
  accountName: '',
  accountNumber: 0,
  amount: 0,
  bankName: '',
  completed: false,
  userId: '',
  setCollectionId: ($collectionId) => set({ $collectionId }),
  setCreatedAt: ($createdAt) => set({ $createdAt }),
  setDatabaseId: ($databaseId) => set({ $databaseId }),
  setId: ($id) => set({ $id }),
  setPermissions: ($permissions) => set({ $permissions }),
  setUpdatedAt: ($updatedAt) => set({ $updatedAt }),
  setAccountName: (accountName) => set({ accountName }),
  setAccountNumber: (accountNumber) => set({ accountNumber }),
  setAmount: (amount) => set({ amount }),
  setBankName: (bankName) => set({ bankName }),
  setCompleted: (completed) => set({ completed }),
  setUserId: (userId) => set({ userId }),
  resetUser: () =>
    set({
      $collectionId: '',
      $createdAt: '',
      $databaseId: '',
      $id: '',
      $permissions: [],
      $updatedAt: '',
      accountName: '',
      accountNumber: 0,
      amount: 0,
      bankName: '',
      completed: false,
      userId: '',
    }),
}));

export const useTransactionsStore = create<{
  transactions: TransactionInterface[];
  setTransactions: (transactions: TransactionInterface[]) => void;
}>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
}));
