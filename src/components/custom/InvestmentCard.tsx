import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useUserStore } from '@/store/store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { investment } from '@/lib/actions/user.actions';

interface InvestmentCardProp {
  pkg: {
    name: string;
    price: number;
    dailyIncome: number;
    duration: number;
    totalIncome: number;
    features: string[];
  };
  index: number;
}

const InvestmentCard: React.FC<InvestmentCardProp> = ({ pkg, index }) => {
  const { balance, id } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const investInDrugs = async () => {
    if (balance < pkg.price) {
      toast.error('Insufficient funds please deposit to join investment');
      router.push('/dashboard/deposit');
      return false;
    }
    const response = await investment(id, pkg.dailyIncome);
    console.log(response);
    toast.success(`Investment plan is ${pkg.price} for ${pkg.name}`);
  };
  return (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{pkg.name}</CardTitle>
        <Badge
          variant="secondary"
          className="text-sm text-white !bg-green-500 w-max"
        >
          ₦{pkg.dailyIncome.toLocaleString()} Daily Income
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">
          ₦{pkg.price.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500 mb-4">{pkg.duration} days</div>
        <ul className="space-y-2 mb-4">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-center font-medium">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={investInDrugs} disabled={loading}>
          {loading ? 'Investing...' : 'Invest Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
