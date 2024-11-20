import { updateUserPassword } from '@/actions/user';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
	try {
		const { userId, currentPassword, newPassword } = await req.json();

		// Call the action to update the password
		const result = await updateUserPassword(
			userId,
			currentPassword,
			newPassword
		);

		if (result.status !== 200) {
			return NextResponse.json(
				{ error: result.message },
				{ status: result.status }
			);
		}

		return NextResponse.json({ message: result.message }, { status: 200 });
	} catch (error) {
		console.error('Error in password update API:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
