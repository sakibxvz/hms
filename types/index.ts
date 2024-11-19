export interface UserState {
	id: string;
	username: string;
	email: string;
	role: 'ADMIN' | 'USER';
	image?: string;
}
