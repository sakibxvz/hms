"use client"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { logout } from "@/actions/logout"
import Link from "next/link"
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from "@/components/ui/spinner"
import { useSession } from 'next-auth/react';
import { setUser } from '@/store/userSlice';
import { RootState } from "@/store/store"
import {
	BadgeCheck,
	ChevronsUpDown,
	CreditCard,
	LogOut,
} from "lucide-react"
import { useEffect } from 'react';

export function NavUser() {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { isMobile } = useSidebar();

	const { data: session, status } = useSession();

	useEffect(() => {
		if (!user.id && status === 'authenticated' && session?.user) {
			dispatch(
				setUser({
					id: session.user.id,
					username: session.user.name ?? '',
					email: session.user.email,
					role: session.user.role,
					image: session.user.image ?? '',
				})
			);
		}
	}, [user.id, status, session, dispatch]);

	if (status === 'loading') {
		return <div><Spinner /></div>;
	}

	if (!user.id) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage src={user.image} alt={user.username} />
								<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>{user.username}</span>
								<span className='truncate text-xs'>{user.email}</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={user.image} alt={user.username} />
									<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>{user.username}</span>
									<span className='truncate text-xs'>{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href="/dashboard/user">
								<DropdownMenuItem className="cursor-pointer flex items-center gap-2">
									<BadgeCheck />
									Account
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem className="cursor-pointer flex items-center gap-2">
								<CreditCard />
								Accounts & Billing
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout} className="cursor-pointer">
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}