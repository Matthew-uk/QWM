import Link from 'next/link';
import React from 'react';
import { FaChartLine } from 'react-icons/fa';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={`flex items-center space-x-2 text-primary ${className}`}
    >
      <FaChartLine className="text-2xl" />
      <span className="text-xl font-bold">QWM</span>
    </Link>
  );
};

export default Logo;
