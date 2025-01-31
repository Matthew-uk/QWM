'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGoogle } from 'react-icons/fa';
import Logo from './Logo';
import { createAccount } from '@/lib/actions/user.actions';

type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  referralCode?: string;
};

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SignupFormInputs) => {
    console.log(data);
    const { firstName, lastName, email, password, phoneNumber, referralCode } =
      data;
    setLoading(true);
    try {
      const result = await createAccount({
        firstName,
        lastName,
        phoneNumber,
        referrer: referralCode,
        email,
        password,
      });
      console.log(result);
      router.push('/login');
    } catch (error: any) {
      console.log(error.message || 'Error occured while creating account');
    } finally {
      setLoading(false);
    }
    // const response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    // if (response.ok) {
    //   signIn('credentials', {
    //     redirect: false,
    //     email: data.email,
    //     password: data.password,
    //   }).then((result) => {
    //     if (result?.error) {
    //       setError('Failed to sign in after registration');
    //     } else {
    //       router.push('/dashboard');
    //     }
    //   });
    // } else {
    //   const errorData = await response.json();
    //   setError(errorData.message || 'Failed to create account');
    // }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <Logo className="text-center justify-center" />
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Create an account to start investing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number (Nigerian)</Label>
                <Input
                  id="phoneNumber"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^(\+234|0)[789]\d{9}$/,
                      message: 'Invalid Nigerian phone number',
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Referral Code (Optional)</Label>
                <Input id="referralCode" {...register('referralCode')} />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                <FaGoogle className="mr-2" />
                Sign up with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
