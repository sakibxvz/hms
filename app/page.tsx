'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useTheme } from 'next-themes';
import {
	Moon,
	Sun,
	Heart,
	ClipboardList,
	Users,
	Activity,
	BarChart,
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions/logout';

export default function Home() {
	const { theme, setTheme } = useTheme();
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	const { data: session, status } = useSession();
	const isAuthenticated = status === 'authenticated';

	return (
		<div className='min-h-screen bg-background'>
			{/* Navigation */}
			<nav className='border-b px-10'>
				<div className='container flex h-16 items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Heart className='h-6 w-6 text-primary' />
						<span className='text-lg font-bold'>MedCare</span>
					</div>
					<div className='flex items-center gap-4'>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
						>
							<Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
							<Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
						</Button>
						{!isAuthenticated ? (
							<>
								<Button variant='ghost'>
									<Link href='/auth/login'>Login</Link>
								</Button>
								<Button>
									<Link href='/auth/register'>Sign up</Link>
								</Button>
							</>
						) : (
							<>
								<Button>
									<Link href='/dashboard'>Go to Dashboard</Link>
								</Button>
								{/* <Button variant='ghost' onClick={logout}>
									Logout
								</Button> */}
							</>
						)}
					</div>
				</div>
			</nav>
			{/* Hero Section */}
			<section className='container py-24 space-y-8'>
				<div className='text-center space-y-4'>
					<h1 className='text-4xl font-bold sm:text-6xl'>
						Modern Healthcare Management
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Streamline your hospital operations with our comprehensive
						management system
					</p>
				</div>
				<div className='flex justify-center'>
					<Image
						src='https://cdn.dribbble.com/userupload/17605786/file/original-e6ff7f8f3a3c73ae5455bc5cfc419bd7.png?resize=752x'
						alt='Medical Interface'
						width={600}
						height={400}
						className='rounded-lg shadow-lg'
					/>
				</div>
			</section>
			{/* Features Section */}
			<section className='container py-24 space-y-8 px-10'>
				<h2 className='text-3xl font-bold text-center'>
					Comprehensive Features
				</h2>
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
					<Card>
						<CardContent className='pt-6 space-y-2'>
							<Users className='h-8 w-8 text-primary' />
							<h3 className='font-semibold'>Patient Management</h3>
							<p className='text-sm text-muted-foreground'>
								Efficiently manage patient records and appointments
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6 space-y-2'>
							<ClipboardList className='h-8 w-8 text-primary' />
							<h3 className='font-semibold'>Medical Records</h3>
							<p className='text-sm text-muted-foreground'>
								Secure digital storage of all medical documentation
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6 space-y-2'>
							<Activity className='h-8 w-8 text-primary' />
							<h3 className='font-semibold'>Real-time Monitoring</h3>
							<p className='text-sm text-muted-foreground'>
								Track patient vitals and department activities
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6 space-y-2'>
							<BarChart className='h-8 w-8 text-primary' />
							<h3 className='font-semibold'>Analytics</h3>
							<p className='text-sm text-muted-foreground'>
								Comprehensive reports and insights
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
			{/* Calendar Demo Section */}
			<section className='container py-24 space-y-8'>
				<div className='text-center space-y-4'>
					<h2 className='text-3xl font-bold'>Smart Scheduling</h2>
					<p className='text-muted-foreground max-w-2xl mx-auto'>
						Efficient appointment management and resource allocation
					</p>
				</div>
				<div className='flex justify-center'>
					<Card className='max-w-sm'>
						<CardContent className='p-4'>
							<Calendar
								mode='single'
								selected={date}
								onSelect={setDate}
								className='rounded-md'
							/>
						</CardContent>
					</Card>
				</div>
			</section>
			{/* CTA Section */}
			<section className='container py-24 space-y-8'>
				<div className='text-center space-y-4'>
					<h2 className='text-3xl font-bold'>
						Ready to Transform Your Healthcare Management?
					</h2>
					<p className='text-muted-foreground max-w-2xl mx-auto'>
						Join thousands of healthcare providers who trust our platform
					</p>
					<div className='flex justify-center gap-4'>
						<Button size='lg'>Get Started</Button>
						<Button size='lg' variant='outline'>
							Contact Sales
						</Button>
					</div>
				</div>
			</section>
			{/* Footer */}
			<footer className='border-t'>
				<div className='container py-8 text-center text-sm text-muted-foreground'>
					© 2024 MedCare. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
