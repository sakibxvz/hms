import { UserState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
	id: '',
	username: '',
	email: '',
	role: 'USER',
	image: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			return action.payload;
		},
		updateUser(state, action: PayloadAction<Partial<UserState>>) {
			return { ...state, ...action.payload };
		},
	},
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
