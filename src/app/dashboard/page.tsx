'use client';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import Logo from '@/components/custom/Logo';
import { useUserStore } from '@/store/store';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import InvestmentCard from '@/components/custom/InvestmentCard';

const packages = [
  {
    name: 'Paracetamol',
    price: 3000,
    dailyIncome: 600,
    duration: 20,
    totalIncome: 24000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'NemelCipro',
    price: 5000,
    dailyIncome: 1000,
    duration: 20,
    totalIncome: 40000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'Avrocid',
    price: 10000,
    dailyIncome: 2000,
    duration: 20,
    totalIncome: 80000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'Antacid',
    price: 20000,
    dailyIncome: 4000,
    duration: 20,
    totalIncome: 160000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'Imdur',
    price: 50000,
    dailyIncome: 10000,
    duration: 20,
    totalIncome: 400000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'UREA CREAM',
    price: 100000,
    dailyIncome: 20000,
    duration: 20,
    totalIncome: 800000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'Nosclav-625',
    price: 200000,
    dailyIncome: 40000,
    duration: 20,
    totalIncome: 1600000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'ADDYZOA',
    price: 300000,
    dailyIncome: 60000,
    duration: 20,
    totalIncome: 2400000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'MANIX',
    price: 400000,
    dailyIncome: 80000,
    duration: 20,
    totalIncome: 3200000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
  {
    name: 'SPERM BOOM',
    price: 500000,
    dailyIncome: 100000,
    duration: 20,
    totalIncome: 4000000,
    get features() {
      return [
        `₦${this.dailyIncome.toLocaleString()} Daily Income`,
        `₦${this.totalIncome.toLocaleString()} Total Income`,
        'Low risk',
        'Quarterly payouts',
        '24/7 support',
      ];
    },
  },
];

const DashboardHome = () => {
  const { name, balance, dailyInvestment } = useUserStore();
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
          <div className="text-sm text-green-500 mt-1">
            +₦{dailyInvestment ? dailyInvestment.toLocaleString() : 0} Daily
          </div>
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
              <InvestmentCard pkg={pkg} index={index} key={index} />
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
