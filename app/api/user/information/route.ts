import {
	updateUserProfile,
	usernameExists,
	emailExists,
	getUserById,
} from '@/actions/user';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
	try {
		const { userId, username, email, role } = await req.json();

		// Fetch the user's current data
		const userResponse = await getUserById(userId);
		if (!userResponse || !userResponse.user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}
		const existingUser = userResponse.user;

		// Check if username is being changed and if it's already taken
		if (
			username !== existingUser.username &&
			(await usernameExists(username))
		) {
			return NextResponse.json(
				{ error: 'Username is already taken' },
				{ status: 400 }
			);
		}

		// Check if email is being changed and if it's already taken
		if (email !== existingUser.email && (await emailExists(email))) {
			return NextResponse.json(
				{ error: 'Email is already in use' },
				{ status: 400 }
			);
		}

		// Update the user profile
		const updatedUser = await updateUserProfile(userId, {
			username,
			email,
			role,
		});

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error('Error updating user profile:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
