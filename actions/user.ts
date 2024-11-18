import db from '@/lib/db';

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
		});
		return user;
	} catch (error) {
		return null;
	}
};
