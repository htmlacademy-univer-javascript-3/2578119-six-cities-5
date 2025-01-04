import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './types.ts';
import {AxiosInstance} from 'axios';
import {Actions, AuthorizationStatus} from '../utils/enums.ts';
import {setAuthorizationStatus, setOffers, setOffersLoading, setUser} from './action.ts';
import {AuthData, Offer, UserFull} from '../utils/types.ts';
import {StatusCodes} from 'http-status-codes';
import {dropToken, saveToken} from '../api/token.ts';

type DispatchStateExtra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuth = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.USER}/checkAuth`,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserFull>('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      saveToken(data.token);
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  },
);

export const login = createAsyncThunk<void, AuthData, DispatchStateExtra> (
  `${Actions.USER}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    const {status, data} = await api.post<UserFull>('/login', {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      saveToken(data.token);
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  }
);


export const logout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.USER}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
    dropToken();
  },
);

export const getOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Actions.OFFERS}/getOffers`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(true));
    const {data} = await api.get<Offer[]>('/offers');
    dispatch(setOffers(data));
    dispatch(setOffersLoading(false));
  },
);
