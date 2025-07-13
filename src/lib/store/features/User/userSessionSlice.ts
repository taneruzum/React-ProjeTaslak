
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserSessionState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: UserSessionState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    // Login reducer'ı
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Logout reducer'ı
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

// Action creator'ları export ediyoruz
export const { login, logout } = userSessionSlice.actions;

// Reducer'ı export ediyoruz
export default userSessionSlice.reducer;