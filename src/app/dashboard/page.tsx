'use client';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import Logo from '@/components/custom/Logo';
import { useUserStore } from '@/store/store';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const packages = [
  {
    name: 'Paracetamol',
    price: 3000,
    dailyIncome: 600,
    duration: 20,
    totalIncome: 24000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'NemelCipro',
    price: 5000,
    dailyIncome: 1000,
    duration: 20,
    totalIncome: 40000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'Avrocid',
    price: 10000,
    dailyIncome: 2000,
    duration: 20,
    totalIncome: 80000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'Antacid',
    price: 20000,
    dailyIncome: 4000,
    duration: 20,
    totalIncome: 160000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'Imdur',
    price: 50000,
    dailyIncome: 10000,
    duration: 20,
    totalIncome: 400000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'UREA CREAM',
    price: 100000,
    dailyIncome: 20000,
    duration: 20,
    totalIncome: 800000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'Nosclav-625',
    price: 200000,
    dailyIncome: 40000,
    duration: 20,
    totalIncome: 1600000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'ADDYZOA',
    price: 300000,
    dailyIncome: 60000,
    duration: 20,
    totalIncome: 2400000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'MANIX',
    price: 400000,
    dailyIncome: 80000,
    duration: 20,
    totalIncome: 3200000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
  {
    name: 'SPERM BOOM',
    price: 500000,
    dailyIncome: 100000,
    duration: 20,
    totalIncome: 4000000,
    features: ['Low risk', 'Quarterly payouts', '24/7 support'],
  },
];

const DashboardHome = () => {
  const { name, balance } = useUserStore();
  return (
    <div className="space-y-6">
      <div></div>
      <div className="flex items-center justify-between">
        <Logo />
        <Button variant="outline">
          Notifications <IoIosNotificationsOutline />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-3xl">
            Welcome, {name}
          </CardTitle>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₦{balance.toLocaleString()}</div>
          <div className="text-sm text-green-500 mt-1">+5% this month</div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Link href={'/dashboard/deposit'} className="w-full">
          <Button className="h-20 w-full">
            <FaArrowDown className="mr-2" /> Deposit
          </Button>
        </Link>

        <Button variant="outline" className="h-20">
          <FaArrowUp className="mr-2" /> Withdraw
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Drug Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-sm text-white !bg-green-500 w-max"
                  >
                    ₦{pkg.dailyIncome.toLocaleString()} Income Every 12 Hours (₦
                    {(pkg.dailyIncome * 2).toLocaleString()} Daily Income)
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    ₦{pkg.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {pkg.duration} days
                  </div>
                  <ul className="space-y-2 mb-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
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
                  <Button className="w-full">Invest Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Link href={'/dashboard/packages'} className="w-full">
              <Button className="w-full" variant="outline">
                View Ongoing Investments
              </Button>
            </Link>
            <Link href={'/dashboard/invite'} className="w-full">
              <Button className="w-full" variant="outline">
                Refer a Friend
              </Button>
            </Link>
            <Link href={'/dashboard/support'} className="w-full">
              <Button className="w-full" variant="outline">
                Support
              </Button>
            </Link>
            <Link href={'/dashboard/profile'} className="w-full">
              <Button className="w-full" variant="outline">
                Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
