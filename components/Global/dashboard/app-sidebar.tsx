'use client';

import * as React from 'react';
import {
	BookOpen,
	Bot,
	Command,
	Frame,
	LayoutDashboard,
	LifeBuoy,
	PieChart,
	Send,
	Settings2,
	SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/Global/dashboard/nav-main';
import { NavProjects } from '@/components/Global/dashboard/nav-projects';
import { NavSecondary } from '@/components/Global/dashboard/nav-secondary';
import { NavUser } from '@/components/Global/dashboard/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: 'Patient Management',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'All Patients',
					url: '/dashboard/paitents',
				},
				{
					title: 'Add Patient',
					url: '#',
				},
			],
		},
		{
			title: 'Doctor Management',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'All Doctors',
					url: '/dashboard/doctors',
				},
				
				{
					title: 'Add Doctor',
					url: '#',
				},
			],
		},
		{
			title: 'Laboratory Management',
			url: '/dashboard/lab',
			icon: BookOpen,
			items: [
				{
					title: 'All Lab Tests',
					url: '#',
				},
				{
					title: 'All Lab Reports',
					url: '#',
				},
			],
		},
		{
			title: 'Pharmacy Management',
			url: '/dashboard/pharmacy',
			icon: Settings2,
			items: [
				{
					title: 'Medicine Store',
					url: '#',
				},
				{
					title: 'Medicine Inventory',
					url: '#',
				},
				{
					title: 'Stock',
					url: '#',
				},
			],
		},
	],
	projects: [
		{
			name: 'HR Management',
			url: '#',
			icon: Frame,
		},
		{
			name: 'Billing & Accounting',
			url: '#',
			icon: PieChart,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant='inset' {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<Link href='/'>
								<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
									<Command className='size-4' />
								</div>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>
										Hospital Management
									</span>
									<span className='truncate text-xs'>Enterprise</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
