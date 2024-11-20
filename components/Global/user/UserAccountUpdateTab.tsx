'use client'

import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { UserState } from '@/types';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice'; // Adjust the import path as per your project structure

const userSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	username: z.string().min(1, { message: 'Username is required' }),
	role: z.enum(['ADMIN', 'USER'], { required_error: 'Role is required' }),
});

interface Props {
	user: UserState;
}

const UserAccountUpdateTab = ({ user }: Props) => {
	const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

	const form = useForm({
		resolver: zodResolver(userSchema),
		defaultValues: {
			email: user.email,
			username: user.username,
			role: user.role,
		},
	});

	// Reinitialize form values when user changes
	useEffect(() => {
		form.reset({
			email: user.email,
			username: user.username,
			role: user.role,
		});
	}, [user, form]);

	const dispatch = useDispatch();

	const onSubmit = async (values: z.infer<typeof userSchema>) => {
		setIsSubmiting(true); // Start submitting
		try {
			const response = await fetch('/api/user/information', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: user.id,
					username: values.username,
					email: values.email,
					role: values.role,
				}),
			});

			if (!response.ok) {
				const { error } = await response.json();
				alert(error || 'Failed to update user profile');
				setIsSubmiting(false); // Ensure submitting is stopped
				return;
			}

			const updatedUser = await response.json();

			// Update Redux state
			dispatch(setUser(updatedUser));

			alert('User profile updated successfully');
		} catch (error) {
			console.error('Error updating user profile:', error);
			alert('An unexpected error occurred. Please try again.');
		} finally {
			setIsSubmiting(false); // Ensure submitting is stopped in all cases
		}
	};

	return (
		<TabsContent value="account" className="border-none outline-none">
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Account</h3>
					<p className="text-sm text-muted-foreground">
						Update your account settings. Set your email and password.
					</p>
					<p>{JSON.stringify(user)}</p>
				</div>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder="john@example.com" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input {...field} placeholder="@john" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => field.onChange(value)}
												value={field.value}
											>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Select Your Role</SelectLabel>
														<SelectItem value="ADMIN">ADMIN</SelectItem>
														<SelectItem value="USER">USER</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-2 mt-5">
							<Button type="submit" disabled={isSubmiting}>{isSubmiting ? 'Updating' : "Update"}</Button>
						</div>
					</form>
				</FormProvider>
			</div>
		</TabsContent>
	);
};

export default UserAccountUpdateTab;
