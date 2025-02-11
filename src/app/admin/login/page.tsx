'use client';
import Link from 'next/link';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/actions/admin.actions';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const result = await loginAdmin(email, password);
      console.log(result);
      router.push('/admin');
    } catch (error: any) {
      setError(error.message || 'Error Logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to Admin Panel</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            {loading ? (
              <Image src={'/media/loader.svg'} alt="" width={22} height={22} />
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center">
          Contact Admin to Create New Admin Account{' '}
          {/* <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link> */}
          {/* <div className="bg-red-400">
            <Image src={'/media/loader.svg'} alt="" width={300} height={300} />
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
