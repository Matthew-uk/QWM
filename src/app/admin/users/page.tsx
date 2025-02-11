'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Label } from '@/components/ui/label';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAdminStore } from '@/store/store';
import { updateUserDetails } from '@/lib/actions/admin.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();
  const { admins } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<Partial<
    (typeof admins)[0]
  > | null>(null);
  //   console.log('This is admins', admins);

  const filteredUsers = admins.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditUser = (user: (typeof admins)[0]) =>
    setEditingUser({ ...user });

  const handleSaveUser = async () => {
    setLoading(true);
    const data = {
      //   name: editingUser?.name,
      //   email: editingUser?.email,
      balance: editingUser?.balance,
      dailyInvestment: editingUser?.dailyInvestment,
    };
    if (editingUser) {
      try {
        await updateUserDetails(editingUser.id || '', data);
        toast.success(
          `${editingUser.name?.split(' ')[0]}'s details updated successfully`,
        );
        router.refresh();
      } catch (error) {
        toast.error('Error updating user details');
      } finally {
        setLoading(false);
      }
      //   setEditingUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        {/* <Button>Add User</Button> */}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Daily Investment</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              {/* <TableCell>
                <Avatar>
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${user.email}`}
                    alt={user.fullName}
                  />
                  <AvatarFallback>
                    {user.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </TableCell> */}
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-wrap">{user.email}</TableCell>
              <TableCell>{user.dailyInvestment}</TableCell>
              <TableCell className="text-green-500 font-bold">
                ₦{user.balance.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="font-montserrat">
                    <DialogHeader>
                      <VisuallyHidden>
                        <DialogTitle>Edit User</DialogTitle>
                      </VisuallyHidden>
                      <DialogDescription>
                        Make changes to the user here. Click save when you're
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label>Name</Label>
                      <Input
                        value={editingUser?.name || ''}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                      />
                      <Label>Email</Label>
                      <Input
                        value={editingUser?.email || ''}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value,
                          })
                        }
                      />
                      <Label>Balance</Label>
                      <Input
                        value={editingUser?.balance || 0}
                        type="number"
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            balance: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <Label>Daily Investment</Label>
                    <Input
                      value={editingUser?.dailyInvestment || 0}
                      type="number"
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          dailyInvestment: Number(e.target.value),
                        })
                      }
                    />
                    <DialogFooter>
                      <Button disabled={loading} onClick={handleSaveUser}>
                        {loading ? 'Loading...' : 'Save changes'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
