'use client';

import { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTransactionsStore } from '@/store/transaction';

export default function TransactionHistoryPage() {
  const { transactions } = useTransactionsStore(); // Fetch transactions
  const [sortField, setSortField] = useState<'amount' | 'createdAt'>(
    'createdAt',
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'completed' | 'pending'
  >('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sortTransactions = (field: 'amount' | 'createdAt') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedTransactions = transactions
    .filter(
      (transaction) =>
        (filterStatus === 'all' ||
          (filterStatus === 'completed' && transaction.completed) ||
          (filterStatus === 'pending' && !transaction.completed)) &&
        (transaction.accountName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          transaction.accountNumber.toString().includes(searchTerm) ||
          transaction.bankName.toLowerCase().includes(searchTerm)),
    )
    .sort((a, b) => {
      if (sortField === 'createdAt') {
        return sortDirection === 'asc'
          ? new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
          : new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime();
      } else {
        return sortDirection === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
    });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction History</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search by name, account number, or bank"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select
                value={filterStatus}
                onValueChange={(value: 'all' | 'completed' | 'pending') =>
                  setFilterStatus(value)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => sortTransactions('amount')}
                  >
                    Amount <FaSort className="ml-1" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => sortTransactions('createdAt')}
                  >
                    Date <FaSort className="ml-1" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.$id}>
                  <TableCell>{transaction.accountName}</TableCell>
                  <TableCell>{transaction.accountNumber}</TableCell>
                  <TableCell>{transaction.bankName}</TableCell>
                  <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(transaction.$createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {transaction.completed ? 'Completed' : 'Pending'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAndSortedTransactions.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No transactions found
            </div>
          )}

          {/* Pagination could be added here */}
        </CardContent>
      </Card>
    </div>
  );
}
