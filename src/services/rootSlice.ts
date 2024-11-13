import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TRegisterData,
  updateUserApi
} from '../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

// creates user and tokens
export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((response) => {
      if (response.success) {
        localStorage.setItem('token', response.refreshToken);
        setCookie('accessToken', response.accessToken);
        return response.user;
      } else {
        return null;
      }
    })
);

// creates new user entry with tokens and so on
export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }: { email: string; password: string }) =>
    loginUserApi({ email, password }).then((response) => {
      if (response.success) {
        localStorage.setItem('token', response.refreshToken);
        setCookie('accessToken', response.accessToken);
        return response.user;
      } else {
        return null;
      }
    })
);

// tries to recover user based on tokens
export const getUserThunk = createAsyncThunk('users/getUser', async () =>
  getUserApi()
);

// just changes parameters of user if succeds
export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  async (data: Partial<TRegisterData>) =>
    updateUserApi(data).then((response) =>
      response.success ? response.user : null
    )
);

// not related
export const forgotPasswordThunk = createAsyncThunk(
  'users/forgotPassword',
  async (email: string) =>
    forgotPasswordApi({ email }).then((response) => response)
);

// not related
export const resetPasswordThunk = createAsyncThunk(
  'users/resetPassword',
  async (password: string) => {
    if (!getCookie('accessToken')) return false;
    return resetPasswordApi({
      password,
      token: getCookie('accessToken')!
    }).then((response) => response);
  }
);

export const logoutThunk = createAsyncThunk('users/logout', async () => {
  if (!getCookie('accessToken')) return false;
  return logoutApi().then((response) => {
    if (response.success) {
      localStorage.removeItem('token');
      deleteCookie('accessToken');
    }
    return response.success;
  });
});

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  requestInProgress: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  requestInProgress: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setInit: (state: UserState) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state: UserState) => {
      state.isLoading = false;
    });
    builder.addCase(
      registerUserThunk.fulfilled,
      (state: UserState, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      }
    );

    builder.addCase(loginUserThunk.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state: UserState) => {
      state.isLoading = false;
    });
    builder.addCase(
      loginUserThunk.fulfilled,
      (state: UserState, { payload }) => {
        state.isLoading = false;
        state.user = payload || state.user;
      }
    );

    builder.addCase(getUserThunk.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state: UserState) => {
      state.isInit = true;
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state: UserState, { payload }) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = payload.success ? payload.user : null;
    });

    builder.addCase(updateUserThunk.pending, (state: UserState) => {
      state.requestInProgress = true;
    });
    builder.addCase(updateUserThunk.rejected, (state: UserState) => {
      state.requestInProgress = false;
    });
    builder.addCase(
      updateUserThunk.fulfilled,
      (state: UserState, { payload }) => {
        state.requestInProgress = false;
        state.user = payload || state.user;
      }
    );

    builder.addCase(logoutThunk.pending, (state: UserState) => {
      state.requestInProgress = true;
    });
    builder.addCase(logoutThunk.rejected, (state: UserState) => {
      state.requestInProgress = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state: UserState, { payload }) => {
      state.requestInProgress = false;
      state.user = null;
    });
  }
});

export const { setUser, setInit } = userSlice.actions;
export default userSlice.reducer;
