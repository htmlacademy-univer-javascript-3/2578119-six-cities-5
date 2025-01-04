import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from './types.ts';
import {AxiosInstance} from 'axios';
import {Actions} from '../utils/enums.ts';
import {setOffers, setOffersLoading} from './action.ts';
import {Offer} from '../utils/types.ts';

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
