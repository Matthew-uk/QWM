'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateAdminDetails } from '@/lib/actions/admin.actions';

export default function ProfilePage() {
  const { id, name, email, referralCode } = useUserStore();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    setPassword(referralCode);
    setNewPassword('');
    setConfirmPassword('');
  }, []);

  const updateAdminData = () => {
    console.log({ name, email, password: referralCode });
  };

  const updatePassword = async () => {
    if (currentPassword !== password) {
      toast.error('Current Password is incorrect');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return false;
    }
    try {
      const updatedUser = await updateAdminDetails(id, {
        password: newPassword,
      });
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/avatar.png" alt="Profile picture" />
              <AvatarFallback>Admin</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={email} />
          </div>
          <Button onClick={updateAdminData}>Update Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button onClick={updatePassword}>Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
