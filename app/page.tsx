'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

export default function Home() {
	const { theme, setTheme } = useTheme();
	const { data: session, status } = useSession();
	const [isClient, setIsClient] = React.useState(false);

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

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
								<Button variant='ghost'>
									<Link href='/auth/logout'>Logout</Link>
								</Button>
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
						Streamline your healthcare operations with our comprehensive management system.
					</p>
				</div>

			</section>
			{/* Analytics Section */}
			<section className='container py-16 space-y-12'>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					<Card>
						<CardContent className='flex flex-col items-center text-center'>
							<ClipboardList className='h-8 w-8 text-primary mb-4' />
							<h3 className='font-semibold text-lg'>Patient Management</h3>
							<p className='text-sm text-muted-foreground'>
								Manage patient records and appointments
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='flex flex-col items-center text-center'>
							<Users className='h-8 w-8 text-primary mb-4' />
							<h3 className='font-semibold text-lg'>Doctor Management</h3>
							<p className='text-sm text-muted-foreground'>
								Schedule and manage doctor appointments
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='flex flex-col items-center text-center'>
							<Activity className='h-8 w-8 text-primary mb-4' />
							<h3 className='font-semibold text-lg'>Laboratory Management</h3>
							<p className='text-sm text-muted-foreground'>
								Track lab tests and results
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='flex flex-col items-center text-center'>
							<BarChart className='h-8 w-8 text-primary mb-4' />
							<h3 className='font-semibold text-lg'>Analytics</h3>
							<p className='text-sm text-muted-foreground'>
								Comprehensive reports and insights
							</p>
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