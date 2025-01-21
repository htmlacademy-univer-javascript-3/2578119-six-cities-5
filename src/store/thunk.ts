import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './types.ts';
import {AxiosInstance} from 'axios';
import {Actions, AuthorizationStatus, LoadingStatus} from '../utils/enums.ts';
import {
  setAuthorizationStatus, setComments, setCommentsLoading, setFavorites, setFavoritesLoading,
  setNearbyOffers,
  setOffer,
  setOfferLoading,
  setOffers,
  setOffersLoading,
  setUser
} from './action.ts';
import {AuthData, FormData, Offer, OfferFull, Review, UserFull} from '../utils/types.ts';
import {StatusCodes} from 'http-status-codes';
import {dropToken, saveToken} from '../api/token.ts';

type DispatchStateExtra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const checkAuth = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.User}/checkAuth`,
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
  `${Actions.User}/login`,
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
  `${Actions.User}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
    dropToken();
  },
);

export const getOffers = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.Offers}/getOffers`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(LoadingStatus.Pending));
    const {data, status} = await api.get<Offer[]>('/offers');

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOffersLoading(LoadingStatus.Error));
      return;
    }

    dispatch(setOffers(data));
    dispatch(setOffersLoading(LoadingStatus.Success));
  },
);

export const getOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.Offer}/getOffer`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoading(LoadingStatus.Pending));

    const { status, data } = await api.get<OfferFull>(`/offers/${id}`);

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOfferLoading(LoadingStatus.Error));
      return;
    }

    dispatch(setOffer(data));
    dispatch(setOfferLoading(LoadingStatus.Success));
  },
);

export const getOffersNearby = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.Offers}/getOffersNearby`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoading(LoadingStatus.Pending));
    const { data, status } = await api.get<Offer[]>(`/offers/${id}/nearby`);

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOffersLoading(LoadingStatus.Error));
      return;
    }

    dispatch(setNearbyOffers(data));
    dispatch(setOffersLoading(LoadingStatus.Success));
  },
);

export const getComments = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.Comments}/getComments`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setCommentsLoading(LoadingStatus.Pending));
    const { data, status } = await api.get<Review[]>(`/comments/${id}`);

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setCommentsLoading(LoadingStatus.Error));
      return;
    }

    dispatch(setComments(data));
    dispatch(setCommentsLoading(LoadingStatus.Success));
  },
);

export const createComment = createAsyncThunk<void, { form: FormData } & { offerId: string }, DispatchStateExtra>(
  `${Actions.Comments}/create`,
  async ({ offerId, form }, { dispatch, extra: api }) => {
    const { status } = await api.post<FormData>(`/comments/${offerId}`, form);

    if (status === Number(StatusCodes.CREATED) || status === Number(StatusCodes.OK)) {
      dispatch(getComments(offerId));
    }
  },
);

export const getFavorites = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.Favorites}/getFavorites`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFavoritesLoading(LoadingStatus.Pending));
    const {status, data} = await api.get<Offer[]>('/favorite');
    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setFavoritesLoading(LoadingStatus.Error));
      return;
    }

    dispatch(setFavorites(data));
    dispatch(setFavoritesLoading(LoadingStatus.Success));
  },
);

export const changeFavorite = createAsyncThunk<void, { offerId: string; favoriteStatus: boolean }, DispatchStateExtra>(
  `${Actions.Favorites}/changeFavorite`,
  async ({ offerId, favoriteStatus }, { dispatch, extra: api }) => {
    const { status } = await api.post(`/favorite/${offerId}/${favoriteStatus ? 1 : 0}`);

    if ((status === Number(StatusCodes.CREATED) || status === Number(StatusCodes.OK))) {
      dispatch(getFavorites());
      dispatch(getOffers());
    }
  },
);
