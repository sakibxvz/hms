'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInSchema } from '@/schemas';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '@/actions/login';
import { FormError } from './login-error';

type FormData = z.infer<typeof signInSchema>;

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<FormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	const onSubmit = (values: z.infer<typeof signInSchema>) => {
		setError('');
		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
				})
				.catch(() => setError('Something Went Wrong!'));
		});
	};

	return (
		<Card className='mx-auto max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>
					Enter your username below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='text'
											placeholder='jhon123'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												{...field}
												type={showPassword ? 'text' : 'password'}
												placeholder='*******'
												disabled={isPending}
												className='pr-12'
											/>
											<Button
												variant='outline'
												type='button'
												onClick={togglePasswordVisibility}
												className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer h-8 px-2'
												disabled={isPending}
											>
												{showPassword ? <Eye /> : <EyeOff />}
											</Button>
											<Button
												variant='link'
												type='button'
												asChild
												className='absolute right-2 bottom-[-1.5rem] text-sm px-0 font-normal'
												disabled={isPending}
											></Button>
										</div>
									</FormControl>
									<Button
										size='sm'
										variant='link'
										asChild
										className='px-0 font-normal'
									>
										<Link href='/auth/reset'>Forgot Password?</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormError message={error} />

						<Button type='submit' className='w-full' disabled={isPending}>
							{isPending ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</FormProvider>

				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/register' className='underline'>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
