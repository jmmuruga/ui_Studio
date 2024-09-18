import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../actions/userAction';

// Async thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getUsers();
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (userData) => {
   // const response = await addUser(userData);
  //  return response.data;
});

export const removeUser = createAsyncThunk('users/removeUser', async (userId) => {
  //  await deleteUser(userId);
   // return userId;
});

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: { users: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; state.loading = false; })
            .addCase(fetchUsers.rejected, (state, action) => { state.error = action.error.message; state.loading = false; })
            .addCase(createUser.fulfilled, (state, action) => { state.users.push(action.payload); })
            .addCase(removeUser.fulfilled, (state, action) => { state.users = state.users.filter(user => user.id !== action.payload); });
    },
});

export default userSlice.reducer;
