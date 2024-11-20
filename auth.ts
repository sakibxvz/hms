import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './lib/db';
import { getUserById } from './actions/user';
import { ExtendedUser } from './next-auth'; // Import the ExtendedUser type

export const { auth, handlers, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: {},
				password: {},
			},
			async authorize(credentials, req) {
				const { username, password } = credentials as {
					username: string;
					password: string;
				};
				const user = await db.user.findFirst({
					where: {
						username: username,
					},
				});

				if (user && user.password === password) {
					return user as ExtendedUser; // Cast the user to ExtendedUser
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true;

			if (!user.id) {
				return false;
			}

			return true;
		},
		async jwt({ token }) {
			console.log('I am being called again');
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.id = existingUser.user?.id;
			token.name = existingUser.user?.username;
			token.email = existingUser.user?.email;
			token.role = existingUser.user?.role;

			return token;
		},
		async session({ token, session }) {
			console.log({ sessionToken: token });
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (session.user) {
				if (typeof token.name === 'string') {
					session.user.name = token.name;
				}
				if (typeof token.id === 'string') {
					session.user.id = token.id;
				}
				if (typeof token.email === 'string') {
					session.user.email = token.email;
				}
				if (typeof token.role === 'string') {
					session.user.role = token.role as 'ADMIN' | 'USER';
				}
			}
			return session;
		},
	},
});
