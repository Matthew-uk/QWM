import { FaHome, FaUserPlus, FaBox, FaUsers, FaUser } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';

export const navItems = [
  { icon: FaHome, label: 'Home', href: '/dashboard' },
  { icon: FaUserPlus, label: 'Invite', href: '/dashboard/invite' },
  { icon: FaBox, label: 'Investments', href: '/dashboard/packages' },
  { icon: FaUsers, label: 'Team', href: '/dashboard/team' },
  {
    icon: GrTransaction,
    label: 'Transactions',
    href: '/dashboard/transactions',
  },
  { icon: FaUser, label: 'Profile', href: '/dashboard/profile' },
];
