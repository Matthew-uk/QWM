'use client';

import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';

const initialData = [
  { name: '18-24', users: 2000 },
  { name: '25-34', users: 3500 },
  { name: '35-44', users: 2800 },
  { name: '45-54', users: 1800 },
  { name: '55-64', users: 1200 },
  { name: '65+', users: 800 },
];

export function UserStats() {
  const [data, setData] = useState(initialData);

  const refreshData = () => {
    const newData = data.map((item) => ({
      ...item,
      users: Math.floor(Math.random() * 4000) + 500,
    }));
    setData(newData);
  };

  return (
    <div className="space-y-4">
      <Button onClick={refreshData}>Refresh Data</Button>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar dataKey="users" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
