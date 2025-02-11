'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTransactionsStore } from '@/store/transaction';
import { approveWithdrawal } from '@/lib/actions/user.actions';
import { toast } from 'react-toastify';

const initialTransactions = [
  { id: 1, user: 'John Doe', amount: 100, type: 'Deposit', date: '2023-06-20' },
  {
    id: 2,
    user: 'Jane Smith',
    amount: 50,
    type: 'Withdrawal',
    date: '2023-06-19',
  },
  {
    id: 3,
    user: 'Bob Johnson',
    amount: 200,
    type: 'Deposit',
    date: '2023-06-18',
  },
  {
    id: 4,
    user: 'Alice Brown',
    amount: 75,
    type: 'Withdrawal',
    date: '2023-06-17',
  },
  {
    id: 5,
    user: 'Charlie Davis',
    amount: 150,
    type: 'Deposit',
    date: '2023-06-16',
  },
];

export default function TransactionsPage() {
  const { transactions } = useTransactionsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [completionFilter, setCompletionFilter] = useState<
    'All' | 'Success' | 'Pending'
  >('All');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearchTerm =
      transaction.accountName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);

    const matchesCompletionFilter =
      completionFilter === 'All' ||
      (completionFilter === 'Success' && transaction.completed) ||
      (completionFilter === 'Pending' && !transaction.completed);

    return matchesSearchTerm && matchesCompletionFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button>Export CSV</Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={completionFilter}
          onValueChange={(value: string) =>
            setCompletionFilter(value as 'All' | 'Success' | 'Pending')
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Success">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Name</TableHead>
            <TableHead>Bank Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            {(completionFilter === 'All' || completionFilter === 'Pending') && (
              <TableHead>Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.$id}>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell>{transaction.bankName}</TableCell>
              <TableCell>{transaction.accountNumber}</TableCell>
              <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
              <TableCell>
                {transaction.completed ? (
                  <span className="text-green-600">Completed</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </TableCell>
              <TableCell>
                {new Date(transaction.$createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {transaction.completed === false && (
                  <Button
                    type="button"
                    className="bg-green-500"
                    onClick={async () => {
                      toast.warn('Approval in progress...');
                      try {
                        await approveWithdrawal(
                          transaction.userId,
                          transaction.$id,
                          transaction.amount,
                        );
                        toast.success('Withdrawal approved successfully!');
                        toast.success('Refresh to see changes!', {
                          delay: 2500,
                        });
                      } catch (error) {
                        toast.error('Failed to approve withdrawal');
                        console.error(error);
                      }
                    }}
                  >
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
