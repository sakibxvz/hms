'use server';

import { signInSchema } from '@/schemas';
import * as z from 'zod';
import { getUserbyUserName } from './user';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes/route';

export const login = async (
	values: z.infer<typeof signInSchema>,
	callbackUrl?: string | null
) => {
	const validatedFields = signInSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}

	const { username, password } = validatedFields.data;

	const existingUser = await getUserbyUserName(username);

	if (!existingUser || !existingUser.username || !existingUser.password) {
		return { error: 'Username does not exist!' };
	}

	try {
		await signIn('credentials', {
			username,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					console.log(error.type);
					return { error: 'Invalid credentials!' };
				case 'CallbackRouteError':
					console.log(error.type);
					return { error: 'Invalid credentials!' };
				default:
					console.log(error.type);
					return { error: 'Something went wrong!' };
			}
		}

		throw error;
	}
};
