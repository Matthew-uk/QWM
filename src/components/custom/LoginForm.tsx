'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { signIn } from 'next-auth/react';
import Cookies from 'js-cookie';
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
import { login } from '@/lib/actions/user.actions';
import { toast } from 'react-toastify';

type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const result: any = await login(email, password);
      Cookies.set('appwrite-session', result.session.secret || '');
      console.log(result);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Error Logging in');
      toast.error(error.message || 'Error Logging in');
    } finally {
      setLoading(false);
    }
    // const result = await signIn('credentials', {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    // });
    // if (result?.error) {
    //   setError('Invalid email or password');
    // } else {
    //   router.push('/dashboard');
    // }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <Logo className="text-center justify-center" />
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                <FaGoogle className="mr-2" />
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
