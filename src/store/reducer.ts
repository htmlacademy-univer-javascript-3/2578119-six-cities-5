import {createReducer} from '@reduxjs/toolkit';
import {setCity, setOffers, setOffersLoading} from './action.ts';
import {cities} from '../utils/cities.ts';
import {City, Offer} from '../utils/types.ts';

type State = {
  city: City;
  offers: Offer[];
  isOffersLoading: boolean;
}

const initialState: State = {
  city: cities.Paris,
  offers: [],
  isOffersLoading: false,
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
    });
});

export {reducer};
