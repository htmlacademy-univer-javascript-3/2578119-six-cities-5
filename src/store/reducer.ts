import {createReducer} from '@reduxjs/toolkit';
import {setAuthorizationStatus, setCity, setOffers, setOffersLoading, setUser} from './action.ts';
import {cities} from '../utils/cities.ts';
import {City, Offer, UserFull} from '../utils/types.ts';
import {AuthorizationStatus} from '../utils/enums.ts';

type State = {
  city: City;
  offers: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserFull | null;
}

const initialState: State = {
  city: cities.Paris,
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoading, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
