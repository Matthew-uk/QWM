import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentTransactions = [
  {
    id: '1',
    amount: '+$350',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    date: '2023-06-20',
  },
  {
    id: '2',
    amount: '-$120',
    name: 'Bob Smith',
    email: 'bob@example.com',
    date: '2023-06-19',
  },
  {
    id: '3',
    amount: '+$900',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    date: '2023-06-18',
  },
  {
    id: '4',
    amount: '-$50',
    name: 'Diana Prince',
    email: 'diana@example.com',
    date: '2023-06-17',
  },
  {
    id: '5',
    amount: '+$1200',
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    date: '2023-06-16',
  },
];

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`https://avatar.vercel.sh/${transaction.email}`}
              alt={transaction.name}
            />
            <AvatarFallback>
              {transaction.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.name}
            </p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="ml-auto font-medium">{transaction.amount}</div>
        </div>
      ))}
    </div>
  );
}
