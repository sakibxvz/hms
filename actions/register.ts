import db from "@/lib/db";

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
