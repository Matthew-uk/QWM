'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/store/store';

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

export default function PackagesPage() {
  const { dailyInvestment } = useUserStore();

  // Filter packages based on dailyInvestment
  const filteredPackages = packages.filter(
    (pkg) => pkg.dailyIncome === dailyInvestment,
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Investment Packages</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg, index) => (
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
          ))
        ) : (
          <p>No packages match your daily investment criteria.</p>
        )}
      </div>
    </div>
  );
}
