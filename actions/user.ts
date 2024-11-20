import db from '@/lib/db';
import { UserState } from '@/types';

export const getUserbyUserName = async (username: string) => {
	try {
		const user = await db.user.findUnique({
			where: { username },
		});
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (userId: string) => {
	try {
		const user = await db.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				image: true,
			},
		});
		return { status: 200, user };
	} catch (error) {
		console.error('Error fetching user by ID:', error);
		return null;
	}
};

export const usernameExists = async (username: string) => {
	try {
		const user = await db.user.findUnique({
			where: { username },
		});
		return user !== null; // Return true if user exists
	} catch (error) {
		console.error('Error checking username:', error);
		return false;
	}
};

export const emailExists = async (email: string) => {
	try {
		const user = await db.user.findUnique({
			where: { email },
		});
		return user !== null; // Return true if email exists
	} catch (error) {
		console.error('Error checking email:', error);
		return false;
	}
};

export const getAllUsers = async (skipUserId?: string) => {
	try {
		const users = await db.user.findMany({
			where: skipUserId ? { NOT: { id: skipUserId } } : {}, // Skip user with provided userId if available
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				image: true,
			},
		});
		return users;
	} catch (error) {
		console.error('Error fetching all users:', error);
		return [];
	}
};

export const updateUserEmail = async (userId: string, newEmail: string) => {
	try {
		await db.user.update({
			where: { id: userId },
			data: {
				email: newEmail, // Update the email
			},
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				image: true,
			},
		});
		return { status: 200, message: 'Email updated successfully' };
	} catch (error) {
		console.error('Error updating user email:', error);
		return null;
	}
};

export const updateUserProfile = async (
	userId: string,
	updatedData: Partial<UserState>
): Promise<UserState> => {
	const updatedUser = await db.user.update({
		where: { id: userId },
		data: updatedData,
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			image: true,
		},
	});
	return updatedUser;
};

export const updateUserPassword = async (
	userId: string,
	currentPassword: string,
	newPassword: string
) => {
	try {
		// Fetch the current password from the database
		const user = await db.user.findUnique({
			where: { id: userId },
			select: { password: true },
		});

		// Verify current password
		if (!user || user.password !== currentPassword) {
			return { status: 400, message: 'Incorrect current password' };
		}

		// Update the password
		await db.user.update({
			where: { id: userId },
			data: { password: newPassword },
		});

		return { status: 200, message: 'Password updated successfully' };
	} catch (error) {
		console.error('Error updating user password:', error);
		return { status: 500, message: 'Internal Server Error' };
	}
};

export const deleteUser = async (userId: string) => {
	try {
		await db.user.delete({
			where: { id: userId },
		});
		return { status: 200, message: 'User deleted successfully' };
	} catch (error) {
		console.error('Error deleting user:', error);
		return null;
	}
};

export const getUserRole = async (userId: string) => {
	try {
		const user = await db.user.findUnique({
			where: { id: userId },
			select: { role: true },
		});
		return user?.role || null; // Return the user's role or null if not found
	} catch (error) {
		console.error('Error fetching user role:', error);
		return null;
	}
};

export const assignRoleToUser = async (
	userId: string,
	role: 'USER' | 'ADMIN'
) => {
	try {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				role: role, // Assign the new role
			},
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				image: true,
			},
		});
		return {
			status: 200,
			message: 'Role assigned successfully',
			user: updatedUser,
		};
	} catch (error) {
		console.error('Error assigning role to user:', error);
		return null;
	}
};
