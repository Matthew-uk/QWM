import { FaHome, FaUserPlus, FaBox, FaUsers, FaUser } from 'react-icons/fa';
export const navItems = [
  { icon: FaHome, label: 'Home', href: '/dashboard' },
  { icon: FaUserPlus, label: 'Invite', href: '/dashboard/invite' },
  { icon: FaBox, label: 'My Investments', href: '/dashboard/packages' },
  { icon: FaUsers, label: 'Team', href: '/dashboard/team' },
  { icon: FaUser, label: 'Profile', href: '/dashboard/profile' },
];
